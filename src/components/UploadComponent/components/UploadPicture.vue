<template>
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
    :accept="accept"
    :multiple="multiple"
    :limit="limit"
    :auto-upload="autoUpload"
    list-type="picture-card"
    :http-request="httpRequest || undefined"
    :disabled="disabled"
    :class="['upload-picture', { 'hide-progress': !showProgress }]"
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
    <el-icon><plus /></el-icon>
    <template v-if="mode === 'image'" #tip>
      <div class="el-upload__tip">只能上传图片文件</div>
    </template>
    <template v-else #tip>
      <div class="el-upload__tip">支持任意文件类型</div>
    </template>
  </el-upload>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'

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

const uploadRef = ref(null)
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
.upload-picture {
  width: 100%;
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

/* picture-card 类型的特殊处理 */
.hide-progress :deep(.el-upload-list--picture-card .el-progress),
.hide-progress :deep(.el-upload-list--picture .el-progress) {
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
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
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

/* picture-card 类型的进度条特殊动画 */
:deep(.el-upload-list--picture-card .el-upload-list__item.is-uploading .el-progress) {
  animation: progressFadeInCard 0.3s ease-in-out;
}

@keyframes progressFadeInCard {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
