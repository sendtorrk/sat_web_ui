<template>
  <div>
    <q-list no-border separator dark>
      <q-list-header align="center">Teams</q-list-header>

      <q-item>
        <q-item-main>
          <q-search v-model="filter" placeholder="Enter team name" hide-underline dark/>
        </q-item-main>

        <q-item-side right>
          <q-btn rounded flat dense icon="add" color="primary" @click="addTeam"/>

          <q-btn
            rounded
            flat
            dense
            icon="edit"
            color="secondary"
            @click="editTeam"
            :disabled="!$selectedTeamId"
          />

          <q-btn rounded flat dense icon="refresh" color="secondary" @click="refresh"/>
        </q-item-side>
      </q-item>

      <q-item v-for="(team, index) in filteredTeams" :key="index" link>
        <q-item-main
          :label="team.name"
          :sublabel="team.ownerEmail"
          @click.native="selectTeam(team.id, team.name, team.ownerEmail)"
        />

        <q-item-side right icon="done" color="primary" v-if="team.id === $selectedTeamId"/>
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
import dialog from 'mixins/dialog.js';

export default {
  name: 'TeamListComponent',

  mixins: [common, alert, dialog, storage, rest],

  data() {
    return {
      filter: '',
      teams: []
    }
  },

  computed: {
    filteredTeams() {
      if (!this.filter) {
        return this.teams;
      }

      return this.teams.filter(team => team.name.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1);
    }
  },

  mounted() {
    this.refresh();
  },

  watch: {
    $ownerEmail() {
      if (this.$ownerEmail) {
        this.$setItem(this.$data.$SELECTED_TEAM_ID, null);
        this.$setItem(this.$data.$SELECTED_TEAM_NAME, null);
        this.$setItem(this.$data.$SELECTED_TEAM_OWNER, null);

        this.$store.commit('updateSelectedTeamId', null);
        this.$store.commit('updateSelectedTeamName', null);
        this.$store.commit('updateSelectedTeamOwner', null);

        this.refresh();
      }
    }
  },

  methods: {
    refresh() {
      if (!this.$ownerEmail) {
        return;
      }

      this.$getResource('/v1/teams/' + this.$ownerEmail).then(teams => {
        this.teams = teams;

        if (this.teams.length === 1) {
          this.selectTeam(this.teams[0].id, this.teams[0].name, this.teams[0].ownerEmail);
        }
      }).catch(error => {
        this.$alertError(error);
      });
    },

    selectTeam(selectedTeamId, selectedTeamName, selectedTeamOwner) {
      this.$setItem(this.$data.$SELECTED_TEAM_ID, selectedTeamId);
      this.$setItem(this.$data.$SELECTED_TEAM_NAME, selectedTeamName);
      this.$setItem(this.$data.$SELECTED_TEAM_OWNER, selectedTeamOwner);

      this.$store.commit('updateSelectedTeamId', selectedTeamId);
      this.$store.commit('updateSelectedTeamName', selectedTeamName);
      this.$store.commit('updateSelectedTeamOwner', selectedTeamOwner);
    },

    addTeam() {
      this.$promptDialog('Add Team', 'Enter Name', null, response => {
        if (!response) {
          return;
        }

        const data = {
          name: response,
          ownerEmail: this.$ownerEmail
        };

        this.$postResource('/v1/teams', data).then(status => {
          this.refresh();
        }).catch(error => {
          this.$alertError(error);
        });
      });
    },

    editTeam() {
      this.$promptDialog('Edit Team', 'Enter Name', this.$selectedTeamName, response => {
        if (!response) {
          return;
        }

        const data = {
          name: response,
          ownerEmail: this.$ownerEmail
        };

        this.$putResource('/v1/teams/' + this.$selectedTeamId, data).then(status => {
          // Update store/storage with new name
          this.selectTeam(this.$selectedTeamId, response, this.$selectedTeamOwner);

          this.refresh();
        }).catch(error => {
          this.$alertError(error);
        });
      });
    },
  }
}
</script>

<style>
</style>
