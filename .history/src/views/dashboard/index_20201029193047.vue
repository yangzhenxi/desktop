<template>
  <div>
    <Instance></Instance>
    <br>
    <br>
    <br>
    <CPU/>
    <br>
    <br>
    <br>
    <Storage/>
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
.crea_title {
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    margin-left: 20px;
    color: white;
  }
}
.ant-card-bordered {
     border: none;
     border-radius: 10px;
}
.ant-card-grid{
    box-shadow:none;
}
.info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
}
.icon{
        font-size: 72px;
        &.shizhong{
            color:wheat;
        }
        &.storage{
            color: turquoise;

        }
    }

</style>
