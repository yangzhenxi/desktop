<template>
  <a-modal
    title="新增桌面"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item
          label="桌面位置"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['dn',
                          { rules: [
                              { required: true, message: '请输入名称！' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="桌面类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['type',
                          { rules: [
                              { required: true, message: '请选择桌面类型' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="创建数量"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input-number
            :min="1"
            :max="10"
            v-decorator="['count',
                          { rules: [
                            { required: true, message: '请选择要创建的桌面数量' },
                          ],
                          }]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
// import {
//     CloudDesktopAddOU,
//     CloudDesktopOUList
// } from '@/api/CloudDesktop/CloudDesktop'
import { nameRepeatValidator } from '@/utils/validator'
import { debounce } from '@/utils/util'
export default {
    mixins: [mixinFormModal],
    name: 'UserManageTabAdd',
    data () {
        return {
            baseDN: null,
            validatorName: []
        }
    },
    methods: {
        async Add (record) {
            this.visible = true
        },
        handleSubmit () {
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    this.confirmLoading = true
                }
                this.confirmLoading = false
            })
        },
        // 校验重名称
        validator: debounce(function (rule, value, callback) {
            nameRepeatValidator(
                {
                    data: () => {
                        try {
                            const data = this.validatorName
                            return data
                        } catch (error) {
                            return []
                        }
                    },
                    field: 'name'
                },
                { rule, value, callback }
            )
        }),
        nameRecursion (Array) {
            Array.forEach(u => {
                this.validatorName.push(u)
                if (u.children.length > 0) {
                    this.nameRecursion(u.children)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
/deep/input#name {
    background: content-box;
    height: 0;
    padding: 1.2em 0.5em;
    color: white !important;
}
/deep/input#name::first-line {
    color: white;
}
</style>
