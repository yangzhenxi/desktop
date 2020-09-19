<template>
  <div>
    <a-modal
      title="发布模版"
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
              label="版本号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol">
              <a-input v-decorator="['version', { initialValue: 'Alex', rules: [{required: true, message: '收款人名称必须核对'}] }]" />
            </a-form-item>
            <a-form-item
              label="版本名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol">
              <a-input v-decorator="['versionName', { initialValue: 'Alex', rules: [{required: true, message: '收款人名称必须核对'}] }]" />
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

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {}
  },
  methods: {
    Add () {
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.visible = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-modal-content {
  background:#272E48;
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
