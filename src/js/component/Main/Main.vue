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
.main-root
  .logo
  h2 Hi, I'm milkmidi
</template>



<style scoped lang="stylus">
@require '~css/common'
.main-root
  .logo
    // width 512px
    // height @width
    // imageSize('img/milkmidi.png')
    $size = image-size('img/milkmidi.png')
    width $size[0]
    height $size[1]
    background-image url('~img/milkmidi.png')
    // bg('../../../asset/img/milkmidi.png')
    // bg('~img/milkmidi.png')
</style>
