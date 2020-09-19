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
        meta: { title: '仪表盘', keepAlive: true, icon: icon.bxAnaalyse, permission: ['dashboard'] }
      },

      // CloudDesktop
      {
        path: '/CloudDesktop/userManagement',
        name: 'CloudDesktop',
        component: RouteView,
        meta: { title: '云桌面', keepAlive: true, icon: icon.CloudDesktop, permission: ['dashboard'] },
        children: [
          {
            path: '/CloudDesktop/userManagement',
            name: 'userManagement',
            component: () => import('@/views/CloudDesktop/userManagement'),
            meta: { title: '用户管理', keepAlive: true, icon: icon.userManagement, permission: ['dashboard'] }
          },
          {
            path: '/CloudDesktop/usergroup',
            name: 'usergroup',
            component: () => import('@/views/CloudDesktop/usergroup'),
            meta: { title: '用户组管理', keepAlive: true, icon: icon.terminalmanage, permission: ['dashboard'] }
          },
          {
            path: '/CloudDesktop/DesktopManagem',
            name: 'DesktopManagem',
            component: () => import('@/views/CloudDesktop/DesktopManagem'),
            redirect: '/CloudDesktop/DesktopManagem/Allmodules',
            hideChildrenInMenu: true,
            meta: { title: '桌面模版管理', keepAlive: true, icon: icon.DesktopManagem, permission: ['dashboard'] },
            children: [
                {
                    path: '/CloudDesktop/DesktopManagem/Allmodules',
                    name: 'Allmodules',
                    component: () => import('@/views/CloudDesktop/DesktopManagem/Tab_modules/Allmodules'),
                    meta: { title: '全部模版', keepAlive: true, icon: icon.DesktopManagem, permission: ['dashboard'], hiddenHeaderContent: true }

                },
                {
                    path: '/CloudDesktop/DesktopManagem/:id/singlemodules',
                    name: 'singlemodules',
                    component: () => import('@/views/CloudDesktop/DesktopManagem/Tab_modules/singlemodules'),
                    meta: { title: '单个模版', keepAlive: true, icon: icon.DesktopManagem, permission: ['dashboard'], hiddenHeaderContent: true }

                }
            ]
          },
          {
            path: '/CloudDesktop/cloudDesktopmanage',
            name: 'cloudDesktopmanage',
            component: () => import('@/views/CloudDesktop/cloudDesktopmanage'),
            meta: { title: '云桌面管理', keepAlive: true, icon: icon.cloudDesktopmanage, permission: ['dashboard'] }
          },
          {
            path: '/CloudDesktop/terminalmanage',
            name: 'terminalmanage',
            component: () => import('@/views/CloudDesktop/terminalmanage'),
            meta: { title: '终端管理', keepAlive: true, icon: icon.terminalmanage, permission: ['dashboard'] }
          },
          {
            path: '/CloudDesktop/Desktopuse',
            name: 'Desktopuse',
            component: () => import('@/views/CloudDesktop/Desktopuse'),
            meta: { title: '桌面使用情况', keepAlive: true, icon: icon.Desktopuse, permission: ['dashboard'] }
          }
        ]
      },

      // 云桌面架构
      {
        path: '/Cloud/server',
        name: '用户',
        component: RouteView,
        meta: { title: '云桌面架构', keepAlive: true, icon: icon.cloud, permission: ['dashboard'] },
        children: [
            {
              path: '/Cloud/server',
              name: 'server',
              component: () => import('@/views/Cloud/server'),
              meta: { title: '服务器管理', keepAlive: true, icon: icon.server, permission: ['dashboard'] }
            },
            {
              path: '/Cloud/operating',
              name: 'operating',
              component: () => import('@/views/Cloud/network'),
              meta: { title: '操作系统管理', keepAlive: true, icon: icon.network, permission: ['dashboard'] }
            },
            {
              path: '/Cloud/config',
              name: 'config',
              component: () => import('@/views/Cloud/operating'),
              meta: { title: '配置管理', keepAlive: true, icon: icon.operating, permission: ['dashboard'] }
            },
            {
              path: '/Cloud/network',
              name: 'network',
              component: () => import('@/views/Cloud/config'),
              meta: { title: '网络管理', keepAlive: true, icon: icon.config, permission: ['dashboard'] }
            }
          ]
      },
      // 系统
      {
        path: '/system/organization',
        name: 'system',
        component: RouteView,
        meta: { title: '系统', keepAlive: true, icon: icon.system, permission: ['dashboard'] },
        children: [
          {
            path: '/system/organization',
            name: 'organization',
            component: () => import('@/views/system/organization'),
            meta: { title: '组织管理', keepAlive: true, icon: icon.organization, permission: ['dashboard'] }
          },
          {
            path: '/system/role',
            name: 'role',
            component: () => import('@/views/system/role'),
            meta: { title: '角色管理', keepAlive: true, icon: icon.role, permission: ['dashboard'] }
          },
          {
            path: '/system/user',
            name: 'user',
            component: () => import('@/views/system/user'),
            meta: { title: '用户管理', keepAlive: true, icon: icon.user, permission: ['dashboard'] }
          },
          {
            path: '/system/SystemSet',
            name: 'SystemSet',
            component: () => import('@/views/system/SystemSet'),
            meta: { title: '系统设置', keepAlive: true, icon: icon.SystemSet, permission: ['dashboard'] }
          },
          {
            path: '/system/Log',
            name: 'Log',
            component: () => import('@/views/system/Log'),
            meta: { title: '日志管理', keepAlive: true, icon: icon.Log, permission: ['dashboard'] }
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
