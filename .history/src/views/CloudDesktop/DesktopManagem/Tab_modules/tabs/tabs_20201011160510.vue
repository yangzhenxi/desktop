<template>
  <a-tabs
    type="card"
    @change="handlechange"
    default-active-key="1"
    :tabBarGutter="tabBarGutter">
    <a-tab-pane
      key="1"
      tab="版本">
      <tab1 />
    </a-tab-pane>
    <a-tab-pane
      key="2"
      tab="硬件配置">
      <tab2
        :slider="networdDisabled"
        :tooltipvisible="tooltipvisible" />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import Tab1 from './tab1'
import Tab2 from './tab2'
import { mapState, mapMutations } from 'vuex'
import { mixinTable } from '@/utils/mixin'

export default {
  mixins: [ mixinTable ],
  components: {
    Tab1,
    Tab2
  },
  data () {
    return {
      tabBarGutter: 20,
      networdDisabled: false,
      tooltipvisible: true
    }
  },
      computed: {
        ...mapState({
            'ModuleData': state => state.DesktopManage.ModuleData,
            'Version': state => state.DesktopManage.Version
        })
    },
    mounted () {

    },
  methods: {
        ...mapMutations(['SET_VERSION', 'SET_TOOLTIP']),

    async handlechange (value) {
        if (value === '1') {
        this.$store.dispatch('GetVersionList')
        this.SET_TOOLTIP(false)
       } else {
           this.SET_TOOLTIP(true)
       }
    }
  }
}
</script>

<style>
</style>
