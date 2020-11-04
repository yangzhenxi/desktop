<template>
  <div class="empty-wrapper" :style="{ minHeight: `${minHeight}px` }">
    <template v-if="isEmpty">
      <a-empty class="empty" :image="$EMPTY.PRESENTED_IMAGE_SIMPLE" />
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Empty',
  props: {
    isEmpty: {
      type: Boolean,
      default: false
    },
    minHeight: {
      type: Number,
      default: 400
    }
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
