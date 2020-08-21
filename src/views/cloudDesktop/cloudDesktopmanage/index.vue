<template>
  <page-header-wrapper>

    <a-button>
      <a href="@/component/index.js" download="写入模版">点击下载</a>
    </a-button>
  </page-header-wrapper>
</template>

<script>
export default {
    data () {
        return {
            message: 'word',
            name: 'yzx'
        }
    },
    component: {
        SerMessage () {
            return this.message.split('').reverse().join('')
        }
    },
    watch: {
        name () {
            this.name = 'abc' + this.message
        },
        message () {
            return 'message'
        }
    },
    methods: {
        handleClick () {
            this.name = '123'
        }
    },
    filters: {

    }
}
</script>

<style>

</style>
