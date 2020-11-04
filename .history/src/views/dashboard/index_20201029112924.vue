<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8">
        <m-card>
          <a-tooltip>
            <a-icon type="info-circle-o"></a-icon>
          </a-tooltip>
        </m-card>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col
        :span="8"
        v-for="(item,index) in chartsData"
        :key="index">
        <a-card :headStyle="item.headStyle" :bodyStyle="bodyStyle">
          <!-- title -->
          <template slot="title">
            <div class="crea_title">
              <m-icon :type="item.Text.icon" :class="['icon',item.Text.icon]"/>
              <span>
                {{ item.Text.title }}
                <br>
                {{ item.Text.used[0] }} {{ item.Text.used[1] }} {{ item.Text.used[2] }}
                <br>
                {{ item.Text.Remaining[0] }} {{ item.Text.Remaining[1] }} {{ item.Text.Remaining[2] }}
              </span>
            </div>
          </template>
          <Charts :data="item.data"></Charts>
        </a-card>
      </a-col>
    </a-row>
    <a-card style="margin-top:30px;" :headStyle="headStyle" :bodyStyle="bodyStyle" >
      <template slot="title">
        桌面  总共660个  其中
        <m-icon type="shape" class="icon shape blue"/>
        2354
        <m-icon type="shape" class="icon shape"/>
        3392
      </template>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        场景名
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;" :hoverable="false">
        桌面数量
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        运行数量
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        关闭数量
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        ATA考试
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        310
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        0
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        310
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        测试桌面
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        350
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        0
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        350
      </a-card-grid>
    </a-card>
  </div>
</template>

<script>
import { MIcon } from '@/components'
import Charts from './manage/charts'

export default {
  components: {
    MIcon,
    Charts
  },
  data () {
    return {
        bodyStyle: {
            background: '#272E48'
        },
        headStyle: {
            background: '#272E48',
            color: '#bcd0f7'
          },
      chartsData: [
        {
          headStyle: {
            // background: 'rgba(117, 204, 244, 1)'
            background: '#272E48',
            color: '#bcd0f7'
          },
          icon: {
            color: null
          },
          Text: {
            title: 'CPU',
            icon: 'shizhong',
            used: ['总共', '6666', '个物理核心'],
            Remaining: ['运行', '2222', ' 个虚拟核心']
          },
          data: [
            {
              item: '运行中虚拟核心',
              count: 33
            },
            {
              item: '未运行中虚拟核心',
              count: 66
            }
          ]
        },
        {
          headStyle: {
            // background: 'rgba(78, 219, 195, 1)'
            background: '#272E48',
            color: '#bcd0f7'

          },
          Text: {
            icon: 'storage',
            title: '内存',
            used: ['已用', '2124', 'GB'],
            Remaining: ['剩余', '3019', 'GB']
          },
          data: [
            {
              item: '已用内存',
              count: 111
            },
            {
              item: '剩余内存',
              count: 22
            }
          ]
        },
        {
          headStyle: {
            // background: 'rgba(233, 208, 103, 1)'
            background: '#272E48',
            color: '#bcd0f7'

          },
          Text: {
            icon: 'cunchu',
            title: '存储',
            used: ['已用', '2313', 'GB'],
            Remaining: ['剩余', '9809', ' GB']
          },
          data: [
            {
              item: '已用存储',
              count: 55
            },
            {
              item: '剩余存储',
              count: 438
            }
          ]
        }
      ]
    }
  },
  mounted () {},
  created () {
    this.getChartsdata()
  },
  methods: {
    getChartsdata () {}
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
.icon{
    &.shizhong{
        color:wheat;
    font-size: 72px;

    }
    &.storage{
        color: turquoise;
    font-size: 72px;

    }
    &.cunchu{
    font-size: 72px;

    }
}
</style>
