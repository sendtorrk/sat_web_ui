//
// Author: Raja Kannan
//

'use strict';

export default {
  methods: {
    $getItem(key) {
      return this.$q.sessionStorage.has(key) ? this.$q.sessionStorage.get.item(key) : null;
    },

    $setItem(key, value) {
      this.$q.sessionStorage.set(key, value);
    },

    $removeItem(key) {
      this.$q.sessionStorage.remove(key);
    },

    $sync() {
      const ssOwnerEmail = this.$getItem(this.$data.$OWNER_EMAIL);
      const ssUserEmail = this.$getItem(this.$data.$USER_EMAIL);

      if (ssOwnerEmail && !this.$ownerEmail) {
        this.$store.commit('updateOwnerEmail', ssOwnerEmail);
        this.$store.commit('updateUserEmail', ssUserEmail);

        console.log('Storage and store are synced.');
      } else {
        console.log('Storage and store are already synced.');
      }
    },
  }
}