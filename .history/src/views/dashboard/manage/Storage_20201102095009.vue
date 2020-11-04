<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="24">
        <m-card class="card" hover>
          <div class="title">
            <m-icon :type="dataSource.icon" :class="['icon',dataSource.icon]"/>
            <span>{{ dataSource.title }}</span>
          </div>
          <div>
            <StorageCharts :dataSource="dataSource"></StorageCharts>
          </div>
        </m-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { MIcon, MCard } from '@/components'
import StorageCharts from './StorageCharts'
export default {
    components: {
        MIcon,
        MCard,
        StorageCharts
    },
    data () {
        return {
            dataSource: {
                    title: 'Storage',
                    icon: 'cunchu',
                    style: {
                        backgroundColor: '#4377f2!important',
                        border: '1px solid rgba(25, 186, 139, 0.17)'
                    },
                    SelectData: [],
                    ChartsData: [
                        { name: 'London', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.': 39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
                        { name: 'Berlin', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.': 34.5, 'Apr.': 99.7, 'May': 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4 }
                    ]
            }

        }
    },
    methods: {
        handleChange (value) {
        }
   }
}
</script>

<style lang="less" scoped>
.title{
    color: white;
    margin-bottom: 20px;
    display: flex;
    .icon{
        font-size: 55px;
        margin-left: 30px;
        margin-right: 15px;
        &.cunchu{
            color: turquoise;
        }
    }
    span{
        font-size: 30px;
        line-height: 1.8;
    }
}
</style>
