<template>
  <div>
    <a-spin :spinning="spinning">
      <a-form
        :form="form"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        style="max-width: 500px; margin: 40px auto 0;">
        <a-form-item label="高峰使用">
          <a-select
            @change="changePeak"
            placeholder="请选择是否高峰使用"
            v-decorator="['peak', { rules: [{required: true, message: '请选择是否高峰使用'}] }]" >
            <a-select-option value="1">是</a-select-option>
            <a-select-option value="0">否</a-select-option>
          </a-select>
        </a-form-item>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="断电连接时"
              :labelCol="{span:10}"
              :wrapperCol="{span:14}">
              <a-input-number
                placeholder="断电连接时"
                :min="0"
                :max="1440"
                v-decorator="['disconnect_timeout', { rules: [{required: true, message: '请输入断电连接时'}] }]" />
              <span class="minute"> 分钟</span>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item>
              <a-select
                style="width:170px"
                placeholder="是否要断开连接"
                v-decorator="['disconnect_action', { rules: [{required: true, message: '是否要断开连接'}] }]" >
                <a-select-option value="SESSION_CHANGE_HOSTING_ACTION_NOTHING">无操作</a-select-option>
                <a-select-option value="SESSION_CHANGE_HOSTING_ACTION_SUSPEND">挂起</a-select-option>
                <a-select-option value="SESSION_CHANGE_HOSTING_ACTION_SHUTDOWN">关闭</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="注销时"
              :labelCol="{span:10}"
              :wrapperCol="{span:14}">
              <a-input-number
                placeholder="注销时长"
                :min="0"
                :max="1440"
                v-decorator="['log_off_timeout', { rules: [{required: true, message: '请输入注销时长'}] }]" />
              <span class="minute"> 分钟</span>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item>
              <a-select
                style="width:170px"
                v-decorator="['log_off_action', { rules: [{required: true, message: '操作'}] }]" >
                <a-select-option value="SESSION_CHANGE_HOSTING_ACTION_NOTHING">无操作</a-select-option>
                <a-select-option value="SESSION_CHANGE_HOSTING_ACTION_SUSPEND">挂起</a-select-option>
                <a-select-option value="SESSION_CHANGE_HOSTING_ACTION_SHUTDOWN">关闭</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item label="预启动">
          <a-input-number
            placeholder="请输入预先启动"
            :min="0"
            :max="1440"
            v-decorator="['buffer_size_percent', { rules: [{required: true, message: '请输入名称前缀'}] }]" />
          <span style="color:white;margin:10px">%</span>
        </a-form-item>
        <a-form-item :wrapperCol="{span: 16, offset: 10}">
          <a-button
            type="primary"
            :loading="loading"
            @click="save">保存</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import { CloudDesktopGroupGet, CloudDesktopGroupPatchPowerStrategy } from '@/api/CloudDesktop/CloudDesktop'
export default {
  props: {
    datasource: {
      type: Array,
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
      queryParam: {},
      spinning: false
    }
  },
  methods: {
    getdata () {
        this.spinning = true
                console.log(this.datasource)
                this.$nextTick(() => {
                        this.form.setFieldsValue({
                            peak: '1',
                            buffer_size_percent: this.datasource[0].peak_buffer_size_percent,
                            disconnect_action: this.datasource[0].peak_disconnect_action,
                            disconnect_timeout: this.datasource[0].peak_disconnect_timeout,
                            log_off_action: this.datasource[0].peak_log_off_action,
                            log_off_timeout: this.datasource[0].peak_log_off_timeout
                        })
                    // }
                    this.spinning = false
                })
    },
    // 保存
    save () {
      this.loading = true
      const { form: { validateFields } } = this
      validateFields((err, values) => {
          if (!err) {
              try {
                  values.peak = Boolean(+values.peak)
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
    },
    changePeak (value) {
        this.spinning = true
        if (value === '1') {
            // CloudDesktopGroupGet(this.queryParam).then((res) => {
                this.$nextTick(() => {
                        this.form.setFieldsValue({
                            peak: '1',
                            buffer_size_percent: this.datasource[0].peak_buffer_size_percent,
                            disconnect_action: this.datasource[0].peak_disconnect_action,
                            disconnect_timeout: this.datasource[0].peak_disconnect_timeout,
                            log_off_action: this.datasource[0].peak_log_off_action,
                            log_off_timeout: this.datasource[0].peak_log_off_timeout
                        })
                    this.spinning = false
                })
            // })
        } else {
            CloudDesktopGroupGet(this.queryParam).then((res) => {
                this.$nextTick(() => {
                        this.form.setFieldsValue({
                            peak: '0',
                            buffer_size_percent: this.datasource[0].off_peak_buffer_size_percent,
                            disconnect_action: this.datasource[0].off_peak_disconnect_action,
                            disconnect_timeout: this.datasource[0].off_peak_disconnect_timeout,
                            log_off_action: this.datasource[0].off_peak_log_off_action,
                            log_off_timeout: this.datasource[0].off_peak_log_off_timeout
                        })
                    this.spinning = false
                })
            })
        }
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
