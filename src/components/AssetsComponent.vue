<template>
  <div>
    <q-toolbar inverted>
      <q-toolbar-title/>

      <q-btn rounded flat dense color="primary" icon="add" label="Add Asset" @click="addAsset"/>

      <q-btn
        rounded
        flat
        dense
        color="secondary"
        icon="list"
        label="Show Notes"
        @click="showAssetNotesDialog = !showAssetNotesDialog"
        :disabled="selectedAssets.length === 0"
      >
        <q-tooltip v-if="selectedAssets.length === 0">You have not selected a row</q-tooltip>
      </q-btn>

      <q-btn rounded flat dense icon="refresh" color="secondary" @click="refresh"/>
    </q-toolbar>

    <q-table
      :data="assets"
      :columns="columns"
      row-key="id"
      selection="single"
      :selected.sync="selectedAssets"
      :filter="filter"
      :pagination.sync="pagination"
      binary-state-sort
      dense
    >
      <template slot="top-left" slot-scope="props">
        <q-search color="primary" v-model="filter"/>
      </template>

      <q-td slot="body-cell-serial" slot-scope="props" :props="props">
        <a @click="editAsset(props.row)" class="cursor-pointer">{{props.value}}</a>
      </q-td>

      <q-td slot="body-cell-updatedAt" slot-scope="props" :props="props">
        <span>
          {{ props.row.updatedAt | moment('from')}}
          <q-tooltip>{{$moment(props.row.updatedAt).toString()}}</q-tooltip>
        </span>
      </q-td>

      <q-td slot="body-cell-createdAt" slot-scope="props" :props="props">
        <span>
          {{ props.row.createdAt | moment('from')}}
          <q-tooltip>{{$moment(props.row.createdAt).toString()}}</q-tooltip>
        </span>
      </q-td>
    </q-table>

    <q-modal v-model="showAssetNotesDialog" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>Asset Notes</q-toolbar-title>
          <q-btn flat round dense v-close-overlay icon="close"/>
        </q-toolbar>

        <div>
          <asset-notes v-on:added-asset-notes-event="addedAssetNotesEvent"/>
        </div>
      </q-modal-layout>
    </q-modal>

    <q-modal v-model="showAssetAddEditDialog" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>Asset</q-toolbar-title>
          <q-btn flat round dense v-close-overlay icon="close"/>
        </q-toolbar>

        <div class="row" style="margin: 20px 10px 0px 10px;">
          <div class="col-12 col-md-6">
            <q-list no-border>
              <q-item>
                <q-item-main>
                  <q-input
                    float-label="Serial"
                    v-model.trim="asset.serial"
                    @blur="$v.asset.serial.$touch"
                    autofocus
                    :error="$v.asset.serial.$error"
                    clearable
                  />
                </q-item-main>
              </q-item>

              <q-item>
                <q-item-main>
                  <q-input
                    float-label="Model"
                    v-model.trim="asset.model"
                    @blur="$v.asset.model.$touch"
                    :error="$v.asset.model.$error"
                    clearable
                  />
                </q-item-main>
              </q-item>

              <q-item>
                <q-item-main>
                  <q-input
                    float-label="Owner Email"
                    v-model.trim="asset.ownerEmail"
                    @blur="$v.asset.ownerEmail.$touch"
                    :error="$v.asset.ownerEmail.$error"
                    clearable
                  />
                </q-item-main>
              </q-item>
            </q-list>
          </div>

          <div class="col-12 col-md-6"></div>
        </div>

        <div class="row">
          <div class="col-12 col-md-12">
            <q-list sparse no-border>
              <q-item>
                <q-item-main align="right">
                  <q-btn
                    rounded
                    small
                    color="primary"
                    :disabled="$v.$invalid"
                    @click="saveAsset"
                  >Save</q-btn>
                </q-item-main>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>

<script>
'use strict';

import { required, email } from 'vuelidate/lib/validators';

import alert from 'mixins/alert.js';
import common from 'mixins/common.js';
import storage from 'mixins/storage.js';
import rest from 'mixins/rest.js';

export default {
  name: 'AssetsComponent',

  mixins: [common, alert, storage, rest],

  data() {
    return {
      showAssetNotesDialog: false,
      showAssetAddEditDialog: false,
      editMode: false,
      filter: '',
      pagination: {
        sortBy: 'updatedAt',
        descending: true,
        page: 1,
        rowsPerPage: 10
      },
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true,
        },
        {
          name: 'serial',
          required: true,
          label: 'Serial',
          align: 'left',
          field: 'serial',
          sortable: true,
        },
        {
          name: 'model',
          required: true,
          label: 'Model',
          align: 'left',
          field: 'model',
          sortable: true,
        },
        {
          name: 'ownerEmail',
          required: true,
          label: 'Owner',
          align: 'left',
          field: 'ownerEmail',
          sortable: true,
        },
        {
          name: 'createdAt',
          required: true,
          label: 'Created At',
          align: 'left',
          field: 'createdAt',
          sortable: true,
        },
        {
          name: 'updatedAt',
          required: true,
          label: 'Updated At',
          align: 'left',
          field: 'updatedAt',
          sortable: true,
        },
      ],
      asset: {},
      assets: [],
      selectedAssets: []
    }
  },

  validations: {
    asset: {
      serial: {
        required
      },

      model: {
        required
      },

      ownerEmail: {
        required,
        email
      },
    },
  },

  watch: {
    $selectedTeamId() {
      if (this.$selectedTeamId) {
        this.refresh();
      }
    },

    selectedAssets() {
      if (this.selectedAssets.length === 1) {
        this.$store.commit('updateSelectedAssetId', this.selectedAssets[0].id);
      } else {
        this.$store.commit('updateSelectedAssetId', null);
      }
    }
  },

  mounted() {
    this.refresh();
  },

  methods: {
    refresh() {
      if (!this.$selectedTeamId) {
        return;
      }

      this.selectedAssets = [];

      this.$getResource('/v1/teams/' + this.$selectedTeamId + '/assets').then(assets => {
        this.assets = assets;
      }).catch(error => {
        this.$alertError(error);
      });
    },

    addAsset() {
      this.asset = {};
      this.editMode = false;
      this.showAssetAddEditDialog = true;
    },

    editAsset(asset) {
      this.asset = asset;
      this.editMode = true;
      this.showAssetAddEditDialog = true;
    },

    saveAsset() {
      if (this.editMode) {
        this.$putResource('/v1/assets/' + this.asset.id, this.asset).then(status => {
          this.showAssetAddEditDialog = false;
          this.refresh();
        }).catch(error => {
          this.$alertError(error);
        });
      } else {
        this.$postResource('/v1/teams/' + this.$selectedTeamId + '/assets', this.asset).then(status => {
          this.showAssetAddEditDialog = false;
          this.refresh();
        }).catch(error => {
          this.$alertError(error);
        });
      }
    },

    addedAssetNotesEvent() {
      this.showAssetNotesDialog = false;
      this.refresh();
    }
  }
}
</script>

<style>
</style>
