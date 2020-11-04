<template>
  <a-modal
    title="修改桌面"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item
          label="姓名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入名称"
            v-decorator="['name',
                          { rules: [
                              { required: true, message: '请输入名称！' },
                              { min: 2,max:12, message: '桌面组的长度为2-12' },
                              {validator}
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
import {
    CloudDesktopEditOU,
    CloudDesktopOUList
} from '@/api/CloudDesktop/CloudDesktop'
import { debounce } from '@/utils/util'
import { TreeValidator } from '@/utils/validator'

export default {
    mixins: [mixinFormModal],
    name: 'UserManageTabEdit',
    data () {
        return {
            baseDN: null,
            validatorName: [],
            record: {}
        }
    },
    methods: {
        async Edit (record) {
            this.visible = true
            this.baseDN = null
            this.baseDN = record.dn
            this.record = record

            this.$nextTick(() => {
                this.form.setFieldsValue({ name: record.name })
            })
            await CloudDesktopOUList().then(res => {
                this.nameRecursion(res.ou[0].children[o].children)
            })
        },
        handleSubmit () {
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    this.confirmLoading = true
                    values.dn = this.baseDN
                    CloudDesktopEditOU(values)
                        .then(res => {
                            this.$message.success('修改成功')
                            this.$emit('ok')
                            this.visible = false
                            this.confirmLoading = false
                        })
                        .catch(() => {
                            this.confirmLoading = false
                        })
                }
            })
        },
        //                 // 校验重名称
        validator: debounce(function (rule, value, callback) {
            TreeValidator(
                {
                    data: () => {
                        try {
                            const data = this.validatorName
                            console.log(data)
                            return data
                        } catch (error) {
                            return []
                        }
                    },
                    field: 'name',
                    initialValue: this.deepGet(this.record, 'name')
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
