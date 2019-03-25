//
// Author: Raja Kannan
//

'use strict';

import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      $OWNER_EMAIL: 'SAT_OWNER_EMAIL',
      $USER_EMAIL: 'SAT_USER_EMAIL',
    }
  },

  computed: {
    ...mapGetters({
      $ownerEmail: 'getOwnerEmail',
      $userEMail: 'getUserEmail',
      $closeNotify: 'getCloseNotify'
    })
  }
}