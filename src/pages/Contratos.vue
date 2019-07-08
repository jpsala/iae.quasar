<template>
  <q-page padding class="relative-position">
    <my-spinner  v-if="loading" />
    <q-img v-if="src" :src="src" @load="loading = false">
      <template v-slot:loading />
    </q-img>
  </q-page>
</template>

/* eslint-disable no-unreachable */
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import mySpinner from 'app/src/components/MySpinner';

export default {
  components: { mySpinner },
  data() {
    return {
      tipo: '',
      src: '',
      loading: true,
    };
  },
  computed: {
    ...mapState('socios', ['hijos']),
    ...mapState('auth', ['currentUser']),
  },
  async mounted() {
    this.cargaContrato(this.$route.params.id);
    setTimeout(() => {
      this.src = `https://assets.iae.com.ar/img/contratos/${this.$route.params.id}.jpg`;
    }, 1000);
    Vue.nextTick(() => {
      // do something cool
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.src = `https://assets.iae.com.ar/img/contratos/${to.params.id}.jpg`;
    this.cargaContrato(to.params.id);
    this.loading = true;
    next();
  },
  methods: {
    cargaContrato(tipo) {
      this.tipo = tipo;
      this.grabaLeido();
    },
    async grabaLeido() {
      // if (!this.$store.state.auth.currentUser) return;
      // const contrato = {
      //   socio_id: this.$store.state.auth.currentUser.id,
      //   tipo: this.tipo,
      // };
      // const resp = await myFetch('contrato_leido', {
      //   method: 'post',
      //   body: JSON.stringify(contrato),
      // });
      // console.log('contrato_graba', resp);
    },
  },
};
</script>
