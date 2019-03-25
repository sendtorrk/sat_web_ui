//
// Author: Raja Kannan
//

'use strict';

export default {
  methods: {
    $showLoading() {
      this.$q.loading.show({
        message: 'Loading, please wait ...'
      });
    },

    $hideLoading() {
      this.$q.loading.hide();
    }
  }
}