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
      reversedMessage: function (item) {
          return this.msg.split('').reverse().join('')
      },
      now:(){
          
      }
  }
}
</script>

<style>
</style>
