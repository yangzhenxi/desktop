<template>
  <div>
    <m-table
      :columns="columns"
      :data="loadData"
      :scroll="{x}"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      bordered
      ref="table"
      rowKey="name">
    </m-table>
  </div>
</template>

<script>
import MTable from '@/components/Table/MTable'
import { mixinTable } from '@/utils/mixin'

const columns = [
  {
    title: '计算机名称',
    dataIndex: 'HostedMachineName',
    sorter: true,
    width: 130
  },
  {
    title: '用户',
    dataIndex: 'SessionUserName',
    sorter: true,
    width: 120
  },
  {
    title: '数据保存状态',
    dataIndex: 'status',
    sorter: true,
    width: 140
  },
  {
    title: 'IP地址',
    dataIndex: 'AssignedIPAddress',
    sorter: true,
    width: 150
  },
  {
    title: '可用状态',
    dataIndex: 'AvailableStatus',
    sorter: true,
    width: 130
  },
  {
    title: '维护模式',
    dataIndex: 'maintain',
    sorter: true,
    width: 150
  },
  {
    title: '电源状态',
    dataIndex: 'PowerState',
    sorter: true,
    width: 150
  },
  {
    title: '所在服务器',
    dataIndex: 'HostingServerName',
    sorter: true,
    width: 150
  },
  {
    title: '会话开始时间',
    dataIndex: 'StartTime',
    sorter: true,
    width: 200,
    scopedSlots: { customRender: 'time' }
  },
  {
    title: '错误信息',
    dataIndex: 'error',
    sorter: true,
    width: 150
  }
]
export default {
  mixins: [mixinTable],
  components: {
    MTable
  },
  data () {
    return {
      columns,
      selectedRowKeys: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
        const data = [
          {
            name: 'Test',
            username: 'admin',
            status: '正常',
            IP: '192.168.2.233',
            AvailableStatus: '正常',
            maintain: '正常',
            power: '正常',
            server: '192.168.2.125',
            time: '1600912125',
            error: '计算机一号'
          }
        ]
        return {
          data
        }
      }
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style>
</style>
