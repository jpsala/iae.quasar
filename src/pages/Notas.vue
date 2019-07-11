<template>
  <q-page padding v-if="loggedIn">
    <p class="text-faded q-pa-sm" v-for="i in 10" :key="i">
      NOTAS DE {{hijoActivo.nombre}}
      {{i}} Lorem ipsum dolor sit amet.
    </p>
  </q-page>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('session', ['loggedIn']),
    ...mapState({ hijos: state => (state.session.user ? state.session.user.hijos : []) }),
    ...mapState({ hijoActivo: state => state.session.user.hijoActivo }),
  },
  methods: {
    ...mapActions('session', ['loadEstadoDeCuenta']),
  },
  async mounted() {
    console.log('loadEstadoDeCuenta', await this.loadEstadoDeCuenta());
  },
};
</script>
