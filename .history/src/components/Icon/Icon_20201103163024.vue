<template>
  <m-icon :type="`icon-${type}`" />
</template>

<script>
import { Icon } from 'ant-design-vue'
// const iconURL = '/assets/js/icon.js'
const iconURL = '//at.alicdn.com/t/font_2014830_8o9q68pk5sc.js'
const MIcon = Icon.createFromIconfontCN({
  scriptUrl: iconURL
})

export default {
  components: {
    MIcon
  },
  props: {
    type: {
      type: String,
      required: true
    }
  }
}
</script>
