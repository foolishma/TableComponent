import Error403 from '@/views/403.vue'
import Error404 from '@/views/404.vue'
import Components from '@/views/components/index.vue'
import ModalDoc from '@/views/components/modal.vue'
import TableDoc from '@/views/components/table.vue'
import UploadDoc from '@/views/components/upload.vue'
import Home from '@/views/home/index.vue'
import MenuList from '@/views/menuList/index.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // 静态路由 - 首页（默认展示）
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      icon: 'HomeFilled',
      showInMenu: true,
      order: 1
    }
  },
  {
    path: '/menu-list',
    name: 'MenuList',
    component: MenuList,
    meta: {
      title: '表格组件',
      icon: 'Menu',
      showInMenu: true,
      order: 5
    }
  },
  {
    path: '/components',
    name: 'Components',
    component: Components,
    meta: {
      title: '组件文档',
      icon: 'Document',
      showInMenu: true,
      order: 2
    }
  },
  {
    path: '/components/modal',
    name: 'ModalDoc',
    component: ModalDoc,
    meta: {
      title: '$modal 提示组件',
      showInMenu: false
    }
  },
  {
    path: '/components/table',
    name: 'TableDoc',
    component: TableDoc,
    meta: {
      title: 'Table 表格组件',
      showInMenu: false
    }
  },
  {
    path: '/components/upload',
    name: 'UploadDoc',
    component: UploadDoc,
    meta: {
      title: 'Upload 上传组件',
      showInMenu: false
    }
  },
  // 静态路由 - 错误页面（不在菜单中显示）
  {
    path: '/403',
    name: 'Error403',
    component: Error403,
    meta: {
      title: '403',
      showInMenu: false
    }
  },
  {
    path: '/404',
    name: 'Error404',
    component: Error404,
    meta: {
      title: '404',
      showInMenu: false
    }
  },
  // 404 兜底路由（必须放在最后）
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - 表格组件系统`
  }
  next()
})

export default router
