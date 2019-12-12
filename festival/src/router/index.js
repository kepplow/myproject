import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/user',
    name: 'user',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user" */ '../views/user/user.vue'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/fans',
    name: 'fans',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "fans" */ '../views/user/fans.vue'),
    meta: {
      title: '粉丝扩展'
    }
  },
  {
    path: '/myOrder',
    name: 'myOrder',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "myOrder" */ '../views/user/myOrder.vue'),
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/orderExpansion',
    name: 'orderExpansion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "orderExpansion" */ '../views/user/orderExpansion.vue'),
    meta: {
      title: '订单拓展'
    }
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: () => import(/* webpackChunkName: "coupon" */ '../views/coupon/coupon.vue'),
    meta: {
      title: '优惠券'
    }
  },
  {
    path: '/myCoupon',
    name: 'myCoupon',
    component: () => import(/* webpackChunkName: "myCoupon" */ '../views/user/myCoupon.vue'),
    meta: {
      title: '我的优惠券'
    }
  },
  {
    path: '/goodsDetails',
    name: 'goodsDetails',
    component: () => import(/* webpackChunkName: "goodsDetails" */ '../views/user/goodsDetails.vue'),
    meta: {
      title: '详情'
    }
  },
  {
    path: '/turntable',
    name: 'turntable',
    component: () => import(/* webpackChunkName: "turntable" */ '../views/turntable/turntable.vue'),
    meta: {
      title: '大转盘'
    }
  },
  {
    path: '/myPrize',
    name: 'myPrize',
    component: () => import(/* webpackChunkName: "myPrize" */'../views/turntable/myPrize.vue'),
    meta: {
      title: '我的奖品'
    }
  },
  {
    path: '/cashOut',
    name: 'cashOut',
    component: () => import(/* webpackChunkName: "cashOut" */'../views/user/cashOut.vue'),
    meta: {
      title: '提现'
    }
  },
  {
    path: '/cashOutList',
    name: 'cashOutList',
    component: () => import(/* webpackChunkName: "cashOutList" */'../views/user/cashOutList.vue'),
    meta: {
      title: '提现'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
