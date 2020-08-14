// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard',
    children: [
      // system
      {
        path: '/system',
        name: 'system',
        redirect: '/system/organization',
        component: RouteView,
        meta: { title: '系统', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] }
      }
    //   // system
    //   {
    //     path: '/framework',
    //     name: 'Framework',
    //     redirect: '/framework/server',
    //     component: RouteView,
    //     meta: { title: '云基础架构', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
    //     children: [
    //       {
    //         path: '/framework/server',
    //         name: 'Server',
    //         component: () => import('@/views/framework/server'),
    //         meta: { title: '服务器管理', keepAlive: false, permission: ['dashboard'] }
    //       },
    //       {
    //         path: '/framework/network',
    //         name: 'Network',
    //         component: () => import('@/views/framework/network'),
    //         meta: { title: '网络管理', keepAlive: true, permission: ['dashboard'] }
    //       }
    //     ]
    //   }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  }
]
