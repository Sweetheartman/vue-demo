import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '患者信息平台', icon: 'dashboard' }
    }]
  },
  {
    path: '/system',
    component: Layout,
    name: 'system', // 该页面的名字
    redirect: 'noRedirect',
    meta: { title: '系统信息', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'gender',
        name: 'gender',
        component: () => import('@/views/gender/index'),
        meta: { title: '性别编码信息', icon: 'form' }
      },
      {
        path: 'organization',
        name: 'organization',
        component: () => import('@/views/organization/index'),
        meta: { title: '机构编码信息', icon: 'form' }
      },
      {
        path: 'identity',
        name: 'identity',
        component: () => import('@/views/identity/index'),
        meta: { title: '证件编码信息', icon: 'form' }
      }
    ]
  },
  {
    path: '/patient', // 浏览器输入的路由
    component: Layout, // 引入布局组件
    redirect: 'noRedirect', // 面包屑点击之后重定向跳转的路由
    name: 'patient', // 该页面的名字
    meta: { title: '患者信息', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'patientindex',
        component: () => import('@/views/patient/index'),
        meta: { title: '患者信息', icon: 'form' }
      },
      {
        path: 'add', // 通过路由url值,并且前面不能加'/'
        component: () => import('@/views/patient/add'),
        name: 'addpatient' // 通过路由名字
      },
      {
        path: 'update',
        component: () => import('@/views/patient/update'),
        name: 'updatepatient'
      }
    ]
  },

  {
    path: '/gender',
    component: Layout,
    redirect: 'noRedirect', // 重定向地址，在面包屑中点击会重定向去的地址
    hidden: true, // 不在侧边栏线上
    alwaysShow: true, // 一直显示根路由
    children: [
      {
        path: 'add', // 通过路由url值,并且前面不能加'/'
        component: () => import('@/views/gender/add'),
        name: 'addgender' // 通过路由名字
      },
      {
        path: 'update',
        component: () => import('@/views/gender/update'),
        name: 'updategender'
      }
    ]
  },

  {
    path: '/organization',
    component: Layout,
    redirect: 'noRedirect', // 重定向地址，在面包屑中点击会重定向去的地址
    hidden: true, // 不在侧边栏线上
    alwaysShow: true, // 一直显示根路由
    children: [
      {
        path: 'add', // 通过路由url值,并且前面不能加'/'
        component: () => import('@/views/organization/add'),
        name: 'addorgnazition' // 通过路由名字
      },
      {
        path: 'update',
        component: () => import('@/views/organization/update'),
        name: 'updateorgnazition'
      }
    ]
  },

  {
    path: '/identity',
    component: Layout,
    redirect: 'noRedirect', // 重定向地址，在面包屑中点击会重定向去的地址
    hidden: true, // 不在侧边栏线上
    alwaysShow: true, // 一直显示根路由
    children: [
      {
        path: 'add', // 通过路由url值,并且前面不能加'/'
        component: () => import('@/views/identity/add'),
        name: 'addidentity' // 通过路由名字
      },
      {
        path: 'update',
        component: () => import('@/views/identity/update'),
        name: 'updateidentity'
      }
    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '表单', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: '外链', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
