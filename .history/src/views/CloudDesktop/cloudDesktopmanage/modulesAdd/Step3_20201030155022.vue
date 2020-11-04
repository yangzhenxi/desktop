<template>
  <div class="step4">
    <a-descriptions title="桌面信息">
      <a-descriptions-item label="桌面名称">
        {{ data.name }}
      </a-descriptions-item>
      <a-descriptions-item label="名称前缀">
        {{ data.naming_scheme }}
      </a-descriptions-item>
      <a-descriptions-item label="选择模版">
        {{ data.template | TP }}
      </a-descriptions-item>
      <a-descriptions-item label="版本号">
        {{ data.version | Version }}
      </a-descriptions-item>
      <a-descriptions-item label="分组">
        {{ data.dn | DN }}
      </a-descriptions-item>
      <a-descriptions-item label="名称格式">
        {{ data.naming_scheme_type| convert('C_D_DESKTOP_NAMINGSCHEMETYPE') }}
      </a-descriptions-item>
      <a-descriptions-item label="起始数字">
        {{ data.Number }}
      </a-descriptions-item>
      <a-descriptions-item label="桌面数量">
        {{ data.count }}
      </a-descriptions-item>
      <a-descriptions-item label="桌面类型">
        {{ data.desktop_type | convert('C_D_DESKTOP_TYPE') }}
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="硬件参数">
      <a-descriptions-item
        label="托管资源"
        :span="3">
        {{ data.hosting_unit | Host }}
      </a-descriptions-item>
      <a-descriptions-item label="网络">
        {{ data.network | Network }}
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
import { CloudDesktopTPAdd } from '@/api/CloudDesktop/CloudDesktop'
let that = Object
export default {
    computed: {
        ...mapState({
            data: state => state.cloudDesktop.formValue,
            AllVersion: state => state.cloudDesktop.AllVersion,
            networks: state => state.cloudDesktop.networks,
            AllTP: state => state.cloudDesktop.AllTP,
            HostingUnit: state => state.cloudDesktop.HostingUnit,
            OUList: state => state.cloudDesktop.OUList,
            AllOU: state => state.cloudDesktop.AllOU
        })
    },
    data () {
        return {
            loading: false,
            that: this,
            record: {}
        }
    },
    filters: {
        TP (item) {
            let name = ''
            that.AllTP.forEach(u => {
                if (u.id === item) {
                    name = u.name
                }
            })
            return name
        },
        Version (item) {
            let version = ''
            that.AllVersion.forEach(u => {
                if (u.id === item) {
                    version = u.version
                }
            })
            return version + '号版本'
        },
        Host (item) {
            const Host = that.HostingUnit.find(u => u.path === item)
            return Host.name
        },
        Network (item) {
            const network = that.networks.find(u => u.path === item)
            return network.id
        },
        DN (item) {
            const DN = that.OUList.find(u => u.dn === item)
            that.record = that.AllOU.find(u => u.value === DN.dn)
            console.log(that.AllOU)
            return DN.name
        }
    },
    beforeCreate () {
        that = this
    },
    methods: {
        prevStep () {
            this.$emit('prevStep')
        },
        async close () {
            this.loading = true
            await CloudDesktopTPAdd(this.data).then(res => {
                    this.$message.success('新建成功')
                    this.loading = false
                    this.$emit('close', this.record)
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
                    this.group = u
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
