<template>
  <div>
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
  name: 'AssetNotesComponent',

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
        {
          name: 'updatedAt',
          required: true,
          label: 'Updated At',
          align: 'left',
          field: 'updatedAt',
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
    async refresh() {
      try {
        this.assetNotes = await this.$getResource('/v1/assets/' + this.$selectedAssetId + '/asset-notes');
        console.log(JSON.stringify(this.assetNotes));
      } catch (error) {
        this.$alertError(error);
      }
    },
  }
}
</script>

<style>
</style>
