<template>
  <div>
    <a-form
      :form="form"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="桌面名称"
      >
        <a-input
          placeholder="请输入桌面名称"
          v-decorator="['name', { rules: [{required: true, message: '请输入桌面名称'}] }]" />
      </a-form-item>
      <a-form-item
        label="名称前缀"
      >
        <a-input
          placeholder="请输入名称前缀"
          v-decorator="['name', { rules: [{required: true, message: '请输入名称前缀'}] }]" />
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
      <a-form-item
        label="分组"
      >
        <a-select
          placeholder="请选择分组"
          v-decorator="['image', { rules: [{required: true, message: '请选择分组'}] }]">
          <a-select-option :value="1">计算机</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="名称格式"
      >
        <a-select
          placeholder="请选择名称格式"
          v-decorator="['image', { rules: [{required: true, message: '请选择名称格式'}] }]">
          <a-select-option :value="1">计算机</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="名称格式"
      >
        <a-select
          placeholder="请选择名称格式"
          v-decorator="['image', { rules: [{required: true, message: '请选择名称格式'}] }]">
          <a-select-option :value="1">计算机</a-select-option>
        </a-select>
      </a-form-item>
      <a-row>
        <a-col :span="12" offset="{2}">
          <a-form-item label="起始数字:">
            <a-input-number :min="1" :max="10" v-decorator="['name', { rules: [{required: true, message: '请输入起始数字'}] }]"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="桌面数量:">
            <a-input-number :min="1" :max="10" v-decorator="['name', { rules: [{required: true, message: '请输入桌面数量'}] }]"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item
        label="桌面类型"
      >
        <a-radio-group v-decorator="['image', { rules: [{required: true, message: '请选择桌面类型'}] }]">
          <a-radio :value="1">随机桌面</a-radio>
          <a-radio :value="2">静态还原</a-radio>
          <a-radio :value="2">静态不还原</a-radio>
        </a-radio-group>
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
}
}
</script>

<style>

</style>
