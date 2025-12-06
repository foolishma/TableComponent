<template>
  <div class="space-y-6">
    <el-card shadow="hover">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-lg font-semibold">组件演示页面</span>
          <el-tag type="warning">组件演示</el-tag>
        </div>
      </template>

      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="按钮组件" name="buttons">
          <div class="space-y-4">
            <div>
              <h3 class="mb-3 font-semibold">基础按钮</h3>
              <el-space wrap>
                <el-button>默认按钮</el-button>
                <el-button type="primary">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="info">信息按钮</el-button>
                <el-button type="warning">警告按钮</el-button>
                <el-button type="danger">危险按钮</el-button>
              </el-space>
            </div>

            <div>
              <h3 class="mb-3 font-semibold">图标按钮</h3>
              <el-space wrap>
                <el-button type="primary" :icon="Search">搜索</el-button>
                <el-button type="success" :icon="Edit">编辑</el-button>
                <el-button type="info" :icon="Message">消息</el-button>
                <el-button type="warning" :icon="Star">收藏</el-button>
                <el-button type="danger" :icon="Delete">删除</el-button>
              </el-space>
            </div>

            <div>
              <h3 class="mb-3 font-semibold">按钮尺寸</h3>
              <el-space wrap>
                <el-button size="large">大按钮</el-button>
                <el-button>默认按钮</el-button>
                <el-button size="small">小按钮</el-button>
              </el-space>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="消息提示" name="messages">
          <div class="space-y-4">
            <h3 class="font-semibold">消息提示类型</h3>
            <el-space wrap>
              <el-button @click="showMessage('success')">成功消息</el-button>
              <el-button @click="showMessage('warning')">警告消息</el-button>
              <el-button @click="showMessage('info')">信息消息</el-button>
              <el-button @click="showMessage('error')">错误消息</el-button>
            </el-space>

            <h3 class="font-semibold mt-4">通知提示</h3>
            <el-space wrap>
              <el-button @click="showNotification('success')">成功通知</el-button>
              <el-button @click="showNotification('warning')">警告通知</el-button>
              <el-button @click="showNotification('info')">信息通知</el-button>
              <el-button @click="showNotification('error')">错误通知</el-button>
            </el-space>
          </div>
        </el-tab-pane>

        <el-tab-pane label="标签页" name="tabs">
          <el-tabs v-model="innerTab">
            <el-tab-pane label="标签一" name="first">
              <p>这是第一个标签页的内容</p>
            </el-tab-pane>
            <el-tab-pane label="标签二" name="second">
              <p>这是第二个标签页的内容</p>
            </el-tab-pane>
            <el-tab-pane label="标签三" name="third">
              <p>这是第三个标签页的内容</p>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>

        <el-tab-pane label="进度条" name="progress">
          <div class="space-y-6">
            <div>
              <h3 class="mb-3 font-semibold">基础进度条</h3>
              <el-progress :percentage="50" />
              <el-progress :percentage="100" :format="format" />
              <el-progress :percentage="100" status="success" />
              <el-progress :percentage="50" status="exception" />
            </div>

            <div>
              <h3 class="mb-3 font-semibold">动态进度条</h3>
              <el-progress :percentage="dynamicPercentage" />
              <el-button-group class="mt-2">
                <el-button @click="decrease">减少</el-button>
                <el-button @click="increase">增加</el-button>
              </el-button-group>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="加载状态" name="loading">
          <div class="space-y-4">
            <h3 class="font-semibold">加载动画</h3>
            <el-space wrap>
              <el-button type="primary" :loading="loading1" @click="handleLoading1">
                点击加载
              </el-button>
              <el-button type="success" :loading="loading2" @click="handleLoading2">
                提交中
              </el-button>
            </el-space>

            <div class="mt-4">
              <h3 class="mb-3 font-semibold">骨架屏</h3>
              <el-skeleton :rows="5" animated />
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="其他组件" name="others">
          <div class="space-y-4">
            <div>
              <h3 class="mb-3 font-semibold">标签</h3>
              <el-space wrap>
                <el-tag>标签一</el-tag>
                <el-tag type="success">标签二</el-tag>
                <el-tag type="info">标签三</el-tag>
                <el-tag type="warning">标签四</el-tag>
                <el-tag type="danger">标签五</el-tag>
                <el-tag closable>可关闭</el-tag>
              </el-space>
            </div>

            <div>
              <h3 class="mb-3 font-semibold">徽章</h3>
              <el-space wrap>
                <el-badge :value="12" class="item">
                  <el-button>消息</el-button>
                </el-badge>
                <el-badge :value="3" class="item">
                  <el-button>通知</el-button>
                </el-badge>
                <el-badge :value="1" type="success" class="item">
                  <el-button>成功</el-button>
                </el-badge>
                <el-badge :value="2" type="warning" class="item">
                  <el-button>警告</el-button>
                </el-badge>
                <el-badge :value="1" type="danger" class="item">
                  <el-button>危险</el-button>
                </el-badge>
              </el-space>
            </div>

            <div>
              <h3 class="mb-3 font-semibold">评分</h3>
              <el-rate v-model="rateValue" show-text />
            </div>

            <div>
              <h3 class="mb-3 font-semibold">开关</h3>
              <el-switch v-model="switchValue" active-text="开启" inactive-text="关闭" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { Delete, Edit, Message, Search, Star } from '@element-plus/icons-vue'
import { ElMessage, ElNotification } from 'element-plus'
import { ref } from 'vue'
const activeTab = ref('buttons')
const innerTab = ref('first')
const dynamicPercentage = ref(10)
const loading1 = ref(false)
const loading2 = ref(false)
const rateValue = ref(3.7)
const switchValue = ref(true)

const format = (percentage) => {
  return percentage === 100 ? '完成' : `${percentage}%`
}

const increase = () => {
  dynamicPercentage.value += 10
  if (dynamicPercentage.value > 100) {
    dynamicPercentage.value = 100
  }
}

const decrease = () => {
  dynamicPercentage.value -= 10
  if (dynamicPercentage.value < 0) {
    dynamicPercentage.value = 0
  }
}

const showMessage = (type) => {
  const messages = {
    success: '这是一条成功消息',
    warning: '这是一条警告消息',
    info: '这是一条信息消息',
    error: '这是一条错误消息'
  }
  ElMessage[type](messages[type])
}

const showNotification = (type) => {
  const notifications = {
    success: { title: '成功', message: '这是一条成功的通知消息' },
    warning: { title: '警告', message: '这是一条警告的通知消息' },
    info: { title: '信息', message: '这是一条信息的通知消息' },
    error: { title: '错误', message: '这是一条错误的通知消息' }
  }
  ElNotification[type](notifications[type])
}

const handleLoading1 = () => {
  loading1.value = true
  setTimeout(() => {
    loading1.value = false
    ElMessage.success('加载完成')
  }, 2000)
}

const handleLoading2 = () => {
  loading2.value = true
  setTimeout(() => {
    loading2.value = false
    ElMessage.success('提交成功')
  }, 2000)
}
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
