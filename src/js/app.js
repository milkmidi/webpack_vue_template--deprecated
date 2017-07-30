import { sync } from 'vuex-router-sync';
import Vue from 'vue';

import store from './store/store';
import router from './app.router';
import App from '../vue/App';

import './app.require';

sync(store, router);


export default new Vue({
  className: 'main.js',
  el: '#app',
  store,
  router,
  render: h => h(App),
});

