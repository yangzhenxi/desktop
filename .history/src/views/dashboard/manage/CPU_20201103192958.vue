<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="12" v-for="i in dataSource" :key="i.title">
        <m-card class="card" hover :style="i.style">
          <div class="title">
            <m-icon :type="i.icon" :class="['icon',i.icon]"/>
            <span>{{ i.title }}</span>
          </div>
          <a-dropdown :trigger="['click']" placement="bottomCenter" slot="action">
            <a-icon type="ellipsis" />
            <a-menu slot="overlay">
              <a-menu-item v-for="(item,index) in i.Cluster" :key="index" @click="handleClick(item)">
                {{ item.val }}
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <div>
            <Charts :dataSource="i"></Charts>
          </div>
        </m-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { MIcon, MCard } from '@/components'
import Charts from './charts'
export default {
    components: {
        MIcon,
        MCard,
        Charts
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
                    Cluster: [
                        { key: '172.100.251.201', val: '172.100.251.201' },
                        { key: '172.100.251.202', val: '172.100.251.202' },
                        { key: '172.100.251.203', val: '172.100.251.203' },
                        { key: '172.100.251.204', val: '172.100.251.204' },
                        { key: '172.100.251.205', val: '172.100.251.205' }
                    ],
                    ChartsData: [
                        {
                            item: '使用容量',
                            count: 111
                        },
                        {
                            item: '剩余容量',
                            count: 222
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
                    Cluster: [
                        { key: '172.100.251.201', val: '172.100.251.201' },
                        { key: '172.100.251.202', val: '172.100.251.202' },
                        { key: '172.100.251.203', val: '172.100.251.203' },
                        { key: '172.100.251.204', val: '172.100.251.204' },
                        { key: '172.100.251.205', val: '172.100.251.205' }
                    ],
                    ChartsData: [
                        {
                            item: '剩余内存',
                            count: 111
                        },
                        {
                            item: '已用内存',
                            count: 222
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        handleClick (value) {

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
// /deep/.ant-card-body{
//     background: rgba(255,255,255,0.1);
// }
</style>
