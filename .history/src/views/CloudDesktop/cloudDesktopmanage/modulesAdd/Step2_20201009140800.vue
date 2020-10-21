2<template>
  <div class="step2">
    <a-form
      :form="form"
      style="max-width: 500px; margin: 40px auto 0;">
      <!-- <a-form-item
        label="内存"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <div class="slider_title">
          <div></div>
          <a-tag color="#2db7f5">
            30GB
          </a-tag>
        </div>
        <a-slider
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
          v-decorator="['capacityKB', { rules: [{required: true, message: '请选择系统盘'}] }]"
          :min="80"
          :max="300" />
      </a-form-item> -->
      <a-form-item
        label="托管资源"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <a-select
          placeholder="请选择托管资源"
          v-decorator="['network', { rules: [{required: true, message: '请选择托管资源'}] }]">
          <a-select-option v-for="(i,index) in networks" :key="index" :value="i.name">{{ i.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="网络"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <a-select
          placeholder="请选择网络"
          v-decorator="['network', { rules: [{required: true, message: '请选择网络'}] }]">
          <a-select-option v-for="(i,index) in networks" :key="index" :value="i.name">{{ i.name }}</a-select-option>
        </a-select>
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
  </div>
</template>

<script>
import { CloudDesktopHostList } from '@/api/CloudDesktop/CloudDesktop'
export default {
  name: 'Step2',
   props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      capacityKB: 1,
      memoryMB: 1,
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false
    }
  },
  methods: {
      // 解析datacenterList的数据
      getdataCenter (value) {
        this.data.DataCenterList.forEach(u => {
            if (u.name === value) {
                this.clusters = u.clusters
                this.hosts = u.hosts
                this.clustersHosts.push(...u.clusters, ...u.hosts)
            }
        })
      },
      // 判断是集群还是主机
      clusterOrHost (value) {
          this.isCluster = this.clusters.some((u) => {
              if (u.name === value) {
                  return true
              }
          })
          // 显示出相应的资源池和网络
          if (this.isCluster) {
              // 是集群
              this.clusters.forEach(u => {
                  if (u.name === value) {
                      this.networks = u.networks
                      this.resourcePools = u.resourcePools
                      this.dataStores = u.dataStores
                  }
              })
          } else {
              // 主机
              this.hosts.forEach(u => {
                  if (u.name === value) {
                      this.networks = u.networks
                      this.resourcePools = u.resourcePools
                      this.dataStores = u.dataStores
                  }
              })
          }
          this.form.resetFields(['networks', 'resourcePools'])
      },
    nextStep () {
      const that = this
      const {
        form: { validateFields }
      } = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          values.isCluster = that.isCluster
          values.memoryMB = values.memoryMB * 1024
          values.capacityKB = values.capacityKB * 1024 * 1024

          that.timer = setTimeout(function () {
            that.loading = false
            that.$emit('nextStep', values, that.dataStores)
          }, 500)
        } else {
          that.loading = false
        }
      })
    },
    prevStep () {
      this.$emit('prevStep')
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
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
/deep/label[title='内存'],
/deep/label[title='系统盘'] {
  color: white;
}
</style>
