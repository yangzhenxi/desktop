<template>
  <page-header-wrapper>
    {{ msg }}
    <br>
    {{ reversedMessage }}
    <br>
    {{ this.now }}
    <br>
    {{ newDate }}
  </page-header-wrapper>
</template>

<script>
export default {
  data () {
    return {
        msg: 'Hello,word',
        newDate: new Date()
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
      newDate: function (item) {
          console.log(this.now)
          return new Date()
      }
  }
}
</script>

<style>
</style>
