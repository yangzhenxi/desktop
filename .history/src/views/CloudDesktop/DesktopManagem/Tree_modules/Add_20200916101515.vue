<template>
  <a-modal
    title="新增组"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose
  >
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
                              { required: true, message: '请输入名称！' }
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
// import { nameValidator } from '@/utils/validator'
import { DesktopTemplateGroupAdd } from '@/api/CloudDesktop/DesktopManagem'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
        parent: String
    }
  },
  methods: {
    Add (parent) {
      this.visible = true
      this.parent = parent
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
          this.confirmLoading = true
        if (!errors) {
            const obj = {
                group: {
                    'name': values.name,
                    'parent': this.parent
                }

            }
            DesktopTemplateGroupAdd(obj).then(res => {
                this.$message.success('添加成功')
                this.$emit('ok', res)
            })
        this.visible = false
        this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
      onChange (checked) {
      console.log(`a-switch to ${checked}`)
    }
    // nameValidator
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
/deep/.ant-modal-title,/deep/.ant-form-item-required{
  color: white !important;
}
/deep/.ant-modal-content {
  background:#272E48;
  color: white;
}
</style>
