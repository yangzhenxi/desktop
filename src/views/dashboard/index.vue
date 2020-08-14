<template>
  <div>
    <a-card>
      <div slot="title">
        虚拟主机 总共5746台 其中:
        <a-icon
          type="smile"
          theme="twoTone" />2354
        <a-icon
          type="heart"
          theme="twoTone"
          two-tone-color="#eb2f96" />3392
      </div>
      <a-row :gutter="16">
        <a-col
          :span="8"
          v-for="(item,index) in chartsData"
          :key="index">
          <a-card :headStyle="item.headStyle">
            <!-- title -->
            <template slot="title">
              <div class="crea_title">
                <a-icon
                  type="check-circle"
                  theme="twoTone"
                  two-tone-color="#52c41a"
                  style="font-size:70px" />
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
    </a-card>
    <a-card style="margin-top:30px;">
      <template slot="title">
        桌面  总共660个  其中
        <a-icon
          type="smile"
          theme="twoTone" />2354
        <a-icon
          type="heart"
          theme="twoTone"
          two-tone-color="#eb2f96" />3392
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
      headStyle: {
        background: 'rgba(238, 240, 243)',
        border: '2px solid white'
      },
      bodyStyle: {
          background: 'rgba(238, 240, 243)',
          border: '2px solid white'
      },
      chartsData: [
        {
          headStyle: {
            background: 'rgba(129, 211, 248, 1)'
          },
          icon: {
            color: null
          },
          Text: {
            title: 'CPU',
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
            background: 'rgba(129, 211, 248, 1)'
          },
          Text: {
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
            background: 'rgba(129, 211, 248, 1)'
          },
          Text: {
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
</style>
