<template>
  <a-tabs
    type="card"
    @change="handlechange"
    default-active-key="1"
    :tabBarGutter="tabBarGutter">
    <a-tab-pane
      key="1"
      tab="版本">
      <tab1
        :templateId="templateId"
        @disabled="disabled"
        @sliderDisabled="sliderDisabled"/>
    </a-tab-pane>
    <a-tab-pane
      key="2"
      tab="硬件配置">
      <tab2 :modulesData="modulesData" :slider="networdDisabled" :tooltipvisible="tooltipvisible" />
    </a-tab-pane>
  </a-tabs>
</template>

<script>

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
    },
    modulesData: {
        type: Object,
        required: true
    }
  },
  data () {
    return {
      tabBarGutter: 20,
      networdDisabled: false,
      tooltipvisible: false
    }
  },
  methods: {
    disabled (Boole) {
        this.$emit('disabled', Boole)
    },
    sliderDisabled (Boole) {
        this.networdDisabled = Boole
    },
    handlechange (value) {
        if (value === '1') {
            this.tooltipvisible = false
        this.networdDisabled = false
        } else {
            this.tooltipvisible = true
        this.networdDisabled = true
        }
    }
  }
}
</script>

<style>
</style>
