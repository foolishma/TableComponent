<template>
  <el-dialog v-model="visible" title="客户评价" width="600px" @close="handleClose">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="评价列表" name="list">
        <el-table v-loading="loading" :data="evaluations" stripe style="width: 100%">
          <el-table-column prop="evaluateTime" label="评价时间" width="160" />
          <el-table-column prop="type" label="类型" width="100">
            <template #default="{ row }">
              <el-tag :type="row.type === 'site' ? 'success' : 'warning'">
                {{ row.type === 'site' ? '驻点' : '保安' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="targetName" label="评价对象" width="120" />
          <el-table-column prop="score" label="评分" width="140">
            <template #default="{ row }">
              <el-rate v-model="row.score" disabled show-score text-color="#ff9900" />
            </template>
          </el-table-column>
          <el-table-column prop="content" label="评价内容" show-overflow-tooltip />
        </el-table>

        <div class="mt-4 text-center">
          <el-button type="primary" @click="activeTab = 'add'">新增评价</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="新增评价" name="add">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
          <el-form-item label="评价类型" prop="type">
            <el-radio-group v-model="formData.type">
              <el-radio label="site">驻点评价</el-radio>
              <el-radio label="guard">保安评价</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="formData.type === 'site' ? '选择驻点' : '选择保安'" prop="targetId">
            <el-select
              v-model="formData.targetId"
              :placeholder="formData.type === 'site' ? '请选择驻点' : '请选择保安'"
              class="w-full"
            >
              <el-option
                v-for="item in targetOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="评分" prop="score">
            <el-rate v-model="formData.score" show-text />
          </el-form-item>

          <el-form-item label="评价内容" prop="content">
            <el-input
              v-model="formData.content"
              type="textarea"
              rows="4"
              placeholder="请输入评价内容"
            />
          </el-form-item>

          <el-form-item>
            <el-button @click="activeTab = 'list'">取消</el-button>
            <el-button type="primary" :loading="submitting" @click="handleSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
import * as customerApi from '@/api/customer'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  customerId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const visible = defineModel('modelValue', {
  type: Boolean,
  default: false
})

const activeTab = ref('list')
const loading = ref(false)
const submitting = ref(false)
const evaluations = ref([])
const formRef = ref(null)

const formData = ref({
  type: 'site',
  targetId: '',
  score: 5,
  content: ''
})

// 模拟选项数据
const targetOptions = computed(() => {
  if (formData.value.type === 'site') {
    return [
      { label: '驻点A', value: '1' },
      { label: '驻点B', value: '2' }
    ]
  } else {
    return [
      { label: '保安张三', value: '101' },
      { label: '保安李四', value: '102' }
    ]
  }
})

const rules = {
  type: [{ required: true, message: '请选择评价类型', trigger: 'change' }],
  targetId: [{ required: true, message: '请选择评价对象', trigger: 'change' }],
  score: [{ required: true, message: '请评分', trigger: 'change' }],
  content: [{ required: true, message: '请输入评价内容', trigger: 'blur' }]
}

watch(visible, (val) => {
  if (val) {
    loadEvaluations()
    activeTab.value = 'list'
  }
})

watch(
  () => formData.value.type,
  () => {
    formData.value.targetId = ''
  }
)

const loadEvaluations = async () => {
  loading.value = true
  try {
    const res = await customerApi.getCustomerEvaluations(props.customerId)
    evaluations.value = res.data || []

    // 如果没有数据，使用模拟数据演示
    if (evaluations.value.length === 0) {
      evaluations.value = [
        {
          evaluateTime: '2023-10-01 12:00:00',
          type: 'site',
          targetName: '驻点A',
          score: 4.5,
          content: '服务很好，响应及时'
        },
        {
          evaluateTime: '2023-10-05 09:30:00',
          type: 'guard',
          targetName: '保安张三',
          score: 5,
          content: '工作认真负责'
        }
      ]
    }
  } catch (error) {
    // ElMessage.error('加载评价列表失败')
    // 模拟数据
    evaluations.value = [
      {
        evaluateTime: '2023-10-01 12:00:00',
        type: 'site',
        targetName: '驻点A',
        score: 4.5,
        content: '服务很好，响应及时'
      }
    ]
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true
      try {
        await customerApi.addCustomerEvaluation({
          customerId: props.customerId,
          ...formData.value
        })
        ElMessage.success('评价成功')
        // 刷新列表
        loadEvaluations()
        activeTab.value = 'list'
        // 重置表单
        formData.value = {
          type: 'site',
          targetId: '',
          score: 5,
          content: ''
        }
      } catch (error) {
        ElMessage.error('评价失败')
      } finally {
        submitting.value = false
      }
    }
  })
}

const handleClose = () => {
  visible.value = false
}
</script>
