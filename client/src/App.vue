<template>
  <div id="app">
    <Banner />
    <Coaches />
  </div>
</template>

<script>
import Banner from './components/sites/Banner.vue';
import Coaches from './components/sites/Coaches.vue'

export default {
  name: 'app',
  components: {
    Banner,
    Coaches,
  },
};
</script>

<style lang="scss">
  *{
    box-sizing: border-box;
  }

  body{
    margin: 0;
    padding: 0;

    overflow-x: hidden;

    font-family: 'Roboto', sans-serif;
  }

  #app{
    margin: 0;
    padding: 0;

    width: 100vw;
    height: auto;
  }
</style>
