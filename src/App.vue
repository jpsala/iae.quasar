<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  updated() {
    const currentRoute = this.$route.name;

    if (currentRoute !== 'Activate' && currentRoute !== 'Register') {
      this.tryToLoginAndGetUserData();
    }
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
