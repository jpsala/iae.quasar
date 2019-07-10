
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue'), meta: { free: true } },
      { path: '/notas', component: () => import('pages/Notas.vue') },
      { path: '/talleres', component: () => import('pages/Talleres.vue') },
      {
        path: '/register', meta: { free: true }, component: () => import('pages/Register.vue'), name: 'Register',
      },
      {
        path: '/activate/:id',
        name: 'Activate',
        meta: { free: true },
        component: () => import('pages/Activate.vue'),
      },
      {
        path: '/contrato/:id',
        name: 'Contrato',
        meta: { free: true },
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
    meta: { free: true },
  });
}

export default routes;
