<template>
  <q-page>
    <q-toolbar inverted>
      <q-breadcrumbs separator=">">
        <q-breadcrumbs-el label="Home" icon="home"/>
        <q-breadcrumbs-el label="Assets"/>
      </q-breadcrumbs>
    </q-toolbar>

    <div class="row" style="margin: 20px 10px 0px 10px;">
      <div class="col-12 col-md-12">
        <q-toolbar color="faded">
          <q-toolbar-title>Assets</q-toolbar-title>
        </q-toolbar>
      </div>
    </div>

    <div class="row" style="margin: 20px 10px 0px 10px;">
      <div class="col-12 col-md-12">
        <assets/>
      </div>
    </div>

    <div class="row" style="margin: 20px 10px 0px 10px;">
      <div class="col-12 col-md-12">
        <q-toolbar color="faded">
          <q-toolbar-title>Asset Notes</q-toolbar-title>
        </q-toolbar>
      </div>
    </div>

    <div class="row" style="margin: 20px 10px 0px 10px;">
      <div class="col-12 col-md-12">
        <asset-notes/>
      </div>
    </div>
  </q-page>
</template>

<script>
'use strict';

import alert from 'mixins/alert.js';
import common from 'mixins/common.js';
import storage from 'mixins/storage.js';
import rest from 'mixins/rest.js';

export default {
  name: 'MainPage',

  mixins: [common, alert, storage, rest],

  data() {
    return {
    }
  },

  mounted() {
  },

  methods: {
  }
}
</script>

<style>
</style>
