<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? '编辑客户' : '新增客户'"
    width="900px"
    top="10vh"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="form-container">
      <el-tabs v-model="activeTab" class="customer-tabs">
        <el-tab-pane label="基本信息" name="basic">
          <div class="tab-content">
            <el-form
              ref="basicFormRef"
              :model="formData"
              :rules="rules"
              label-width="120px"
              class="inner-form"
            >
              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item label="客户名称" prop="customerName">
                    <el-input
                      v-model="formData.customerName"
                      placeholder="输入全称"
                      maxlength="50"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="客户简称" prop="customerShortName">
                    <el-input
                      v-model="formData.customerShortName"
                      placeholder="输入内容"
                      maxlength="10"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="客户编号" prop="customerCode">
                    <el-input
                      v-model="formData.customerCode"
                      placeholder="输入客户编号"
                      maxlength="20"
                      show-word-limit
                      :disabled="isEdit"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="客户类型" prop="customerType">
                    <el-select v-model="formData.customerType" placeholder="请选择" class="w-full">
                      <el-option label="企业客户" value="enterprise" />
                      <el-option label="政府客户" value="government" />
                      <el-option label="个人客户" value="personal" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="所在城市" prop="city">
                    <el-cascader
                      v-model="formData.city"
                      :options="cityOptions"
                      placeholder="请选择"
                      class="w-full"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="办公地址" prop="officeAddress">
                    <el-input
                      v-model="formData.officeAddress"
                      placeholder="输入内容"
                      maxlength="50"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="上级单位" prop="parentUnit">
                    <el-input
                      v-model="formData.parentUnit"
                      placeholder="输入内容"
                      maxlength="50"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="公司信息" name="company">
          <div class="tab-content">
            <el-form :model="formData" label-width="140px" class="inner-form">
              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item label="统一社会信用代码" prop="creditCode">
                    <el-input
                      v-model="formData.creditCode"
                      placeholder="输入内容"
                      maxlength="18"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="公司规模" prop="companyScale">
                    <el-input
                      v-model="formData.companyScale"
                      placeholder="输入内容"
                      maxlength="50"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="成立年份" prop="establishYear">
                    <el-date-picker
                      v-model="formData.establishYear"
                      type="year"
                      placeholder="选择年"
                      class="w-full"
                      value-format="YYYY"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="公司介绍" prop="companyIntroduction">
                    <el-input
                      v-model="formData.companyIntroduction"
                      type="textarea"
                      rows="4"
                      placeholder="输入内容"
                      maxlength="500"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="开票信息" name="invoice">
          <div class="tab-content">
            <el-form :model="formData" label-width="120px" class="inner-form">
              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item label="发票抬头" prop="invoiceTitle">
                    <el-input
                      v-model="formData.invoiceTitle"
                      placeholder="输入内容"
                      maxlength="50"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="税号" prop="taxNumber">
                    <el-input
                      v-model="formData.taxNumber"
                      placeholder="输入内容"
                      maxlength="30"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="电话" prop="invoicePhone">
                    <el-input
                      v-model="formData.invoicePhone"
                      placeholder="输入内容"
                      maxlength="50"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="开票地址" prop="invoiceAddress">
                    <el-input
                      v-model="formData.invoiceAddress"
                      placeholder="输入内容"
                      maxlength="50"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="开户银行" prop="bankName">
                    <el-input
                      v-model="formData.bankName"
                      placeholder="输入内容"
                      maxlength="50"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="银行账户" prop="bankAccount">
                    <el-input
                      v-model="formData.bankAccount"
                      placeholder="输入内容"
                      maxlength="30"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="联行号" prop="bankCode">
                    <el-input
                      v-model="formData.bankCode"
                      placeholder="输入内容"
                      maxlength="50"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="行业类型" prop="industryType">
                    <el-input
                      v-model="formData.industryType"
                      placeholder="输入内容"
                      maxlength="20"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="开票备注" prop="invoiceRemark">
                    <el-input
                      v-model="formData.invoiceRemark"
                      placeholder="输入内容"
                      maxlength="50"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="联系人" name="contact">
          <div class="tab-content">
            <el-form :model="formData" label-width="120px" class="inner-form">
              <el-form-item label="办公室号码" prop="officePhone">
                <el-input
                  v-model="formData.officePhone"
                  placeholder="输入内容"
                  maxlength="18"
                  show-word-limit
                />
              </el-form-item>

              <div class="contacts-wrapper">
                <div v-for="(contact, index) in formData.contacts" :key="index" class="contact-row">
                  <el-row :gutter="12">
                    <el-col :span="6">
                      <el-form-item label-width="0">
                        <el-select v-model="contact.type" placeholder="请选择">
                          <el-option label="选择" value="select" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label-width="0">
                        <el-input v-model="contact.name" placeholder="输入姓名">
                          <template #suffix>0/10</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label-width="0">
                        <el-select v-model="contact.gender" placeholder="男">
                          <el-option label="男" value="male" />
                          <el-option label="女" value="female" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label-width="0">
                        <el-input v-model="contact.phone" placeholder="输入电话">
                          <template #suffix>0/11</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2" class="text-center">
                      <el-button
                        type="text"
                        icon="Close"
                        class="delete-btn"
                        @click="removeContact(index)"
                      />
                    </el-col>
                  </el-row>
                </div>
                <div class="add-contact">
                  <el-button type="text" class="add-btn" @click="addContact">
                    <span class="plus-icon">+</span> 添加联系人
                  </el-button>
                </div>
              </div>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="内部备注" name="internal">
          <div class="tab-content">
            <el-form :model="formData" label-width="120px" class="inner-form">
              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item label="客户分级" prop="customerLevel">
                    <el-radio-group v-model="formData.customerLevel">
                      <el-radio label="general">一般客户</el-radio>
                      <el-radio label="important">重点客户</el-radio>
                      <el-radio label="potential">潜在客户</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="客户状态" prop="status">
                    <el-radio-group v-model="formData.status">
                      <el-radio label="signed">已签约</el-radio>
                      <el-radio label="unsigned">未签约</el-radio>
                      <el-radio label="cancelled">已撤点</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="内部备注" prop="internalRemark">
                    <el-input
                      v-model="formData.internalRemark"
                      type="textarea"
                      rows="4"
                      placeholder="输入内容 (仅内部可见)"
                      maxlength="500"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="选择驻点" prop="sites">
                    <el-select
                      v-model="formData.sites"
                      multiple
                      placeholder="请选择"
                      class="w-full"
                    >
                      <el-option label="驻点A" value="siteA" />
                      <el-option label="驻点B" value="siteB" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="驻点信息" name="site">
          <div class="tab-content">
            <!-- 驻点信息内容，可能是列表或者只读展示 -->
            <el-empty description="暂无驻点信息" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" :loading="submitting" @click="handleSubmit"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import * as customerApi from '@/api/customer'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  customerId: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'success'])

const visible = defineModel('modelValue', {
  type: Boolean,
  default: false
})

const activeTab = ref('basic')
const basicFormRef = ref(null)
const submitting = ref(false)
const isEdit = computed(() => !!props.customerId)

// 省市区数据（模拟）
const cityOptions = [
  {
    value: 'guangdong',
    label: '广东省',
    children: [
      { value: 'guangzhou', label: '广州市' },
      { value: 'shenzhen', label: '深圳市' }
    ]
  },
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      { value: 'hangzhou', label: '杭州市' },
      { value: 'ningbo', label: '宁波市' }
    ]
  }
]

const formData = ref({
  // 基本信息
  customerName: '',
  customerShortName: '',
  customerCode: '',
  customerType: '',
  city: [],
  officeAddress: '',
  parentUnit: '',
  // 公司信息
  creditCode: '',
  companyScale: '',
  establishYear: '',
  companyIntroduction: '',
  // 开票信息
  invoiceTitle: '',
  taxNumber: '',
  invoicePhone: '',
  bankName: '',
  bankAccount: '',
  bankCode: '',
  invoiceAddress: '',
  industryType: '',
  invoiceRemark: '',
  // 联系人
  officePhone: '',
  contacts: [{ type: '', name: '', gender: 'male', phone: '' }],
  // 内部备注
  customerLevel: 'general',
  status: 'signed',
  internalRemark: '',
  sites: []
})

const rules = reactive({
  customerName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
  customerCode: [{ required: true, message: '请输入客户编号', trigger: 'blur' }],
  customerType: [{ required: true, message: '请选择客户类型', trigger: 'change' }],
  city: [{ required: true, message: '请选择所在城市', trigger: 'change' }]
})

watch(visible, (val) => {
  if (val) {
    activeTab.value = 'basic'
    if (props.customerId) {
      loadCustomerData()
    } else {
      resetForm()
    }
  }
})

const loadCustomerData = async () => {
  try {
    const res = await customerApi.getCustomerDetail(props.customerId)
    formData.value = res.data
  } catch (error) {
    ElMessage.error('加载客户数据失败')
  }
}

const resetForm = () => {
  formData.value = {
    customerName: '',
    customerShortName: '',
    customerCode: '',
    customerType: '',
    city: [],
    officeAddress: '',
    parentUnit: '',
    creditCode: '',
    companyScale: '',
    establishYear: '',
    companyIntroduction: '',
    invoiceTitle: '',
    taxNumber: '',
    invoicePhone: '',
    bankName: '',
    bankAccount: '',
    bankCode: '',
    invoiceAddress: '',
    industryType: '',
    invoiceRemark: '',
    officePhone: '',
    contacts: [{ type: '', name: '', gender: 'male', phone: '' }],
    customerLevel: 'general',
    status: 'signed',
    internalRemark: '',
    sites: []
  }
  if (basicFormRef.value) {
    basicFormRef.value.resetFields()
  }
}

const addContact = () => {
  formData.value.contacts.push({
    type: '',
    name: '',
    gender: 'male',
    phone: ''
  })
}

const removeContact = (index) => {
  formData.value.contacts.splice(index, 1)
}

const handleSubmit = async () => {
  try {
    // 简单验证基本信息，实际可以遍历所有 tab 验证
    if (basicFormRef.value) {
      await basicFormRef.value.validate()
    }

    submitting.value = true

    if (isEdit.value) {
      await customerApi.updateCustomer(props.customerId, formData.value)
      ElMessage.success('更新成功')
    } else {
      await customerApi.addCustomer(formData.value)
      ElMessage.success('新增成功')
    }

    emit('success')
    handleClose()
  } catch (error) {
    if (error && error.message) {
      // 切换到基本信息 tab 如果错误在那里
      activeTab.value = 'basic'
      ElMessage.warning('请检查基本信息填写是否正确')
    }
  } finally {
    submitting.value = false
  }
}

const handleClose = () => {
  visible.value = false
}
</script>

<style scoped>
.form-container {
  padding: 0 20px;
}

.customer-tabs :deep(.el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: #e4e7ed;
}

.customer-tabs :deep(.el-tabs__item) {
  font-size: 14px;
  color: #606266;
  font-weight: normal;
}

.customer-tabs :deep(.el-tabs__item.is-active) {
  color: #ff5722; /* 使用图片中的橙色高亮 */
  font-weight: bold;
}

.customer-tabs :deep(.el-tabs__active-bar) {
  background-color: #ff5722;
}

.tab-content {
  padding-top: 20px;
  min-height: 400px;
}

.inner-form {
  max-width: 800px;
  margin: 0 auto;
}

.w-full {
  width: 100%;
}

.contacts-wrapper {
  margin-left: 120px; /* 对齐 label */
}

.contact-row {
  margin-bottom: 10px;
}

.delete-btn {
  color: #909399;
}

.delete-btn:hover {
  color: #f56c6c;
}

.add-btn {
  color: #ff5722;
}

.plus-icon {
  font-weight: bold;
  margin-right: 4px;
}

.dialog-footer {
  text-align: center;
  padding-top: 10px;
}

:deep(.el-button--primary) {
  background-color: #ff5722;
  border-color: #ff5722;
}

:deep(.el-button--primary:hover) {
  background-color: #ff7043;
  border-color: #ff7043;
}
</style>
