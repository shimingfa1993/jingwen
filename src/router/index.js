import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'APS小工具'
    }
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('../views/Timeline.vue'),
    meta: {
      title: '时光轴 - 13年的美好时光'
    }
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../views/Gallery.vue'),
    meta: {
      title: '我们的相册'
    }
  },
  {
    path: '/letters',
    name: 'Letters',
    component: () => import('../views/Letters.vue'),
    meta: {
      title: '情书集'
    }
  },
  {
    path: '/wishes',
    name: 'Wishes',
    component: () => import('../views/Wishes.vue'),
    meta: {
      title: '生日祝福'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Our Love Story'
  next()
})

export default router 