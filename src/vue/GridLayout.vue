<style lang="stylus" scoped>
.grid_root
    width 100%
    max-width 1000px
    position relative
    margin 0 auto
[class^=col-]
    padding 10px 0
    background-color rgba(86,61,124,0.15)
    border 1px solid black
.row
    margin-bottom 10px
</style>

<template lang="pug">

.grid_root
  .container-fluid
    .row
      .col-md-12
          h1 md12
    .row
      .col-md-6 md6
      .col-xs-6 md6
    .row
      .col-md-6.col-md-offset-6 md6
    
    .row
      .col-md-12.visible-sm 桌機only
      .col-md-12.visible-xs 手機only
        

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default{
  name: 'GridLayout',
  data() {
    return {

    };
  },
  computed: {
        // ...mapGetters(['count'])
  },
  methods: {
  },
  mounted() {

  },
  destroyed() {

  },
  components: {
  },
};
</script>
