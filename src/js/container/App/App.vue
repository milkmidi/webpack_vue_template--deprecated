<script>
import Navigation from '@/component/Navigation';

export default {
  computed: {
  },
  methods: {
  },
  mounted() {
  },
  components: {
    Navigation,
  },
};
</script>

<template lang="pug">
#app
  Navigation
  main
    transition(name="fade" mode="out-in")
      router-view.view
</template>



<style lang="stylus">
  @require '~css/app'
</style>


