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
                    v-decorator="['displayName',
                                  { rules: [
                                      { required: true, message: '请输入名称！' },{validator:nameValidator},
                                    ],
                                    validateFirst: true
                                  }]" />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="联系电话">
                  <a-input
                    placeholder="请输入电话"
                    v-decorator="['telephoneNumber',
                                  { rules: [
                                      { required: true, message: '请输入电话' },{validator:telValidator},
                                    ],
                                    validateFirst: true
                                  }]" />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="邮箱">
                  <a-input
                    placeholder="请输入邮箱"
                    v-decorator="['mail',
                                  { rules: [
                                      { required: true, message: '请输入邮箱' },
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
                      v-for="item in record"
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
                                    ],
                                    validateFirst: true
                                  }]" />
                </a-form-item>
              </a-col>

              <a-col :span="24">
                <a-row :gutter="24">
                  <a-col :span="12">
                    <a-form-item label="用户密码用不过期">
                      <a-switch
                        v-model="passSet.pwdNeverExpires"
                        @change="onChange"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="禁用账户">
                      <a-switch v-model="passSet.DisableCount" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :span="24">
                <a-row :gutter="24">
                  <a-col :span="12">
                    <a-form-item label="下次登录时修改密码">
                      <a-switch
                        :disabled="disabled"
                        v-model="passSet.pwdNotSet"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="能否修改密码">
                      <a-switch
                        :disabled="disabled"
                        v-model="passSet.cannotChangePWD"/>
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
import { nameValidator, telValidator } from '@/utils/validator'
import { usermanageEdituser, usermanageGetuser } from '@/api/CloudDesktop/userManage'
export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabEdit',
  data () {
    return {
      record: [],
      accountControl: {
        DisableCount: true,
        cannotChangePWD: false,
        pwdNeverExpires: false,
        pwdNotSet: false
      },
      oldData: {
          name: String,
          baseDN: String
      },
      disabled: false,
      passSet: Object
    }
  },
  methods: {
    async Edit (record, ouList) {
      this.record = []
      // 保留之前老的数据
      this.oldData.name = record.username
      this.oldData.baseDN = record.baseDN
      // 获取OU列表
      this.ouSort(ouList)
      // 查询当前单个用户
      const obj = {
         baseCN: record.baseDN.replace(record.baseDN.split(',', 1)[0] + ',', ''),
            username: record.username
      }
      const res = await usermanageGetuser(obj)
      this.passSet = res.user.accountControl
        this.visible = true
      this.$nextTick(() => {
        setTimeout(() => {
          this.form.setFieldsValue(
            this.pick(res.user, ['displayName', 'telephoneNumber', 'username', 'mail', 'accountControl', 'group'])
            // this.pick(res.user.accountControl, ['DisableCount', 'cannotChangePWD', 'pwdNeverExpires', 'pwdNotSet'])
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
          })
        }
        this.confirmLoading = false
      })
    },
    handleCancel () {
      this.visible = false
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
        ouSortvalue = (ouSortvalue + 'ou=Citrix,dc=test,dc=com').replace(/(^\s*)/g, '')
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
    onChange (checked) {
      this.disabled = !this.disabled
      if (checked) {
        this.accountControl.pwdNotSet = false
        this.accountControl.cannotChangePWD = false
      }
    },
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
/deep/label[title='用户密码用不过期'],
/deep/label[title='禁用账户'],
/deep/label[title='能否修改密码'] {
  color: white;
  font-weight: 500;
}
</style>
