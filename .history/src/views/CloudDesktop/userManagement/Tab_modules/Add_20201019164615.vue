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
      <a-form :form="form" layout="vertical">
        <a-row :gutter="30">
          <a-col :span="12">
            <a-row>
              <a-col :span="24">
                <a-form-item
                  label="姓名">
                  <a-input
                    placeholder="请输入名称"
                    v-decorator="['display_name',
                                  { rules: [
                                      { required: true, message: '请输入名称！' },{min:2,max:8,message:'姓名长度为2-8个字符'},
                                    ],
                                    validateFirst: true
                                  },]" />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item
                  label="联系电话">
                  <a-input
                    placeholder="请输入电话"
                    v-decorator="['telephone_number',
                                  { rules: [{validator:telValidator}],validateFirst: true}]" />
                </a-form-item>
              </a-col>

              <a-col :span="24">
                <a-form-item
                  label="用户名">
                  <a-input
                    autocomplete="email"
                    placeholder="请输入用户名"
                    v-decorator="['username',
                                  { rules: [
                                      { required: true, message: '请输入用户名' },
                                      { min:2,max:8, message: '用户名长度2-8个字符' },
                                      {validator}
                                    ],
                                    validateFirst: true
                                  }]" />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item
                  label="邮箱">
                  <a-input
                    placeholder="请输入邮箱"
                    v-decorator="['mail',
                                  { rules: [{validator:EmailValidator}],
                                    validateFirst: true
                                  }]" />

                </a-form-item>
              </a-col>
            </a-row>
          </a-col>

          <a-col :span="12">
            <a-row>
              <a-col :span="24">
                <a-form-item
                  label="密码">
                  <a-input
                    type="password"
                    placeholder="请输入密码"
                    v-decorator="['password',
                                  { rules: [
                                      { required: true, message: '请输入密码' },{min:7,max:16,message:'密码长度应在7-16位'}
                                    ],
                                    validateFirst: true
                                  }]" />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item
                  label="确认密码">
                  <a-input
                    type="password"
                    placeholder="请再次输入密码"
                    v-decorator="['confirmPassword',
                                  {rules: [
                                     { required: true, message: '请输入密码' },{min:7,max:16,message:'密码长度应在7-16位'},{ validator:confirmPassword}
                                   ],
                                   validateFirst: true
                                  }]" />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-row :gutter="[24,24]">
                  <a-col :span="12">
                    <a-form-item
                      label="密码用不过期">
                      <a-switch :disabled="disabled" v-model="pwd_never_expires"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="禁用账户">
                      <a-switch v-model="disable_count" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :span="24">
                <a-row :gutter="24">
                  <a-col :span="12">
                    <a-form-item
                      label="下次登录时需改密码">
                      <a-switch @change="onChange" v-model="pwd_last_set"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="用户不能更改密码">
                      <a-switch :disabled="disabled" v-model="cannot_change_password" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { nameValidator, telValidator, nameRepeatspecialValidator, EmailValidator } from '@/utils/validator'
import { usermanageAdduser, usermanageAllUser } from '@/api/CloudDesktop/userManage'
import { debounce } from '@/utils/util'
export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
        record: [],
        disable_count: false,
        pwd_never_expires: true,
        pwd_last_set: false,
        cannot_change_password: false,
        disabled: false,
        validatorName: []
    }
  },
  methods: {
    async add (record) {
      this.record = []
      this.visible = ''
      this.record = record
     this.validatorName = this.deepGet(await usermanageAllUser(), 'list')
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
          this.confirmLoading = true
        if (!errors) {
            values.accountControl = {
                pwd_last_set: this.pwd_last_set,
                cannot_change_password: this.cannot_change_password,
                disable_count: this.disable_count,
                pwd_never_expires: this.pwd_never_expires
            }
            values.baseDN = this.record.dn
             usermanageAdduser(values).then(res => {
                this.confirmLoading = false
                this.$message.success('新增成功')
                this.$emit('ok', res)
                this.visible = false
             }).catch(() => {
                this.confirmLoading = false
             })
        }
      })
    },
    onChange (checked) {
            this.disabled = !this.disabled
        if (checked) {
            this.pwdNeverExpires = false
            this.cannotChangePWD = false
        }
    },
    // 校验重复密码
    confirmPassword (rule, value, callback) {
        const password = this.form.getFieldValue('password')
        if (value !== password) {
            callback(new Error('两次密码输入不正确，请重新输入'))
        }
        callback()
    },
    // 校验重名称
    validator: debounce(function (rule, value, callback) {
        nameRepeatspecialValidator({
            data: () => {
                try {
                    const data = this.validatorName
                    return data
                } catch (error) {
                    return []
                }
            },
            field: 'username'
        },
        { rule, value, callback }
        )
      }),
    nameValidator,
    telValidator,
    EmailValidator
  }
}
</script>

<style lang="less" scoped>
.ant-form-vertical .ant-form-item {
    padding-bottom: 0px;
    margin-bottom: 10px;
}
/deep/.ant-modal-header {
  background: none;
}

/deep/label[title='邮箱'],
/deep/label[title='下次登录时修改密码'],
/deep/label[title='用户密码永不过期'],
/deep/label[title='禁用账户'],
/deep/label[title='能否修改密码'] {
  color: white;
  font-weight: 500;
}
/deep/input#displayName ,/deep/input#telephoneNumber ,/deep/input#username ,/deep/input#mail ,/deep/input#password,/deep/input#confirmPassword {
        background: content-box;
        height: 0;
        padding: 1.2em .5em;
        color: white !important;
}
/deep/input#displayName::first-line,/deep/input#telephoneNumber::first-line,/deep/input#username::first-line,/deep/input#mail::first-line,/deep/input#password::first-line,/deep/input#confirmPassword::first-line{
      color: white;
}
</style>
