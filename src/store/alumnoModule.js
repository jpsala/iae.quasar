import Vue from 'vue';

const moduleState = {
  notas: [],
};

const getters = {

};

const actions = {
  loadEstadoDeCuenta({ rootState }, alumnoId) {
    if (!rootState.session.user) return false;
    if (!alumnoId) alumnoId = rootState.session.user.hijoActivo.id;
    return Vue.prototype.$axios.get(`emisionComprobantes_ajax&socio_id=${alumnoId}`)
      .then(response => response.data);
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
