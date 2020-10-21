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
          v-decorator="['data_center', { rules: [{required: true, message: '请选择数据中心'}] }]">
          <a-select-option
            v-for="(i,index) in this.DataCenterList.data"
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
          v-decorator="['cluster_or_host', { rules: [{required: true, message: '请选择集群/主机'}] }]">
          <a-select-option
            v-for="(i,index) in cluster_or_host"
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
          v-decorator="['resource_pool']">
          <a-select-option
            v-for="(i,index) in resource_pools"
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
          @change="changeSocket"
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
          <a-select-option v-for="i in Socket" :value="i" :key="i">{{ i }}</a-select-option>
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
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'Step2',
    data () {
        return {
            memoryMB: 1,
            labelCol: { lg: { span: 5 }, sm: { span: 5 } },
            wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
            form: this.$form.createForm(this),
            loading: false,
            timer: 0,
            clusters: [], // 集群
            hosts: [], // 主机
            cluster_or_host: [], // 集群/主机
            networks: [], // 网络
            resource_pools: [], // 资源池
            data_stores: [], // 数据存储
            Socket: [1]
        }
    },
        computed: {
        ...mapState({
            'formValue': state => state.DesktopManage.formValue,
            'is_cluster': state => state.DesktopManage.isCluster, // 判断是否是集群还是主机
            'Space': state => state.DesktopManage.Space, // 内存容量
            'DataCenterList': state => state.DesktopManage.DataCenterList // 中心数据
        })
    },
    mounted () {
        if (Object.keys(this.formValue).length > 5) {
            this.$nextTick(() => {
                this.form.setFieldsValue({
                    capacityKB: this.formValue.capacityKB / 1024 / 1024,
                    cluster_or_host: this.formValue.cluster_or_host,
                    cpuNum: this.formValue.cpuNum,
                    memoryMB: this.formValue.memoryMB / 1024,
                    network: this.formValue.network,
                    resource_pool: this.formValue.resource_pool,
                    socket: this.formValue.socket,
                    data_center: this.formValue.data_center
                })
            })
        }
    },

    methods: {
        ...mapMutations(['SET_FORMVALUE', 'SET_ISCLUSTER', 'SET_SPACE']),
        // 解析datacenterList的数据
        getdataCenter (value) {
            this.DataCenterList.data.forEach(u => {
                if (u.name === value) {
                    this.clusters = u.clusters
                    this.hosts = u.hosts
                    this.cluster_or_host.push(...u.clusters, ...u.hosts)
                }
            })
        },
        // 判断是集群还是主机
        clusterOrHost (value) {
            this.clusters.some(u => {
                if (u.name === value) {
                    this.SET_ISCLUSTER(true)
                }
            })
            // 显示出相应的资源池和网络
            if (this.is_cluster) {
                // 是集群
                this.clusters.forEach(u => {
                    if (u.name === value) {
                        this.networks = u.networks
                        this.resource_pools = u.resource_pools
                        this.data_stores = u.data_stores
                        this.SET_SPACE(u.data_stores)
                    }
                })
            } else {
                // 主机
                this.hosts.forEach(u => {
                    if (u.name === value) {
                        this.networks = u.networks
                        this.resource_pools = u.resource_pools
                        this.data_stores = u.data_stores
                        this.SET_SPACE(u.data_stores)
                    }
                })
            }
            this.form.resetFields(['networks', 'resource_pools'])
        },
        // 插槽核心数
        changeSocket (value) {
            if (value === '1') {
                this.Socket = [1]
                this.form.setFieldsValue({socket:})
            } else {
                this.Socket = [1, 2]
            }
        },
        // 下一步
        nextStep () {
            const that = this
            const {
                form: { validateFields }
            } = this
            that.loading = true
            validateFields((err, values) => {
                if (!err) {
                    values.is_cluster = that.is_cluster
                    values.memoryMB = values.memoryMB * 1024
                    values.capacityKB = values.capacityKB * 1024 * 1024
                    that.timer = setTimeout(function () {
                        that.loading = false
                        that.SET_FORMVALUE(values)
                        that.$emit('nextStep')
                    }, 500)
                } else {
                    that.loading = false
                }
            })
        },
        // 上一步
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
