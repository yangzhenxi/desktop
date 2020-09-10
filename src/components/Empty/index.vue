<template>
  <a-empty v-if="isEmpty" :image="simpleImage"/>
</template>

<script>
import { Empty } from 'ant-design-vue'

export default {
  name: 'Empty',
  props: {
    isEmpty: {
      type: Boolean,
      default: false
    }
  },
      beforeCreate () {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
  }
}

</script>
<style lang='less' scoped>
.empty-wrapper {
  position: relative;
  width: 100%;
  min-height: 400px;
  .empty {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0;
    transform: translate(-50%, -50%);
  }
}
</style>
