<style lang="stylus">
.navigation-root{
    background-color:#f3f3f3;
    .logo{
        display: inline-block;
        width: 100px;
        height: 100px;
        background-size:100% auto;
        background-image:url('~logo.png');        
    }
    a{
        font-size: 40px;
        padding:20px;
    }
}
</style>

<template lang="pug">

.navigation-root
    .logo
    router-link(to='/index') index
    router-link(to='/grid') grid
    p {{count}}


</template>

<script>
import { mapGetters } from 'vuex';

export default{
    name: 'Navigation',
    data() {
        return {

        };
    },
    computed: {
        ...mapGetters(['count']),
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
