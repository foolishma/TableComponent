<template>
  <div class="command-center relative w-full h-[calc(100vh-60px)] bg-[#e5eaf2] overflow-hidden">
    <!-- Map Container -->
    <div id="map-container" ref="mapContainerRef" class="absolute inset-0 z-0 w-full h-full"></div>

    <!-- Top Stats Cards -->
    <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-4">
      <!-- Date Card -->
      <div
        class="stat-card bg-white rounded-lg shadow-sm px-4 py-2 flex items-center min-w-[180px]"
      >
        <div class="icon-box bg-gray-100 rounded-md p-2 mr-3">
          <el-icon :size="20" color="#606266"><Calendar /></el-icon>
        </div>
        <div>
          <div class="text-xs text-gray-500">今天是</div>
          <div class="text-sm font-bold text-gray-800">{{ currentDate }}</div>
        </div>
      </div>

      <!-- Stat 1 -->
      <div
        class="stat-card bg-white rounded-lg shadow-sm px-4 py-2 flex items-center min-w-[160px]"
      >
        <div class="icon-box bg-blue-100 rounded-md p-2 mr-3">
          <el-icon :size="20" color="#409eff"><User /></el-icon>
        </div>
        <div>
          <div class="text-xs text-gray-500">应在岗人数</div>
          <div class="text-xl font-bold text-gray-800">505</div>
        </div>
      </div>

      <!-- Stat 2 -->
      <div
        class="stat-card bg-white rounded-lg shadow-sm px-4 py-2 flex items-center min-w-[160px]"
      >
        <div class="icon-box bg-green-100 rounded-md p-2 mr-3">
          <el-icon :size="20" color="#67c23a"><UserFilled /></el-icon>
        </div>
        <div>
          <div class="text-xs text-gray-500">执勤中的保安</div>
          <div class="text-xl font-bold text-gray-800">401</div>
        </div>
      </div>

      <!-- Stat 3 -->
      <div
        class="stat-card bg-white rounded-lg shadow-sm px-4 py-2 flex items-center min-w-[160px]"
      >
        <div class="icon-box bg-red-100 rounded-md p-2 mr-3">
          <el-icon :size="20" color="#f56c6c"><BellFilled /></el-icon>
        </div>
        <div>
          <div class="text-xs text-gray-500">24H事件突发数</div>
          <div class="text-xl font-bold text-gray-800">12</div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="absolute top-0 right-0 bottom-0 w-[320px] bg-white shadow-xl z-20 flex flex-col">
      <!-- Header -->
      <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <h2 class="text-lg font-bold text-gray-800">驻点列表</h2>
        <div class="flex items-center text-xs text-gray-400">
          最后定位更新时间 <el-switch v-model="autoRefresh" size="small" class="ml-2" />
        </div>
      </div>

      <!-- Filters -->
      <div class="p-3 space-y-2 bg-gray-50">
        <div class="grid grid-cols-2 gap-2">
          <el-select v-model="filters.customer" placeholder="全部客户" size="small">
            <el-option label="全部客户" value="" />
          </el-select>
          <el-select v-model="filters.department" placeholder="全部部门" size="small">
            <el-option label="全部部门" value="" />
          </el-select>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <el-select v-model="filters.hrManager" placeholder="全部人事经理" size="small">
            <el-option label="全部人事经理" value="" />
          </el-select>
          <el-select v-model="filters.siteManager" placeholder="全部驻点负责..." size="small">
            <el-option label="全部驻点负责人" value="" />
          </el-select>
        </div>
        <el-input
          v-model="filters.keyword"
          placeholder="搜驻点名称"
          prefix-icon="Search"
          size="small"
          clearable
        />
      </div>

      <!-- List -->
      <div class="flex-1 overflow-y-auto">
        <div
          v-for="(site, index) in siteList"
          :key="site.id"
          class="site-item p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
          :class="{ 'bg-blue-50': selectedSiteId === site.id }"
          @click="selectSite(site)"
        >
          <div class="flex items-start">
            <span class="text-gray-400 font-bold mr-3 w-4 text-center mt-0.5">{{ index + 1 }}</span>
            <div class="flex-1">
              <div class="font-medium text-gray-800 mb-1">{{ site.name }}</div>
              <div class="text-xs text-gray-500 flex items-center">
                <span>{{ site.onDutyCount }}人执勤中</span>
                <span v-if="site.abnormalCount > 0" class="ml-2 text-orange-500 flex items-center">
                  <span class="mx-1">·</span> {{ site.abnormalCount }}人异常
                </span>
              </div>
            </div>
            <div
              class="action-buttons flex flex-col space-y-1 opacity-0 hover:opacity-100 transition-opacity"
            >
              <!-- Placeholder icons for actions -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Controls (Bottom Right) -->
    <div class="absolute bottom-6 right-[340px] z-10 flex space-x-2">
      <div class="bg-white rounded shadow p-1 flex items-center space-x-2 px-2 h-8">
        <el-tooltip content="复位地图" placement="top">
          <el-icon class="cursor-pointer hover:text-blue-500" @click="resetMap"
            ><Refresh
          /></el-icon>
        </el-tooltip>
        <div class="w-[1px] h-4 bg-gray-200"></div>
        <el-tooltip content="切换3D视图" placement="top">
          <div class="flex items-center cursor-pointer hover:text-blue-500" @click="toggle3D">
            <el-icon><MapLocation /></el-icon>
            <span class="text-xs text-gray-500 font-bold ml-1">3D</span>
          </div>
        </el-tooltip>
      </div>
      <div class="bg-white rounded shadow flex flex-col">
        <el-tooltip content="放大" placement="left">
          <div
            class="p-1.5 cursor-pointer hover:bg-gray-50 border-b border-gray-100 rounded-t"
            @click="zoomIn"
          >
            <el-icon><Plus /></el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="缩小" placement="left">
          <div class="p-1.5 cursor-pointer hover:bg-gray-50 rounded-b" @click="zoomOut">
            <el-icon><Minus /></el-icon>
          </div>
        </el-tooltip>
      </div>
      <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'" placement="left">
        <div
          class="bg-white rounded shadow p-1.5 cursor-pointer hover:bg-gray-50"
          @click="toggleFullscreen"
        >
          <el-icon v-if="isFullscreen"><Close /></el-icon>
          <el-icon v-else><FullScreen /></el-icon>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import {
  BellFilled,
  Calendar,
  MapLocation,
  Minus,
  Plus,
  Refresh,
  User,
  UserFilled
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { onMounted, onUnmounted, reactive, ref } from 'vue'

const autoRefresh = ref(true)
const selectedSiteId = ref(null)
const currentDate = ref('')
const isFullscreen = ref(false)
const mapContainerRef = ref(null)
let map = null
let markers = []

const filters = reactive({
  customer: '',
  department: '',
  hrManager: '',
  siteManager: '',
  keyword: ''
})

// Mock Data for List with Coordinates (Qingdao area)
const siteList = ref([
  { id: 1, name: '花伴悦华', onDutyCount: 14, abnormalCount: 0, lng: 120.38, lat: 36.06 },
  { id: 2, name: '珠山小镇', onDutyCount: 16, abnormalCount: 1, lng: 120.42, lat: 36.08 },
  { id: 3, name: '波尔多小镇', onDutyCount: 15, abnormalCount: 1, lng: 120.35, lat: 36.1 },
  { id: 4, name: '石雀滩保安', onDutyCount: 11, abnormalCount: 0, lng: 120.33, lat: 36.05 },
  { id: 5, name: '东山郡', onDutyCount: 9, abnormalCount: 0, lng: 120.4, lat: 36.12 },
  { id: 6, name: '台东三路', onDutyCount: 17, abnormalCount: 1, lng: 120.34, lat: 36.07 },
  { id: 7, name: '灵山湾', onDutyCount: 13, abnormalCount: 0, lng: 120.3, lat: 36.0 },
  { id: 8, name: '世纪公馆', onDutyCount: 12, abnormalCount: 0, lng: 120.45, lat: 36.09 },
  { id: 9, name: '创智谷', onDutyCount: 8, abnormalCount: 0, lng: 120.38, lat: 36.15 },
  { id: 10, name: '鼎世华府AB区', onDutyCount: 10, abnormalCount: 0, lng: 120.36, lat: 36.11 },
  { id: 11, name: '金沙滩壹号', onDutyCount: 20, abnormalCount: 0, lng: 120.25, lat: 35.95 },
  { id: 12, name: '海信地产', onDutyCount: 5, abnormalCount: 0, lng: 120.39, lat: 36.06 }
])

// 获取当前日期
const updateDate = () => {
  const now = new Date()
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const week = weekDays[now.getDay()]
  currentDate.value = `${year}-${month}-${day}/${week}`
}

const initMap = () => {
  // 设置安全密钥
  window._AMapSecurityConfig = {
    securityJsCode: '7860a7edc7c1251e501ddb5e21f13903'
  }

  AMapLoader.load({
    key: '286f829f8abea768cd5183f73d3bc546', // 用户提供的 Key
    version: '2.0',
    plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.ControlBar']
  })
    .then((AMap) => {
      map = new AMap.Map('map-container', {
        viewMode: '3D',
        zoom: 11,
        center: [120.38, 36.06], // 青岛中心
        mapStyle: 'amap://styles/normal' // 默认样式，可以改成 dark/light 等
      })

      // 添加标记
      addMarkers(AMap)
    })
    .catch((e) => {
      console.error(e)
      ElMessage.error('地图加载失败，请检查 Key 或网络设置')
    })
}

const addMarkers = (AMap) => {
  if (!map) return

  // 清除现有标记
  map.remove(markers)
  markers = []

  siteList.value.forEach((site) => {
    // 创建自定义标记的 DOM 元素
    const markerDiv = document.createElement('div')
    markerDiv.className = 'custom-marker-wrapper'
    markerDiv.style.cssText =
      'position: relative; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;'

    // 创建标记点
    const pin = document.createElement('div')
    pin.className = 'marker-pin'
    pin.style.backgroundColor = site.abnormalCount > 0 ? '#ff9800' : '#ff5722'
    markerDiv.appendChild(pin)

    // 如果有异常，添加脉冲动画
    if (site.abnormalCount > 0) {
      const pulse = document.createElement('div')
      pulse.className = 'marker-pulse'
      markerDiv.appendChild(pulse)
    }

    const marker = new AMap.Marker({
      position: new AMap.LngLat(site.lng, site.lat),
      title: site.name,
      content: markerDiv,
      offset: new AMap.Pixel(-10, -10), // 调整偏移，使标记点居中
      extData: { id: site.id }
    })

    marker.on('click', () => {
      selectSite(site)
    })

    markers.push(marker)
    map.add(marker)
  })
}

const selectSite = (site) => {
  selectedSiteId.value = site.id
  if (map) {
    map.setZoomAndCenter(15, [site.lng, site.lat])
    // 可以在这里添加 InfoWindow
  }
}

// Map Controls
const zoomIn = () => {
  map?.zoomIn()
}

const zoomOut = () => {
  map?.zoomOut()
}

const resetMap = () => {
  map?.setZoomAndCenter(11, [120.38, 36.06])
}

const toggle3D = () => {
  // 切换视图模式通常需要重新初始化或使用特定 API，这里仅做示例，简单改变 pitch
  if (map) {
    const pitch = map.getPitch()
    map.setPitch(pitch > 40 ? 0 : 60)
  }
}

const toggleFullscreen = () => {
  if (!mapContainerRef.value) return

  if (!document.fullscreenElement) {
    // 进入全屏 - 对地图容器进行全屏
    const element = mapContainerRef.value
    if (element.requestFullscreen) {
      element.requestFullscreen()
      isFullscreen.value = true
    } else if (element.webkitRequestFullscreen) {
      // Safari
      element.webkitRequestFullscreen()
      isFullscreen.value = true
    } else if (element.msRequestFullscreen) {
      // IE/Edge
      element.msRequestFullscreen()
      isFullscreen.value = true
    }
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen()
      isFullscreen.value = false
    } else if (document.webkitExitFullscreen) {
      // Safari
      document.webkitExitFullscreen()
      isFullscreen.value = false
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen()
      isFullscreen.value = false
    }
  }
}

// 监听全屏状态变化
onMounted(() => {
  updateDate()
  initMap()

  // 监听全屏状态变化
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('msfullscreenchange', handleFullscreenChange)
})

const handleFullscreenChange = () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement

  // 检查是否是地图容器全屏
  isFullscreen.value = fullscreenElement === mapContainerRef.value

  // 地图全屏状态改变时，调整地图大小
  if (map) {
    setTimeout(() => {
      map.getSize()
      map.resize()
    }, 100)
  }
}

onUnmounted(() => {
  if (map) {
    map.destroy()
  }
  // 清理全屏事件监听器
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.removeEventListener('msfullscreenchange', handleFullscreenChange)
})
</script>

<style scoped>
/* Custom scrollbar for site list */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e4e7ed;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: #c0c4cc;
}

.site-item:hover .action-buttons {
  opacity: 1;
}

:deep(.amap-logo),
:deep(.amap-copyright) {
  display: none !important;
}

/* 自定义标记样式 */
.custom-marker-wrapper {
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.marker-pin {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  z-index: 2;
  position: relative;
}

.marker-pulse {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: rgba(255, 152, 0, 0.4);
  border-radius: 50%;
  animation: marker-pulse 1.5s infinite;
  z-index: 1;
}

@keyframes marker-pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
