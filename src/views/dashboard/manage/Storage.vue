<template>
  <m-card
    class="card"
    hover
    :style="dataSourceStorage.style">
    <div class="header">
      <div class="iconandtext">
        <m-icon
          :type="dataSourceStorage.icon"
          :class="['icon',dataSourceStorage.icon]" />
        <span>{{ dataSourceStorage.title }}</span>
      </div>
      <a-dropdown
        :trigger="['click']"
        placement="bottomCenter">
        <a-icon type="ellipsis" />
        <a-menu slot="overlay">
          <a-menu-item
            v-for="(item,index) in dataSourceStorage.Cluster"
            :key="index"
            @click="handleClick(item,dataSourceStorage.title)">
            {{ item }}
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div>
      <ChartsStorage :dataSource="dataSourceStorage.ChartsData"></ChartsStorage>
    </div>
  </m-card>
</template>

<script>
import { MIcon, MCard } from '@/components'
import ChartsStorage from './StorageCharts'

export default {
    components: {
        MIcon,
        MCard,
        ChartsStorage
	},
	props: {
		storage: {
			type: Array,
			required: true
		}
	},
	data () {
		return {
			dataSourceStorage: {
                Cluster: ['全部'],
                title: 'Storage',
                icon: 'cunchu',
                style: {
                    background: '#272E48;',
                    border: '1px solid rgba(25, 186, 139, 0.17)'
                },
                ChartsData: [
                    {
                        name: '已用容量',
                        valName: 'data1',
                        val: 99999
                    },
                    {
                        name: '剩余容量',
                        valName: 'data2',
                        val: 99999
                    }
                ]
            }
		}
	},
	watch: {
		storage: {
			handler () {
				this.loadData()
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		loadData () {
			this.dataSourceStorage.Cluster = ['全部']
			const data = []
			this.storage.forEach(u => {
                this.dataSourceStorage.Cluster.push(u.host)
				u.disks.forEach((_, p) => {
                    const Used = {
                        name: '已用容量',
                        valName: _.name,
                        val: Math.ceil((+_.disk_capacity - (+_.disk_free_space)) / 1024 / 1024 / 1024)
                    }
                    data.push(Used)
                })
                u.disks.forEach((_, p) => {
                    const Used = {
                        name: '剩余容量',
                        valName: _.name,
                        val: Math.ceil(+_.disk_free_space / 1024 / 1024 / 1024)
                    }
                    data.push(Used)
                })
			})
            this.dataSourceStorage.ChartsData = data
		},
		handleClick (val) {
			const Arr = this.storage.filter(u => u.host === val)
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
				this.dataSourceStorage.ChartsData = [Surplus, Used]
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
