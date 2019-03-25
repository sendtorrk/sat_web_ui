<template>
  <q-page>Entry Page</q-page>
</template>

<script>
'use strict';

import common from 'mixins/common.js';
import storage from 'mixins/storage.js';

export default {
  name: 'EntryPage',

  mixins: [common, storage],

  data() {
    return {

    }
  },

  mounted() {
    this.$sync();

    if (!this.$ownerEmail) {
      this.$router.push('SettingsPage');
    }
  }
}
</script>

<style>
</style>
