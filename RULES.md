# 项目代码规范规则

本文档说明项目的代码规范和规则配置。

## 📋 规则文件清单

### 1. ESLint 配置 (`.eslintrc.cjs`)

**作用**：JavaScript/Vue 代码质量检查和规范

**主要规则**：
- ✅ 使用 Vue 3 推荐规则集
- ✅ 禁止在 `.vue` 文件中使用 `<script lang="ts">`，强制使用 `<script>`
- ✅ 生产环境禁止 `console` 和 `debugger`
- ✅ 未使用变量警告（允许 `_` 开头的变量）
- ✅ HTML 自闭合标签规范
- ✅ 每行最大属性数限制

**运行命令**：
```bash
npm run lint
```

### 2. Prettier 配置 (`.prettierrc.cjs`)

**作用**：代码格式化规范

**主要配置**：
- 单行最大长度：100 字符
- 缩进：2 个空格
- 不使用分号
- 使用单引号
- 尾随逗号：无
- 箭头函数参数始终包含括号

**运行命令**：
```bash
npm run format
```

### 3. EditorConfig (`.editorconfig`)

**作用**：统一不同编辑器的代码风格

**主要配置**：
- 字符编码：UTF-8
- 换行符：LF
- 缩进：2 个空格
- 文件末尾插入新行
- 删除行尾空格

### 4. 忽略文件

- `.eslintignore` - ESLint 忽略的文件和目录
- `.prettierignore` - Prettier 忽略的文件和目录

## 🚨 重要规则

### Vue 文件规范

**⚠️ 强制要求**：
- 所有 `.vue` 文件必须使用 `<script>` 标签
- **禁止** 使用 `<script lang="ts">` 或 `<script lang="tsx">`
- 统一使用 JavaScript 语法

**示例**：

✅ **正确**：
```vue
<script>
export default {
  name: 'MyComponent'
}
</script>
```

❌ **错误**：
```vue
<script lang="ts">
export default {
  name: 'MyComponent'
}
</script>
```

## 📝 使用说明

### 安装依赖

首次使用前需要安装 ESLint 和 Prettier 相关依赖：

```bash
npm install
```

### 代码检查

检查代码规范问题：

```bash
npm run lint
```

### 代码格式化

自动格式化代码：

```bash
npm run format
```

### IDE 集成

#### VS Code

推荐安装以下插件：
- ESLint
- Prettier - Code formatter
- EditorConfig for VS Code

#### 自动格式化

在 VS Code 设置中添加：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## 🔧 规则调整

如需调整规则，请修改对应配置文件：

- ESLint 规则：`.eslintrc.cjs`
- Prettier 规则：`.prettierrc.cjs`
- EditorConfig：`.editorconfig`

修改后需要重新运行检查命令验证效果。

## 📚 参考文档

- [ESLint 官方文档](https://eslint.org/)
- [Vue ESLint 插件](https://eslint.vuejs.org/)
- [Prettier 官方文档](https://prettier.io/)
- [EditorConfig 官方文档](https://editorconfig.org/)

