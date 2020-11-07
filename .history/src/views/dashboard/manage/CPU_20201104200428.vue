<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="12" v-for="i in dataSource" :key="i.title">
        <m-card class="card" hover :style="i.style">
          <div class="header">
            <div class="iconandtext">
              <m-icon :type="i.icon" :class="['icon',i.icon]"/>
              <span>{{ i.title }}</span>
            </div>
            <a-dropdown :trigger="['click']" placement="bottomCenter">
              <a-icon type="ellipsis" />
              <a-menu slot="overlay">
                <a-menu-item v-for="(item,index) in i.Cluster" :key="index" @click="handleClick(item)">
                  {{ item }}
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
          <div>
            <Charts :dataSource="i"></Charts>
          </div>
        </m-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Charts from './charts'
import { deepGet } from '@/utils/util'
import { MIcon, MCard } from '@/components'
export default {
    components: {
        MIcon,
        MCard,
        Charts
    },
    props: {
        data: {
            type: Array,
            required: true
        },
        memory: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            dataSource: [
                {
                    title: 'CPU',
                    type: 'CPU',
                    icon: 'shizhong',
                    style: {
                        background: '#272E48;',
                        border: '1px solid rgba(25, 186, 139, 0.17)'
                    },
                    Cluster: [],
                    ChartsData: [
                        {
                            item: 'CPU总容量',
                            count: 1,
                            percent: 0.333333333
                        },
                        {
                            item: '已用容量',
                            count: 2,
                            percent: 0.66666666
                        }
                    ]
                },
                {
                    title: 'Memory',
                    type: 'Memory',
                    icon: 'storage',
                    style: {
                        background: '#272E48;',
                        border: '1px solid rgba(25, 186, 139, 0.17)'
                    },
                    Cluster: [],
                    ChartsData: [
                        {
                            item: '总内存',
                            count: 1,
                            percent: 0.333333333
                        },
                        {
                            item: '已用内存',
                            count: 2,
                            percent: 0.66666666
                        }
                    ]
                }
            ]
        }
    },
    watch: {
        data: {
            handler () {
                this.loadData()
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        async loadData () {
            let cpuUsage = 0
            let cpuCapacity = 0
            let memoryUsage = 0
            let memoryCapacity = 0
            // let
            this.data.forEach(u => {
                this.dataSource[0].Cluster.push(u.host)
                cpuUsage = cpuUsage + (+u.cpu_usage)
                cpuCapacity = cpuCapacity + (+u.cpu_capacity)
            })
            this.memory.forEach(u => {
                this.dataSource[1].Cluster.push(u.host)
                memoryUsage += u.memory_usage
                memoryCapacity += u.memory_capacity
            })
            this.dataSource[0].ChartsData[1].count = cpuUsage / 1000
            this.dataSource[0].ChartsData[0].count = cpuCapacity
            this.dataSource[1].ChartsData[1].count = (memoryUsage / 1024).toFixed(2)
            this.dataSource[1].ChartsData[0].count = (memoryCapacity / 1024 / 1024 / 1024).toFixed(2)
            this.dataSource[1].ChartsData[0].percent = 0.6666666666666666
            this.dataSource[1].ChartsData[1].percent = 0.3333333333333333
        },
        handleClick (value) {
            console.log(value)
        },
        deepGet
    }
}
</script>

<style lang="less" scoped>
.header{
    display: flex;
    justify-content: space-between;
    color: white;
    line-height: 1.5;
    position: relative;
    .iconandtext{
        display: flex;
        align-items: center;
        span{
            font-size: 25px;
            color: rgb(174, 190, 230);
        }
    }
    .anticon-ellipsis{
        position: absolute;
        right: 0px;
    }
    .icon{
        font-size: 55px;
        margin-right: 15px;
        &.shizhong{
            color:wheat;
        }
        &.storage{
            color: turquoise;
        }
    }
}
/deep/span.card-action {
    color: white;
    font-size: 20px;
}
.ant-dropdown-menu-item:hover, .ant-dropdown-menu-submenu-title:hover {
    background-color: rgba(255, 255, 255, 0.08);
}
.ant-dropdown-menu{
    background-color: rgb(20, 24, 36);
}
.ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title{
    color:rgba(255, 255, 255, 0.65);
}
</style>
