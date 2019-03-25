//
// Author: Raja Kannan
//

'use strict';

export default {
  methods: {
    $alertInfo(message) {
      if (this.$closeNotify) {
        this.$closeNotify();
      }

      const closeNotify = this.$q.notify({
        message: message,
        type: 'info',
        position: 'top'
      });

      this.$store.commit('updateCloseNotify', closeNotify);
    },

    $alertError(error) {
      console.log('ERROR: ' + JSON.stringify(error));

      const message = error.message;

      if (this.$closeNotify) {
        this.$closeNotify();
      }

      const closeNotify = this.$q.notify({
        message: message,
        type: 'negative',
        position: 'top'
      });

      this.$store.commit('updateCloseNotify', closeNotify);
    }
  }
}