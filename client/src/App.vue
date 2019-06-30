<template>
  <div id="app">
    <Banner />
  </div>
</template>

<script>
import Banner from './components/sites/Banner.vue';

export default {
  name: 'app',
  components: {
    Banner,
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

    font-family: 'Roboto', sans-serif;
  }

  #app{
    margin: 0;
    padding: 0;

    width: 100vw;
    height: auto;
  }
</style>
