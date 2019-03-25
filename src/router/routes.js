
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EntryPage.vue') },
      { path: 'SettingsPage', name: 'SettingsPage', component: () => import('pages/SettingsPage.vue') },
      { path: 'MainPage', name: 'MainPage', component: () => import('pages/MainPage.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
