// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import * as icon from '@/core/icons'
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard'),
        meta: { title: '首页', keepAlive: true, icon: icon.bxAnaalyse, permission: ['dashboard'] }
      },

      // CloudDesktop
      {
        path: '/CloudDesktop/userManagement',
        name: 'CloudDesktop',
        component: RouteView,
        meta: { title: '云桌面', keepAlive: true, icon: icon.CloudDesktop, permission: ['desktop'] },
        children: [
          {
            path: '/CloudDesktop/userManagement',
            name: 'userManagement',
            component: () => import('@/views/CloudDesktop/userManagement'),
            meta: { title: '用户管理', keepAlive: true, icon: icon.userManagement, permission: ['userManagement'] }
          },
          {
            path: '/CloudDesktop/usergroup',
            name: 'usergroup',
            component: () => import('@/views/CloudDesktop/usergroup'),
            meta: { title: '用户组管理', keepAlive: true, icon: icon.terminalmanage, permission: ['usergroup'] }
          },
          {
            path: '/CloudDesktop/DesktopManagem',
            name: 'DesktopManagem',
            component: () => import('@/views/CloudDesktop/DesktopManagem'),
            // redirect: '/CloudDesktop/DesktopManagem/Allmodules',
            hideChildrenInMenu: true,
            meta: { title: '桌面模版管理', keepAlive: true, icon: icon.DesktopManagem, permission: ['DesktopManagem'] }
          },
          {
            path: '/CloudDesktop/cloudDesktopmanage',
            name: 'cloudDesktopmanage',
            component: () => import('@/views/CloudDesktop/cloudDesktopmanage'),
            meta: { title: '云桌面管理', keepAlive: true, icon: icon.cloudDesktopmanage, permission: ['cloudDesktopmanage'] }
          }
        ]
      },
   // 外部链接
   {
    path: 'https://www.baidu.com/',
    name: 'Monitor',
    meta: { title: 'menu.dashboard.monitor', target: '_blank' }
  },
      // 云桌面架构
      {
        path: 'https://192.168.2.221/',
        name: '云桌面架构',
        // meta: { title: '云桌面基础架构', icon: icon.cloud, target: '_blank', permission: ['framwork'] }
    meta: { title: 'menu.dashboard.monitor', target: '_blank' }

      },
      // 系统
      {
        path: '/system/organization',
        name: 'system',
        component: RouteView,
        meta: { title: '系统管理', keepAlive: true, icon: icon.system, permission: ['system'] },
        children: [
          {
            path: '/system/role',
            name: 'role',
            component: () => import('@/views/system/role'),
            meta: { title: '角色管理', keepAlive: true, icon: icon.role, permission: ['role'] }
          },
          {
            path: '/system/user',
            name: 'user',
            component: () => import('@/views/system/user'),
            meta: { title: '用户管理', keepAlive: true, icon: icon.user, permission: ['user'] }
          },
          {
            path: '/system/info',
            name: 'info',
            component: () => import('@/views/system/info'),
            meta: { title: '个人信息', keepAlive: false, icon: icon.user, permission: ['info'] },
            redirect: '/system/info/modules/base',
            hideChildrenInMenu: true,
            hidden: true,
            children: [
                {
                  path: '/system/info/modules/base',
                  name: 'BaseSettings',
                  component: () => import('@/views/system/info/modules/base'),
                  meta: { title: '基本设置', hidden: true, permission: [ 'system' ] }
                },
                {
                  path: '/system/info/modules/security',
                  name: 'SecuritySettings',
                  component: () => import('@/views/system/info/modules/Security'),
                  meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'system' ] }
                }
            ]
          },
          {
            path: '/system/Log',
            name: 'Log',
            component: () => import('@/views/system/Log'),
            meta: { title: '用户日志', keepAlive: true, icon: icon.Log, permission: ['Log'] }
          },
          {
            path: '/system/aboutus',
            name: 'aboutus',
            component: () => import('@/views/system/aboutus'),
            meta: { title: '关于我们', keepAlive: true, icon: icon.aboutus, permission: ['dashboard'] }
          },
          {
            path: '/system/task',
            name: 'task',
            component: () => import('@/views/system/task'),
            meta: { title: '任务管理', keepAlive: true, icon: icon.task, permission: ['dashboard'] }
          },
          {
            path: '/system/alarm',
            name: 'alarm',
            component: () => import('@/views/system/alarm'),
            meta: { title: '警报管理', keepAlive: true, icon: icon.alarm, permission: ['dashboard'] }
          },
          {
            path: '/system/Authorization',
            name: 'Authorization',
            component: () => import('@/views/system/Authorization'),
            meta: { title: '授权与服务', keepAlive: true, icon: icon.Authorization, permission: ['dashboard'] }
          }
        ]
      }
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
