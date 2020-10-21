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
    dataIndex: 'MachineName',
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
          const obj = {
              desktop_id: this.datasource.id
          }
        const data = this.deepGet(await CloudDesktopSessionList(obj), 'data', [])
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
