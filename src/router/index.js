import Vue from 'vue'
import VueRouter from 'vue-router'
// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '/',
    redirect: '/profile'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home')
  },
  {
    path: '/nav',
    name: 'Nav',
    component: () => import('../views/nav/Nav')
  },
  {
    path: '/navDetails',
    name: 'NavDetails',
    component: () => import('../views/nav/NavDetails')
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('../views/home/Details')
  },
  {
    path: '/write_diary',
    name: 'Write_diary',
    component: () => import('../views/home/Write_diary')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about/About')
  },
  {
    path: '/learn',
    name: 'Learn',
    component: () => import('../views/learn/Learn')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/learn/Shop'),
    meta: {
      // noRefresh: true
    }
  },
  {
    path: '/goodsDetails',
    name: 'GoodsDeails',
    component: () => import('../views/learn/GoodsDeails')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/message/Message')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/login/Register'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/withDrawal',
    name: 'WithDrawal',
    component: () => import('../views/profile/WithDrawal')
  },
  {
    path: '/bound',
    name: 'Bound',
    component: () => import('../views/profile/Bound')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/profile/Profile'),
    meta: {
      noRefresh: false
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/profile/Order'),
    meta: {
      // noRefresh: true
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/profile/Setting')
  },
  {
    path: '/photo_list',
    name: 'Photo_list',
    component: () => import('../views/profile/Photo_list')
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => import('../views/profile/Tools')
  }
]
const router = new VueRouter({
  routes,
  mode: 'hash'
})


export default router
