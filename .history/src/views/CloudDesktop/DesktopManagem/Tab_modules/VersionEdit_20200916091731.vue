<template>
  <div>
    <a-modal
      title="修改版本信息"
      :width="840"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
      destroyOnClose>
      <a-spin :spinning="loading">
        <div class="container">
          <a-form
            :form="form"
            style="max-width: 500px; margin: 40px auto 0;">
            <a-form-item
              label="版本名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol">
              <a-input v-decorator="['name', { initialValue: 'Alex', rules: [{required: true, message: '收款人名称必须核对'}] }]" />
            </a-form-item>
            <a-form-item
              label="版本描述"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol">
              <a-input v-decorator="['description', { initialValue: 'Alex', rules: [{required: true, message: '收款人名称必须核对'}] }]" />
            </a-form-item>
          </a-form>
        </div>

      </a-spin>
    </a-modal>
  </div>

</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { DesktopTemplateVersionPatch } from '@/api/CloudDesktop/DesktopManagem'
export default {
  mixins: [mixinFormModal],
  name: 'VersionEdit',
  data () {
    return {
      record: Object
    }
  },
  methods: {
    Edit (record) {
      this.visible = true
      this.record = record
      this.$nextTick(() => {
        this.form.setFieldsValue({ name: record.name, description: record.description })
      })
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
            values.id = this.record.id
            const obj = {
                data: values
            }
            DesktopTemplateVersionPatch(obj).then(res => {
                this.$message.success('修改成功')
                this.visible = false
            })
          this.visible = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-modal-content {
  background: #272e48;
  color: white;
}
/deep/.ant-modal-title,
/deep/.ant-modal-close-x,
/deep/.ant-form-item-required {
  color: white;
}
/deep/.ant-modal-header {
  background: none;
}
.container {
  margin-top: 40px;
  border: 1px solid #cccccc;
  border-radius: 5px;
}
</style>
