<template>
  <div>
    <a-modal
      title="发布模版"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
      destroyOnClose>
      <a-spin :spinning="loading">
        <a-form :form="form">
          <a-form-item
            label="版本号"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <a-input v-decorator="['version']" disabled />
          </a-form-item>
          <a-form-item
            label="版本名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <a-input placeholder="请输入版本名称" v-decorator="['versionName', { rules: [{required: true, message: '请输入版本名称'}] }]" />
          </a-form-item>
          <a-form-item
            label="版本描述"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <a-input placeholder="请输入版本描述" v-decorator="['description', { rules: [{required: true, message: '请输入版本描述'}] }]" />
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>

</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { DesktopTemplatePublish } from '@/api/CloudDesktop/DesktopManagem'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
        record: Object
    }
  },
  methods: {
    Add (record) {
      this.visible = true
      this.record = record
        this.$nextTick(() => {
        this.form.setFieldsValue({ version: (parseInt(record.version) + 1) })
      })
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
          this.confirmLoading = true
        if (!errors) {
            values.name = this.record.name
            await DesktopTemplatePublish(values).then(res => {
                this.$message.success('新增成功')
                this.$emit('ok', res)
                this.confirmLoading = true
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
