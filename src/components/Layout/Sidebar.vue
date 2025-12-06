<template>
  <el-aside :width="asideWidth" class="layout-aside" :class="{ 'is-collapse': isCollapse }">
    <el-menu
      :default-active="activeMenu"
      class="layout-menu"
      :collapse="isCollapse"
      :collapse-transition="true"
      router
      @select="handleMenuSelect"
    >
      <!-- 递归渲染菜单项，支持多级目录 -->
      <template v-for="menuItem in menuRoutes" :key="menuItem.path">
        <!-- 有子菜单的情况 -->
        <el-sub-menu
          v-if="menuItem.children && menuItem.children.length > 0"
          :index="menuItem.path"
        >
          <template #title>
            <el-icon v-if="menuItem.icon">
              <component :is="menuItem.icon" />
            </el-icon>
            <span>{{ menuItem.meta.title }}</span>
          </template>
          <!-- 递归渲染子菜单 -->
          <el-menu-item
            v-for="child in menuItem.children"
            :key="child.path"
            :index="getFullPath(menuItem.path, child.path)"
          >
            <el-icon v-if="child.icon">
              <component :is="child.icon" />
            </el-icon>
            <template #title>
              <span>{{ child.meta.title }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
        <!-- 没有子菜单的情况 -->
        <el-menu-item v-else :index="menuItem.path">
          <el-icon v-if="menuItem.icon">
            <component :is="menuItem.icon" />
          </el-icon>
          <template #title>
            <span>{{ menuItem.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script setup>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 使用 defineModel 实现双向绑定
const isCollapse = defineModel('isCollapse', {
  type: Boolean,
  default: false
})

// 定义 emits
const emit = defineEmits(['menu-select'])

const route = useRoute()
const router = useRouter()

// 默认侧边栏宽度
const asideWidthExpand = 200
const asideWidthCollapse = 64

// 计算侧边栏宽度
const asideWidth = computed(() => {
  return isCollapse.value ? `${asideWidthCollapse}px` : `${asideWidthExpand}px`
})

// 当前激活的菜单
const activeMenu = ref(route.path)

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath
  }
)

// 获取图标组件
const getIcon = (iconName) => {
  return ElementPlusIconsVue[iconName] || null
}

// 从路由表中获取菜单路由
const menuRoutes = computed(() => {
  const routes = router.getRoutes()
  const menuItems = []

  // 过滤出需要在菜单中显示的路由
  routes.forEach((routeItem) => {
    // 跳过重定向路由和错误页面
    if (
      routeItem.redirect ||
      !routeItem.meta ||
      routeItem.meta.showInMenu === false ||
      routeItem.path === '/' ||
      routeItem.path.includes('/:')
    ) {
      return
    }

    // 只处理顶级路由（有 order 属性的）或者父路由
    if (routeItem.meta.showInMenu && routeItem.meta.order) {
      const menuItem = {
        path: routeItem.path,
        meta: routeItem.meta,
        icon: routeItem.meta.icon ? getIcon(routeItem.meta.icon) : null,
        children: []
      }

      // 查找子路由
      if (routeItem.children && routeItem.children.length > 0) {
        routeItem.children.forEach((child) => {
          if (child.meta && child.meta.showInMenu) {
            menuItem.children.push({
              path: child.path,
              meta: child.meta,
              icon: child.meta.icon ? getIcon(child.meta.icon) : null
            })
          }
        })
      }

      menuItems.push(menuItem)
    }
  })

  // 按 order 排序
  return menuItems.sort((a, b) => (a.meta.order || 999) - (b.meta.order || 999))
})

// 获取完整路径（用于子菜单）
const getFullPath = (parentPath, childPath) => {
  // 如果子路径是绝对路径，直接返回
  if (childPath.startsWith('/')) {
    return childPath
  }
  // 否则拼接父路径
  return `${parentPath}/${childPath}`
}

// 菜单选择处理
const handleMenuSelect = (index) => {
  activeMenu.value = index
  emit('menu-select', index)
}
</script>

<style scoped>
.layout-aside {
  background: #fff;
  box-shadow: 2px 0 8px rgba(0, 21, 41, 0.08);
  transition: width 0.3s;
  overflow: hidden;
}

.layout-menu {
  height: 100%;
  border-right: none;
  transition: width 0.3s;
  overflow-x: hidden;
}

/* Element Plus 菜单样式覆盖 */
:deep(.el-menu-item) {
  height: 56px;
  line-height: 56px;
}

:deep(.el-menu-item.is-active) {
  background-color: #e6f7ff;
  color: #409eff;
}

:deep(.el-menu-item.is-active::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: #409eff;
}

:deep(.el-menu-item:hover) {
  background-color: #f5f5f5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .layout-aside {
    position: fixed;
    left: 0;
    top: 60px;
    height: calc(100vh - 60px);
    z-index: 999;
    transform: translateX(0);
    transition: transform 0.3s;
  }

  .layout-aside.is-collapse {
    transform: translateX(-100%);
  }
}
</style>
