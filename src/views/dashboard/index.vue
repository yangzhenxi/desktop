<template>
  <div>
    <Instance/>
    <br>
    <br>
    <CPU :data="CPU" :memory="Memory"/>
    <br>
    <br>
    <Storage/>
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
import { GetCpu, GetMemory } from '@/api/dashboard'
import { deepGet } from '@/utils/util'
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
        loading: false,
        CPU: [],
        Memory: []
    }
  },
  created () {
      this.loadData()
  },
  methods: {
      async loadData () {
            try {
                const [CPU, Memory] = (await Promise.all([GetCpu(), GetMemory()].map(api => api.catch(e => null))))
                this.CPU = deepGet(CPU, 'cpus', [])
                this.Memory = deepGet(Memory, 'memory', [])
            } catch (error) {
              console.log(error)
            }
      }
  }
}
</script>

<style lang="less" scoped>

</style>
