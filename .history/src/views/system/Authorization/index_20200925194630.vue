<template>
  <page-header-wrapper :title="false">

  </page-header-wrapper>
</template>
<script>
import { mixinTable } from '@/utils/mixin'

export default {
  mixins: [mixinTable],
  data () {
    return {
           expand: false,
      queryParam: {}
    }
  },
    computed: {
    count () {
      return this.expand ? 11 : 7
    }
  },
  methods: {
         toggle () {
      this.expand = !this.expand
    }
  }
}
</script>
