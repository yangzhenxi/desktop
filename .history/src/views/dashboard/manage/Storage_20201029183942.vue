<template>
  <div>
    <a-row :gutter="16">
      <a-card>
        <template slot="title">
          <div class="title">
            <m-icon :type="dataSource.icon" :class="['icon',dataSource.icon]"/>
            <span>{{ dataSource.title }}</span>
          </div>
        </template>
        <div>
          <Charts :data="dataSource.ChartsData"></Charts>
        </div>
      </a-card>
    </a-row>
  </div>
</template>

<script>
import { MIcon } from '@/components'
import Charts from './charts'
export default {
    components: {
        MIcon,
        Charts
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
    display: flex;
    justify-content: space-between;
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
