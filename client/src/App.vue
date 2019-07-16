<template>
  <div id="app">
    <LoadingScreen />
    <Banner />
    <Coaches />
    <Activities />
    <Services />
    <Offer />
    <Photos />
    <Footer />
  </div>
</template>

<script>
import Banner from './components/sites/Banner.vue';
import Coaches from './components/sites/Coaches.vue';
import Activities from './components/sites/Activities.vue';
import Services from './components/sites/Services.vue';
import Offer from './components/sites/Offer.vue';
import Photos from './components/sites/Photos.vue';
import Footer from './components/sites/Footer.vue';

import LoadingScreen from './components/pieces/LoadingScreen.vue';

export default {
  name: 'app',
  components: {
    LoadingScreen,
    Banner,
    Coaches,
    Activities,
    Services,
    Offer,
    Photos,
    Footer,
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
