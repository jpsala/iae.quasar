import axios from 'axios';

const local = document.location.hostname === 'localhost';
export default async ({ Vue, store }) => {
  // axios.defaults.baseURL = 'http://iae.dyndns.org/iae/index.php?r=apiApp/';
  axios.defaults.baseURL = local ? 'http://localhost/iae/index.php?r=apiApp/' : 'https://root.iae.com.ar/iae/index.php?r=apiApp/';

  axios.interceptors.response.use((response) => {
    const endPoint = response.config.url.substring(response.config.url.lastIndexOf('/') + 1);
    console.log('endpoint %O %O\nresponse.data %O', endPoint, response, response.data);
    if (response.data && response.data.access_token && response.data.access_token !== 'undefined') {
      store.dispatch('session/updateApiTokenFromInterceptor', response.data.access_token);
    }
    return response.data;
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
