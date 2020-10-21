<template>
  <div>
    <m-table
      :columns="columns"
      :data="loadData"
      bordered
      ref="table"
      rowKey="name">
    </m-table>
  </div>
</template>

<script>
import MTable from '@/components/Table/MTable'
import { CloudDesktopSessionList } from '@/api/CloudDesktop/CloudDesktop'
const columns = [
  {
    title: '计算机名称',
    dataIndex: 'name',
    sorter: true
  },
  {
    title: 'IP地址',
    dataIndex: 'IP',
    sorter: true
  },
  {
    title: '当前用户',
    dataIndex: 'username',
    sorter: true
  },
  {
    title: '客户端IP',
    dataIndex: 'serverIP',
    sorter: true
  },
  {
    title: '登录时间',
    dataIndex: 'time',
    sorter: true
  },
  {
    title: '代理版本',
    dataIndex: 'version',
    sorter: true
  }
]
export default {
  components: {
    MTable
  },
  props: {
    datasource: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      columns,
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
          console.log(this.datasource)
        const data = this.deepGet(await CloudDesktopSessionList(this.queryParam), 'data', [])
        // const data = [
        //   {
        //     name: '计算机一号',
        //     username: '开拓者',
        //     IP: '192.168.2.78',
        //     serverIP: '192.168.2.235',
        //     time: '1600912125',
        //     version: '0.1'
        //   }
        // ]
        return {
          data
        }
      }
    }
  }
}
</script>

<style>
</style>
