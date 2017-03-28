// CDN vue.js
import App from 'App';
// import Vue from 'Vue';
import store from './store/store';
import router from './app.router';
import './app.require';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

export default new Vue({
    className: 'main.js',
    el: '#app',
    store,
    router,
    // components: { 'app': require( 'App' ) },
    render: h => h(App),
    // 如果 App 想要吃到 props 的話就用下面的寫法
    /*render: h => {
        return h( App, { props: {appData:'fasdfasdfoo'}} );
    }*/
});

