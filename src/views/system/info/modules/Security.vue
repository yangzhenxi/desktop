<template>
  <div class="user-wrapper">
    <div class="header-wrapper">
      <span class="title">修改密码</span>
    </div>
    <a-form :form="form" hideRequiredMark @submit.prevent="handleSubmit">
      <a-form-item
        label="旧密码"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :colon="false"
      >
        <a-input-password
          placeholder="请输入旧密码"
          v-decorator="['old', { rules: [{required: true, message: '请输入旧密码！'}], validateTrigger: ['change', 'blur']}]" />
      </a-form-item>
      <a-form-item
        label="新密码"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :colon="false"
      >
        <a-input-password
          placeholder="请输入新密码"
          v-decorator="['new', { rules: [{required: true, message: '请输入新密码！'},{min: 6,max:40, message: '密码长度为6-40'}, {validator: this.handlePasswordValidator}], validateTrigger: ['change', 'blur']}]" />
      </a-form-item>
      <a-form-item
        label="重复密码"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :colon="false"
      >
        <a-input-password
          placeholder="请再输入一次新密码"
          v-decorator="['repeatPassword', { rules: [{required: true, message: '请再输入一次新密码！'}, {validator: this.handleRePasswordValidator}], validateTrigger: ['change', 'blur']}]" />
      </a-form-item>
      <a-form-item
        :wrapper-col="{ span: 3, offset: 21 }"
      >
        <a-button type="primary" :loading="confirmLoading" htmlType="submit">确认</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { PageView } from '@/layouts'
import { systemUserPatchPassword } from '@/api/system/user'

export default {
  name: 'UserCenterBase',
  components: {
    PageView
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 5 },
        lg: { span: 3 },
        xl: { span: 3 },
        xxl: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      form: this.$form.createForm(this),
      confirmLoading: false
    }
  },
  methods: {
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          try {
            this.confirmLoading = true
            await systemUserPatchPassword(values)
            this.$message.success('修改密码成功, 即将退出登录！')
            this.confirmLoading = false
            this.$store.dispatch('Logout').then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 1000)
            })
          } catch (error) {
            this.confirmLoading = false
          }
        }
      })
    },
    handlePasswordValidator (rule, value, callback) {
      const oldPassword = this.form.getFieldValue('old_password')
      if (value && oldPassword && value.trim() === oldPassword.trim()) {
        callback(new Error('新的密码不能和旧的相同！'))
      }
      callback()
    },
    handleRePasswordValidator (rule, value, callback) {
        console.log(value)
      const newPassword = this.form.getFieldValue('new')
      if (value && newPassword && value.trim() !== newPassword.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    }
  }
}
</script>

<style lang="less" scoped>
  .user-wrapper {
    .header-wrapper {
      margin-bottom: 16px;
      .title {
        font-weight: 600;
      }
    }
    /deep/ .ant-form-item-label label{
      color: rgba(0, 0, 0, 0.65)
    }
    /deep/ .ant-input {
      flex: 1;
      display: inline-block;
      padding: 0;
      height: 25px;
      color: #909090;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #aaa;
      &:focus {
        border-bottom: 1px solid #1b91ff;
        box-shadow: 0 4px 2px #1b91ff11;
      }
    }
    /deep/i.anticon.anticon-eye-invisible.ant-input-password-icon {
        color: white;
    }
   /deep/ .has-error .ant-input-affix-wrapper .ant-input, .has-error .ant-input-affix-wrapper .ant-input:hover {
         background: none !important;
    }
  }
  /deep/input#old,/deep/input#new ,/deep/input#repeatPassword {
        background: content-box;
        height: 0;
        padding: 1.2em .5em;
        color: white !important;
    }
  /deep/input#old::first-line, /deep/input#new::first-line, /deep/input#repeatPassword::first-line{
      color: white;
  }
</style>
