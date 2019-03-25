<template>
  <q-layout view="hHh lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" v-if="$ownerEmail">
          <q-icon name="menu"/>
        </q-btn>

        <q-toolbar-title>Simple Asset Tracker</q-toolbar-title>

        <q-btn flat dense round @click="showSettings" aria-label="Settings" v-if="$ownerEmail">
          <q-icon name="settings"/>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" content-class="bg-grey-2" v-if="$ownerEmail">
      <team-list/>
    </q-layout-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
'use strict';

import alert from 'mixins/alert.js';
import common from 'mixins/common.js';
import storage from 'mixins/storage.js';
import rest from 'mixins/rest.js';

export default {
  name: 'MainLayout',

  mixins: [common, alert, storage, rest],

  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },

  methods: {
    showSettings() {
      this.$router.push('SettingsPage');
    }
  }
}
</script>

<style>
</style>
