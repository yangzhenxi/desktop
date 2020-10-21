<template>
  <a-spin :spinning="loading">
    <a-form :form="form">
      <div style="height:30px;"></div>
      <a-form-item
        label="CPU核心数"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <a-select
          placeholder="请选择CPU核心数"
          v-decorator="['cpuNum', { rules: [{required: true, message: '请选择CPU核心数'}] }]">
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="插槽核心"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <a-select
          placeholder="请选择插槽核心"
          v-decorator="['socket', { rules: [{required: true, message: '请选择插槽核心'}] }]">
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="网络"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <a-select
          placeholder="请选择所属分组"
          v-decorator="['network', { rules: [{required: true, message: '付款账户必须填写'}] }]">
          <a-select-option
            v-for="(i,index) in netword"
            :key="index"
            :value="i.name">{{ i.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="内存"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <div class="slider_title">
          <div></div>
          <a-tag color="#2db7f5">
            32GB
          </a-tag>
        </div>
        <a-slider
          :tooltip-visible="tooltipvisible"
          v-decorator="['memoryMB', { rules: [{required: true, message: '请选择内存数量'}] }]"
          :min="2"
          :max="32" />
      </a-form-item>
      <a-form-item
        label="系统盘"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <div class="slider_title">
          <div></div>
          <a-tag color="#2db7f5">
            300GB
          </a-tag>
        </div>
        <a-slider
          :tooltip-visible="tooltipvisible"
          :disabled="slider"
          v-decorator="['capacityKB', { rules: [{required: true, message: '请选择系统盘'}] }]"
          :min="80"
          :max="300" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 10, offset: 12}">
        <a-button
          type="primary"
          style="margin-bottom:20px;"
          :loading="loadingConfig"
          @click="Configure">提交</a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>

<script>
import { mapState } from 'vuex'
import { mixinFormModal } from '@/utils/mixin'
import {
    DesktopTemplateNetworkList,
    DesktopTemplateConfigure
} from '@/api/CloudDesktop/DesktopManagem'
export default {
    mixins: [mixinFormModal],
    props: {
        slider: {
            type: Boolean,
            required: true
        },
        tooltipvisible: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        ...mapState({
            ModuleData: state => state.DesktopManage.ModuleData
        })
    },
    data () {
        return {
            loading: false,
            loadingConfig: false,
            netword: [] // 网络,
        }
    },
    created () {
        this.GetNetword()
    },
    methods: {
        async GetNetword () {
            this.loading = true
            console.log(this.ModuleData)
            const obj = { host: this.moduleData.host }
            await DesktopTemplateNetworkList(obj).then(res => {
                this.netword = this.deepGet(res, 'data', [])
            })
            this.$nextTick(() => {
                setTimeout(() => {
                    this.form.setFieldsValue({
                        cpuNum: this.moduleData.cpuNum,
                        socket: this.moduleData.socket,
                        network: this.moduleData.network,
                        memoryMB: this.moduleData.memoryMB / 1024,
                        capacityKB: this.moduleData.capacityKB / 1024 / 1024
                    })
                })
            })
            this.loading = false
        },
        // 硬件配置
        Configure () {
            this.loadingConfig = true
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    values.name = this.moduleData.name
                    values.capacityKB = values.capacityKB * 1024 * 1024
                    values.memoryMB = values.memoryMB * 1024
                    await DesktopTemplateConfigure(values).then(res => {
                        this.$message.success('配置成功')
                        this.loadingConfig = false
                    })
                    this.loadingConfig = false
                }
            })
        }
    }
}
</script>

<style>
</style>
