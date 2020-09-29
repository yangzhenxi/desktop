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
          :tooltip-visible="true"
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
          :tooltip-visible="true"
          :disabled="sliderDisabled"
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
import { mixinFormModal } from '@/utils/mixin'

export default {
  mixins: [mixinFormModal],
    data () {
        return {
            loading: false,
            netword: [] // 网络,
        }
    },
    created () {

    }
}
</script>

<style>

</style>
