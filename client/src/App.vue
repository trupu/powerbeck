<template>
  <div id="app">
    <Banner />
    <Coaches />
    <Activities />
    <Services />
  </div>
</template>

<script>
import Banner from './components/sites/Banner.vue';
import Coaches from './components/sites/Coaches.vue';
import Activities from './components/sites/Activities.vue';
import Services from './components/sites/Services.vue';

export default {
  name: 'app',
  components: {
    Banner,
    Coaches,
    Activities,
    Services,
  },
};
</script>

<style lang="scss">
  *{
    box-sizing: border-box;
  }

  html{
    scroll-behavior: smooth;
  }

  body{
    margin: 0;
    padding: 0;

    overflow-x: hidden !important;

    font-family: 'Roboto', sans-serif;
  }

  #app{
    margin: 0;
    padding: 0;

    width: 100vw;
    height: auto;

    overflow-x: hidden !important;
  }
</style>
