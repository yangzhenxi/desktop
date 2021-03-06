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
        meta: { title: '云桌面管理', keepAlive: true, icon: icon.CloudDesktop, permission: ['desktop'] },
        children: [
          {
            path: '/CloudDesktop/userManagement',
            name: 'userManagement',
            component: () => import('@/views/CloudDesktop/userManagement'),
            meta: { title: '用户管理', keepAlive: true, icon: icon.userManagement, permission: ['CloudDesktop'] }
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
            redirect: '/CloudDesktop/DesktopManagem/Allmodules',
            hideChildrenInMenu: true,
            meta: { title: '桌面模版管理', keepAlive: true, icon: icon.DesktopManagem, permission: ['template'] },
            children: [
                {
                    path: '/CloudDesktop/DesktopManagem/Allmodules',
                    name: 'Allmodules',
                    component: () => import('@/views/CloudDesktop/DesktopManagem/Tab_modules/Allmodules'),
                    meta: { title: '全部模版', keepAlive: true, icon: icon.DesktopManagem, permission: ['template'], hiddenHeaderContent: true }

                },
                {
                    path: '/CloudDesktop/DesktopManagem/:id/singlemodules',
                    name: 'singlemodules',
                    component: () => import('@/views/CloudDesktop/DesktopManagem/Tab_modules/singlemodules'),
                    meta: { title: '单个模版', keepAlive: true, icon: icon.DesktopManagem, permission: ['template'], hiddenHeaderContent: true }

                }
            ]
          },
          {
            path: '/CloudDesktop/cloudDesktopmanage',
            name: 'cloudDesktopmanage',
            component: () => import('@/views/CloudDesktop/cloudDesktopmanage'),
            meta: { title: '云桌面管理', keepAlive: true, icon: icon.cloudDesktopmanage, permission: ['cloudDesktopmanage'] }
          }
        ]
      },

      // 云桌面架构
      {
        path: '/Cloud/server',
        name: '用户',
        component: RouteView,
        meta: { title: '云桌面基础架构', keepAlive: true, icon: icon.cloud, permission: ['framwork'] },
        children: [
            {
              path: '/Cloud/server',
              name: 'server',
              component: () => import('@/views/Cloud/server'),
              meta: { title: '虚拟机管理', keepAlive: true, icon: icon.server, permission: ['machine'] }
            },
            {
              path: '/Cloud/operating',
              name: 'operating',
              component: () => import('@/views/Cloud/network'),
              meta: { title: '操作系统管理', keepAlive: true, icon: icon.network, permission: ['operating'] }
            },
            {
              path: '/Cloud/config',
              name: 'config',
              component: () => import('@/views/Cloud/operating'),
              meta: { title: '配置管理', keepAlive: true, icon: icon.operating, permission: ['config'] }
            },
            {
              path: '/Cloud/network',
              name: 'network',
              component: () => import('@/views/Cloud/config'),
              meta: { title: '网络管理', keepAlive: true, icon: icon.config, permission: ['network'] }
            }
          ]
      },
      // 系统
      {
        path: '/system/role',
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
