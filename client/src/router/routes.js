import HomePage from '../components/sites/HomePage.vue';
import AdminPanel from '../components/sites/admin/AdminPanel.vue';

export default [
  {
    path: '/', component: HomePage,
  },
  {
    path: '/adminpanel', component: AdminPanel,
  },
];
