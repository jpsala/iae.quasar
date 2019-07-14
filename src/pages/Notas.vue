<template>
  <q-page padding style="max-width: 800px; margin: auto" v-if="loggedIn">
    <component
      v-if="notas"
      :is="hijoActivo.Nivel_id === '1' ? 'Inicial': 'EpEs'"
      :notas="notas" :hijoActivo="hijoActivo"/>
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
      notas: undefined,
    };
  },
  computed: {
    ...mapGetters('session', ['loggedIn']),
    ...mapState({ hijos: state => (this.loggedIn ? state.session.user.hijos : []) }),
    ...mapState({
      hijoActivo(state) {
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
