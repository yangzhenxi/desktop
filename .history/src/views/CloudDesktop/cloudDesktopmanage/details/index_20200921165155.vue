<template>
  <div v-if="visible"></div>
</template>

<script>
export default {
    data () {
        return {
            visible: false
        }
    },
    OnSingle () {
        this.visible = true
    }
}
</script>

<style>

</style>
