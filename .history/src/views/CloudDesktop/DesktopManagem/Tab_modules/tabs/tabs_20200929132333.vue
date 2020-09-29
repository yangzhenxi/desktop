<template>
  <a-tabs
    type="card"
    @change="callback"
    default-active-key="1"
    :tabBarGutter="tabBarGutter">
    <a-tab-pane
      key="1"
      tab="版本">
      <tab1 :templateId="templateId" />
    </a-tab-pane>
    <a-tab-pane
      key="2"
      tab="硬件配置">
      <tab2/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { DesktopTemplateNetworkList } from '@/api/CloudDesktop/DesktopManagem'

import Tab1 from './tab1'
import Tab2 from './tab2'
export default {
    components: {
        Tab1,
        Tab2
    },
    props: {
        templateId: {

        }
    },
    data () {
        return {
            tabBarGutter: 20
        }
    },
    methods: {
            // 获取网络信息
    async callback (key) {
      if (key === '2') {
        const obj = {
          host: this.modulesData.host
        }
        await DesktopTemplateNetworkList(obj).then((res) => {
          this.netword = this.deepGet(res, 'data', [])
        })
        this.$nextTick(() => {
          setTimeout(() => {
            this.form.setFieldsValue({
              cpuNum: this.modulesData.cpuNum,
              socket: this.modulesData.socket,
              network: this.modulesData.network,
              memoryMB: this.modulesData.memoryMB / 1024,
              capacityKB: this.modulesData.capacityKB / 1024 / 1024
            })
          })
        })
      }
    }
    }
}
</script>

<style>

</style>
