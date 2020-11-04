<template>
  <div>
    <a-row :gutter="16">
      <a-card>
        <div class="title">
          <m-icon :type="dataSource.icon" :class="['icon',dataSource.icon]"/>
          <span>{{ dataSource.title }}</span>
        </div>
        <div>
          <StorageCharts :data="dataSource.ChartsData"></StorageCharts>
        </div>
      </a-card>
    </a-row>
  </div>
</template>

<script>
import { MIcon } from '@/components'
import StorageCharts from './StorageCharts'
export default {
    components: {
        MIcon,
        StorageCharts
    },
    data () {
        return {
            dataSource: {
                    title: 'Storage',
                    icon: 'cunchu',
                    SelectData: [],
                    ChartsData: [
                        {
                            item: '未运行虚拟和谐:58.36%',
                            count: 111
                        },
                        {
                            item: '运行中的虚拟核心:41.64%',
                            count: 222
                        }
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
    line-height: 1.5;
    .icon{
        font-size: 25px;
        margin-right: 15px;
        &.shizhong{
            color:wheat;
        }
        &.storage{
            color: turquoise;
        }
    }
}
</style>
