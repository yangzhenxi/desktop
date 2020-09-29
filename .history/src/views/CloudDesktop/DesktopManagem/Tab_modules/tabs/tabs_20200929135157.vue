<template>
  <a-tabs
    type="card"
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
      <tab2 :modulesData="modulesData" :sliderDisabled="sliderDisabled" />
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
      sliderDisabled: true
    }
  },
  methods: {
    disabled (Boole) {
        this.$emit('disabled', Boole)
    },
    sliderDisabled (Boole) {
        this.sliderDisabled = Boole
    }
  }
}
</script>

<style>
</style>
