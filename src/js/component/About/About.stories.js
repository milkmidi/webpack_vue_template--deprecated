import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import About from './About.vue';

Vue.component('About', About);

storiesOf('About', module)
  .add('basic', () => ({
    methods: {
      click() {
        action('About')('click');
      },
    },
    template: '<About @click="click" />',
  }));
