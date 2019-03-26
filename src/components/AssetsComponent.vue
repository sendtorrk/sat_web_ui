<template>
  <div>
    <q-table
      :data="assets"
      :columns="columns"
      row-key="id"
      selection="single"
      :selected.sync="selectedAssets"
      :filter="filter"
      :pagination.sync="pagination"
      binary-state-sort
    >
      <template slot="top-left" slot-scope="props">
        <q-search color="primary" v-model="filter"/>
      </template>

      <q-td slot="body-cell-serial" slot-scope="props" :props="props">
        <a @click="edit(props.row.id)" class="cursor-pointer">{{props.value}}</a>
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
  </div>
</template>

<script>
'use strict';

import alert from 'mixins/alert.js';
import common from 'mixins/common.js';
import storage from 'mixins/storage.js';
import rest from 'mixins/rest.js';

export default {
  name: 'AssetsComponent',

  mixins: [common, alert, storage, rest],

  data() {
    return {
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
      assets: [],
      selectedAssets: []
    }
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
    if (this.$selectedTeamId) {
      this.refresh();
    }
  },

  methods: {
    async refresh() {
      try {
        this.selectedAssets = [];
        this.assets = await this.$getResource('/v1/teams/' + this.$selectedTeamId + '/assets');
        // console.log(JSON.stringify(this.assets));
      } catch (error) {
        this.$alertError(error);
      }
    },

    edit(id) {
      console.log(id);
    }
  }
}
</script>

<style>
</style>
