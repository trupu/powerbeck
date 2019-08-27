import HomePage from '../components/sites/HomePage.vue';
import AdminPanel from '../components/sites/admin/AdminPanel.vue';
import SiteNotFound from '../components/sites/notfound/SiteNotFound.vue';
import Gallery from '../components/sites/gallery/gallery.vue';

export default [
  {
    path: '/', component: HomePage,
  },
  {
    path: '/adminpanel', component: AdminPanel,
  },
  {
    path: '/gallery', component: Gallery,
  },
  {
    path: '*', component: SiteNotFound,
  },
];
