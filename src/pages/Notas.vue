<template>
  <q-page padding v-if="loggedIn">
    <component
      v-if="notas"
      :is="hijoActivo.Nivel_id === '1' ? 'Inicial': 'EpEs'"
      :notas="notas"/>
  </q-page>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import EpEs from './notasSegunNivel/EsEp';
import Inicial from './notasSegunNivel/Inicial';

export default {
  components: { EpEs, Inicial },
  data() {
    return {
      notas: [],
    };
  },
  computed: {
    ...mapGetters('session', ['loggedIn']),
    ...mapState({ hijos: state => (this.loggedIn ? state.session.user.hijos : []) }),
    ...mapState({
      hijoActivo(state) {
        this.notas = undefined;
        return this.loggedIn ? state.session.user.hijoActivo : undefined;
      },
    }),
  },
  methods: {
    ...mapActions('alumno', ['getNotas']),
  },
  watch: {
    async hijoActivo() {
      this.notas = await this.getNotas();
    },
  },
  async mounted() {
    this.notas = await this.getNotas();
  },
};
</script>
