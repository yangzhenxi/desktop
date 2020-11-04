<template>
  <div class="step2">
    <a-spin :spinning="SpinningLoading">
      <a-form
        :form="form"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        style="max-width: 500px; margin: 40px auto 0;">
        <a-form-item
          label="托管资源"
          class="stepFormText">
          <a-select
            placeholder="请选择托管资源"
            @select="handeleChange"
            v-decorator="['hosting_unit', { rules: [{required: true, message: '请选择托管资源'}] }]">
            <a-select-option
              v-for="(i,index) in Host"
              :key="index"
              :value="i.path">{{ i.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="网络"
          class="stepFormText">
          <a-select
            placeholder="请选择网络"
            v-decorator="['network', { rules: [{required: true, message: '请选择网络'}] }]">
            <a-select-option
              v-for="(i,index) in networks"
              :key="index"
              :value="i.path">{{ i.id }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="cpu核心数"
          class="stepFormText">
          <a-select
            disabled
            placeholder="请选择cpu核心数"
            v-decorator="['cpuNum']">
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="插槽核心"
          class="stepFormText">
          <a-select
            disabled
            placeholder="请输入插槽核心"
            v-decorator="['socket']">
            <a-select-option :value="1">1</a-select-option>
            <a-select-option :value="2">2</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="内存"
          class="stepFormText">
          <div class="slider_title">
            <div></div>
            <a-tag color="#2db7f5">
              32GB
            </a-tag>
          </div>
          <a-slider
            :tooltip-visible="true"
            disabled
            v-decorator="['memoryMB', { rules: [{required: true, message: '请选择内存数量'}] }]"
            :min="2"
            :max="32" />
        </a-form-item>
        <a-form-item
          label="系统盘"
          class="stepFormText">
          <div class="slider_title">
            <div></div>
            <a-tag color="#2db7f5">
              300GB
            </a-tag>
          </div>
          <a-slider
            disabled
            :tooltip-visible="true"
            v-decorator="['capacityKB', { rules: [{required: true, message: '请选择系统盘'}] }]"
            :min="80"
            :max="300" />
        </a-form-item>
        <a-form-item :wrapperCol="{span: 19, offset: 5}">
          <a-button @click="prevStep">上一步</a-button>
          <a-button
            :loading="loading"
            style="margin-left: 8px"
            type="primary"
            @click="nextStep">下一步</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { CloudDesktopHostList } from '@/api/CloudDesktop/CloudDesktop'
import { DesktopGetTemplate } from '@/api/CloudDesktop/DesktopManagem'
import { deepGet } from '@/utils/util'
export default {
    name: 'Step2',
    data () {
        return {
            labelCol: { lg: { span: 5 }, sm: { span: 5 } },
            wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
            form: this.$form.createForm(this),
            loading: false,
            Host: [],
            networks: [],
            SpinningLoading: false
        }
    },
    computed: {
        ...mapState({
            formValue: state => state.cloudDesktop.formValue,
            Version: state => state.cloudDesktop.Version,
            Net: state => state.cloudDesktop.networks,
            TPList: state => state.cloudDesktop.TPList
        })
    },
    created () {
        this.getHostList()
    },
    methods: {
        ...mapMutations(['SET_FORMVALUE', 'SET_NETWORKS']),

        handeleChange (value) {
            this.networks = deepGet(
                this.Host.find(u => u.path === value),
                'networks',
                []
            )
        },
        async getHostList () {
            this.SpinningLoading = true
            this.Net ? this.networks = this.Net : this.networks = []
            const res = deepGet(await DesktopGetTemplate({ id: this.formValue.template }), 'data', {})
            this.$nextTick(() => {
                this.form.setFieldsValue({
                    capacityKB: res.capacityKB / 1024 / 1024,
                    cpuNum: res.cpu_num,
                    memoryMB: res.memoryMB / 1024,
                    socket: res.socket,
                    hosting_unit: this.formValue.hosting_unit,
                    network: this.formValue.network
                })
            })
            CloudDesktopHostList().then(res => {
                this.Host = deepGet(res, 'data', [])
                this.SpinningLoading = false
            })
        },
        nextStep () {
            const that = this
            const {
                form: { validateFields }
            } = this
            that.loading = true
            validateFields((err, values) => {
                if (!err) {
                    this.SET_FORMVALUE(values)
                    this
                    .setTimeout(function () {
                        that.loading = false
                        that.$emit('nextStep')
                    }, 500)
                } else {
                    that.loading = false
                }
            })
        },
        prevStep () {
            // this.SET_FORMVALUE(values)
            this.$emit('prevStep')
        }
    }
}
</script>

<style lang="less" scoped>
.stepFormText {
    margin-bottom: 24px;
    .ant-form-item-label,
    .ant-form-item-control {
        line-height: 22px;
    }
}
.ant-slider {
    margin-top: 0px;
}
.slider_title {
    display: flex;
    justify-content: space-between;
}
.step2 {
    margin-top: 40px;
    border: 1px solid #cccccc;
    border-radius: 5px;
}
/deep/.ant-select-disabled .ant-select-selection {
    background: none;
}
</style>
