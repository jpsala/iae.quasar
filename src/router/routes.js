
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/notas', component: () => import('pages/Notas.vue') },
      { path: '/register', component: () => import('pages/Register.vue') },
      {
        path: '/activate/:id',
        name: 'Activate',
        component: () => import('pages/Activate.vue'),
      },
      {
        path: '/contrato/:id',
        name: 'Contrato',
        component: () => import('pages/Contratos.vue'),
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
