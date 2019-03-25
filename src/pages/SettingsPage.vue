<template>
  <q-page>
    <q-toolbar inverted>
      <q-breadcrumbs separator=">">
        <q-breadcrumbs-el label="Home" icon="home"/>
        <q-breadcrumbs-el label="Settings" icon="settings"/>
      </q-breadcrumbs>
    </q-toolbar>

    <div class="row" style="margin: 20px 10px 0px 10px;">
      <div class="col-12 col-md-6">
        <q-list no-border sparse>
          <q-item>
            <q-item-main>
              <q-input
                float-label="Team Owner Email"
                v-model.trim="ownerEmail"
                @blur="$v.ownerEmail.$touch"
                autofocus
                :error="$v.ownerEmail.$error"
                clearable
              />
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-main>
              <q-input
                float-label="Your Email"
                v-model.trim="userEmail"
                @blur="$v.userEmail.$touch"
                autofocus
                :error="$v.userEmail.$error"
                clearable
              />
            </q-item-main>
          </q-item>
        </q-list>
      </div>

      <div class="col-12 col-md-6"></div>
    </div>

    <div class="row">
      <div class="col-12 col-md-12">
        <q-list sparse no-border>
          <q-item>
            <q-item-main align="right">
              <q-btn rounded small color="primary" :disabled="$v.$invalid" @click="save">Save</q-btn>
            </q-item-main>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
'use strict';

import { required, email } from 'vuelidate/lib/validators';

import alert from 'mixins/alert.js';
import common from 'mixins/common.js';
import storage from 'mixins/storage.js';
import rest from 'mixins/rest.js';

export default {
  name: 'SettingsPage',

  mixins: [common, alert, storage, rest],

  data() {
    return {
      ownerEmail: '',
      userEmail: ''
    }
  },

  validations: {
    ownerEmail: {
      required,
      email
    },

    userEmail: {
      required,
      email
    }
  },

  mounted() {
    this.ownerEmail = this.$ownerEmail;
    this.userEmail = this.$userEmail;
  },

  methods: {
    save() {
      this.$store.commit('updateOwnerEmail', this.ownerEmail);
      this.$setItem(this.$data.$OWNER_EMAIL, this.ownerEmail);

      this.$store.commit('updateUserEmail', this.userEmail);
      this.$setItem(this.$data.$USER_EMAIL, this.userEmail);

      this.$router.push('MainPage');
    }
  }
}
</script>

<style>
</style>
