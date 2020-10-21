2<template>
  <div class="step2">
    <a-form
      :form="form"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="数据中心"
        class="stepFormText">
        <a-select
          placeholder="请选择数据中心"
          @change="getdataCenter"
          v-decorator="['dataCenter', { rules: [{required: true, message: '请选择数据中心'}] }]">
          <a-select-option
            v-for="(i,index) in this.data.DataCenterList.data"
            :key="index"
            :value="i.name">{{ i.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="集群/主机"
        class="stepFormText">
        <a-select
          placeholder="请选择集群/主机"
          @change="clusterOrHost"
          v-decorator="['clusterOrHost', { rules: [{required: true, message: '请选择集群/主机'}] }]">
          <a-select-option
            v-for="(i,index) in clustersHosts"
            :key="index"
            :value="i.name">{{ i.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="资源池"
        class="stepFormText">
        <a-select
          placeholder="请选择资源池"
          @change="getdataCenter"
          allowClear
          :showArrow="false"
          v-decorator="['resourcePools']">
          <a-select-option
            v-for="(i,index) in resourcePools"
            :key="index"
            :value="i.name">{{ i.name }}</a-select-option>
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
            :value="i.name">{{ i.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="cpu核心数"
        class="stepFormText">
        <a-select
          placeholder="请选择cpu核心数"
          v-decorator="['cpuNum', { rules: [{required: true, message: '请选择cpu核心数'}] }]">
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="插槽核心"
        class="stepFormText">
        <a-select
          placeholder="请输入插槽核心"
          v-decorator="['socket', { rules: [{required: true, message: '请输入插槽核心'}] }]">
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
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
          :tooltip-visible="true"
          v-decorator="['capacityKB', { rules: [{required: true, message: '请选择系统盘'}] }]"
          :min="80"
          :max="300" />
      </a-form-item>
      <a-form-item
        label="是否是集群"
        v-show="false">
        <a-select v-decorator="['Space']">
          <a-select-option :value="true">是</a-select-option>
          <a-select-option :value="false">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="存储空间"
        v-show="false">
        <a-select v-decorator="['isCluster']">
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
export default {
    name: 'Step2',
    props: {
        data: {
            type: Object,
            required: true
        },
        oldData: {
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
            loading: false,
            timer: 0,
            clusters: [], // 集群
            hosts: [], // 主机
            clustersHosts: [], // 集群/主机
            isCluster: Boolean, // 判断是否是集群还是主机
            networks: [], // 网络
            resourcePools: [], // 资源池
            dataStores: [] // 数据存储
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.form.setFieldsValue({ isCluster: false })
        })
        if (Object.keys(this.oldData).length > 4) {
            this.$nextTick(() => {
                this.form.setFieldsValue({
                    capacityKB: this.oldData.capacityKB / 1024 / 1024,
                    clusterOrHost: this.oldData.clusterOrHost,
                    cpuNum: this.oldData.cpuNum,
                    memoryMB: this.oldData.memoryMB / 1024,
                    network: this.oldData.network,
                    resourcePools: this.oldData.resourcePools,
                    socket: this.oldData.socket,
                    dataCenter: this.oldData.dataCenter
                })
            })
        }
    },
    methods: {
        // 解析datacenterList的数据
        getdataCenter (value) {
            this.data.DataCenterList.data.forEach(u => {
                if (u.name === value) {
                    this.clusters = u.clusters
                    this.hosts = u.hosts
                    this.clustersHosts.push(...u.clusters, ...u.hosts)
                }
            })
        },
        // 判断是集群还是主机
        clusterOrHost (value) {
            this.isCluster = this.clusters.some(u => {
                if (u.name === value) {
                    this.form.setFieldsValue({ isCluster: true })
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
                        this.$nextTick(() => {
                            this.form.setFieldsValue({ Space: u.dataStores })
                        })
                        // this.dataStores = u.dataStores
                    }
                })
            } else {
                // 主机
                this.hosts.forEach(u => {
                    if (u.name === value) {
                        this.networks = u.networks
                        this.resourcePools = u.resourcePools
                           this.$nextTick(() => {
                            this.form.setFieldsValue({ Space: u.dataStores })
                        })
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
/deep/label[title="内存"],
/deep/label[title="系统盘"] {
    color: white;
}
</style>
