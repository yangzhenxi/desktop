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
        <a-input-number
          placeholder=""
          v-decorator="['name', { rules: [{required: true, message: '请输入名称前缀'}] }]" />
        <span style="color:white;margin:10px">分钟</span>
        <a-select style="width: 120px" >
          <a-select-option value="jack">
            无操作
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="注销时"
      >
        <a-input-number
          placeholder=""
          v-decorator="['name', { rules: [{required: true, message: '请输入名称前缀'}] }]" />
        <span style="color:white;margin:10px">分钟</span>
        <a-select style="width: 120px" >
          <a-select-option value="jack">
            无操作
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="预启动"
      >
        <a-input-number
          placeholder=""
          v-decorator="['name', { rules: [{required: true, message: '请输入名称前缀'}] }]" />
        <span style="color:white;margin:10px">%</span>
      </a-form-item>

      <a-form-item :wrapperCol="{span: 16, offset: 8}">
        <a-button
          type="dashed"
          style="margin-right:10px;"
          @click="reset">清空</a-button>
        <a-button
          type="primary"
          :loading="loading"
          @click="save">保存</a-button>
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
methods: {
    // 重置
    reset () {

    },
    // 保存
    asve () {

    }
}
}
</script>

<style>

</style>
