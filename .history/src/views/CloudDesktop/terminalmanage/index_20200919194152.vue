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
          console.log(this)
          return this.msg.split('').reverse().join('')
      },
      now: () => {
          return Date.now()
      }
  }
}
</script>

<style>
</style>
