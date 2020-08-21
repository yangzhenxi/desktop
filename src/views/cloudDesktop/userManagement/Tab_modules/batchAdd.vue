<template>
  <a-modal
    title="批量新增用户信息"
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
                  label="组">
                  <a-select
                    placeholder="请选择组"
                    v-decorator="['group', { rules: [{ required: true, message: '请选择对应的组' }] }]">
                    <a-select-option
                      v-for="item in groupList"
                      :key="deepGet(item, 'id')"
                      :value="deepGet(item, 'id')">{{ deepGet(item, 'name') }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="24">
                <a-form-item
                  label="用户数量">
                  <a-input-number
                    :min="1"
                    :max="10"
                    placeholder="请输入用户数量"
                    v-decorator="['usersize',
                                  { rules: [
                                      { required: true, message: '请输入用户数量' },
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
                  label="密码">
                  <a-input
                    placeholder="请输入密码"
                    v-decorator="['password',
                                  { rules: [
                                      { required: true, message: '请输入密码' },
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
                  label="前缀">
                  <a-input
                    placeholder="请输入前缀"
                    v-decorator="['Prefix',
                                  { rules: [
                                      { required: true, message: '请输入前缀！' },
                                    ],
                                    validateFirst: true
                                  }]" />
                </a-form-item>

              </a-col>

              <a-col :span="24">
                <a-form-item
                  label="部门">
                  <a-select
                    placeholder="请选择部门"
                    v-decorator="['department', { rules: [{ required: true, message: '请选择部门' }] }]">
                    <a-select-option
                      v-for="item in groupList"
                      :key="deepGet(item, 'id')"
                      :value="deepGet(item, 'id')">{{ deepGet(item, 'name') }}</a-select-option>
                  </a-select>
                </a-form-item>

              </a-col>

              <a-col :span="24">
                <a-form-item
                  label="起始位数字">
                  <a-input
                    placeholder="请输入起始位数字"
                    v-decorator="['Nuber',
                                  { rules: [
                                      { required: true, message: '请输入邮箱' },
                                    ],
                                    validateFirst: true
                                  }]" />
                </a-form-item>

              </a-col>

              <a-col :span="24">
                <a-col :span="24">
                  <a-row :gutter="24">
                    <a-col :span="12">
                      <a-form-item label="首次修改密码">
                        <a-switch
                          @change="onChange"
                          v-decorator="['first']"/>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item label="是否修改密码">
                        <a-switch @change="onChange" v-decorator="['Editpass']"/>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-col>
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

export default {
  mixins: [mixinFormModal],
  name: 'UserManageBatchTabAdd',
  data () {
    return {
        groupList: [
            {
                id: 1,
                name: 'CDM'
            },
            {
                id: 2,
                name: '云桌面组'
            }
        ],
        departmentList: []
    }
  },
  methods: {
    BatchAdd () {
        console.log('BatchAdd')
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
            console.log(values)
this.visible = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
      onChange (checked) {
      console.log(`a-switch to ${checked}`)
    }
  }
}
</script>

<style lang="less" scoped>
.ant-form-vertical .ant-form-item {
    padding-bottom: 0px;
    margin-bottom: 10px;
}
.ant-input-number{
    width: 100%;
}
</style>
