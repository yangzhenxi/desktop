<template>
  <div>
    <a-form
      :form="form"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item label="是否高峰">
        <a-select
          placeholder="请选择是否高峰"
          v-decorator="['peak', { rules: [{required: true, message: '请选择电源管理'}] }]" >
          <a-select-option value="true">是</a-select-option>
          <a-select-option value="false">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="断电连接">
        <a-select
          placeholder="是否要断开连接"
          v-decorator="['DisconnectAction', { rules: [{required: true, message: '是否要断开连接'}] }]" >
          <a-select-option value="Nothing">Nothing</a-select-option>
          <a-select-option value="Suspend">Suspend</a-select-option>
          <a-select-option value="Shutdown">Shutdown</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="断电连接时长">
        <a-input-number
          placeholder="断电连接时长"
          v-decorator="['DisconnectTimeout', { rules: [{required: true, message: '请输入断电连接时长'}] }]" />
      </a-form-item>
      <a-form-item label="注销时">
        <a-select
          placeholder="注销时"
          v-decorator="['LogOffAction', { rules: [{required: true, message: '是否要注销'}] }]" />
        <a-select-option value="jack">
          <a-select-option value="Nothing">Nothing</a-select-option>
          <a-select-option value="Suspend">Suspend</a-select-option>
          <a-select-option value="Shutdown">Shutdown</a-select-option>
        </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="预启动">
        <a-input-number
          placeholder="请输入预先启动"
          v-decorator="['BufferSizePercent', { rules: [{required: true, message: '请输入名称前缀'}] }]" />
        <span style="color:white;margin:10px">%</span>
      </a-form-item>

      <a-form-item :wrapperCol="{span: 16, offset: 10}">

        <a-button
          type="primary"
          :loading="loading"
          @click="save">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { CloudDesktopGroupGet, CloudDesktopGroupPatchPowerStrategy } from '@/api/CloudDesktop/CloudDesktop'
export default {
  props: {
    datasource: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      },
      loading: false,
      form: this.$form.createForm(this),
      queryParam: {}
    }
  },
  created () {
    this.queryParam.desktop_id = this.datasource.id
    CloudDesktopGroupGet(this.queryParam).then((res) => {
      console.log(res)
    })
  },
  methods: {
    // 重置
    reset () {},
    // 保存
    save () {
      this.loading = true
      CloudDesktopGroupPatchPowerStrategy()
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/input.ant-input-number-input {
  color: white;
}
</style>
