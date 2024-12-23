import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../modules/dashboard/Dashboard.vue'
import { Routes } from './route';
import ProductNew from '@/modules/products/ProductNew.vue';
import ProductEdit from '@/modules/products/ProductEdit.vue';
import ProductList from '../modules/products/ProductList.vue';
import { hasSessionToken } from '@/helpers/session';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/dashboard',
      name: Routes.DASHBOARD,
      component: Dashboard,
    },
    {
      path: '/signIn',
      name: Routes.SIGN_IN,
      component: () => import('../modules/sign-in/SignIn.vue'),
    },
    {
      path: '/product',
      children: [
        { path: '', name: Routes.PRODUCT, component: ProductList },
        { path: '/new', name: Routes.PRODUCT_NEW, component: ProductNew },
        { path: '/:id/edit', name: Routes.PRODUCT_EDIT, component: ProductEdit },
      ],
    },
    {
      path: '/user',
      children: [
        { path: '', name: Routes.USER, component: ProductList },
        // { path: 'new', component: UserProfile },
        // { path: '/:id', component: UserPosts },
      ],
    },
    {
      path: '/faq',
      name: Routes.FAQ,
      component: () => import('../modules/faq/Faq.vue'),
    },
  ],
});

router.beforeEach((to) => {
  if (to.name !== Routes.SIGN_IN && !hasSessionToken()) {
    return { name: Routes.SIGN_IN };
  }
});

export default router
