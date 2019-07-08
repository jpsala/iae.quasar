import axios from 'axios';
// import store from '../store';

export default async ({ Vue, store }) => {
  // axios.defaults.baseURL = 'http://iae.dyndns.org/iae/index.php?r=apiApp/';
  axios.defaults.baseURL = 'http://localhost/iae/index.php?r=apiApp/';

  axios.interceptors.response.use((response) => {
    // console.log('axios.interceptors.response', response);
    store.dispatch('session/updateApiTokenFromInterceptor', response.data.access_token);
    return response;
  }, (error) => {
    Promise.reject(error);
  });

  axios.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = store.state.session.apiToken;
      return config;
    },
    error => Promise.reject(error),
  );

  axios.defaults.method = 'POST';
  Vue.prototype.$axios = axios;
};
