<template>
  <div>
    <q-toolbar inverted>
      <q-toolbar-title/>

      <q-btn rounded flat dense color="primary" icon="add" label="Add Note" @click="addNote"></q-btn>

      <q-btn rounded flat dense icon="refresh" color="secondary" @click="refresh"/>
    </q-toolbar>

    <q-table
      :data="assetNotes"
      :columns="columns"
      row-key="id"
      selection="none"
      :filter="filter"
      :pagination.sync="pagination"
      binary-state-sort
    >
      <template slot="top-left" slot-scope="props">
        <q-search color="primary" v-model="filter"/>
      </template>

      <q-td slot="body-cell-createdAt" slot-scope="props" :props="props">
        <span>
          {{ props.row.createdAt | moment('from')}}
          <q-tooltip>{{$moment(props.row.createdAt).toString()}}</q-tooltip>
        </span>
      </q-td>
    </q-table>
  </div>
</template>

<script>
'use strict';

import alert from 'mixins/alert.js';
import common from 'mixins/common.js';
import storage from 'mixins/storage.js';
import rest from 'mixins/rest.js';
import dialog from 'mixins/dialog.js';

export default {
  name: 'AssetNotesComponent',

  mixins: [common, alert, storage, rest, dialog],

  data() {
    return {
      filter: '',
      pagination: {
        sortBy: 'createdAt',
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
          name: 'note',
          required: true,
          label: 'Note',
          align: 'left',
          field: 'note',
          sortable: true,
        },
        {
          name: 'userEmail',
          required: true,
          label: 'User',
          align: 'left',
          field: 'userEmail',
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
      ],
      assetNotes: []
    }
  },

  watch: {
    $selectedAssetId() {
      if (this.$selectedAssetId) {
        this.refresh();
      }
    }
  },

  methods: {
    refresh() {
      if (!this.$selectedAssetId) {
        return;
      }

      this.$getResource('/v1/assets/' + this.$selectedAssetId + '/asset-notes').then(assetNotes => {
        this.assetNotes = assetNotes;
      }).catch(error => {
        this.$alertError(error);
      });
    },

    addNote() {
      this.$promptDialog('Add Note', 'Enter note', null, response => {
        if (!response) {
          return;
        }

        const data = {
          note: response,
          userEmail: this.$userEmail
        };

        this.$postResource('/v1/assets/' + this.$selectedAssetId + '/asset-notes', data).then(status => {
          this.$emit('added-asset-notes-event');
        }).catch(error => {
          this.$alertError(error);
        });
      });
    }
  }
}
</script>

<style>
</style>
