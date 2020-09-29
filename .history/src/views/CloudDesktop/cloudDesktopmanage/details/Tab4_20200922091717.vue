<template>
  <div>
    <a-form
      :form="form"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="电源管理"
      >
        <a-input
          placeholder="请选择电源管理"
          v-decorator="['name', { rules: [{required: true, message: '请选择电源管理'}] }]" />
      </a-form-item>
      <a-form-item
        label="断电连接"
      >
        <a-input
          placeholder="请输入名称前缀"
          v-decorator="['name', { rules: [{required: true, message: '请输入名称前缀'}] }]" />
        分钟
        <a-select default-value="lucy" style="width: 120px" >
          <a-select-option value="jack">
            Jack
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="选择模板："
      >
        <a-select
          placeholder="请选择模版"
          v-decorator="['image', { rules: [{required: true, message: '请选择模板'}] }]">
          <a-select-option :value="1">计算机</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="版本号"
      >
        <a-select
          placeholder="请选择版本号"
          v-decorator="['image', { rules: [{required: true, message: '请选择版本号'}] }]">
          <a-select-option :value="1">计算机</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 16, offset: 8}">
        <a-button
          type="dashed"
          style="margin-right:10px;"
          @click="close">关闭</a-button>
        <a-button
          type="primary"
          :loading="loading"
          @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
data () {
    return {
              labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      form: this.$form.createForm(this)
    }
},
    handleCancel () {
      this.visible = false
    }
}
</script>

<style>

</style>
