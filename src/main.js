import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSession from 'vue-session';
import App from './App.vue';
import Routes from './router/routes';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueSession);

const router = new VueRouter({
  mode: 'history',
  routes: Routes,
});

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
  render: h => h(App),
  router,
});
