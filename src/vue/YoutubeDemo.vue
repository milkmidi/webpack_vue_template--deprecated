<style></style>

<template lang="pug">

.youtube-demo-root
  p loaded:{{loaded}}
  p progress:{{progress}}
  youtube(video_id='evsh1qa6eoc', 
    @loaded='loadedHandler', 
    @progress='progressHandler', 
    :autoplay='true', 
    :fs='0', 
    :player-vars="{'fs':0,'controls':0}")
    //-
        <youtube video_id="evsh1qa6eoc" fs="true"></youtube>


</template>

<script>
// import { mapGetters, mapActions } from 'vuex';
export default{
  name: 'YoutubeDemo',
  data() {
    return {
      loaded: 0,
      progress: 0,
    };
  },
  methods: {
    loadedHandler(value) {
      this.loaded = value;
    },
    progressHandler(value) {
      this.progress = value;
    },
  },
  mounted() {

  },
  destroyed() {

  },
  components: {

  },
};
</script>
