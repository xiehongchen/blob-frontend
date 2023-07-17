import { RouteRecordRaw } from 'vue-router'

// 前台页面
const welcome = () => import('@/views/welcome.vue')
const login = () => import('@/views/login.vue')
const home = () => import('@/views/home.vue')
const Essay = () => import('@/views/Essay.vue')
const detail = () => import('@/views/detail.vue')

// 后台管理页面
const admin = () => import('@/views/admin/index.vue')
// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: welcome,
    redirect: '/home',
    children: [
      { path: '/home', component: home },
      { path: '/essay', component: Essay },
      { path: '/detail', component: detail },
    ],
  },
  {
    path: '/login',
    component: login,
  },
  {
    path: '/admin',
    component: admin,
  },
]

export default routes
