/* global ga*/
/* eslint no-console:off */
import Vue from 'vue';

Vue.mixin({
  mounted() {
    const className = this.$options.name || '';
    console.log(`%cmounted ${className}`, 'background:#2ecc71;color:white;font-size:9px');
  },
  destroyed() {
    const className = this.$options.name || '';
    console.log(`'%cdestroyed ${className}`, 'background:#c0392b;color:white;font-size:10px');
  },
  methods: {
    gaPage(value) {
      ga('send', 'pageview', value);
      console.log(`%cGA:${value}`, 'background: #222; color: #E87F0E; font-size:16px;');
    },
    gaEvent(value) {
      ga('send', 'event', 'Button', 'click', value);
      console.log(`%cGA:${value}`, 'background: #222; color: #aabbcc; font-size:12px;');
    },
  },
});
