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
    :http-request="httpRequest"
    :disabled="disabled"
    class="upload-picture"
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
</style>
