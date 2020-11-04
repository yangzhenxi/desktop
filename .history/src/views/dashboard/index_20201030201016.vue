<template>
  <div>
    <a-row :gutter="16">
      <a-aol :span="15">
        <a-row>
          <Instance/>
        </a-row>
        <br>
        <br>
        <a-row>
          <CPU/>
        </a-row>
        <br>
        <br>
      </a-aol>
      <a-aol :span="8">
        <Storage/>
      </a-aol>
    </a-row>
    <br>
    <br>
    <br>
    <Footer/>
  </div>
</template>

<script>
import { MIcon } from '@/components'
import Charts from './manage/charts'
import Instance from './manage/Instance'
import CPU from './manage/CPU'
import Storage from './manage/Storage'
import Footer from './manage/Footer'
export default {
  components: {
    CPU,
    MIcon,
    Charts,
    Footer,
    Storage,
    Instance
  },
  data () {
    return {
        loading: false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
