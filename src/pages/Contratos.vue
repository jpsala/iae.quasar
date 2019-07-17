<template>
  <q-page padding>
    <!-- <q-img v-if="src" :src="src" @load="imgLoaded">
      <template v-slot:loading />
    </q-img> -->
    <!-- <v-zoomer :zoomed="false" id="zoomer" pivot='cursor' :imitTranslation="false"
        :minScale="1" :maxScale="2"
        :style="'width:100%; height:100%;'+
        ' border: solid 1px silver;position: absolute; top: 0'">

      <img :src="src" style="object-fit: contain; width: 100%; height: 100%;">
    </v-zoomer> -->
    <my-pinch-image :src="src" :min-zoom="1" :max-zoom="3"></my-pinch-image>
    <!-- <div class="images" v-viewer.static="{inline: true}">
      <img v-for="src in images" :src="src" :key="src">
    </div> -->
    <!-- <q-inner-loading :showing="loading" /> -->
  </q-page>
</template>

/* eslint-disable no-unreachable */
<script>
// import { Loading } from 'quasar';
import Vue from 'vue';
import VueZoomer from 'vue-zoomer';
import 'vue-zoomer/dist/vue-zoomer.css';
import MyPinchImage from 'components/MyPinchImage';
import { debounce } from 'quasar';

Vue.use(VueZoomer);

export default {
  components: { MyPinchImage },
  data() {
    return {
      zoomerWidth: this.$q.screen.width,
      zoomerHeight: this.$q.screen.height,
      images: [],
      tipo: '',
      src: 'https://assets.iae.com.ar/img/contratos/inicial.jpg',
      loading: false,
    };
  },
  async mounted() {
    this.listenForWindowResize();
    this.getParentWith();
    setTimeout(() => {
      this.cargaContrato(this.$route.params.id);
    }, 500);
  },
  beforeRouteUpdate(to, from, next) {
    this.cargaContrato(to.params.id);
    next();
  },
  methods: {
    listenForWindowResize() {
      window.addEventListener(
        'resize',
        debounce(() => {
          this.getParentWith();
        }, 300),
      );
    },
    getParentWith() {
      const zoomer = document.querySelector('.q-page');
      const compStyles = window.getComputedStyle(zoomer);
      const padding = compStyles.getPropertyValue('padding');
      const offset = parseInt(padding, 10) * 2;

      console.log('zoomer', zoomer.clientWidth);
      console.log('zoomer', zoomer.clientWidth);
      console.log(zoomer.clientWidth, offset);
      this.zoomerWidth = zoomer.clientWidth - offset;
      this.zoomerHeight = zoomer.clientHeight - offset;
    },
    cargaContrato(tipo) {
      this.tipo = tipo;
      this.loading = true;
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
