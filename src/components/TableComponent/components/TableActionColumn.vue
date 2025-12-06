<template>
  <el-table-column
    v-if="showAction && actionColumn"
    :label="actionColumn.label"
    :width="actionColumn.width"
    :fixed="actionColumn.fixed"
  >
    <template #default="{ row, $index }">
      <div class="flex items-center space-x-2">
        <template v-for="button in visibleButtons(row)" :key="button.id">
          <el-button
            v-if="shouldShowButton(button, row)"
            :type="button.type || 'default'"
            :size="button.size || 'small'"
            :icon="button.icon ? getIcon(button.icon) : undefined"
            :disabled="getButtonDisabled(button, row)"
            :loading="button.loading"
            link
            @click="handleActionClick(button, row, $index)"
          >
            {{ button.label }}
          </el-button>
        </template>

        <!-- 更多按钮 -->
        <el-dropdown
          v-if="moreButtons(row).length > 0"
          trigger="hover"
          @command="(cmd) => handleMoreButtonClick(cmd, row, $index)"
        >
          <el-button link type="primary" size="small">
            更多 <el-icon><ArrowDown /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="button in moreButtons(row)"
                :key="button.id"
                :command="button"
              >
                {{ button.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
  </el-table-column>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

// Props
const props = defineProps({
  showAction: {
    type: Boolean,
    default: false
  },
  actionColumn: {
    type: Object,
    default: null
  },
  getIcon: {
    type: Function,
    required: true
  },
  functionMap: {
    type: Object,
    default: () => ({})
  }
})

// Emits
const emit = defineEmits(['action-click'])

// 可见按钮
const visibleButtons = (_row) => {
  const buttons = props.actionColumn?.buttons || []
  if (buttons.length <= 3) {
    return buttons
  }
  return buttons.slice(0, 2)
}

// 更多按钮
const moreButtons = (_row) => {
  const buttons = props.actionColumn?.buttons || []
  if (buttons.length <= 3) {
    return []
  }
  return buttons.slice(2)
}

// 是否显示按钮
const shouldShowButton = (button, row) => {
  if (button.show === undefined || button.show === true) {
    return true
  }
  if (typeof button.show === 'function') {
    return button.show(row)
  }
  return button.show
}

// 按钮是否禁用
const getButtonDisabled = (button, row) => {
  if (button.disabled === undefined || button.disabled === false) {
    return false
  }
  if (typeof button.disabled === 'function') {
    return row ? button.disabled(row) : false
  }
  return button.disabled
}

// 操作按钮点击
const handleActionClick = async (button, row, index) => {
  if (button.confirm) {
    try {
      await ElMessageBox.confirm(
        button.confirm.message || '确认操作？',
        button.confirm.title || '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: button.confirm.type || 'warning'
        }
      )
    } catch {
      return
    }
  }

  emit('action-click', button, row, index)
}

// 更多按钮点击
const handleMoreButtonClick = async (button, row, index) => {
  await handleActionClick(button, row, index)
}
</script>

<style scoped>
/* 样式已通过 Tailwind CSS 实现 */
</style>
