<template>
  <div class="upload-component">
    <!-- 根据 uiType 渲染不同的 UI -->
    <component
      :is="uiComponent"
      ref="uploadRef"
      :mode="mode"
      :accept="computedAccept"
      :file-list="fileList"
      :ui-type="uiType"
      :show-progress="showProgress"
      v-bind="uploadProps"
      @update:file-list="handleFileListUpdate"
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
      <!-- 传递所有插槽 -->
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope"></slot>
      </template>
    </component>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import UploadDrag from './components/UploadDrag.vue'
import UploadList from './components/UploadList.vue'
import UploadPicture from './components/UploadPicture.vue'

// Props
const props = defineProps({
  // 模式：image 图片上传 | attachment 附件上传
  mode: {
    type: String,
    default: 'attachment',
    validator: (value) => ['image', 'attachment'].includes(value)
  },
  // UI 类型：drag 拖拽上传 | list 附件列表 | picture 图片上传
  uiType: {
    type: String,
    default: 'list',
    validator: (value) => ['drag', 'list', 'picture'].includes(value)
  },
  // 文件类型限制（会与 mode 结合）
  accept: {
    type: String,
    default: ''
  },
  // 文件列表
  fileList: {
    type: Array,
    default: () => []
  },
  // 是否显示上传进度
  showProgress: {
    type: Boolean,
    default: true
  },
  // el-upload 的所有其他属性
  action: {
    type: String,
    default: ''
  },
  headers: {
    type: Object,
    default: () => ({})
  },
  method: {
    type: String,
    default: 'post'
  },
  data: {
    type: Object,
    default: () => ({})
  },
  name: {
    type: String,
    default: 'file'
  },
  withCredentials: {
    type: Boolean,
    default: false
  },
  showFileList: {
    type: Boolean,
    default: true
  },
  drag: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 0
  },
  autoUpload: {
    type: Boolean,
    default: true
  },
  listType: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'picture', 'picture-card'].includes(value)
  },
  httpRequest: {
    type: Function,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  onPreview: {
    type: Function,
    default: null
  },
  onRemove: {
    type: Function,
    default: null
  },
  onSuccess: {
    type: Function,
    default: null
  },
  onError: {
    type: Function,
    default: null
  },
  onProgress: {
    type: Function,
    default: null
  },
  onChange: {
    type: Function,
    default: null
  },
  onExceed: {
    type: Function,
    default: null
  },
  beforeUpload: {
    type: Function,
    default: null
  },
  beforeRemove: {
    type: Function,
    default: null
  }
})

// Emits - 支持 el-upload 的所有事件
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

// 计算属性：根据 mode 和 accept 计算最终的 accept
const computedAccept = computed(() => {
  // 如果指定了 accept，优先使用
  if (props.accept) {
    return props.accept
  }
  // 根据 mode 设置默认 accept
  if (props.mode === 'image') {
    return 'image/*'
  }
  // attachment 模式不限制类型
  return ''
})

// 根据 uiType 选择组件
const uiComponent = computed(() => {
  const uiMap = {
    drag: UploadDrag,
    list: UploadList,
    picture: UploadPicture
  }
  return uiMap[props.uiType] || UploadList
})

// 构建 el-upload 的属性对象（排除已单独定义的属性）
const uploadProps = computed(() => {
  const {
    mode: _mode,
    uiType: _uiType,
    accept: _accept,
    fileList: _fileList,
    showProgress: _showProgress,
    ...restProps
  } = props

  // 确保 httpRequest 是函数或 undefined，不能是 null
  const uploadPropsResult = {
    ...restProps,
    accept: computedAccept.value
  }

  // 如果 httpRequest 是 null，则删除该属性，避免传递 null 给 el-upload
  if (uploadPropsResult.httpRequest === null) {
    delete uploadPropsResult.httpRequest
  }

  return uploadPropsResult
})

// 文件列表更新
const handleFileListUpdate = (newFileList) => {
  emit('update:fileList', newFileList)
}

// 事件处理函数
const handleChange = (file, fileList) => {
  emit('change', file, fileList)
  if (props.onChange) {
    props.onChange(file, fileList)
  }
}

const handleProgress = (event, file, fileList) => {
  emit('progress', event, file, fileList)
  if (props.onProgress) {
    props.onProgress(event, file, fileList)
  }
}

const handleSuccess = (response, file, fileList) => {
  emit('success', response, file, fileList)
  if (props.onSuccess) {
    props.onSuccess(response, file, fileList)
  }
}

const handleError = (error, file, fileList) => {
  emit('error', error, file, fileList)
  if (props.onError) {
    props.onError(error, file, fileList)
  }
}

const handleRemove = (file, fileList) => {
  emit('remove', file, fileList)
  if (props.onRemove) {
    props.onRemove(file, fileList)
  }
}

const handlePreview = (file) => {
  emit('preview', file)
  if (props.onPreview) {
    props.onPreview(file)
  }
}

const handleExceed = (files, fileList) => {
  emit('exceed', files, fileList)
  if (props.onExceed) {
    props.onExceed(files, fileList)
  }
}

const handleBeforeUpload = (file) => {
  emit('before-upload', file)
  if (props.beforeUpload) {
    return props.beforeUpload(file)
  }
  return true
}

const handleBeforeRemove = (file, fileList) => {
  emit('before-remove', file, fileList)
  if (props.beforeRemove) {
    return props.beforeRemove(file, fileList)
  }
  return true
}

// 暴露给父组件的方法
const uploadRef = ref(null)

defineExpose({
  // 提交上传
  submit: () => {
    uploadRef.value?.submit?.()
  },
  // 清空文件列表
  clearFiles: () => {
    uploadRef.value?.clearFiles?.()
  },
  // 手动上传文件列表
  upload: (fileList) => {
    uploadRef.value?.upload?.(fileList)
  },
  // 上传组件实例
  uploadRef
})
</script>

<style scoped>
.upload-component {
  width: 100%;
}
</style>
