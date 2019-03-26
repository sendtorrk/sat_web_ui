<template>
  <div>
    <q-list no-border separator link>
      <q-list-header>Teams</q-list-header>

      <q-item v-for="(team, index) in teams" :key="index">
        <q-item-main
          :label="team.name"
          :sublabel="team.ownerEmail"
          @click.native="selectTeam(team.id, team.name, team.ownerEmail)"
        />

        <q-item-side
          right
          icon="done"
          color="primary"
          v-if="team.id === $selectedTeamId"
        />
      </q-item>
    </q-list>
  </div>
</template>

<script>
'use strict';

import alert from 'mixins/alert.js';
import common from 'mixins/common.js';
import storage from 'mixins/storage.js';
import rest from 'mixins/rest.js';

export default {
  name: 'TeamListComponent',

  mixins: [common, alert, storage, rest],

  data() {
    return {
      teams: []
    }
  },

  mounted() {
    this.refresh();
  },

  watch: {
    $ownerEmail() {
      this.$setItem(this.$data.$SELECTED_TEAM_ID, null);
      this.$setItem(this.$data.$SELECTED_TEAM_NAME, null);
      this.$setItem(this.$data.$SELECTED_TEAM_OWNER, null);

      this.$store.commit('updateSelectedTeamId', null);
      this.$store.commit('updateSelectedTeamName', null);
      this.$store.commit('updateSelectedTeamOwner', null);

      this.refresh();
    }
  },

  methods: {
    async refresh() {
      try {
        this.teams = await this.$getResource('/v1/teams/' + this.$ownerEmail);
        //console.log(JSON.stringify(this.teams));

        if(this.teams.length === 1) {
          this.selectTeam(this.teams[0].id, this.teams[0].name, this.teams[0].ownerEmail);
        }
      } catch (error) {
        this.$alertError(error);
      }
    },

    selectTeam(selectedTeamId, selectedTeamName, selectedTeamOwner) {
      //console.log(selectedTeamId + '/' + selectedTeamName + '/' + selectedTeamOwner);

      this.$setItem(this.$data.$SELECTED_TEAM_ID, selectedTeamId);
      this.$setItem(this.$data.$SELECTED_TEAM_NAME, selectedTeamName);
      this.$setItem(this.$data.$SELECTED_TEAM_OWNER, selectedTeamOwner);

      this.$store.commit('updateSelectedTeamId', selectedTeamId);
      this.$store.commit('updateSelectedTeamName', selectedTeamName);
      this.$store.commit('updateSelectedTeamOwner', selectedTeamOwner);
    }
  }
}
</script>

<style>
</style>
