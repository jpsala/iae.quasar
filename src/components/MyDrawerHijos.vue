<template>
<q-list bordered separator>
  <q-expansion-item v-if="loggedIn" ref="itemHijos" group="0" :default-opened="true">
    <template v-slot:header>
      <q-item-section>
        <!-- <q-item-label header>Alumno Activo:</q-item-label> -->
        <q-item-label lines="1">{{hijoActivo.nombre}}</q-item-label>
        <q-item-label caption>Haga click aquí para seleccionar el alumno activo</q-item-label>
      </q-item-section>
      <q-item-section avatar>
        <q-avatar size="60px">
          <img :src="'https://assets.iae.com.ar/fotos/thumbnails/'+hijoActivo.matricula.trim()+'.gif'"
          @error="imageNotFound($event.target)">
        </q-avatar>
      </q-item-section>

    </template>
    <template v-for="(hijo, index) in hijos">
      <q-item v-if="hijo !== hijoActivo" clickable v-ripple
              :inset-level="0.2" @click="setHijoActivo(hijo) ; $refs.itemHijos.hide()"
              :key="index">
          <q-item-section avatar>
            <q-avatar size="45px">
              <img :src="'https://assets.iae.com.ar/fotos/thumbnails/'+hijo.matricula.trim()+'.gif'"
              @error="imageNotFound($event.target)">
            </q-avatar>
          </q-item-section>
        <q-item-section>{{hijo.nombre}}</q-item-section>
      </q-item>
    </template>
  </q-expansion-item>
</q-list>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
    ...mapGetters('session', ['loggedIn']),
    ...mapState({ hijos: state => (state.session.user ? state.session.user.hijos : []) }),
    ...mapState({ hijoActivo: state => state.session.user.hijoActivo }),
  },
  methods: {
    ...mapActions('session', ['setHijoActivo']),
    imageNotFound(t) {
      t.src = 'https://assets.iae.com.ar/fotos/thumbnails/0000.gif';
      // console.log('e', e);
    },
  },
};
</script>
