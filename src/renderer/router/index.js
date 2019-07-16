import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'player',
      component: require('@/views/player').default   // 测试用，暂时将默认url链接到播放器详情页
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
