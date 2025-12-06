import { Box, Document, Grid, HomeFilled, Menu as MenuIcon } from '@element-plus/icons-vue'

/**
 * 菜单配置
 * 支持图标、标题、路由路径等配置
 */
export const menuConfig = [
  {
    index: '/home',
    icon: HomeFilled,
    title: '首页'
  },
  {
    index: '/table',
    icon: Grid,
    title: '表格'
  },
  {
    index: '/form',
    icon: Document,
    title: '表单'
  },
  {
    index: '/components',
    icon: Box,
    title: '组件'
  },
  {
    index: '/menu-list',
    icon: MenuIcon,
    title: '菜单列表'
  }
]
