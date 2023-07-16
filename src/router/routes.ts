import { RouteRecordRaw } from 'vue-router'

const welcome = () => import('@/views/welcome.vue')
// const login = () => import('@/views/login.vue')
const home = () => import('@/views/home/home.vue')
const Essay = () => import('@/views/Essay.vue')
// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: welcome,
    redirect: '/home',
    children: [
      { path: '/home', component: home },
      { path: '/essay', component: Essay },
    ],
  },
]

export default routes
