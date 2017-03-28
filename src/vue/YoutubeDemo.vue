<style></style>

<template>

<div class="youtube-demo-root">
    <p>loaded:{{loaded}}</p>
    <p>progress:{{progress}}</p>
    
    <youtube video_id="evsh1qa6eoc" 
         
        @loaded="loadedHandler" 
        @progress="progressHandler" 
        :autoplay="true"
        :fs="0"
        :player-vars="{'fs':0,'controls':0}"
        ></youtube>
    <!--
    <youtube video_id="evsh1qa6eoc" fs="true"></youtube>
    -->
</div>

</template>

<script>
// import { mapGetters, mapActions } from 'vuex';
export default{
    name: 'YoutubeDemo.vue',
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
