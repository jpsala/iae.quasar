<template>
<div style="max-width: 600px; margin: auto">
  <q-card v-for="(data, index) in estados" :key="index" class="q-ma-sm" bordered>
    <q-card-section>
      <div class="row items-center no-wrap">
            <q-avatar size="65px" class=" q-mr-md">
              <img :src="'https://assets.iae.com.ar/fotos/thumbnails/'+data.matricula.trim()+'.gif'"
              @error="imageNotFound($event.target)">
            </q-avatar>
        <div class="col">
          <div class="text-h6">{{ data.alumno }}</div>
          <div class="text-subtitle2">
            {{ data.doc.detalle }} - {{ formatDate(data.doc.fecha_creacion, 'DD/MM/YYYY') }}
          </div>
          <div class="text-subtitle2">{{ data.nivel }} {{ data.anio }} {{ data.division }}</div>
        </div>
        <div class="col-auto">
            <q-btn stack outline color="primary" size="lg" icon="print"
                   label="Imprime" @click="descargar(data)"/>
        </div>
      </div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <q-list dense>
        <q-item v-for="item in data.doc.det" :key="item.nombre">
          <q-item-section>{{ item.nombre }}</q-item-section>
          <q-item-section avatar>$ {{ item.total }}</q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item>
          <q-item-section>Total</q-item-section>
          <q-item-section avatar>$ {{ data.doc.total }}</q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item>
          <q-item-section>Vencimientos</q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item>
          <q-item-section>{{formatDate(data.doc.fecha_vto1, 'DD/MM/YYYY')}}</q-item-section>
          <q-item-section avatar>$ {{ data.doc.total }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>{{ formatDate(data.doc.fecha_vto2, 'DD/MM/YYYY')}}</q-item-section>
          <q-item-section avatar>$ {{ data.doc.totalMasRecargo.toFixed(2) }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <!-- <q-separator color="black" spaced/> -->
  </q-card>
</div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { date } from 'quasar';

export default {
  data() {
    return {
      estados: undefined,
    };
  },
  computed: {
    ...mapGetters('session', ['loggedIn']),
    ...mapState({
      hijos: state => (state.session.user ? state.session.user.hijos : []),
    }),
    ...mapState({ hijoActivo: state => state.session.user.hijoActivo }),
  },
  watch: {
    loggedIn() {
      this.loadEstadoDeCuenta();
    },
  },
  methods: {
    descargar(data) {
      console.log('data', data.socio_id);

      // window.open(`http://localhost/iae/index.php?r=frontApi/emisionComprobantes&socio_id=${this.socio.id}&liquid_conf_id=0`);
      const url = `https://root.iae.com.ar/iae/index.php?r=apiApp/emisionComprobantes&socio_id=${data.socio_id}&logo=1`;
      console.log('url', url);

      window.open(url);
    },
    imageNotFound(t) {
      t.src = 'https://assets.iae.com.ar/fotos/thumbnails/0000.gif';
      // console.log('e', e);
    },
    formatDate(d, format) {
      return date.formatDate(d, format);
    },
    ...mapActions({ actionEstadoDeCuenta: 'alumno/loadEstadoDeCuenta' }),
    async loadEstadoDeCuenta() {
      this.estados = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const h of this.hijos) {
        // eslint-disable-next-line no-await-in-loop
        const resp = await this.actionEstadoDeCuenta(h.id);
        this.estados.push(resp.data);
      }
    },
  },
  async mounted() {
    this.loadEstadoDeCuenta();
  },
};
</script>
