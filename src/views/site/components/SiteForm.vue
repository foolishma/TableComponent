<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? '编辑驻点' : '新增驻点'"
    width="1000px"
    top="5vh"
    :close-on-click-modal="false"
    class="site-dialog"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" class="site-form">
      <!-- 第一部分：基本信息与地图 -->
      <el-row :gutter="20">
        <!-- 左侧表单 -->
        <el-col :span="12">
          <el-form-item label="驻点名称" prop="siteName">
            <el-input
              v-model="formData.siteName"
              placeholder="输入驻点名称"
              maxlength="30"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="驻点地址" prop="address">
            <el-autocomplete
              v-model="formData.address"
              placeholder="输入关键词选择地址，定位自动填充"
              :prefix-icon="Location"
              :fetch-suggestions="searchAddress"
              clearable
              class="w-full"
              @select="handleAddressSelect"
            />
            <div class="lat-lng-display">
              <span>经度: {{ formData.longitude || '-' }}</span>
              <span class="ml-4">纬度: {{ formData.latitude || '-' }}</span>
            </div>
          </el-form-item>

          <el-form-item label="进场日期" prop="entryDate">
            <el-date-picker
              v-model="formData.entryDate"
              type="date"
              placeholder="请选择进场日期"
              value-format="YYYY-MM-DD"
              class="w-full"
            />
          </el-form-item>

          <el-form-item label="负责人" prop="manager">
            <el-select
              v-model="formData.manager"
              placeholder="请选择/搜索"
              filterable
              remote
              :remote-method="searchPerson"
              class="w-full"
            >
              <el-option
                v-for="item in personOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="驻点类型" prop="siteType">
            <el-select v-model="formData.siteType" placeholder="请选择驻点类型" class="w-full">
              <el-option label="写字楼" value="office" />
              <el-option label="小区" value="community" />
              <el-option label="工厂" value="factory" />
              <el-option label="学校" value="school" />
            </el-select>
          </el-form-item>

          <el-form-item label="关联项目" prop="relatedProject">
            <el-select v-model="formData.relatedProject" placeholder="无" class="w-full">
              <el-option label="项目A" value="projectA" />
            </el-select>
          </el-form-item>

          <el-form-item label="所属客户" prop="customerId">
            <el-select
              v-model="formData.customerId"
              placeholder="无"
              class="w-full"
              filterable
              remote
              :remote-method="searchCustomer"
            >
              <el-option
                v-for="item in customerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 右侧地图 -->
        <el-col :span="12">
          <div class="map-container">
            <div class="map-title">定位置</div>
            <div class="map-subtitle">划定安保将保护的区域</div>
            <div id="site-map-container" ref="mapContainerRef" class="map-placeholder"></div>
            <div class="map-tip">
              <el-icon><Pointer /></el-icon> 左键点击地图选点，右键点击标记查看详情
            </div>
          </div>
        </el-col>
      </el-row>

      <el-divider />

      <!-- 第二部分：合同与管理信息 -->
      <div class="section-block">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同名称" prop="contractName">
              <el-select v-model="formData.contractName" placeholder="无" class="w-full">
                <el-option label="合同A" value="contractA" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设置地理围栏" prop="geoFence">
              <el-switch v-model="formData.geoFence" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="人事经理" prop="hrManager">
              <el-select
                v-model="formData.hrManager"
                placeholder="请选择/搜索"
                filterable
                class="w-full"
              >
                <el-option label="经理A" value="managerA" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属片区" prop="area">
              <el-select v-model="formData.area" placeholder="请选择" class="w-full">
                <el-option label="东区" value="east" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="运营部门" prop="department">
              <el-select v-model="formData.department" placeholder="请选择" class="w-full">
                <el-option label="运营一部" value="dept1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分管领导" prop="leader">
              <el-select
                v-model="formData.leader"
                placeholder="请选择/搜索"
                filterable
                class="w-full"
              >
                <el-option label="领导A" value="leaderA" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="区域经理" prop="areaManager">
              <el-select
                v-model="formData.areaManager"
                placeholder="请选择/搜索"
                filterable
                class="w-full"
              >
                <el-option label="经理B" value="managerB" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="内部备注" prop="internalRemark">
              <el-input
                v-model="formData.internalRemark"
                type="textarea"
                rows="3"
                placeholder="输入内容 (仅内部可见)"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <el-divider />

      <!-- 第三部分：派出所与联系人 -->
      <div class="section-block">
        <el-form-item label="所在派出所" prop="policeStation">
          <el-input v-model="formData.policeStation" maxlength="30" show-word-limit />
        </el-form-item>
        <el-form-item label="派出所地址" prop="policeStationAddress">
          <el-input v-model="formData.policeStationAddress" maxlength="30" show-word-limit />
        </el-form-item>
        <el-form-item label="派出所联系人" prop="policeContact">
          <el-input v-model="formData.policeContact" maxlength="30" show-word-limit />
        </el-form-item>
        <el-form-item label="派出所电话" prop="policePhone">
          <el-input v-model="formData.policePhone" maxlength="30" show-word-limit />
        </el-form-item>
        <el-form-item label="村/居委会" prop="committee">
          <el-input
            v-model="formData.committee"
            placeholder="请输入"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="办公室号码" prop="officePhone">
          <el-input
            v-model="formData.officePhone"
            placeholder="请输入"
            maxlength="20"
            show-word-limit
          />
        </el-form-item>

        <!-- 动态联系人 -->
        <div class="contacts-list">
          <div v-for="(contact, index) in formData.contacts" :key="index" class="contact-item">
            <el-form-item
              label="联系人"
              :prop="'contacts.' + index + '.name'"
              :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }"
            >
              <el-row :gutter="10" class="w-full">
                <el-col :span="4">
                  <el-select v-model="contact.type" placeholder="请选择">
                    <el-option label="负责人" value="leader" />
                    <el-option label="联络员" value="liaison" />
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="contact.name" placeholder="输入姓名">
                    <template #suffix>0/10</template>
                  </el-input>
                </el-col>
                <el-col :span="7">
                  <el-input v-model="contact.idCard" placeholder="输入身份证号">
                    <template #suffix>0/18</template>
                  </el-input>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="contact.phone" placeholder="输入手机号">
                    <template #suffix>0/11</template>
                  </el-input>
                </el-col>
                <el-col :span="2" class="text-center">
                  <el-button type="text" :icon="Close" @click="removeContact(index)" />
                </el-col>
              </el-row>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="text" class="add-contact-btn" :icon="Plus" @click="addContact"
              >添加联系人</el-button
            >
          </el-form-item>
        </div>
      </div>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" :loading="submitting" class="submit-btn" @click="handleSubmit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch, reactive, onUnmounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { Location, Pointer, Close, Plus } from '@element-plus/icons-vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import * as siteApi from '@/api/site'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  siteId: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'success'])

const visible = defineModel('modelValue', {
  type: Boolean,
  default: false
})

const formRef = ref(null)
const submitting = ref(false)
const isEdit = computed(() => !!props.siteId)
const customerOptions = ref([])
const personOptions = ref([])
const mapContainerRef = ref(null)
let map = null
let marker = null
let placeSearch = null
let geocoder = null
let AMapInstance = null
let infoWindow = null

const formData = ref({
  // 第一部分
  siteName: '',
  address: '',
  longitude: '',
  latitude: '',
  entryDate: '',
  manager: '',
  siteType: '',
  relatedProject: '',
  customerId: '',

  // 第二部分
  contractName: '',
  geoFence: false,
  hrManager: '',
  area: '',
  department: '',
  leader: '',
  areaManager: '',
  internalRemark: '',

  // 第三部分
  policeStation: '',
  policeStationAddress: '',
  policeContact: '',
  policePhone: '',
  committee: '',
  officePhone: '',
  contacts: [{ type: '', name: '', idCard: '', phone: '' }]
})

const rules = reactive({
  siteName: [{ required: true, message: '请输入驻点名称', trigger: 'blur' }],
  address: [{ required: true, message: '请输入驻点地址', trigger: 'change' }],
  entryDate: [{ required: true, message: '请选择进场日期', trigger: 'change' }],
  manager: [{ required: true, message: '请选择负责人', trigger: 'change' }],
  siteType: [{ required: true, message: '请选择驻点类型', trigger: 'change' }]
})

watch(visible, (val) => {
  if (val) {
    // 等待弹窗完全打开后再初始化地图
    nextTick(() => {
      setTimeout(() => {
        if (!map) {
          initMap()
        } else {
          // 如果地图已存在，调整大小
          try {
            map.getSize()
            map.resize()
          } catch (e) {
            console.warn('地图调整大小失败，重新初始化:', e)
            initMap()
          }
        }
        if (props.siteId) {
          loadSiteData()
        } else {
          resetForm()
        }
      }, 300)
    })
  } else {
    // 弹窗关闭时，清理标记和信息窗体但不销毁地图（保留以便下次使用）
    if (infoWindow) {
      try {
        infoWindow.close()
        infoWindow = null
      } catch (e) {
        console.warn('清理信息窗体失败:', e)
      }
    }
    if (marker) {
      try {
        map?.remove(marker)
        marker = null
      } catch (e) {
        console.warn('清理标记失败:', e)
      }
    }
  }
})

// 监听经纬度变化，更新地图标记
watch(
  () => [formData.value.longitude, formData.value.latitude],
  ([lng, lat]) => {
    if (lng && lat && map) {
      updateMarker(parseFloat(lng), parseFloat(lat))
    }
  }
)

const loadSiteData = async () => {
  try {
    const res = await siteApi.getSiteDetail(props.siteId)
    formData.value = res.data
    if (res.data.customerId) {
      customerOptions.value = [{ value: res.data.customerId, label: res.data.customerName }]
    }
    // 如果有经纬度，更新地图标记
    if (res.data.longitude && res.data.latitude && map) {
      nextTick(() => {
        updateMarker(parseFloat(res.data.longitude), parseFloat(res.data.latitude))
      })
    }
  } catch (error) {
    ElMessage.error('加载驻点数据失败')
  }
}

const resetForm = () => {
  formData.value = {
    siteName: '',
    address: '',
    longitude: '',
    latitude: '',
    entryDate: '',
    manager: '',
    siteType: '',
    relatedProject: '',
    customerId: '',
    contractName: '',
    geoFence: false,
    hrManager: '',
    area: '',
    department: '',
    leader: '',
    areaManager: '',
    internalRemark: '',
    policeStation: '',
    policeStationAddress: '',
    policeContact: '',
    policePhone: '',
    committee: '',
    officePhone: '',
    contacts: [{ type: '', name: '', idCard: '', phone: '' }]
  }
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

const searchCustomer = (query) => {
  if (query) {
    setTimeout(() => {
      customerOptions.value = [
        { value: 'cust1', label: '模拟客户A' },
        { value: 'cust2', label: '模拟客户B' }
      ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    }, 200)
  }
}

const searchPerson = (query) => {
  if (query) {
    setTimeout(() => {
      personOptions.value = [
        { value: 'p1', label: '张三' },
        { value: 'p2', label: '李四' }
      ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    }, 200)
  }
}

// 地图相关函数
const initMap = () => {
  if (!mapContainerRef.value) {
    console.warn('地图容器未找到')
    return
  }

  // 检查容器是否可见
  const container = mapContainerRef.value
  if (container.offsetWidth === 0 || container.offsetHeight === 0) {
    console.warn('地图容器尺寸为0，延迟初始化')
    setTimeout(() => initMap(), 200)
    return
  }

  // 如果地图已存在，先销毁
  if (map) {
    map.destroy()
    map = null
    marker = null
  }

  // 设置安全密钥
  window._AMapSecurityConfig = {
    securityJsCode: '7860a7edc7c1251e501ddb5e21f13903'
  }

  AMapLoader.load({
    key: '286f829f8abea768cd5183f73d3bc546',
    version: '2.0',
    plugins: ['AMap.PlaceSearch', 'AMap.Geocoder']
  })
    .then((AMap) => {
      AMapInstance = AMap
      map = new AMap.Map('site-map-container', {
        zoom: 13,
        center: [120.38, 36.06], // 默认青岛中心
        mapStyle: 'amap://styles/normal'
      })

      // 初始化地点搜索
      placeSearch = new AMap.PlaceSearch({
        city: '全国',
        citylimit: false
      })

      // 初始化地理编码
      geocoder = new AMap.Geocoder()

      // 地图左键点击事件 - 选点
      map.on('click', (e) => {
        const { lng, lat } = e.lnglat
        formData.value.longitude = lng.toFixed(6)
        formData.value.latitude = lat.toFixed(6)
        updateMarker(lng, lat)
        // 逆地理编码获取地址
        geocoder.getAddress([lng, lat], (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            formData.value.address = result.regeocode.formattedAddress
          }
        })
      })

      // 地图加载完成后调整大小
      map.on('complete', () => {
        map.getSize()
        map.resize()
      })

      // 如果有经纬度，显示标记
      if (formData.value.longitude && formData.value.latitude) {
        updateMarker(parseFloat(formData.value.longitude), parseFloat(formData.value.latitude))
      } else {
        // 延迟调整大小，确保容器已渲染
        setTimeout(() => {
          map.getSize()
          map.resize()
        }, 100)
      }
    })
    .catch((e) => {
      console.error('地图加载失败:', e)
      ElMessage.error('地图加载失败，请检查网络连接或联系管理员')
    })
}

// 地址搜索
const searchAddress = (queryString, cb) => {
  if (!queryString || !placeSearch) {
    cb([])
    return
  }

  placeSearch.search(queryString, (status, result) => {
    if (status === 'complete' && result.poiList) {
      const suggestions = result.poiList.pois.map((poi) => ({
        value: poi.name + (poi.address ? ' ' + poi.address : ''),
        address: poi.address,
        location: poi.location,
        lng: poi.location.lng,
        lat: poi.location.lat
      }))
      cb(suggestions)
    } else {
      cb([])
    }
  })
}

// 地址选择处理
const handleAddressSelect = (item) => {
  if (item.lng && item.lat) {
    formData.value.longitude = item.lng.toFixed(6)
    formData.value.latitude = item.lat.toFixed(6)
    // item.value 已经包含了完整的地址信息（名称 + 地址）
    formData.value.address = item.value
    // 更新地图标记并定位到该位置
    updateMarker(item.lng, item.lat)
  }
}

// 更新地图标记
const updateMarker = (lng, lat) => {
  if (!map || !AMapInstance) return

  // 关闭已存在的信息窗体
  if (infoWindow) {
    infoWindow.close()
    infoWindow = null
  }

  // 移除旧标记
  if (marker) {
    map.remove(marker)
    marker.off('rightclick', handleMarkerRightClick)
  }

  // 创建新标记
  marker = new AMapInstance.Marker({
    position: [lng, lat],
    title: formData.value.siteName || '驻点位置'
  })

  // 标记右键点击事件 - 查看详细信息
  marker.on('rightclick', handleMarkerRightClick)

  map.add(marker)
  map.setCenter([lng, lat])
  map.setZoom(15)
}

// 标记点右键点击处理 - 查看详细信息
const handleMarkerRightClick = (e) => {
  if (!map || !AMapInstance || !marker) return

  // 高德地图的事件对象可能没有 stopPropagation，但标记点事件不会冒泡到地图
  if (e && typeof e.stopPropagation === 'function') {
    e.stopPropagation()
  }

  const { lng, lat } = marker.getPosition()

  // 构建信息窗体内容
  const content = `
    <div style="padding: 10px; min-width: 200px;">
      <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold; color: #303133;">标记点详细信息</h3>
      <div style="line-height: 24px; font-size: 14px; color: #606266;">
        <p style="margin: 5px 0;"><strong style="color: #303133;">驻点名称：</strong>${formData.value.siteName || '未设置'}</p>
        <p style="margin: 5px 0;"><strong style="color: #303133;">地址：</strong>${formData.value.address || '未设置'}</p>
        <p style="margin: 5px 0;"><strong style="color: #303133;">经度：</strong>${lng.toFixed(6)}</p>
        <p style="margin: 5px 0;"><strong style="color: #303133;">纬度：</strong>${lat.toFixed(6)}</p>
        <p style="margin: 5px 0;"><strong style="color: #303133;">驻点类型：</strong>${getSiteTypeLabel(formData.value.siteType)}</p>
      </div>
    </div>
  `

  // 关闭已存在的信息窗体
  if (infoWindow) {
    infoWindow.close()
  }

  // 创建信息窗体
  infoWindow = new AMapInstance.InfoWindow({
    content: content,
    offset: new AMapInstance.Pixel(0, -30),
    closeWhenClickMap: true // 点击地图关闭信息窗体
  })

  // 在标记点位置打开信息窗体
  infoWindow.open(map, [lng, lat])
}

// 获取驻点类型标签
const getSiteTypeLabel = (type) => {
  const typeMap = {
    office: '写字楼',
    community: '小区',
    factory: '工厂',
    school: '学校'
  }
  return typeMap[type] || '未设置'
}

const addContact = () => {
  formData.value.contacts.push({ type: '', name: '', idCard: '', phone: '' })
}

const removeContact = (index) => {
  formData.value.contacts.splice(index, 1)
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true

    if (isEdit.value) {
      await siteApi.updateSite(props.siteId, formData.value)
      ElMessage.success('更新成功')
    } else {
      await siteApi.addSite(formData.value)
      ElMessage.success('新增成功')
    }

    emit('success')
    handleClose()
  } catch (error) {
    console.error(error)
  } finally {
    submitting.value = false
  }
}

const handleClose = () => {
  visible.value = false
}

onUnmounted(() => {
  if (infoWindow) {
    infoWindow.close()
    infoWindow = null
  }
  if (map) {
    map.destroy()
    map = null
    marker = null
    placeSearch = null
    geocoder = null
  }
})
</script>

<style scoped>
.site-dialog :deep(.el-dialog__body) {
  padding: 20px 30px;
  max-height: 70vh;
  overflow-y: auto;
}

.site-form {
  padding-right: 10px;
}

.w-full {
  width: 100%;
}

.lat-lng-display {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

.map-container {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.map-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
}

.map-subtitle {
  font-size: 12px;
  color: #909399;
  margin-bottom: 10px;
}

.map-placeholder {
  width: 100%;
  height: 400px;
  background-color: #e2e6ec;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.map-tip {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  color: #909399;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-tip .el-icon {
  margin-right: 5px;
}

:deep(.amap-logo),
:deep(.amap-copyright) {
  display: none !important;
}

.submit-btn {
  width: 100px;
  background-color: #ff5722;
  border-color: #ff5722;
}
.submit-btn:hover {
  background-color: #ff7043;
  border-color: #ff7043;
}

.add-contact-btn {
  color: #ff5722;
}

.contact-item {
  margin-bottom: 10px;
}

.section-block {
  margin-top: 10px;
}
</style>
