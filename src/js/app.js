import Vue from 'vue';

import '@/util/polyfill';
import App from '@/container/App';
import router from './router';
import store from './store';

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
