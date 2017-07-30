<style lang="stylus" src="../css/entry.styl">
</style>

<template lang="pug">

#app
  Loading
  Navigation
  main
    transition(name='fade', mode='out-in')
        router-view.view
  WarningFooter
            

</template>

<script>

import { mapActions } from 'vuex';
import Loading from './Loading';
import Navigation from './Navigation';
import WarningFooter from './warningFooter';

export default {
  name: 'App',
    // props:["appData"],
    /* data() {
        return {
        }
    }, */
  computed: {
  },
  methods: {
    ...mapActions(['showLoading']),
  },
  mounted() {
    setTimeout(() => {
      this.showLoading(false);
    },
        1000);
  },
  components: {
    Loading,
    Navigation,
    WarningFooter,
  },
};
</script>

