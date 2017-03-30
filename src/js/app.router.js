
import Index from 'Index.vue';

function log(value) {
    console.log(`%c${value}`, 'background: #bdc3c7; color: black; font-size:10px;');
}
const router = new VueRouter({
    // mode: 'history',
    routes: [
        { path: '/', component: Index },
        { path: '/index', component: Index },
        { path: '/grid', component: require('GridLayout.vue') },
        { path: '/youtube', component: require('YoutubeDemo.vue') },
        // { path: '/youtube', component: require( "YoutubeDemo" ), meta: { authorization: true } },
        { path: '/login', component: require('Login.vue') },
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
