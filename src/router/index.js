import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes';
import store from '@/store/index';
import * as types from '@/store/types';
import { getToken } from '@/utils/auth';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// 用于路由跳转
const history = window.sessionStorage;
history.clear()
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);



router.beforeEach(async (to, from, next) => {
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit({
        type: types.UPDATE_DIRECTION,
        payload: { direction: 'forward' }
      })
    } else {
      store.commit({
        type: types.UPDATE_DIRECTION,
        payload: { direction: 'reverse' }
      })
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit({
      type: types.UPDATE_DIRECTION,
      payload: { direction: 'forward' }
    })
  }

  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    } else {
      console.log(getToken())
      if (getToken()) {
        try {
          await store.dispatch('getUser')
          next();
        } catch (e) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        };
      } else {
        next({
        path: '/login',
        query: { redirect: to.fullPath }
        })
      }

    }
  } else {
    next();
  }


})


export default router;