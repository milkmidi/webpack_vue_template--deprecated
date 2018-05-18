import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import Navigation from './Navigation.vue';


Vue.component('Navigation', Navigation);

storiesOf('NavigationRoot', module)
  .add('basic', () => ({
    methods: {
      click() {
        action('BackButton')('click');
      },
    },
    template: '<Navigation />',
  }));
