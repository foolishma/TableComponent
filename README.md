# TableComponent

一个基于 Vue 3.5 + Vite + Element Plus 的高度可配置表格组件库，支持动态筛选、多级表头、行选择、自定义操作等功能。

## ✨ 特性

- 🚀 **配置驱动** - 通过 JavaScript 配置文件动态渲染表格，无需编写模板代码
- 📱 **响应式布局** - 筛选条件自适应不同屏幕尺寸，支持展开/收起
- 🎯 **功能丰富** - 支持多级表头、行选择（单选/多选）、自定义按钮、分页等
- 🎨 **样式统一** - 基于 Element Plus 和 Tailwind CSS，UI 美观统一
- 🔧 **易于扩展** - 支持插槽自定义、函数映射、字典配置等
- 📦 **开箱即用** - 完整的项目模板，包含路由、代码规范、开发工具等

## 🛠 技术栈

- **Vue 3.5** - 渐进式 JavaScript 框架，使用 Composition API
- **Vite 5** - 下一代前端构建工具，极速开发体验
- **Element Plus 2.8** - 基于 Vue 3 的企业级 UI 组件库
- **Tailwind CSS 3.4** - 实用优先的 CSS 框架
- **Vue Router 4** - Vue.js 官方路由管理器
- **ESLint + Prettier** - 代码规范和格式化工具

## 📦 安装

```bash
# 克隆项目
git clone https://github.com/foolishma/TableComponent.git

# 进入项目目录
cd TableComponent

# 安装依赖
npm install
# 或
pnpm install
```

## 🚀 快速开始

### 开发模式

```bash
npm run dev
```

开发服务器将在 `http://localhost:3000` 启动，并自动打开浏览器。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
table-com/
├── src/
│   ├── components/          # 组件目录
│   │   └── Table.vue        # 核心表格组件
│   ├── config/              # 配置文件目录
│   │   └── table-configs/   # 表格配置文件
│   │       └── menu-list.js # 菜单列表配置示例
│   ├── hooks/               # 组合式函数
│   │   └── useTableConfig.js # 表格配置解析 Hook
│   ├── views/               # 页面组件
│   │   ├── Home.vue         # 首页
│   │   ├── MenuList.vue     # 菜单列表（Table 组件使用示例）
│   │   ├── Table.vue        # 表格演示页
│   │   ├── Form.vue         # 表单演示页
│   │   └── Components.vue   # 组件演示页
│   ├── router/              # 路由配置
│   │   └── index.js
│   ├── App.vue              # 根组件
│   ├── main.js              # 入口文件
│   └── style.css            # 全局样式
├── docs/                    # 文档目录
│   ├── Table组件需求文档.md  # 详细需求文档
│   ├── Table组件快速参考.md  # 快速参考指南
│   └── table-config-template.js # 配置模板
├── .vscode/                 # VS Code 配置
│   └── settings.json        # 编辑器设置（自动修复 ESLint）
├── .eslintrc.cjs            # ESLint 配置
├── .prettierrc.cjs          # Prettier 配置
├── .editorconfig            # 编辑器配置
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # Tailwind 配置
└── package.json             # 项目配置
```

## 🎯 Table 组件使用

### 基本用法

```vue
<template>
  <TableComponent
    :config="tableConfig"
    :data="tableData"
    :loading="loading"
    :function-map="functionMap"
    :pagination="pagination"
    @query="handleQuery"
    @reset="handleReset"
    @page-change="handlePageChange"
    @size-change="handleSizeChange"
    @selection-change="handleSelectionChange"
  />
</template>

<script setup>
import { ref, reactive } from 'vue'
import TableComponent from '@/components/Table.vue'
import menuConfig from '@/config/table-configs/menu-list.js'

const loading = ref(false)
const tableData = ref([])
const tableConfig = ref(menuConfig)

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageSizes: [10, 20, 50, 100]
})

// 函数映射对象
const functionMap = {
  handleAdd: () => {
    console.log('新增')
  },
  handleEdit: (row) => {
    console.log('编辑', row)
  },
  handleDelete: (row) => {
    console.log('删除', row)
  }
}

// 查询
const handleQuery = (params) => {
  console.log('查询参数', params)
  // 执行查询逻辑
}

// 重置
const handleReset = () => {
  // 重置查询条件
}
</script>
```

### 配置文件示例

创建配置文件 `src/config/table-configs/your-table.js`：

```javascript
export default {
  // 查询条件配置
  queryConditions: [
    {
      prop: 'name',
      label: '名称',
      placeholder: '请输入名称',
      type: 'input',
      labelWidth: 60,
      labelSuffix: ':'
    },
    {
      prop: 'status',
      label: '状态',
      type: 'select',
      options: [
        { label: '启用', value: '1' },
        { label: '禁用', value: '0' }
      ]
    },
    {
      prop: 'createTime',
      label: '创建时间',
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期'
    }
  ],

  // 表格列配置
  columns: [
    {
      prop: 'id',
      label: 'ID',
      width: 80,
      fixed: 'left'
    },
    {
      prop: 'name',
      label: '名称',
      minWidth: 150,
      showOverflowTooltip: true
    },
    {
      label: '状态信息',
      children: [
        {
          prop: 'status',
          label: '状态',
          width: 100
        },
        {
          prop: 'sort',
          label: '排序',
          width: 100
        }
      ]
    },
    {
      prop: 'actions',
      label: '操作',
      type: 'action',
      fixed: 'right',
      width: 200,
      buttons: [
        {
          label: '编辑',
          type: 'primary',
          id: 'edit',
          funcName: 'handleEdit',
          icon: 'Edit'
        },
        {
          label: '删除',
          type: 'danger',
          id: 'delete',
          funcName: 'handleDelete',
          icon: 'Delete'
        }
      ]
    }
  ],

  // 表格配置
  tableConfig: {
    stripe: true,
    border: true,
    autoHeight: true, // 是否自适应高度
    selection: {
      enabled: true,
      type: 'multiple', // 'single' | 'multiple'
      rowClickSelect: true
    },
    topButtons: [
      {
        label: '新增',
        type: 'primary',
        id: 'add',
        funcName: 'handleAdd',
        icon: 'Plus'
      }
    ]
  }
}
```

## 📚 核心功能

### 1. 筛选条件

- **支持类型**：输入框、数字输入、下拉框、日期选择器、日期范围、自定义插槽
- **响应式布局**：自动适配不同屏幕尺寸（xs/sm/md/lg/xl）
- **展开/收起**：超过 6 个条件时自动显示展开/收起按钮
- **动态配置**：支持自定义 label 宽度、后缀、占位符等

### 2. 表格功能

- **多级表头**：支持无限级表头嵌套
- **行选择**：支持单选和多选模式
- **固定列**：支持左右固定列
- **排序**：支持列排序
- **格式化**：支持自定义格式化函数
- **插槽**：支持自定义列内容插槽

### 3. 操作按钮

- **顶部按钮**：表格顶部操作按钮
- **行内按钮**：每行的操作按钮
- **更多按钮**：超过 3 个按钮时自动折叠
- **函数映射**：通过 `functionMap` 映射执行函数
- **动态显示**：支持根据行数据动态显示/隐藏按钮

### 4. 分页

- **完整分页**：支持页码、每页条数、总数等
- **自定义布局**：可配置分页器布局
- **事件监听**：支持页码和每页条数变化事件

### 5. 高度自适应

- **autoHeight: true**：表格高度按内容展开，最高占满剩余空间，超出则滚动
- **autoHeight: false**：表格占满屏幕高度剩余空间

## 🛠 开发工具

### 代码规范

项目集成了 ESLint 和 Prettier，确保代码风格统一。

```bash
# 检查并修复 ESLint 错误
npm run lint

# 格式化代码
npm run format
```

### VS Code/Cursor 配置

项目已配置 `.vscode/settings.json`，支持：

- ✅ **保存时自动格式化代码** - 使用 Prettier 自动格式化
- ✅ **保存时自动修复 ESLint 错误** - 自动修复可修复的问题
- ✅ **统一代码风格** - 2 空格缩进、单引号、无分号等
- ✅ **支持多种文件类型** - `.js`, `.vue`, `.json`, `.css`, `.scss`, `.html`, `.md` 等

**需要安装的扩展**：

- **Prettier - Code formatter** (`esbenp.prettier-vscode`) - 代码格式化工具
- **ESLint** (`dbaeumer.vscode-eslint`) - JavaScript/TypeScript 代码检查
- **Volar** (`vue.volar`) - Vue 3 官方语言支持（必需）

**扩展安装方式**：

1. 打开 VS Code/Cursor
2. 按 `Ctrl+Shift+P` 打开命令面板
3. 输入 `Extensions: Show Recommended Extensions`
4. 点击安装推荐的扩展

或者打开扩展面板 (`Ctrl+Shift+X`)，搜索扩展名称并安装。

**使用说明**：

- 编辑代码后，直接保存文件 (`Ctrl+S`) 即可自动格式化和修复
- 手动格式化：`Shift+Alt+F` (Windows/Linux) 或 `Shift+Option+F` (Mac)
- 详细配置说明请查看：[编辑器配置说明](./docs/编辑器配置说明.md)

## 📖 文档

- [Table 组件需求文档](./docs/Table组件需求文档.md) - 详细的功能需求和 API 文档
- [Table 组件快速参考](./docs/Table组件快速参考.md) - 快速上手指南
- [配置模板](./docs/table-config-template.js) - 配置文件模板和注释

## 🎨 开发规范

- ✅ 使用 Vue 3.5 Composition API
- ✅ 使用 `<script setup>` 语法糖
- ✅ 遵循 ESLint 和 Prettier 规范
- ✅ 使用 Tailwind CSS 进行样式开发
- ✅ 组件命名使用 PascalCase
- ✅ 文件命名使用 kebab-case

## 📝 脚本命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 检查并修复 ESLint 错误
npm run lint

# 格式化代码
npm run format
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT

## 🔗 相关链接

- [Vue 3 文档](https://cn.vuejs.org/)
- [Vite 文档](https://cn.vitejs.dev/)
- [Element Plus 文档](https://element-plus.org/zh-CN/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

---

**Star ⭐ 这个项目，如果它对你有所帮助！**
