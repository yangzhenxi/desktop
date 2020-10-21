<template>
  <a-tabs
    type="card"
    @change="handlechange"
    default-active-key="1"
    :tabBarGutter="tabBarGutter">
    <a-tab-pane
      key="1"
      tab="版本">
      <tab1 :loadData="loadData" />
    </a-tab-pane>
    <a-tab-pane
      key="2"
      tab="硬件配置">
      <tab2
        :modulesData="modulesData"
        :slider="networdDisabled"
        :tooltipvisible="tooltipvisible" />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import Tab1 from './tab1'
import Tab2 from './tab2'
import { mapState } from 'vuex'
import { mixinTable } from '@/utils/mixin'
import { DesktopTemplateVersionList } from '@/api/CloudDesktop/DesktopManagem'

export default {
  mixins: [ mixinTable ],
  components: {
    Tab1,
    Tab2
  },
  props: {
    modulesData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tabBarGutter: 20,
      networdDisabled: false,
      tooltipvisible: true,
            // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
          console.log(this.ModuleData)
        this.queryParam.templateId = this.ModuleData.id
        const data = this.deepGet(await DesktopTemplateVersionList(this.queryParam), 'data', [])
        if (data.length > 0) {
            this.networdDisabled = true
            this.$emit('disabled', true)
        }
        return {
          data
        }
      }
    }
  },
      computed: {
        ...mapState({
            'ModuleData': state => state.DesktopManage.ModuleData
        })
    },
  methods: {
    handlechange (value) {
      if (value === '1') {
          this.tooltipvisible = false
      } else {
          this.tooltipvisible = true
      }
    }
  }
}
</script>

<style>
</style>
