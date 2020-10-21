<template>
  <div>
    <a-form
      :form="form"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item label="是否高峰使用">
        <a-select
          placeholder="请选择是否高峰使用"
          v-decorator="['peak', { rules: [{required: true, message: '请选择是否高峰使用'}] }]" >
          <a-select-option value="true">是</a-select-option>
          <a-select-option value="false">否</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="断电连接时">
        <a-input-number
          placeholder="断电连接时"
          v-decorator="['DisconnectTimeout', { rules: [{required: true, message: '请输入断电连接时'}] }]" />
        <span class="minute"> 分钟</span>
        <a-select
          style="width:180px"
          placeholder="是否要断开连接"
          v-decorator="['DisconnectAction', { rules: [{required: true, message: '是否要断开连接'}] }]" >
          <a-select-option value="Nothing">无操作</a-select-option>
          <a-select-option value="Suspend">挂起</a-select-option>
          <a-select-option value="Shutdown">关闭</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="注销时">
        <a-input-number
          placeholder="注销时长"
          v-decorator="['LogOffTimeout', { rules: [{required: true, message: '请输入注销时长'}] }]" />
        <span class="minute"> 分钟</span>
        <a-select
          style="width:170px"
          placeholder="注销时"
          v-decorator="['LogOffAction', { rules: [{required: true, message: '注销时'}] }]" >
          <a-select-option value="Nothing">无操作</a-select-option>
          <a-select-option value="Suspend">挂起</a-select-option>
          <a-select-option value="Shutdown">关闭</a-select-option>
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
      this.getdata()
  },
  methods: {
    // 重置
    getdata () {
        this.queryParam.desktop_id = this.datasource.id
            CloudDesktopGroupGet(this.queryParam).then((res) => {
                this.$nextTick(() => {
                    if (res.data.OffPeakBufferSizePercent > 0) {
                        this.form.setFieldsValue({
                            peak: 'true',
                            BufferSizePercent: res.data.OffPeakBufferSizePercent,
                            DisconnectAction: res.data.OffPeakDisconnectAction,
                            DisconnectTimeout: res.data.OffPeakDisconnectTimeout,
                            LogOffAction: res.data.OffPeakLogOffAction,
                            LogOffTimeout: res.data.OffPeakLogOffTimeout
                        })
                    } else {
                        this.form.setFieldsValue({
                            peak: 'false',
                            BufferSizePercent: res.data.PeakBufferSizePercent,
                            DisconnectAction: res.data.PeakDisconnectAction,
                            DisconnectTimeout: res.data.PeakDisconnectTimeout,
                            LogOffAction: res.data.PeakLogOffAction,
                            LogOffTimeout: res.data.PeakLogOffTimeout
                        })
                    }
                })
            })
    },
    // 保存
    save () {
      this.loading = true
      const { form: { validateFields } } = this
      validateFields((err, values) => {
          if (!err) {
              try {
                  values.peak = Boolean(values.peak)
                  values.desktop_id = this.datasource.id
                CloudDesktopGroupPatchPowerStrategy(values).then(res => {
                    this.$message.success('修改成功')
                    this.loading = false
                }).catch(() => {
                    this.$message.error('修改失败')
                    this.loading = false
                })
              } catch {
                this.loading = false
              }
          }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/input.ant-input-number-input {
  color: white;
}
.minute{
    color:white;
    margin: 0 5px;
}
</style>
