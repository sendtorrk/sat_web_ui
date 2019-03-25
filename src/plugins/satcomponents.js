'use strict';

import TeamListComponent from 'components/TeamListComponent';

export default ({ app, router, Vue }) => {
  Vue.component('team-list', TeamListComponent);
}