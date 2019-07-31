<template>
  <div id="app-main">
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
import Banner from './home/Banner.vue';
import Coaches from './home/Coaches.vue';
import Activities from './home/Activities.vue';
import Services from './home/Services.vue';
import Offer from './home/Offer.vue';
import Photos from './home/Photos.vue';
import Footer from './home/Footer.vue';

import LoadingScreen from '../pieces/LoadingScreen.vue';

export default {
  name: 'HomePage',
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

  #app-main{
    margin: 0;
    padding: 0;

    width: 100%;
    height: auto;

    overflow-x: hidden !important;
  }
</style>
