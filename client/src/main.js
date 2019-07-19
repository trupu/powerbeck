import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  mode: 'history',
  routes,
});
/* eslint-disable-next-line */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
