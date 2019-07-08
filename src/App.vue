<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  created() {
    const currentRoute = this.$router.history.current.name;
    console.log('cr', currentRoute, currentRoute === 'Activate');

    if (currentRoute !== 'Activate') {
      // this.tryToLoginAndGetUserData();
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
