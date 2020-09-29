<template>
  <page-header-wrapper>
    {{ msg }}
    <br>
    {{ reversedMessage }}
    <br>
    {{ now }}
    <br>
    {{ newDate }}
    <br>
    <a-button @click="chanage">改变</a-button>
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
          console.log(this.newDate)
          return new Date()
      }
  },
  methods: {
      chanage () {
          this.newDate = new date()
      }
  }
}
</script>

<style>
</style>
