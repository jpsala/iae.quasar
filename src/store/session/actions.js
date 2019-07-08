import Vue from 'vue';

export function login(context, user) {
  return Vue.prototype.$axios.post('login', user)
    .then((response) => {
      if (response.data.status !== 200) return undefined;
      const { userData } = response.data;
      userData.hijos = response.data.hijos;
      context.dispatch('setLoginData', userData);
      return response.data;
    })
    .catch((error) => {
      console.error('e', error);
    });
}
export function logout({ commit, dispatch }) {
  commit('API_TOKEN', undefined);
  dispatch('setLoginData', undefined);
}
export function setApiToken({ commit }, value) {
  commit('API_TOKEN', value);
}
export function setLoginData({ commit }, data) {
  commit('USER', data);
}
export function updateApiTokenFromInterceptor({ dispatch }, value) {
  dispatch('setApiToken', value);
}
// export function activate({ commit }, { socioId, password }) {
//   commit('addLoadingIndicator', 'login', { root: true });
//   // { method: 'POST', body: JSON.stringify({ socio_id: state.hijoActivo.id }) }
//   return myFetch('activate', {
//     method: 'post',
//     body: JSON.stringify({
//       socio_id: socioId,
//       password,
//     }),
//   })
//     // .then(response => response.json())
//     .then((response) => {
//       commit('removeLoadingIndicator', 'login', { root: true });
//       return response;
//     })
//     .catch((e) => {
//       commit('removeLoadingIndicator', 'login', { root: true });
//       commit('removeLoadingIndicator', 'main', { root: true });
//       throw e;
//     });
// }
