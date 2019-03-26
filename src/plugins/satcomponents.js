'use strict';

import TeamListComponent from 'components/TeamListComponent';
import AssetsComponent from 'components/AssetsComponent';
import AssetNotesComponent from 'components/AssetNotesComponent';

export default ({ app, router, Vue }) => {
  Vue.component('team-list', TeamListComponent);
  Vue.component('assets', AssetsComponent);
  Vue.component('asset-notes', AssetNotesComponent);
}