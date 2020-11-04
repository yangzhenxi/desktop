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
    CloudDesktopAddOU,
    CloudDesktopOUList
} from '@/api/CloudDesktop/CloudDesktop'
import { TreeValidator } from '@/utils/validator'
import { debounce } from '@/utils/util'
export default {
    mixins: [mixinFormModal],
    name: 'UserManageTabAdd',
    data () {
        return {
            dn: null,
            validatorName: []
        }
    },
    methods: {
        async Add (record) {
            this.visible = true
            this.dn = record.dn
            await CloudDesktopOUList().then(res => {
                this.nameRecursion(res.ou[0].children)
            })
        },
        handleSubmit () {
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    this.confirmLoading = true
                    values.dn = this.dn
                    CloudDesktopAddOU(values)
                        .then(res => {
                            this.$message.success('添加成功')
                            this.$emit('ok', red)
                            this.visible = false
                            this.confirmLoading = false
                        })
                        .catch(err => {
                            this.confirmLoading = false
                            return err
                        })
                }
                this.confirmLoading = false
            })
        },
        // 校验重名称
        validator: debounce(function (rule, value, callback) {
            TreeValidator(
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
