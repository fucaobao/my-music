import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

import Recommend from 'components/recommend/recommend'
import Disc from 'components/disc/disc'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'
import Rank from 'components/rank/rank'
import TopList from 'components/top-list/top-list'
import Search from 'components/search/search'

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
      component: Rank,
      children : [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children : [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    }
  ]
})
