<template>
  <div
    ref="wrapperRef"
    class="upload-drag-wrapper"
    :class="{ 'is-hover': isHover }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <el-upload
      ref="uploadRef"
      v-model:file-list="internalFileList"
      :action="action"
      :headers="headers"
      :method="method"
      :data="data"
      :name="name"
      :with-credentials="withCredentials"
      :show-file-list="showFileList"
      :drag="true"
      :accept="accept"
      :multiple="multiple"
      :limit="limit"
      :auto-upload="autoUpload"
      :list-type="listType"
      :http-request="httpRequest || undefined"
      :disabled="disabled"
      :class="{ 'hide-progress': !showProgress }"
      @change="handleChange"
      @progress="handleProgress"
      @success="handleSuccess"
      @error="handleError"
      @remove="handleRemove"
      @preview="handlePreview"
      @exceed="handleExceed"
      @before-upload="handleBeforeUpload"
      @before-remove="handleBeforeRemove"
    >
      <div class="upload-drag-content">
        <div class="upload-icon-wrapper">
          <el-icon class="upload-icon" :class="{ 'is-hover': isHover }" :size="64">
            <upload-filled />
          </el-icon>
        </div>
        <div class="upload-text">
          <p class="upload-text-main">将文件拖到此处，或</p>
          <p class="upload-text-link">点击上传</p>
        </div>
        <div class="upload-tip">
          <el-icon class="tip-icon" :size="16"><info-filled /></el-icon>
          <span v-if="mode === 'image'">只能上传图片文件，支持 JPG、PNG、GIF 等格式</span>
          <span v-else>支持任意文件类型，单个文件不超过 10MB</span>
        </div>
      </div>
    </el-upload>
  </div>
</template>

<script setup>
import { InfoFilled, UploadFilled } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'

const isHover = ref(false)
const uploadRef = ref(null)
const wrapperRef = ref(null)

const handleMouseEnter = () => {
  isHover.value = true
}

const handleMouseLeave = () => {
  isHover.value = false
}

const props = defineProps({
  mode: {
    type: String,
    default: 'attachment'
  },
  accept: {
    type: String,
    default: ''
  },
  fileList: {
    type: Array,
    default: () => []
  },
  showProgress: {
    type: Boolean,
    default: true
  },
  action: String,
  headers: Object,
  method: String,
  data: Object,
  name: String,
  withCredentials: Boolean,
  showFileList: Boolean,
  multiple: Boolean,
  limit: Number,
  autoUpload: Boolean,
  listType: String,
  httpRequest: Function,
  disabled: Boolean
})

const emit = defineEmits([
  'update:fileList',
  'change',
  'progress',
  'success',
  'error',
  'remove',
  'preview',
  'exceed',
  'before-upload',
  'before-remove'
])

const internalFileList = computed({
  get: () => props.fileList,
  set: (val) => emit('update:fileList', val)
})

const handleChange = (file, fileList) => {
  emit('change', file, fileList)
}

const handleProgress = (event, file, fileList) => {
  emit('progress', event, file, fileList)
}

const handleSuccess = (response, file, fileList) => {
  emit('success', response, file, fileList)
}

const handleError = (error, file, fileList) => {
  emit('error', error, file, fileList)
}

const handleRemove = (file, fileList) => {
  emit('remove', file, fileList)
}

const handlePreview = (file) => {
  emit('preview', file)
}

const handleExceed = (files, fileList) => {
  emit('exceed', files, fileList)
}

const handleBeforeUpload = (file) => {
  const result = emit('before-upload', file)
  return result !== false
}

const handleBeforeRemove = (file, fileList) => {
  const result = emit('before-remove', file, fileList)
  return result !== false
}

defineExpose({
  submit: () => uploadRef.value?.submit(),
  clearFiles: () => uploadRef.value?.clearFiles(),
  upload: (fileList) => uploadRef.value?.upload?.(fileList),
  uploadRef
})
</script>

<style scoped>
.upload-drag-wrapper {
  width: 100%;
}

/* 使用深度选择器覆盖 Element Plus 样式 */
.upload-drag-wrapper :deep(.el-upload) {
  width: 100%;
}

.upload-drag-wrapper :deep(.el-upload-dragger) {
  width: 100% !important;
  min-height: 200px !important;
  height: auto !important;
  border: 2px dashed #d9d9d9 !important;
  border-radius: 8px !important;
  background-color: #fafafa !important;
  transition: all 0.3s ease !important;
  padding: 40px 20px !important;
  cursor: pointer !important;
  position: relative !important;
}

/* 悬停效果 - 通过父元素状态控制 */
.upload-drag-wrapper.is-hover :deep(.el-upload-dragger) {
  border-color: #409eff !important;
  background-color: #f0f9ff !important;
}

.upload-drag-wrapper :deep(.el-upload-dragger.is-dragover) {
  border-color: #409eff !important;
  background-color: #e6f4ff !important;
  border-style: solid !important;
}

.upload-drag-wrapper :deep(.el-upload-dragger.is-disabled) {
  cursor: not-allowed !important;
  opacity: 0.6 !important;
}

.upload-drag-wrapper.is-hover :deep(.el-upload-dragger.is-disabled) {
  border-color: #d9d9d9 !important;
  background-color: #fafafa !important;
}

/* 隐藏 Element Plus 默认内容 */
.upload-drag-wrapper :deep(.el-upload-dragger .el-icon--upload) {
  display: none !important;
}

.upload-drag-wrapper :deep(.el-upload-dragger .el-upload__text) {
  display: none !important;
}

/* 自定义内容样式 */
.upload-drag-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: relative;
  z-index: 1;
}

.upload-icon-wrapper {
  margin-bottom: 16px;
}

.upload-icon {
  color: #8c8c8c;
  transition: all 0.3s ease;
}

/* 悬停时图标变色和放大 */
.upload-icon.is-hover {
  color: #409eff !important;
  transform: scale(1.1);
}

.upload-text {
  margin-bottom: 12px;
}

.upload-text-main {
  font-size: 16px;
  color: #606266;
  margin: 0 0 8px 0;
  line-height: 1.5;
}

.upload-text-link {
  font-size: 14px;
  color: #409eff;
  margin: 0;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  pointer-events: auto;
}

.upload-text-link:hover {
  color: #66b1ff;
}

.upload-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
}

.tip-icon {
  color: #909399;
  flex-shrink: 0;
}

/* 隐藏上传进度 */
.hide-progress :deep(.el-upload-list__item .el-progress),
.hide-progress :deep(.el-upload-list__item .el-progress-bar),
.hide-progress :deep(.el-upload-list__item .el-progress__text) {
  display: none !important;
}

/* 确保进度条相关元素都被隐藏 */
.hide-progress :deep(.el-upload-list__item) .el-progress {
  display: none !important;
}

/* 优化进度条显示时机和动画 */
:deep(.el-upload-list__item .el-progress) {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

/* 只在文件上传中时显示进度条 */
:deep(.el-upload-list__item.is-uploading .el-progress) {
  opacity: 1;
  animation: progressFadeIn 0.3s ease-in-out;
}

/* 上传完成后延迟隐藏进度条 */
:deep(.el-upload-list__item.is-success .el-progress),
:deep(.el-upload-list__item.is-error .el-progress) {
  opacity: 0;
  transition: opacity 0.5s ease-in-out 0.3s;
  pointer-events: none;
}

@keyframes progressFadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 进度条文本动画 */
:deep(.el-upload-list__item .el-progress__text) {
  transition: opacity 0.3s ease-in-out;
}

:deep(.el-upload-list__item.is-uploading .el-progress__text) {
  opacity: 1;
}

:deep(.el-upload-list__item.is-success .el-progress__text),
:deep(.el-upload-list__item.is-error .el-progress__text) {
  opacity: 0;
  transition: opacity 0.3s ease-in-out 0.2s;
}
</style>
