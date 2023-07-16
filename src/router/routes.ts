import { RouteRecordRaw } from "vue-router";

const welcome = () => import('@/views/welcome.vue')
const login = () => import('@/views/login.vue')
const home = () => import('@/views/home.vue')
const Essay = () => import('@/views/Essay.vue')
const admin = () => import('@/views/admin/index.vue')
// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: welcome,
    redirect: "/home",
    children: [
      { path: '/home', component: home },
      { path: '/essay', component: Essay },
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

export default routes;
