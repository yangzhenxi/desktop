<template>
  <a-modal
    title="新增用户信息"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose
  >
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
                    v-decorator="['displayName',
                                  { initialValue: 'Alex', rules: [
                                      { required: true, message: '请输入名称！' },{validator:nameValidator},
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
                    v-decorator="['telephoneNumber',
                                  { initialValue: '17767360929', rules: [
                                      { required: true, message: '请输入电话' },{validator:telValidator},
                                    ],
                                    validateFirst: true
                                  }]" />
                </a-form-item>
              </a-col>

              <a-col :span="24">
                <a-form-item
                  label="用户名">
                  <a-input
                    autocomplete="email"
                    placeholder="请输入用户名"
                    v-decorator="['username',
                                  { initialValue: 'abc', rules: [
                                      { required: true, message: '请输入用户名' },
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
                                  { initialValue: '8980361@qq.com',rules: [
                                      { required: true, message: '请输入邮箱' },
                                    ],
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
                  label="组">
                  <a-select
                    placeholder="请选择组"
                    v-decorator="['baseDN', {rules: [{ required: true, message: '请选择对应的组' }] }]">
                    <a-select-option
                      v-for="item in record"
                      :key="deepGet(item,'key')"
                      :value="deepGet(item, 'value')">{{ deepGet(item, 'name') }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="24">
                <a-form-item
                  label="密码">
                  <a-input
                    type="password"
                    placeholder="请输入密码"
                    v-decorator="['password',
                                  { initialValue: 'AlexAlex',rules: [
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
                                  { initialValue: 'AlexAlex',rules: [
                                      { required: true, message: '请输入密码' },{min:7,max:16,message:'密码长度应在7-16位'},{ validator:confirmPassword}
                                    ],
                                    validateFirst: true
                                  }]" />
                </a-form-item>
              </a-col>

              <a-col :span="24">
                <a-row :gutter="24">
                  <a-col :span="12">
                    <a-form-item
                      label="用户密码永不过期">
                      <a-switch @change="onChange" v-model="pwdNeverExpires"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="禁用账户">
                      <a-switch v-model="DisableCount" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :span="24">
                <a-row :gutter="24">
                  <a-col :span="12">
                    <a-form-item
                      label="下次登录时修改密码">
                      <a-switch :disabled="disabled" v-model="pwdNotSet"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="能否修改密码">
                      <a-switch :disabled="disabled" v-model="cannotChangePWD" />
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
import { nameValidator, telValidator, nameRepeatValidator } from '@/utils/validator'
import { usermanageAdduser, usermanageAllUser } from '@/api/CloudDesktop/userManage'
import { debounce } from '@/utils/util'
export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
        record: [],
        DisableCount: false,
        pwdNeverExpires: false,
        pwdNotSet: false,
        cannotChangePWD: false,
        disabled: false,
        validatorName: []
    }
  },
  methods: {
    async add (record) {
        this.record = []
      this.visible = ''
      this.ouSort(record)
     this.validatorName = this.deepGet(await usermanageAllUser(), 'list')
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
          this.confirmLoading = true
        if (!errors) {
            values.accountControl = {
                pwdNotSet: this.pwdNotSet,
                cannotChangePWD: this.cannotChangePWD,
                DisableCount: this.DisableCount,
                pwdNeverExpires: this.pwdNeverExpires
            }
             usermanageAdduser(values).then(res => {
                this.confirmLoading = false
                this.$message.success('新增成功')
                this.$emit('ok', res)
                this.visible = false
             }).catch(() => {
                this.confirmLoading = false
             })
              this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    onChange (checked) {
            this.disabled = !this.disabled
        if (checked) {
            this.accountControl.pwdNotSet = false
            this.accountControl.cannotChangePWD = false
        }
    },
    ouSort (record) {
        record.forEach(item => {
            let ouSortvalue = ' '
            if (item.ouSort[0] === record[0].title) {
                item.ouSort.reverse()
            }
            item.ouSort.reverse()
            item.ouSort.forEach((u, index) => {
                ouSortvalue = ouSortvalue + 'ou=' + u + ','
            })
            ouSortvalue = (ouSortvalue + 'ou=Users,ou=Citrix,dc=test,dc=com').replace(/(^\s*)/g, '')
            const obj = {
                name: item.title,
                value: ouSortvalue,
                key: item.key
            }
            this.record.push(obj)
            if (item.children.length > 0) {
                this.ouSort(item.children)
            }
        })
    },
    confirmPassword (rule, value, callback) {
        const password = this.form.getFieldValue('password')
        if (value !== password) {
            callback(new Error('两次密码输入不正确，请重新输入'))
        }
        callback()
    },
                    // 校验重名称
    validator: debounce(function (rule, value, callback) {
        nameRepeatValidator({
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
    telValidator
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
