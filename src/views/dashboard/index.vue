<template>
  <div>
    <Instance :usercount="Usercount" :session="Session" :desktop="Desktop"/>
    <br>
    <br>
    <a-row :gutter="16">
      <a-col :span="8"><CPU :cpu="CPU"/></a-col>
      <a-col :span="8"><Memory :memory="Memory"/></a-col>
      <a-col :span="8"><Storage :storage="Storage"/></a-col>
    </a-row>
    <br>
    <br>
    <Footer :desktop="Desktop"/>
  </div>
</template>

<script>
import { MIcon } from '@/components'
import Charts from './manage/charts'
import Instance from './manage/Instance'
import CPU from './manage/CPU'
import Memory from './manage/Memory'
import Storage from './manage/Storage'
import Footer from './manage/Footer'
import { GetCpu, GetMemory, GetStorage, GetSession, GetUserCount, GetDesktop } from '@/api/dashboard'

import { deepGet } from '@/utils/util'
export default {
  components: {
	CPU,
	Memory,
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
        Memory: [],
		Storage: [],
		Usercount: 0,
		Session: 0,
		Desktop: []
    }
  },
  created () {
      this.loadData()
  },
  methods: {
      async loadData () {
            try {
                const [Usercount, Session, Desktop, CPU, Memory, Storage] = (await Promise.all([GetUserCount(), GetSession(), GetDesktop(), GetCpu(), GetMemory(), GetStorage()].map(api => api.catch(e => null))))
				this.Usercount = +deepGet(Usercount, 'data', '0')
				this.Session = +deepGet(Session, 'data', '0')
				this.Desktop = deepGet(Desktop, 'desktops', [])
				this.CPU = deepGet(CPU, 'cpus', [])
                this.Memory = deepGet(Memory, 'memory', [])
                this.Storage = deepGet(Storage, 'storages', [])
            } catch (error) {
              console.log(error)
            }
      }
  }
}
</script>

<style lang="less" scoped>

</style>
