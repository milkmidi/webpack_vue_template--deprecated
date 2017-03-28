<style lang="stylus" src="../css/entry.styl">
</style>

<template lang="pug">

#app
    Loading
    Navigation
    WarningFooter
    main
        transition(name='fade', mode='out-in')
            router-view.view

</template>

<script>

// import { mapGetters, mapActions } from 'vuex';
import Loading from './Loading';
import Navigation from './Navigation';
import WarningFooter from './WarningFooter';

export default {
    name: 'App.vue',
    // props:["appData"],
    /* data() {
        return {
        }
    },*/
    computed: {
    },
    methods: {
        ...Vuex.mapActions(['showLoading']),
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

