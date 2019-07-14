<template>
  <q-page padding class="relative-position">
    <q-img v-if="src" :src="src" @load="imgLoaded">
      <template v-slot:loading />
    </q-img>
    <q-inner-loading :showing="loading" />
  </q-page>
</template>

/* eslint-disable no-unreachable */
<script>
// import { Loading } from 'quasar';

export default {
  data() {
    return {
      tipo: '',
      src: '',
      loading: false,
    };
  },
  async mounted() {
    setTimeout(() => {
      this.cargaContrato(this.$route.params.id);
    }, 500);
  },
  beforeRouteUpdate(to, from, next) {
    this.cargaContrato(to.params.id);
    next();
  },
  methods: {
    cargaContrato(tipo) {
      this.tipo = tipo;
      this.loading = true;
      // Loading.show();
      this.src = `https://assets.iae.com.ar/img/contratos/${tipo}.jpg`;

      this.grabaLeido();
    },
    imgLoaded() {
      this.loading = false;
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
