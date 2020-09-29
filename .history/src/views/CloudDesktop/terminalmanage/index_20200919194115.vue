<template>
  <page-header-wrapper>
    {{ msg }}
    {{ reversedMessage }}
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
      reversedMessage: () => {
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
