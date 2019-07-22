import HomePage from '../components/sites/HomePage.vue';
import AdminPanel from '../components/sites/admin/AdminPanel.vue';
import SiteNotFound from '../components/sites/notfound/SiteNotFound.vue';

export default [
  {
    path: '/', component: HomePage,
  },
  {
    path: '/adminpanel', component: AdminPanel,
  },
  {
    path: '*', component: SiteNotFound,
  },
];
