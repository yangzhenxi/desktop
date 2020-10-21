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
    dataIndex: 'IPAddress',
    sorter: true
  },
  {
    title: '当前用户',
    dataIndex: 'ClientName',
    sorter: true
  },
  {
    title: '客户端IP',
    dataIndex: 'ClientAddress',
    sorter: true
  },
  {
    title: '会话状态',
    dataIndex: 'SessionState',
    sorter: true
  },
  {
    title: '代理版本',
    dataIndex: 'CpbVersion',
    sorter: true
  },
  {
    title: '会话开始时间',
    dataIndex: 'StartTime',
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
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
        this.queryParam.desktop_id = this.datasource.id
        const data = {}
        CloudDesktopSessionList(this.queryParam).then(res => {
             data = this.deepGet(res, 'data', [])
        })
        // const data = this.deepGet(await CloudDesktopSessionList(this.queryParam), 'data')
        // console.log(data)
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
