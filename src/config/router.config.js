// eslint-disable-next-line
import {
  UserLayout,
  BasicLayout,
  RouteView,
  BlankLayout,
  PageView
} from '@/layouts'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/CfMointor/showSummary',
    children: [
      // simulation application
      {
        path: '/simApplication',
        name: 'simApplication',
        component: RouteView,
        meta: {
          title: 'IaaS监控管理',
          keepAlive: true,
          icon: 'table',
          permission: ['dashboard']
        },
        children: [
          {
            path: '/CfMointor/showSummary',
            name: 'ShowSummary',
            component: () => import('@/views/ShowSummary/ShowSummary'),
            meta: {
              title: '总体概览',
              keepAlive: true,
              permission: ['dashboard']
            }
          },
          {
            path: '/CfMointor/CFCluster',
            name: 'CFCluster',
            component: () => import('@/views/CFCluster/CFCluster'),
            meta: {
              title: 'CF集群管理',
              keepAlive: true,
              permission: ['dashboard']
            }
          },
          {
            path: '/CfMointor/instance',
            name: 'Instance',
            component: () => import('@/views/Instance/Instance'),
            meta: {
              title: '虚拟机管理',
              keepAlive: true,
              permission: ['dashboard']
            }
          },
          {
            path: '/Images',
            name: 'Images',
            component: () => import('@/views/DataTemplate/DataTemplate'),
            meta: {
              title: '镜像',
              keepAlive: true,
              permission: ['dashboard']
            }
          }
        ]
      },
      {
        path: '/CFDeploy',
        name: 'CFDeploy',
        component: RouteView,
        meta: {
          title: 'CF可视化部署',
          keepAlive: true,
          icon: 'api',
          permission: ['dashboard']
        },
        children: [
          {
            path: '/CFDeploy/createTemplate',
            name: 'create',
            component: () => import('@/views/CFDeploy/Create/CreateCFTemplate'),
            meta: {
              title: '创建CF配置',
              keepAlive: true,
              permission: ['dashboard']
            }
          },
          {
            path: '/CFDeploy/deployCF',
            name: 'deploy',
            component: () => import('@/views/CFDeploy/Deploy/CFDeploy'),
            meta: {
              title: 'CF部署',
              keepAlive: true,
              permission: ['dashboard']
            }
          }
        ]
      },
      {
        path: '/UserManage',
        name: 'UserManage',
        hidden: true,
        component: () => import('@/views/UserManage/UserManage'),
        meta: {
          title: '用户管理',
          keepAlive: true,
          icon: 'file',
          permission: ['dashboard']
        }
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
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
