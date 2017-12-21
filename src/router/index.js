import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Disc from 'components/disc/disc'

Vue.use(Router)

export default new Router({
  mode: 'hash',//hash(默认值，浏览器环境),history,abstract(Node.js 环境)
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children : [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children : [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
