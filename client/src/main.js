import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router/router';

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.mixin({
  data() {
    return {
      isLogged: false,
    };
  },
});

/* eslint-disable-next-line */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
