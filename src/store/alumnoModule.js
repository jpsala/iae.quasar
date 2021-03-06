import Vue from 'vue';

const moduleState = {
  notas: [],
};

const getters = {

};

const actions = {
  getNotas({
    rootState, rootGetters,
  }) {
    if (!rootGetters['session/loggedIn']) return false;
    const hijo = rootState.session.user.hijoActivo;
    return Vue.prototype.$axios.get(`notasV2&socio_id=${hijo.id}`);
  },
  loadEstadoDeCuenta({ rootState }, alumnoId) {
    if (!rootState.session.user) return false;
    if (!alumnoId) alumnoId = rootState.session.user.hijoActivo.id;
    return Vue.prototype.$axios.get(`emisionComprobantes_ajax&socio_id=${alumnoId}`);
  },
};

const mutations = {

};
export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state: moduleState,
};
