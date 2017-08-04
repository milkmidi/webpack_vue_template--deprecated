/* eslint no-console:off */
import VueRouter from 'vue-router';
import Vue from 'vue';

import Home from '../vue/Home';
/* import YoutubeDemo from 'youtubeDemo.vue';
import GridLayout from 'gridLayout.vue';
import Login from 'login.vue'; */

// console.log(System);

Vue.use(VueRouter);

function log(value) {
  console.log(`%c${value}`, 'background: #bdc3c7; color: black; font-size:10px;');
}

const GridLayout = () => System.import('../vue/GridLayout.vue');

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/index', component: Home },
    { path: '/grid', component: GridLayout },
    /*
    { path: '/youtube', component: YoutubeDemo },
    { path: '/login', component: Login },*/
    // { path: '/youtube', component: require( "YoutubeDemo" ), meta: { authorization: true } },
  ],
});

// vue router issues
// https://github.com/vuejs/vue-router/issues/853
router.beforeEach((to, from, next) => {
  // log(`${'Router beforeEach ' + 'to:'}${to.path} name:${to.name} from:${from.path}`);
  if (to.matched.some(record => record.meta.authorization || false)) {
    const isLogin = false;
    if (isLogin) { // login
      next();
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});
router.afterEach((route) => {
  log(`Router afterEach ${route.path}`);
});

export default router;
