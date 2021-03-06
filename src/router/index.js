import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import cart from '@/pages/cart/cart'
import my from '@/pages/My/my'
import goodDetail from '@/pages/detail/goodDetail'
import order from '@/pages/order'
import author from '@/pages/author'
import choose from '@/pages/choose'
import crack from '@/pages/crack'
import corder from '@/pages/corder'
import news from '@/pages/news/news'
import newsDetail from '@/pages/news/newsDetail'
import parts from '@/pages/parts'
import change from '@/pages/detail/Change'
import success from '../common/success'
import MyCollection from '@/pages/my/MyCollection'
import classify from "@/pages/classify/classify"
import OrderDetails from "@/pages/OrderDetails"
import pay from "@/pages/pay/pay"
import address from "@/pages/address/address"
import add_address from "@/pages/address/add_address"
import change_address from "@/pages/address/change_address"
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/Home', name: 'Home', component: Home,meta:{index:1} },
    { path: '/cart', name: 'cart', component: cart },
    { path: '/my', name: 'my', component: my },
    { 
      path: '/goodDetail', 
      name: 'goodDetail', 
      component: goodDetail,
      meta:{index:0}
    },
    { 
      path: '/order', 
      name: 'order', 
      component: order,
      children:[
       {
        path: '/order/OrderDetails', 
        name: '/order/OrderDetails', 
        component: OrderDetails,
       }
      ]
    },
    { path: '/author', name: 'author', component: author },
    { path: '/choose', name: 'choose', component: choose },
    {path:'/crack',name:'crack',component : crack},
    {path:'/corder',name:'corder',component:corder},
    { path: '/newsDetail', name: 'newsDetail', component: newsDetail },
    { path: '/news', name: 'news', component: news },
    { path: '/parts', name: 'parts', component: parts },
    { path: '/change', name: 'change', component: change },
    { path: '/success',name:'success',component:success},
    { path: '/MyCollection',name:'MyCollection',component:MyCollection},
    { path: '/classify',name:'classify',component:classify},
    { path: '/OrderDetails',name:'OrderDetails',component:OrderDetails},
    { 
      path: '/pay',
      name:'pay',
      component:pay
    },
    {
      path: '/address',
      name:'address',
      component:address
    },
    {
      path: '/add_address',
      name:'add_address',
      component:add_address
    },
    {
      path:'/change_address',
      name : '/change_address',
      component : change_address
    }
  ],
  //路由切换页面始终回到最顶部
  // scrollBehavior(to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
})
