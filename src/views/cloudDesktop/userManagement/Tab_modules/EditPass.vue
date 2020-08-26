<template>
  <a-modal
    title="重置密码"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item
          label="密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            type="password"
            placeholder="请输入密码"
            v-decorator="['password',
                          { rules: [
                              { required: true, message: '请输入密码' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="确认密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            type="password"
            placeholder="请再次输入密码"
            v-decorator="['confirmPassword',
                          { rules: [
                              { required: true, message: '请再次输入密码' },
                              { validator:confirmPassword}
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
import { usermanageEditpassword } from '@/api/CloudDesktop/userManage'
export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
        departmentList: [],
        record: {}
    }
  },
  methods: {
    Edit (record) {
        this.record = {}
        this.record.name = record.username
        this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
          this.confirmLoading = true
        if (!errors) {
        this.record.password = values.password
        console.log(this.record)
        usermanageEditpassword(this.record).then(res => {
        this.$message.success('修改成功')
        this.$emit('ok')
        this.visible = false
        })
        this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    confirmPassword (rule, value, callback) {
        const password = this.form.getFieldValue('password')
        if (value !== password) {
            callback(new Error('两次密码输入不正确，请重新输入'))
        }
        callback()
    }
  }
}
</script>

<style>
</style>
