import axios from 'axios';

export default async ({ Vue, store }) => {
  // axios.defaults.baseURL = 'http://iae.dyndns.org/iae/index.php?r=apiApp/';
  axios.defaults.baseURL = 'http://localhost/iae/index.php?r=apiApp/';

  axios.interceptors.response.use((response) => {
    const url = response.config.url.substring(response.config.url.lastIndexOf('/') + 1);
    console.log('endpoint %O %O\nresponse.data %O', url, response, response.data);
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
