<template>
  <page-header-wrapper :title="false">
    <a-form layout="inline">

    </a-form>
  </page-header-wrapper>
</template>
<script>
import { mixinTable, mixinFormModal } from '@/utils/mixin'

export default {
  mixins: [mixinTable, mixinFormModal],
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
