<template>
  <a-modal
    title="新增用户信息"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item
          label="姓名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入名称"
            v-decorator="['name',
                          { rules: [
                              { required: true, message: '请输入名称！' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="组"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select
            placeholder="请选择组"
            v-decorator="['group', { rules: [{ required: true, message: '请选择对应的组' }] }]">
            <a-select-option
              v-for="item in groupList"
              :key="deepGet(item, 'id')"
              :value="deepGet(item, 'id')">{{ deepGet(item, 'name') }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="联系电话"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入电话"
            v-decorator="['tel',
                          { rules: [
                              { required: true, message: '请输入电话' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="部门"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select
            placeholder="请选择部门"
            v-decorator="['department', { rules: [{ required: true, message: '请选择部门' }] }]">
            <a-select-option
              v-for="item in departmentList"
              :key="deepGet(item, 'id')"
              :value="deepGet(item, 'id')">{{ deepGet(item, 'name') }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="用户名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入用户名"
            v-decorator="['username',
                          { rules: [
                              { required: true, message: '请输入用户名' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入密码"
            v-decorator="['password',
                          { rules: [
                              { required: true, message: '请输入密码' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入邮箱"
            v-decorator="['password',
                          { rules: [
                              { required: true, message: '请输入邮箱' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入邮箱"
            v-decorator="['password',
                          { rules: [
                              { required: true, message: '请输入邮箱' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
        groupList: [
            {
                id: 1,
                name: 'one'
            },
            {
                id: 2,
                name: 'to'
            }
        ],
        departmentList: []
    }
  },
  methods: {
    add () {
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          console.log('todo...')
        this.visible = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style>
</style>
