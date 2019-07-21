import Vue from 'vue';
import VueRouter from 'vue-router';
import AdminPanel from '../components/sites/admin/AdminPanel.vue';

Vue.use(VueRouter);

const routes = [
    {
      path: '/adminpanel', component: AdminPanel,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default { router };
