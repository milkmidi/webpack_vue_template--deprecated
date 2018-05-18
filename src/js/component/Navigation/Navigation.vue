<script>
export default {
  data: () => ({
  }),
  computed: {
  },
  methods: {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  components: {
  },
};
</script>

<template lang="pug">
nav.nav
  router-link.nav__item(to="/" exact) Main
  router-link.nav__item(to="/about" exact) About
</template>

<style lang="stylus" scoped>
  .nav
    display block
    width 100%
    background-color black
    padding 20px 0
    &__item
      color white
      font-size 20px
      padding 0 20px
      text-decoration none
      &:hover
        color alpha(white, 0.8)
      &.router-link-active
        font-size 24px
</style>

