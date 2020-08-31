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
            </a-row>
          </a-col>

          <a-col :span="12">
            <a-row>
              <a-col :span="24">
                <a-form-item label="组">
                  <a-select
                    placeholder="请选择组"
                    v-decorator="['baseDN', { rules: [{ required: true, message: '请选择对应的组' }] }]">
                    <a-select-option
                      v-for="item in record"
                      :key="deepGet(item,'key')"
                      :value="deepGet(item, 'value')">{{ deepGet(item, 'name') }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="密码">
                  <a-input
                    placeholder="请输入密码"
                    v-decorator="['password',
                                  { rules: [
                                      { required: true, message: '请输入密码' },{min:7,max:16,message:'密码长度应在7-16位'}
                                    ],
                                    validateFirst: true
                                  }]" />
                </a-form-item>
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
import { usermanageEdituser } from '@/api/CloudDesktop/userManage'
export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabEdit',
  data () {
    return {
      record: [],
      pwdNotSet: false,
      cannotChangePWD: false
    }
  },
  methods: {
    Edit (record, ouList) {
      this.record = []
      this.visible = ''
      this.ouSort(ouList)
      this.$nextTick(() => {
        setTimeout(() => {
          this.form.setFieldsValue(
            this.pick(record, ['displayName', 'telephoneNumber', 'username', 'group', 'mail', 'password'])
          )
        })
      })
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
          values.accountControl = {
            pwdNotSet: this.pwdNotSet,
            cannotChangePWD: this.cannotChangePWD
          }
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
/deep/label[title='是否修改密码'],
/deep/label[title='首次修改密码'] {
  color: white;
  font-weight: 500;
}
</style>
