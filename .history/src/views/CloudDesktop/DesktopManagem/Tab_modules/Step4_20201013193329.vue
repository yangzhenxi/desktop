<template>
  <div class="step4">
    <a-descriptions title="模版信息">
      <a-descriptions-item label="所属分组">
        {{ data.group }}
      </a-descriptions-item>
      <a-descriptions-item label="模版名称">
        {{ data.name }}
      </a-descriptions-item>
      <a-descriptions-item label="系统镜像">
        {{ data.image }}
      </a-descriptions-item>
      <a-descriptions-item
        label="软件信息"
        span="2">
        {{ data.software }}
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="硬件信息">
      <a-descriptions-item label="数据中心">
        {{ data.dataCenter }}
      </a-descriptions-item>
      <a-descriptions-item label="集群/主机">
        {{ data.clusterOrHost }}
      </a-descriptions-item>
      <a-descriptions-item label="资源池">
        {{ data.resourcePools }}
      </a-descriptions-item>
      <a-descriptions-item label="网络">
        {{ data.network }}
      </a-descriptions-item>
      <a-descriptions-item label="CPU核心数">
        {{ data.cpuNum }}个
      </a-descriptions-item>
      <a-descriptions-item label="插槽核心">
        {{ data.socket }}个
      </a-descriptions-item>
      <a-descriptions-item label="内存">
        {{ data.memoryMB / 1024 }} GB
      </a-descriptions-item>
      <a-descriptions-item label="系统盘">
        {{ data.capacityKB /1024/1024 }} GB
      </a-descriptions-item>
    </a-descriptions>
    <a-row>
      <a-col
        :offset="9"
        :span="10">
        <a-button @click="prevStep">上一步</a-button>
        <a-button
          type="primary"
          style="margin-left: 8px"
          @click="close"
          :loading="loading">提交</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { DesktopTemplateAdd } from '@/api/CloudDesktop/DesktopManagem'
export default {
    props: {
        tpAllList: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            loading: false,
            group: String
        }
    },
    computed: {
        ...mapState({
            data: state => state.DesktopManage.formValue,
            TPgroupList: state => state.DesktopManage.TPgroupList
        })
    },
    filters () {

    },
    created () {
        this.Recursion(this.tpAllList)
    },
    methods: {
        prevStep () {
            this.$emit('prevStep')
        },
        async close () {
            this.loading = true
            await DesktopTemplateAdd(this.data)
                .then(res => {
                    this.$message.success('创建中，请稍后')
                    this.loading = false
                    this.$emit('close', res)
                })
                .catch(() => {
                    this.$message.error('新建失败')
                    this.loading = false
                })
            this.loading = false
        },
        Recursion (Array) {
            Array.forEach(u => {
                if (u.key === this.data.group) {
                    this.group = u.title
                }
                if (u.children.length > 0) {
                    this.Recursion(u.children)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.step4 {
    margin-top: 40px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 10px;
}
.modules {
    padding: 10px;
    background-color: wheat;
    margin: 10px;
    box-sizing: border-box;
}
/deep/.ant-descriptions-title,
/deep/.ant-descriptions-item-label,
/deep/.ant-descriptions-item-content {
    color: white;
}
</style>
