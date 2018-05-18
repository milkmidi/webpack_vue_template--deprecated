<script>
export default {
  props: {},
  data: () => ({
  }),
  mounted() {
  },
  beforeDestroy() {
  },
};
</script>

<template lang="pug">
.about
  h1 Hi, About milkmidi.
  button(@click="$emit('click')") Click
</template>

<style lang="stylus">
  .about
    h1
      font-size 100px
      color green
</style>