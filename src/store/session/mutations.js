export function CHANGE_TEST(state) {
  state.test = 'Now test is changed';
}
export function USER(state, data) {
  state.user = data;
}
export function API_TOKEN(state, value) {
  window.localStorage.setItem('iae.quasar', value);
  state.apiToken = value;
}
