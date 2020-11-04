<template>
  <a-spin :spinning="loading">
    <a-form
      :form="form"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol">
      <div style="height:30px;"></div>
      <a-form-item
        label="CPU核心数"
        class="stepFormText">
        <a-select
          placeholder="请选择CPU核心数"
          v-decorator="['cpu_num', { rules: [{required: true, message: '请选择CPU核心数'}] }]">
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="插槽核心"
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
        class="stepFormText">
        <a-row>
          <a-col :span="12">
            <a-slider v-decorator="['memoryMB', { rules: [{required: true, message: '请选择内存数量'}] }]" v-model="inputValue1" :min="1" :max="20" />
          </a-col>
          <a-col :span="4">
            <a-input-number v-model="inputValue1" :min="1" :max="20" style="marginLeft: 16px" />
          </a-col>
        </a-row>
        <!-- <div class="slider_title">
          <div></div>
          <a-tag color="#2db7f5">
            32GB
          </a-tag>
        </div>
        <a-slider
          v-decorator="['memoryMB', { rules: [{required: true, message: '请选择内存数量'}] }]"
          :min="2"
          :max="32" /> -->
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
    computed: {
        ...mapState({
            ModuleData: state => state.DesktopManage.ModuleData,
            tooltipvisible: state => state.DesktopManage.tooltipVisible,
            slider: state => !state.DesktopManage.disabled
        })
    },
    data () {
        return {
            loading: false,
            loadingConfig: false,
            netword: [] // 网络,
            inputValue1:Number
        }
    },
    created () {
        this.GetNetword()
    },
    methods: {
        async GetNetword () {
            this.loading = true
            const obj = { host: this.ModuleData.host }
            await DesktopTemplateNetworkList(obj).then(res => {
                this.netword = this.deepGet(res, 'data', [])
            })
            this.$nextTick(() => {
                setTimeout(() => {
                    this.form.setFieldsValue({
                        cpu_num: this.ModuleData.cpu_num,
                        socket: this.ModuleData.socket,
                        network: this.ModuleData.network,
                        memoryMB: this.ModuleData.memoryMB / 1024,
                        capacityKB: this.ModuleData.capacityKB / 1024 / 1024
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
                    values.name = this.ModuleData.name
                    values.capacityKB = values.capacityKB * 1024 * 1024
                    values.memoryMB = values.memoryMB * 1024
                    await DesktopTemplateConfigure(values).then(res => {
                        this.$message.success('配置成功')
                        this.loadingConfig = false
                    }).catch(() => {
                        this.loadingConfig = false
                    })
                    this.loadingConfig = false
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.slider_title {
    display: flex;
    justify-content: space-between;
}
</style>
