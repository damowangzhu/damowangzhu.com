import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

export default function () {
  const routerHistory = import.meta.env.SSR === false ? createWebHistory() : createMemoryHistory();

  return createRouter({
    history: routerHistory,
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: 'home title'
        }
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/Test.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue'),
        meta: {
          title: 'about title'
        }
      }
    ]
  });
}
