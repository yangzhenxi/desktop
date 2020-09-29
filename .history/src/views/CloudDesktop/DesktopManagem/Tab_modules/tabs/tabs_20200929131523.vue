<template>
  <a-tabs
    type="card"
    @change="callback"
    :tabBarGutter="tabBarGutter">
    <a-tab-pane
      key="1"
      tab="版本">
    </a-tab-pane>
    <a-tab-pane
      key="2"
      tab="硬件配置">

    </a-tab-pane>
  </a-tabs>
</template>

<script>
export default {
    data () {
        return {
      tabBarGutter: 20

        }
    }
}
</script>

<style>

</style>
