# TableComponent

一个基于 Vue 3.5 + Vite + Element Plus 的企业级组件库系统，提供高度可配置的表格组件、上传组件等常用业务组件，支持国际化、主题切换、代码自动同步等功能。

## ✨ 核心特性

### 🎯 组件库

- 🚀 **TableComponent** - 高度可配置的表格组件，支持动态筛选、多级表头、行选择、自定义操作等
- 📤 **UploadComponent** - 灵活的上传组件，支持拖拽、列表、图片三种 UI 模式
- 🎨 **Layout** - 完整的布局系统，包含 Header、Sidebar、FloatMenu 等组件
- 💬 **$modal 插件** - 全局 Modal 提示组件，简化弹窗使用

### 🌍 系统功能

- 🌐 **国际化 (i18n)** - 支持中文简体、繁体、英文，可扩展更多语言
- 🎨 **主题切换** - 支持明暗主题切换，配置持久化
- 📦 **状态管理** - 基于 Pinia，支持状态持久化
- 🔄 **代码同步** - GitHub Actions 自动同步代码到多个子系统

### 🛠 开发体验

- ⚡ **Vite 5** - 极速开发体验，热更新
- 📝 **代码规范** - ESLint + Prettier，保存自动格式化
- 🎯 **TypeScript 友好** - 完整的类型提示支持
- 📚 **完整文档** - 详细的组件文档和使用示例

## 🛠 技术栈

### 核心框架

- **Vue 3.5** - 渐进式 JavaScript 框架，使用 Composition API
- **Vite 5** - 下一代前端构建工具，极速开发体验
- **Vue Router 4** - Vue.js 官方路由管理器

### UI 框架

- **Element Plus 2.8** - 基于 Vue 3 的企业级 UI 组件库
- **Tailwind CSS 3.4** - 实用优先的 CSS 框架
- **@element-plus/icons-vue** - Element Plus 图标库

### 状态管理

- **Pinia 3.0** - Vue 官方推荐的状态管理库
- **pinia-plugin-persistedstate** - Pinia 持久化插件

### 工具库

- **Vue I18n 11.2** - 国际化解决方案
- **Axios 1.13** - HTTP 客户端
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
# 或
yarn install
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

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

### 代码检查与格式化

```bash
# 检查并修复 ESLint 错误
npm run lint

# 格式化代码
npm run format
```

## 📁 项目结构

```
table-com/
├── .github/
│   └── workflows/              # GitHub Actions 工作流
│       ├── sync-to-subsystems.yml  # 代码同步工作流
│       └── README_SYNC.md      # 同步工作流说明文档
├── docs/                       # 文档目录
│   ├── Table组件需求文档.md
│   ├── Table组件快速参考.md
│   ├── useTableFunc使用示例.md
│   ├── $modal使用说明.md
│   ├── 编辑器配置说明.md
│   └── table-config-template.js
├── src/
│   ├── api/                    # API 接口
│   │   └── table.js
│   ├── components/            # 组件目录
│   │   ├── Layout/             # 布局组件
│   │   │   ├── Header.vue     # 顶部导航
│   │   │   ├── Sidebar.vue     # 侧边栏
│   │   │   ├── FloatMenu.vue   # 浮动菜单
│   │   │   └── index.vue       # 布局入口
│   │   ├── TableComponent/     # 表格组件
│   │   │   ├── components/    # 子组件
│   │   │   │   ├── TableFilter.vue      # 筛选组件
│   │   │   │   └── TableActionColumn.vue # 操作列组件
│   │   │   ├── hooks/         # 组合式函数
│   │   │   │   └── useTableConfig.js    # 表格配置解析
│   │   │   └── index.vue      # 表格主组件
│   │   └── UploadComponent/    # 上传组件
│   │       ├── components/    # 子组件
│   │       │   ├── UploadDrag.vue    # 拖拽上传
│   │       │   ├── UploadList.vue    # 列表上传
│   │       │   └── UploadPicture.vue # 图片上传
│   │       └── index.vue      # 上传主组件
│   ├── hooks/                 # 组合式函数
│   │   ├── useLocale.js       # 国际化 Hook
│   │   ├── useTableFunc.js    # 表格函数 Hook
│   │   └── useTheme.js        # 主题 Hook
│   ├── i18n/                  # 国际化配置
│   │   ├── locales/           # 语言包
│   │   │   ├── zh-CN.js       # 简体中文
│   │   │   ├── zh-TW.js       # 繁体中文
│   │   │   └── en-US.js       # 英文
│   │   └── index.js           # i18n 配置
│   ├── plugins/               # 插件
│   │   └── modal.js           # $modal 插件
│   ├── router/                # 路由配置
│   │   └── index.js
│   ├── store/                 # 状态管理
│   │   ├── index.js           # Pinia 实例
│   │   ├── locale.js          # 语言状态
│   │   └── theme.js           # 主题状态
│   ├── utils/                 # 工具函数
│   │   ├── element-locale.js  # Element Plus 语言包
│   │   ├── locale.js          # 语言工具
│   │   └── request.js         # HTTP 请求封装
│   ├── views/                 # 页面组件
│   │   ├── components/        # 组件文档页
│   │   │   ├── index.vue     # 组件文档首页
│   │   │   ├── modal.vue     # Modal 文档
│   │   │   ├── table.vue     # Table 文档
│   │   │   └── upload.vue    # Upload 文档
│   │   ├── form/              # 表单页
│   │   │   └── index.vue
│   │   ├── home/              # 首页
│   │   │   └── index.vue
│   │   ├── menuList/          # 表格示例页
│   │   │   ├── index.vue
│   │   │   └── listConfig.js  # 表格配置示例
│   │   ├── 403.vue            # 403 错误页
│   │   └── 404.vue            # 404 错误页
│   ├── App.vue                # 根组件
│   ├── main.js                # 入口文件
│   └── style.css              # 全局样式
├── .eslintrc.cjs              # ESLint 配置
├── .prettierrc.cjs            # Prettier 配置
├── .editorconfig              # 编辑器配置
├── vite.config.js             # Vite 配置
├── tailwind.config.js         # Tailwind 配置
├── postcss.config.js          # PostCSS 配置
└── package.json               # 项目配置
```

## 🎯 核心组件使用

### TableComponent - 表格组件

#### 基本用法

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
import TableComponent from '@/components/TableComponent/index.vue'
import tableConfig from './listConfig.js'

const loading = ref(false)
const tableData = ref([])
const tableConfig = ref(tableConfig)

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

#### 配置文件示例

创建配置文件 `src/views/your-module/listConfig.js`：

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

### UploadComponent - 上传组件

#### 基本用法

```vue
<template>
  <UploadComponent
    v-model:file-list="fileList"
    :mode="mode"
    :ui-type="uiType"
    :action="uploadAction"
    :limit="5"
    :max-size="10"
    @success="handleUploadSuccess"
    @error="handleUploadError"
  />
</template>

<script setup>
import { ref } from 'vue'
import UploadComponent from '@/components/UploadComponent/index.vue'

const fileList = ref([])
const mode = 'attachment' // 'image' | 'attachment'
const uiType = 'list' // 'drag' | 'list' | 'picture'
const uploadAction = '/api/upload'

const handleUploadSuccess = (response, file) => {
  console.log('上传成功', response, file)
}

const handleUploadError = (error, file) => {
  console.log('上传失败', error, file)
}
</script>
```

### $modal 插件 - 全局弹窗

```javascript
// 在组件中使用
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

// 成功提示
proxy.$modal.success('操作成功')

// 错误提示
proxy.$modal.error('操作失败')

// 警告提示
proxy.$modal.warning('请注意')

// 信息提示
proxy.$modal.info('提示信息')

// 确认对话框
proxy.$modal
  .confirm('确定要删除吗？', {
    title: '确认删除',
    type: 'warning'
  })
  .then(() => {
    // 确认回调
    console.log('确认删除')
  })
  .catch(() => {
    // 取消回调
    console.log('取消删除')
  })
```

## 📚 核心功能

### TableComponent 功能

#### 1. 筛选条件

- **支持类型**：输入框、数字输入、下拉框、日期选择器、日期范围、自定义插槽
- **响应式布局**：自动适配不同屏幕尺寸（xs/sm/md/lg/xl）
- **展开/收起**：超过 6 个条件时自动显示展开/收起按钮
- **动态配置**：支持自定义 label 宽度、后缀、占位符等

#### 2. 表格功能

- **多级表头**：支持无限级表头嵌套
- **行选择**：支持单选和多选模式
- **固定列**：支持左右固定列
- **排序**：支持列排序
- **格式化**：支持自定义格式化函数
- **插槽**：支持自定义列内容插槽
- **高度自适应**：支持自动高度和固定高度两种模式

#### 3. 操作按钮

- **顶部按钮**：表格顶部操作按钮
- **行内按钮**：每行的操作按钮
- **更多按钮**：超过 3 个按钮时自动折叠
- **函数映射**：通过 `functionMap` 映射执行函数
- **动态显示**：支持根据行数据动态显示/隐藏按钮

#### 4. 分页

- **完整分页**：支持页码、每页条数、总数等
- **自定义布局**：可配置分页器布局
- **事件监听**：支持页码和每页条数变化事件

### UploadComponent 功能

#### 1. 上传模式

- **图片上传** (`mode: 'image'`) - 适用于图片文件
- **附件上传** (`mode: 'attachment'`) - 适用于各种文件类型

#### 2. UI 类型

- **拖拽上传** (`uiType: 'drag'`) - 拖拽区域上传
- **列表上传** (`uiType: 'list'`) - 传统列表式上传
- **图片上传** (`uiType: 'picture'`) - 图片预览式上传

#### 3. 功能特性

- 文件类型限制
- 文件大小限制
- 上传数量限制
- 上传进度显示
- 文件预览
- 文件删除
- 自定义上传接口

### 系统功能

#### 1. 国际化 (i18n)

- 支持中文简体、繁体、英文
- 可扩展更多语言
- Element Plus 组件自动切换语言
- 语言设置持久化

#### 2. 主题切换

- 支持明暗主题切换
- 主题设置持久化
- 自动应用主题样式

#### 3. 代码同步

- GitHub Actions 自动同步
- 支持同步到多个子系统
- 可配置同步目录和分支
- 支持多种控制方式（路径过滤、提交标记、手动触发等）

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
- [useTableFunc 使用示例](./docs/useTableFunc使用示例.md) - 表格函数 Hook 使用示例
- [$modal 使用说明](./docs/$modal使用说明.md) - 全局 Modal 插件使用说明
- [配置模板](./docs/table-config-template.js) - 配置文件模板和注释
- [编辑器配置说明](./docs/编辑器配置说明.md) - VS Code/Cursor 编辑器配置说明
- [代码同步工作流说明](./.github/workflows/README_SYNC.md) - GitHub Actions 代码同步配置

## 🎨 开发规范

### 代码规范

- ✅ 使用 Vue 3.5 Composition API
- ✅ 使用 `<script setup>` 语法糖
- ✅ 遵循 ESLint 和 Prettier 规范
- ✅ 使用 Tailwind CSS 进行样式开发
- ✅ 组件命名使用 PascalCase
- ✅ 文件命名使用 kebab-case

### 组件开发规范

- ✅ 父子组件传值使用 `v-model` 和 `defineModel()`
- ✅ 禁止使用 `update` 事件和函数
- ✅ 所有 Vue 文件使用 `<script setup>` 语法

### 项目结构规范

- ✅ 路由页面放置在 `src/views` 目录下
- ✅ 模块文件命名采用小驼峰式（camelCase）
- ✅ 组件文件命名采用大驼峰式（PascalCase）
- ✅ 工具函数放置在 `src/utils/` 目录
- ✅ Hook 文件放置在 `src/hooks/` 目录
- ✅ API 封装按照页面路径结构创建文件

详细规范请查看：[RULES.md](./RULES.md)

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

## 🔄 代码同步工作流

项目集成了 GitHub Actions 工作流，支持自动将代码同步到多个子系统。

### 功能特性

- 自动同步：推送到 `main` 分支时自动触发
- 多仓库支持：支持同步到多个目标仓库
- 路径过滤：可配置只同步特定路径的文件
- 多种控制方式：支持提交标记、手动触发、环境变量等控制方式

### 控制方式

1. **路径过滤** - 只监听特定路径的变化
2. **提交标记** - 在提交消息中添加 `[skip sync]` 跳过同步
3. **手动触发** - 在 GitHub Actions 页面手动运行
4. **环境变量** - 通过 Secret 设置 `ENABLE_SYNC=false` 禁用同步

详细配置请查看：[代码同步工作流说明](./.github/workflows/README_SYNC.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT

## 🔗 相关链接

- [Vue 3 文档](https://cn.vuejs.org/)
- [Vite 文档](https://cn.vitejs.dev/)
- [Element Plus 文档](https://element-plus.org/zh-CN/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Pinia 文档](https://pinia.vuejs.org/zh/)
- [Vue Router 文档](https://router.vuejs.org/zh/)
- [Vue I18n 文档](https://vue-i18n.intlify.dev/)

---

**Star ⭐ 这个项目，如果它对你有所帮助！**
