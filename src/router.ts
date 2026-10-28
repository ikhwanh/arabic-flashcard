import { createRouter, createWebHistory } from 'vue-router'

export type NavTab = 'breakdown' | 'reading' | 'dzikir'

declare module 'vue-router' {
  interface RouteMeta {
    tab?: NavTab
    header?: boolean
  }
}

// Before the switch to path routing every link was a hash (#deck/<id>), so
// rewrite old bookmarks to their path equivalent before the router
// reads the URL (this must run before createWebHistory).
if (/^#[a-z]/.test(window.location.hash)) {
  history.replaceState(null, '', import.meta.env.BASE_URL + window.location.hash.slice(1))
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', redirect: '/qs' },
    { path: '/qs', component: () => import('./pages/BreakdownIndex.vue'), meta: { tab: 'breakdown', header: true } },
    { path: '/qs/:id', component: () => import('./pages/QsBreakdownPage.vue'), props: true },
    { path: '/qs/:id/quiz', component: () => import('./pages/QsQuizPage.vue'), props: true },
    {
      path: '/qs/:id/game/:ayah?',
      component: () => import('./pages/QsGamePage.vue'),
      props: route => ({
        id: route.params.id,
        ayah: route.params.ayah ? Number(route.params.ayah) : undefined,
      }),
    },
    { path: '/read', component: () => import('./pages/ReadingTab.vue'), meta: { tab: 'reading', header: true } },
    { path: '/read/:id', component: () => import('./pages/ReadingPage.vue'), props: true },
    { path: '/dzikir', component: () => import('./pages/DzikirIndex.vue'), meta: { tab: 'dzikir', header: true } },
    { path: '/dzikir/:id', component: () => import('./pages/DzikirPage.vue'), props: true },
    { path: '/settings', component: () => import('./pages/SettingsPage.vue'), meta: { header: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
