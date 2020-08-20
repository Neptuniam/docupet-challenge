<template>
<div id="app">
    <router-view id="view" />
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'App',

    methods: {
        ...mapActions(['fetchNotes'])
    },

    mounted() {
        this.fetchNotes()
    }
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* text-align: center; */
        color: #2c3e50;
        /* margin-top: 60px; */

        height: calc(100vh - 20px);


        background-image: url(assets/grey-feathers-float-air-isolated-white-background_36860-392.jpg);
        background-repeat: no-repeat;
        /* background-size: contain; */

        background-position: left bottom;
    }

    #view {
        max-width: 1200px;
        margin: 20px auto;
        padding: 0px 10px;

    }
</style>
