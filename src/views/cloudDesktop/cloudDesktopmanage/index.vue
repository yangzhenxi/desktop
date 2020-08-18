<template>
  <div>
    <a-button @click="handleClick">改变</a-button>
    <p>hello,{{ SerMessage }}</p>
    <p>{{ name }}</p>
  </div>
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
