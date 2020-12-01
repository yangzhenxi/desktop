<template>
  <div>
    <m-card class="card" hover>
      <div class="header">
        <div class="iconandtext">
          <m-icon :type="dataSoure.icon" :class="['icon',dataSoure.icon]" />
          <span>{{ dataSoure.title }}</span>
        </div>
        <a-dropdown :trigger="['click']" placement="bottomCenter">
          <a-icon type="ellipsis" />
          <a-menu slot="overlay">
            <a-menu-item v-for="(item,index) in dataSoure.Cluster" :key="index" @click="handleClick(item)">
              {{ item }}
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div>
        <Charts :dataSource="dataSoure"></Charts>
      </div>
    </m-card>
  </div>
</template>

<script>
import Charts from './charts'
import { MIcon, MCard } from '@/components'
export default {
    name: 'Memory',
    components: {
        MIcon,
        MCard,
        Charts
    },
    props: {
        memory: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            dataSoure: {
                title: 'Memory',
                type: 'memory',
                icon: 'storage',
                style: {
                    background: '#272E48;',
                    border: '1px solid rgba(25, 186, 139, 0.17)'
                },
                Cluster: ['全部'],
                ChartsData: [
                    {
                        item: '剩余内存',
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
        }
    },
    watch: {
        memory: {
            handler (newval, oldval) {
                this.loadData()
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        loadData () {
            let memoryUsage = 0
			let memoryCapacity = 0
			this.dataSoure.Cluster = ['全部']
            this.memory.forEach(u => {
                this.dataSoure.Cluster.push(u.host)
                memoryUsage += u.memory_usage
                memoryCapacity += u.memory_capacity
            })
            this.dataSoure.ChartsData[0].count = (memoryUsage / 1024).toFixed(2)
            this.dataSoure.ChartsData[1].count = (
                memoryCapacity / 1024 / 1024 / 1024 -
                memoryUsage / 1024
            ).toFixed(2)
            this.dataSoure.ChartsData[0].percent =
                1 -
                (memoryUsage / 1024).toFixed(2) /
                    (memoryCapacity / 1024 / 1024 / 1024)
            this.dataSoure.ChartsData[1].percent =
                (memoryUsage / 1024).toFixed(2) /
                (memoryCapacity / 1024 / 1024 / 1024)
        },
        handleClick (val) {
			const Arr = this.memory.filter(u => u.host === val)
            if (Arr.length === 1) {
                const Surplus = {
                    item: '剩余内存',
                    count: (
                        Arr[0].memory_capacity / 1024 / 1024 / 1024 -
                        Arr[0].memory_usage / 1024
                    ).toFixed(2),
                    percent:
                        1 -
                        (Arr[0].memory_usage / 1024).toFixed(2) /
                            (Arr[0].memory_capacity / 1024 / 1024 / 1024)
                }
                const Used = {
                    item: '已用内存',
                    count: (Arr[0].memory_usage / 1024).toFixed(2),
                    percent:
                        (Arr[0].memory_usage / 1024).toFixed(2) /
                        (Arr[0].memory_capacity / 1024 / 1024 / 1024)
                }
                this.dataSoure.ChartsData = [Surplus, Used]
            } else {
				this.loadData()
			}
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    color: white;
    line-height: 1.5;
    position: relative;
    .iconandtext {
        display: flex;
        align-items: center;
        span {
            font-size: 25px;
            color: rgb(174, 190, 230);
        }
    }
    .anticon-ellipsis {
        position: absolute;
        right: 0px;
    }
    .icon {
        font-size: 55px;
        margin-right: 15px;
        &.shizhong {
            color: wheat;
        }
        &.storage {
            color: turquoise;
        }
    }
}
/deep/span.card-action {
    color: white;
    font-size: 20px;
}
.ant-dropdown-menu-item:hover,
.ant-dropdown-menu-submenu-title:hover {
    background-color: rgba(255, 255, 255, 0.08);
}
.ant-dropdown-menu {
    background-color: rgb(20, 24, 36);
}
.ant-dropdown-menu-item,
.ant-dropdown-menu-submenu-title {
    color: rgba(255, 255, 255, 0.65);
}
</style>
