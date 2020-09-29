<template>
  <page-header-wrapper>
    {{ msg }}
    <br>
    {{ reversedMessage }}
    <br>
    {{ this.now }}
    <br>
  </page-header-wrapper>
</template>

<script>
export default {
  data () {
    return {
        msg: 'Hello,word'
    }
  },
  computed: {
      reversedMessage: function () {
          return this.msg.split('').reverse().join('')
      },
      now: () => {
          return Date.now()
      }
  },
  watch: {
      newDate: function () {

      }
  }
}
</script>

<style>
</style>
