import Vue from 'vue';
import VueRouter from 'vue-router';


const Main = () => import(/* webpackChunkName: "Main" */'@/component/Main');
const About = () => import(/* webpackChunkName: "About" */'@/component/About');

Vue.use(VueRouter);

export const routes:Array = [
  { path: '/', component: Main },
  { path: '/about', component: About },
  // { path: '*', component: Main },
];

const router = new VueRouter({
  // mode: 'history',
  routes,
});


export default router;
