# 代码同步工作流配置说明

## 📋 功能说明

此工作流用于将主仓库的特定目录代码自动同步到多个子系统的指定分支。

## 🚀 工作流程

1. **触发时机**：当代码推送到主仓库的 `main` 分支时自动触发
2. **执行操作**：
   - 检出主仓库代码
   - 将指定目录的代码推送到各个子系统的 `dev` 分支
   - 保留完整的 Git 提交历史
   - 强制覆盖目标分支（解决冲突）

## ⚙️ 配置步骤

### 步骤 1: 修改工作流配置

编辑 `.github/workflows/sync-to-subsystems.yml` 文件，找到 `配置区域`，修改以下变量：

```yaml
# 配置 1: 要推送的源目录路径
SOURCE_DIR: 'src/components/UploadComponent'

# 配置 2: 目标分支名称
TARGET_BRANCH: 'dev'

# 配置 3: 源分支名称
SOURCE_BRANCH: 'main'

# 配置 4: 目标仓库列表（每行一个仓库地址）
TARGET_REPOS: |
  https://github.com/your-org/subsystem1.git
  https://github.com/your-org/subsystem2.git
  https://github.com/your-org/subsystem3.git

# 配置 5: 目标目录路径（在子系统中的存放位置）
TARGET_DIR: 'src/components/UploadComponent'
```

### 步骤 2: 配置认证 Token（如果需要）

#### 情况 A: 所有仓库都是公开的，且在同一 GitHub 组织下

无需额外配置，使用默认的 `GITHUB_TOKEN` 即可。

#### 情况 B: 需要访问私有仓库或跨组织仓库

1. **创建 Personal Access Token (PAT)**：
   - 访问：https://github.com/settings/tokens
   - 点击 "Generate new token (classic)"
   - 权限选择：`repo`（完整仓库访问权限）
   - 生成并复制 Token

2. **在仓库中添加 Secret**：
   - 进入主仓库的 `Settings` -> `Secrets and variables` -> `Actions`
   - 点击 `New repository secret`
   - Name: `GITHUB_TOKEN`（或自定义名称，需同步修改工作流中的引用）
   - Value: 粘贴刚才复制的 Token
   - 点击 `Add secret`

3. **修改工作流中的 Token 引用**（如果需要使用自定义名称）：
   ```yaml
   GIT_TOKEN: ${{ secrets.YOUR_CUSTOM_TOKEN_NAME }}
   ```

### 步骤 3: 确保目标分支存在

工作流会自动创建目标分支（如果不存在），但建议：

- 在子系统中预先创建 `dev` 分支
- 或者在第一次运行时让工作流自动创建

### 步骤 4: 测试工作流

1. 修改主仓库的 `main` 分支代码
2. 推送到远程仓库
3. 在 GitHub 的 `Actions` 标签页查看工作流执行情况
4. 检查子系统仓库是否已更新

## 📝 配置示例

### 示例 1: 同步组件到多个子系统

```yaml
SOURCE_DIR: 'src/components/UploadComponent'
TARGET_BRANCH: 'dev'
TARGET_REPOS: |
  https://github.com/company/frontend-system1.git
  https://github.com/company/frontend-system2.git
TARGET_DIR: 'src/components/UploadComponent'
```

### 示例 2: 同步多个目录

如果需要同步多个目录，可以：

1. 创建多个工作流文件
2. 或者修改工作流，使用矩阵策略并行处理

### 示例 3: 推送到根目录

```yaml
SOURCE_DIR: 'dist'
TARGET_DIR: '' # 空字符串表示推送到根目录
```

## ⚠️ 注意事项

1. **强制覆盖**：工作流使用 `--force` 推送，会覆盖目标分支的所有更改
2. **提交历史**：会保留完整的 Git 提交历史
3. **触发条件**：只在 `main` 分支推送时触发，避免频繁同步
4. **权限要求**：确保 Token 有目标仓库的写入权限
5. **分支保护**：如果目标分支有保护规则，可能需要调整或临时禁用

## 🔧 故障排查

### 问题 1: 工作流未触发

- 检查是否推送到 `main` 分支
- 检查工作流文件是否在 `.github/workflows/` 目录下
- 检查 YAML 语法是否正确

### 问题 2: 推送失败（认证错误）

- 检查 Token 是否正确配置
- 检查 Token 是否有 `repo` 权限
- 检查目标仓库是否存在且有访问权限

### 问题 3: 目标分支不存在

- 工作流会自动创建分支，但建议预先创建
- 检查分支名称是否正确

### 问题 4: 文件未同步

- 检查源目录路径是否正确
- 检查目标目录路径是否正确
- 查看工作流日志确认文件是否被复制

## 📚 相关文档

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Git 强制推送说明](https://git-scm.com/docs/git-push#Documentation/git-push.txt---force)
- [Personal Access Token 创建指南](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
