<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card>
          <template slot="title">
            <div class="title">
              <div>
                <m-icon type="shizhong" class="icon shizhong"/>
                <span>CPU</span>
              </div>
              <div>
                <a-select style="width: 120px" value="jack" @change="handleChange">
                  <a-select-option value="jack">
                    全部
                  </a-select-option>
                </a-select>
              </div>
            </div>
          </template>
          <div>
            <Charts :data="data"></Charts>
          </div>
        </a-card>
      </a-col>
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
            dataSource: [
                {
                    title: 'CPU',
                    icon: 'shizhong',
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
                },
                {
                    title: 'Memory',
                    icon: '',
                    SelectData: [],
                    chartsData: [
                        {
                            item: '剩余内存',
                            count: 222
                        },
                        {
                            item: '已用内存',
                            count: 333
                        }
                    ]
                }
            ]
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
    .shizhong{
        color:wheat;
        font-size: 25px;
        margin-right: 15px;
    }
    &.storage{
        color: turquoise;
    }

}
</style>
