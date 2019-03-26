<template>
  <q-page>Entry Page</q-page>
</template>

<script>
'use strict';

import alert from 'mixins/alert.js';
import common from 'mixins/common.js';
import storage from 'mixins/storage.js';
import rest from 'mixins/rest.js';

export default {
  name: 'EntryPage',

  mixins: [common, storage, alert, rest],

  data() {
    return {

    }
  },

  mounted() {
    if (!this.$ownerEmail) {
      this.$router.push('SettingsPage');
    } else {
      this.$router.push('MainPage');
    }
  },

  methods: {
  }
}
</script>

<style>
</style>
