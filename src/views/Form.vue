<template>
  <div class="space-y-6">
    <el-card shadow="hover">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-lg font-semibold">表单演示页面</span>
          <el-tag type="success">Form Demo</el-tag>
        </div>
      </template>

      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px" class="max-w-2xl">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" clearable />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" clearable />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
            clearable
          />
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="兴趣爱好" prop="hobbies">
          <el-checkbox-group v-model="formData.hobbies">
            <el-checkbox label="reading">阅读</el-checkbox>
            <el-checkbox label="music">音乐</el-checkbox>
            <el-checkbox label="sports">运动</el-checkbox>
            <el-checkbox label="travel">旅行</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="城市" prop="city">
          <el-select v-model="formData.city" placeholder="请选择城市" style="width: 100%">
            <el-option label="北京" value="beijing" />
            <el-option label="上海" value="shanghai" />
            <el-option label="广州" value="guangzhou" />
            <el-option label="深圳" value="shenzhen" />
          </el-select>
        </el-form-item>

        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="formData.birthday"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-select v-model="formData.role" placeholder="请选择角色" style="width: 100%">
            <el-option label="管理员" value="admin" />
            <el-option label="编辑" value="editor" />
            <el-option label="用户" value="user" />
          </el-select>
        </el-form-item>

        <el-form-item label="个人简介" prop="bio">
          <el-input
            v-model="formData.bio"
            type="textarea"
            :rows="4"
            placeholder="请输入个人简介"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="是否同意协议" prop="agreement">
          <el-switch v-model="formData.agreement" />
          <span class="ml-2 text-gray-500">我已阅读并同意相关协议</span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :icon="Check" @click="handleSubmit">提交</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
          <el-button :icon="View" @click="handlePreview">预览</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card v-if="previewData" shadow="hover">
      <template #header>
        <span class="text-lg font-semibold">表单数据预览</span>
      </template>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="用户名">{{ previewData.username }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ previewData.email }}</el-descriptions-item>
        <el-descriptions-item label="性别">
          {{ previewData.gender === 'male' ? '男' : '女' }}
        </el-descriptions-item>
        <el-descriptions-item label="城市">{{ previewData.city }}</el-descriptions-item>
        <el-descriptions-item label="生日">{{ previewData.birthday }}</el-descriptions-item>
        <el-descriptions-item label="角色">{{ previewData.role }}</el-descriptions-item>
        <el-descriptions-item label="兴趣爱好" :span="2">
          <el-tag v-for="hobby in previewData.hobbies" :key="hobby" class="mr-2">
            {{ getHobbyLabel(hobby) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="个人简介" :span="2">
          {{ previewData.bio || '无' }}
        </el-descriptions-item>
        <el-descriptions-item label="同意协议">
          <el-tag :type="previewData.agreement ? 'success' : 'danger'">
            {{ previewData.agreement ? '已同意' : '未同意' }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Check, Refresh, View } from '@element-plus/icons-vue'
const formRef = ref(null)
const previewData = ref(null)

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  hobbies: [],
  city: '',
  birthday: '',
  role: '',
  bio: '',
  agreement: false
})

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== formData.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  hobbies: [
    { type: 'array', required: true, message: '请至少选择一个兴趣爱好', trigger: 'change' }
  ],
  city: [{ required: true, message: '请选择城市', trigger: 'change' }],
  birthday: [{ required: true, message: '请选择生日', trigger: 'change' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  agreement: [{ required: true, message: '请同意相关协议', trigger: 'change' }]
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    ElMessage.success('表单验证通过，提交成功！')
    console.log('表单数据:', formData)
  } catch (error) {
    ElMessage.error('表单验证失败，请检查输入')
  }
}

const handleReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
  previewData.value = null
  ElMessage.info('表单已重置')
}

const handlePreview = () => {
  previewData.value = { ...formData }
  ElMessage.info('已生成预览数据')
}

const getHobbyLabel = (hobby) => {
  const hobbyMap = {
    reading: '阅读',
    music: '音乐',
    sports: '运动',
    travel: '旅行'
  }
  return hobbyMap[hobby] || hobby
}
</script>

<style scoped></style>
