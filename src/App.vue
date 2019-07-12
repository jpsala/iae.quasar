<template>
  <div id="q-app">
    <q-ajax-bar size="4px" position="top" />
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  created() {
    this.$router.beforeResolve((to, from, next) => {
      const loggedIn = this.$store.getters['session/loggedIn'];
      const unprotectedRoute = to.meta.free;
      if (!(loggedIn || unprotectedRoute)) {
        this.tryToLoginAndGetUserData();
      }
      next();
    });
  },
  methods: {
    ...mapActions('session', ['login', 'logout']),
    tryToLoginAndGetUserData() {
      this.login().then((response) => {
        if (!response || response.status !== 200) {
          this.$router.push('/login');
        }
      });
    },
  },
};
</script>

<style>
</style>
