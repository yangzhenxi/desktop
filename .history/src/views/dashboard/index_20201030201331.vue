<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="15">
        <a-row>
          <Instance/>
        </a-row>
        <br>
        <a-row>
          <CPU/>
        </a-row>
      </a-col>
      <a-col :span="8">
        <Storage/>
      </a-col>
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
