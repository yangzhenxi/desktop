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
      <a-descriptions-item label="分组" :span="2">
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
            OUList: state => state.cloudDesktop.OUList

        })
    },
    data () {
        return {
            loading: false,
            that: this
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
            // console.log(this.networks)
            let version = ''
            that.AllVersion.forEach(u => {
                if (u.id === item) {
                    version = u.version
                }
            })
            return version + '号版本'
        },
        Host (item) {
            console.log(item)
            console.log(that.HostingUnit)
            const Host = ''
            that.HostingUnit.forEach(u => {

            })
        },
        Network (item) {
            let network = ''
            that.networks.forEach(u => {
                if (u.path === item) {
                    network = u.id
                }
            })
            return network
        },
        DN (item) {
            // let DN = ''
            // console.log(item)
            // console.log(that.OUList)
            // that.OUList.forEach(u => {
                // console.log(u)
            // })
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
                    this.$emit('close', res)
                })
                .catch(() => {
                    this.$message.error('新建失败')
                    this.loading = false
                })
            this.loading = false
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
