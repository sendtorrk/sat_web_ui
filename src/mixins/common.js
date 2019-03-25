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
      $SELECTED_TEAM_NAME: 'SAT_SELECTED_TEAM_NAME',
      $SELECTED_TEAM_OWNER: 'SAT_SELECTED_TEAM_OWNER'
    }
  },

  computed: {
    ...mapGetters({
      $ownerEmail: 'getOwnerEmail',
      $userEmail: 'getUserEmail',
      $closeNotify: 'getCloseNotify',
      $selectedTeamName: 'getSelectedTeamName',
      $selectedTeamOwner: 'getSelectedTeamOwner'
    })
  },

  mounted() {
    if(this.$options.name !== 'MainLayout') {
      this.$sync();
    }
  }
}