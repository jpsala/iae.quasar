import Vue from 'vue';

const moduleState = {
  apiToken: window.localStorage.getItem('iae.quasar'),
  user: undefined,
};

const getters = {
  loggedIn(state) {
    return Boolean(state.user);
  },
  hijoActivo(state) {
    return state.user.hijoActivo;
  },
};

const actions = {
  login(context, user) {
    return Vue.prototype.$axios.post('login', user)
      .then((response) => {
        if (response.status !== 200) return response.data;
        const { userData } = response;
        userData.hijos = response.hijos;
        context.dispatch('setLoginData', userData);
        return response;
      })
      .catch((error) => {
        console.error('e', error);
      });
  },
  logout({ commit, dispatch }) {
    commit('API_TOKEN', undefined);
    dispatch('setLoginData', undefined);
    dispatch('setHijoActivo', undefined);
  },
  setApiToken({ commit }, value) {
    commit('API_TOKEN', value);
  },
  setLoginData({ commit, dispatch }, data) {
    commit('USER', data);
    dispatch('setHijoActivo', data ? data.hijos[2] : undefined);
  },
  updateApiTokenFromInterceptor({ dispatch }, value) {
    dispatch('setApiToken', value);
  },
  setHijoActivo({ commit }, value) {
    commit('HIJO_ACTIVO', value);
  },

};

const mutations = {
  USER(state, data) {
    state.user = data;
  },
  API_TOKEN(state, value) {
    window.localStorage.setItem('iae.quasar', value);
    state.apiToken = value;
  },
  HIJO_ACTIVO(state, value) {
    if (state.user) Vue.set(state.user, 'hijoActivo', value);
  },

};
export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state: moduleState,
};
