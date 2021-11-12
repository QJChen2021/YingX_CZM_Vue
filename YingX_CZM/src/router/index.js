import Vue from 'vue'
import Router from 'vue-router'
import indexs from '../views/indexs'
import login from "../views/login";
import zy from "../views/zy";
import List from "../views/user/List";
import lb from "../views/category/lb";
import video from "../views/video/video";
import UserEcharts from "../views/user/UserEcharts";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/indexs',
      name: 'indexs',
      component: indexs,
      children:
          [
            {
              path: 'zy',
              name: 'zy',
              component: zy
            },
            {
              path: 'list',
              name: 'list',
              component:List
            },
            {
              path: 'lb',
              name: 'lb',
              component: lb
            },
            {
              path: 'video',
              name: 'video',
              component: video
            },
            {
              path: 'UserEcharts',
              name: 'UserEcharts',
              component: UserEcharts
            },
          ]
    },

    {
      path: '*',
      component: ()=>import('../views/404')
    }
  ]
})
