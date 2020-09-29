<template>
  <a-tabs
    type="card"
    @change="callback"
    default-active-key="1"
    :tabBarGutter="tabBarGutter">
    <a-tab-pane
      key="1"
      tab="版本">
      <tab1
        :templateId="templateId"
        @disabled="disabled" />
    </a-tab-pane>
    <a-tab-pane
      key="2"
      tab="硬件配置">
      <tab2 />
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
      type: String,
      required: true
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

      }
    },
    disabled (Boole) {
        this.$emit('disabled', Boole)
    }
  }
}
</script>

<style>
</style>
