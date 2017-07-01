<docs>
## This is an Example component.
</docs>

<style lang="stylus">
.flex
    display:flex
</style>

<template lang="pug">
.index-root
  h1 Index
  button(@click='count(10)') Add Count
  .flex display:flex
  .box Box
  .test Test
  router-link(to='/index') Index
</template>

<script>

import { mapActions } from 'vuex';

export default{
  name: 'Home',
  data() {
    return {

    };
  },
  watch: {
    $route(v) {
            // console.log(v);
    },
  },
  computed: {
        // ...mapGetters(['count'])
  },
  methods: {
    ...mapActions(['showLoading', 'count']),
  },
  mounted() {

  },
  destroyed() {

  },
  components: {
  },
};
</script>
