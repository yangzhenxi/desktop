<template>
  <a-modal
    title="修改用户信息"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form
        :form="form"
        layout="vertical">
        <a-row :gutter="30">
          <a-col :span="12">
            <a-row>
              <a-col :span="24">
                <a-form-item label="姓名">
                  <a-input
                    placeholder="请输入名称"
                    v-decorator="['display_name',
                                  { rules: [
                                      {max:20,message:'名称长度不得大于20个字符'},
                                      { required: true, message: '请输入名称！' },{validator:blankValidator},
                                    ],
                                    validateFirst: true
                                  }]" />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="联系电话">
                  <a-input
                    placeholder="请输入电话"
                    v-decorator="['telephone_number',
                                  { rules: [{validator:telValidator},],validateFirst: true
                                  }]" />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="邮箱">
                  <a-input
                    type="email"
                    placeholder="请输入邮箱"
                    v-decorator="['mail',
                                  { rules: [
                                      {validator:EmailValidator}
                                    ],
                                    validateFirst: true
                                  }]" />

                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="组织单位">
                  <a-select
                    placeholder="请选择组织单位"
                    v-decorator="['group', { rules: [{ required: true, message: '请选择对应的组织单位' }] }]">
                    <a-select-option
                      v-for="item in ouList"
                      :key="deepGet(item,'key')"
                      :value="deepGet(item, 'value')">{{ deepGet(item, 'name') }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>

          <a-col :span="12">
            <a-row>
              <a-col :span="24">
                <a-form-item label="用户名">
                  <a-input
                    placeholder="请输入用户名"
                    v-decorator="['username',
                                  { rules: [
                                      { required: true, message: '请输入用户名' },
                                      {max:20,message:'名称长度不得大于20个字符'},
                                      {validator}
                                    ],
                                    validateFirst: true
                                  }]" />
                </a-form-item>
              </a-col>

              <a-col :span="24">
                <a-row :gutter="24">
                  <a-col :span="12">
                    <a-form-item label="密码永不过期">
                      <a-switch
                        :disabled="disabled"
                        @change="handelchange"
                        v-model="passSet.pwd_never_expires"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="禁用账户">
                      <a-switch v-model="passSet.disable_count" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :span="24">
                <a-row :gutter="24">
                  <a-col :span="12">
                    <a-form-item label="下次登录时需改密码">
                      <a-switch
                        v-model="passSet.pwd_last_set"
                        @change="onChange"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="用户不能更改密码">
                      <a-switch
                        :disabled="disabled"
                        @change="handelchange"
                        v-model="passSet.cannot_change_password"/>
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
import { telValidator, EmailValidator, nameRepeatValidator, blankValidator } from '@/utils/validator'
import { usermanageEdituser, usermanageGetuser, usermanageAllUser } from '@/api/CloudDesktop/userManage'
import { debounce } from '@/utils/util'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabEdit',
  data () {
    return {
      ouList: [],
      record: [],
      oldData: {
          name: String,
          baseDN: String
      },
      disabled: false,
      passSet: Object,
      currentGroup: {} // 修改之前的组
    }
  },
  methods: {
    async Edit (record, ouList) {
      this.record = []
      this.record = record
      this.pwdNotSetdisabled = false
      this.cannotChangePWDdisabled = false
      // 保留之前老的数据
      this.oldData.name = record.username
      this.oldData.baseDN = record.dn
      // 获取OU列表
      this.ouSort(ouList)
      // 查询当前单个用户
      const obj = {
         baseCN: record.baseDN.replace(record.baseDN.split(',', 1)[0] + ',', ''),
         username: record.username
      }
      const res = await usermanageGetuser(obj)
      this.currentGroup = {}
      this.ouList.forEach(u => {
          if (u.name === res.user.group) {
              this.currentGroup = u
          }
      })
      this.passSet = res.user.account_control
        if (this.passSet.pwd_never_expires) {
            this.pwdNotSetdisabled = true
            this.pwdNotSetdisabled = true
        }
      this.visible = true
      this.$nextTick(() => {
        setTimeout(() => {
          this.form.setFieldsValue({
             group: this.currentGroup.value,
             display_name: res.user.display_name,
             telephone_number: res.user.telephone_number,
             username: res.user.username,
             mail: res.user.mail
             }
          )
        })
      })
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
          values.name = this.oldData.name
          values.baseDN = this.oldData.baseDN
          values.accountControl = this.passSet
          usermanageEdituser(values).then((res) => {
            this.confirmLoading = false
            this.$message.success('修改成功')
            this.$emit('ok')
            this.visible = false
          }).catch(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    handelchange (value) {
        console.log(value)
        if (value) {
            this.passSet.pwd_last_set = false
        }
    },
    ouSort (record) {
      record.forEach((item) => {
        let ouSortvalue = ' '
        if (item.ouSort[0] === record[0].title) {
          item.ouSort.reverse()
        }
        item.ouSort.reverse()
        item.ouSort.forEach((u, index) => {
          ouSortvalue = ouSortvalue + 'ou=' + u + ','
        })
        ouSortvalue = (ouSortvalue + 'ou=Users,ou=Citrix,dc=cloud,dc=com').replace(/(^\s*)/g, '')
        const obj = {
          name: item.title,
          value: ouSortvalue,
          key: item.key
        }
        this.ouList.push(obj)
        if (item.children.length > 0) {
          this.ouSort(item.children)
        }
      })
    },
    // 校验重名称
    validator: debounce(function (rule, value, callback) {
        nameRepeatValidator({
            data: async () => {
                try {
                    const data = this.deepGet(await usermanageAllUser(), 'list', [])
                    return data
                } catch (error) {
                    return []
                }
            },
            field: 'username',
            initialValue: this.deepGet(this.record, 'username')
        },
        { rule, value, callback }
        )
      }),
    onChange (checked) {
      this.disabled = !this.disabled
      if (checked) {
         this.passSet.pwd_never_expires = false
        this.passSet.cannot_change_password = false
      }
    },
    telValidator,
    EmailValidator,
    blankValidator
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
/deep/label[title='用户密码用不过期'],
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
