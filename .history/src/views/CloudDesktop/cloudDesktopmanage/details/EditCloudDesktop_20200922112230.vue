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
        <a-form
          :form="form"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-form-item label="选择模板：">
            <a-select
              placeholder="请选择模版"
              v-decorator="['image', { rules: [{required: true, message: '请选择模板'}] }]">
              <a-select-option :value="1">计算机</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="版本号">
            <a-select
              placeholder="请选择版本号"
              v-decorator="['image', { rules: [{required: true, message: '请选择版本号'}] }]">
              <a-select-option :value="1">计算机</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="桌面名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <a-input placeholder="请输入桌面名称" v-decorator="['versionName', { rules: [{required: true, message: '请输入桌面名称'}] }]" />
          </a-form-item>
          <a-form-item label="所属分组">
            <a-select
              placeholder="请选择所属分组"
              v-decorator="['image', { rules: [{required: true, message: '请选择所属分组'}] }]">
              <a-select-option :value="1">计算机</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="桌面类型">
            <a-radio-group v-decorator="['image', { rules: [{required: true, message: '请选择桌面类型'}] }]">
              <a-radio :value="1">随机桌面</a-radio>
              <a-radio :value="2">静态还原</a-radio>
              <a-radio :value="3">静态不还原</a-radio>
            </a-radio-group>
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
  name: 'UserManageTabAdd',
  data () {
    return {
        record: Object
    }
  },
  methods: {
    Edit () {
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
          this.confirmLoading = true
        if (!errors) {
          this.visible = false
        }
        this.confirmLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/input.ant-input-number-input,label.ant-radio-wrapper {
    color: white;
}

</style>
