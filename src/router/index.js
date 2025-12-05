import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Table from '@/views/Table.vue'
import Form from '@/views/Form.vue'
import Components from '@/views/Components.vue'
import MenuList from '@/views/MenuList.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/table',
    name: 'Table',
    component: Table,
    meta: {
      title: '表格'
    }
  },
  {
    path: '/form',
    name: 'Form',
    component: Form,
    meta: {
      title: '表单'
    }
  },
  {
    path: '/components',
    name: 'Components',
    component: Components,
    meta: {
      title: '组件'
    }
  },
  {
    path: '/menu-list',
    name: 'MenuList',
    component: MenuList,
    meta: {
      title: '菜单列表'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - Vue 3.5 Demo`
  }
  next()
})

export default router
