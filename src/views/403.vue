<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-code">403</div>
      <div class="error-message">访问被拒绝</div>
      <div class="error-description">抱歉，您没有权限访问该页面</div>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/home')
}
</script>

<style scoped>
.error-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.error-content {
  text-align: center;
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  color: #f56c6c;
  line-height: 1;
  margin-bottom: 20px;
}

.error-message {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.error-description {
  font-size: 14px;
  color: #999;
  margin-bottom: 30px;
}
</style>
