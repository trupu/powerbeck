import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import inConstruction from './inConstruction.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  {
    path: '/', component: App,
  },
  {
      path: '/login', component: inConstruction,
  },
  {
      path: '/contact', component: inConstruction,
  },
];

const router = new VueRouter({
  routes,
});
/* eslint-disable-next-line */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
