<template>
  <q-page></q-page>
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
