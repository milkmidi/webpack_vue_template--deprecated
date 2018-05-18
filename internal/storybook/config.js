import { setOptions } from '@storybook/addon-options';
import { configure } from '@storybook/vue';
import Vue from 'vue';
import Vuex from 'vuex';
import FakeComponent from './FakeComponent';


Vue.use(Vuex);
Vue.use(FakeComponent);

setOptions({
  name: 'milkmidi',
  url: 'https://github.com/milkmidi/webpack_vue_template',
  addonPanelInRight: true,
});

/* eslint-disable */
// copy src/asset/copy
require('!!style-loader!css-loader!stylus-loader!../../src/css/app.styl');
/* eslint-enabled */

const req = require.context('../../src', true, /stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
