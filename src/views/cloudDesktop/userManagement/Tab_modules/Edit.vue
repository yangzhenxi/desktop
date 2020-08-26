<template>
  <a-modal
    title="修改用户信息"
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
                                  { rules: [
                                      { required: true, message: '请输入名称！' },{validator:nameValidator},
                                    ],
                                    validateFirst: true
                                  }]" />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item
                  label="联系电话">
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
                <a-form-item
                  label="用户名">
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
                <a-form-item
                  label="邮箱">
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
                <a-form-item
                  label="组">
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
                <a-form-item
                  label="部门">
                  <a-select
                    placeholder="请选择部门"
                    v-decorator="['department', { rules: [{ required: true, message: '请选择部门' }] }]">
                    <a-select-option value="awdawd">awdawd</a-select-option>
                    <!-- <a-select-option
                      v-for="item in groupList"
                      :key="deepGet(item, 'id')"
                      :value="deepGet(item, 'id')">{{ deepGet(item, 'name') }}</a-select-option> -->
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="24">
                <a-form-item
                  label="密码">
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

              <a-col :span="24">
                <a-row :gutter="24">
                  <a-col :span="12">
                    <a-form-item
                      label="首次修改密码">
                      <a-switch @change="onChange" v-model="cannotChangePWD"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="是否修改密码">
                      <a-switch @change="onChange" v-model="pwdNotSet" />
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
import { usermanageAdduser } from '@/api/CloudDesktop/userManage'
export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
        record: [],
        pwdNotSet: false,
        cannotChangePWD: false
    }
  },
  methods: {
    Edit (record) {
        this.record = []
      this.visible = ''
      this.ouSort(record)
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
            values.accountControl = {
                pwdNotSet: this.pwdNotSet,
                cannotChangePWD: this.cannotChangePWD
            }
            const res = await usermanageAdduser(values)
             this.$message.success('添加成功')
            this.$emit('ok', res)
            this.visible = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    onChange (checked) {
      console.log(`a-switch to ${checked}`)
    },
    ouSort (record) {
        record.forEach(item => {
            let ouSortvalue = ' '
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
            console.log(this.record)
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
