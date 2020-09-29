<template>
  <div>
    <a-modal
      title="模版属性"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      destroyOnClose>
      <a-spin :spinning="loading">
        <a-form :form="form">
          <a-form-item
            label="模版名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <a-input disabled v-decorator="['name']"/>
          </a-form-item>
          <a-form-item
            label="组"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <a-input disabled v-decorator="['groupName']"/>
          </a-form-item>
          <a-form-item
            label="软件信息"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <a-input disabled v-decorator="['software']"/>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>

</template>

<script>
import { mixinFormModal } from '@/utils/mixin'

export default {
  mixins: [mixinFormModal],
  name: 'MooduleAttribute',
  data () {
    return {
        record: Object
    }
  },
  methods: {
    Attribute (record) {
      this.visible = true
      this.record = record
        this.$nextTick(() => {
        this.form.setFieldsValue({ name: record.name, groupName: record.groupName, software: record.software })
      })
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
/deep/.ant-modal-title,
/deep/.ant-modal-close-x,
/deep/.ant-form-item-required ,
/deep/.ant-form-item-label > label{
  color: white;
}
</style>
