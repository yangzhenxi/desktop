<template>
  <page-header-wrapper>
    终端管理
  </page-header-wrapper>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
      reversedMessage: function (item) {
          return this.msg.split(''.reverse().join(''))
      }
  }
}
</script>

<style>
</style>
