<template>
  <div>
    <br>
    <m-table
      :columns="columns"
      :data="loadData"
      :scroll="{x}"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      bordered
      ref="table"
      rowKey="key">
    </m-table>
  </div>
</template>

<script>
import MTable from '@/components/Table/MTable'
import { mixinTable } from '@/utils/mixin'

const columns = [
  {
    title: '计算机名称',
    dataIndex: 'name',
    sorter: true,
    width: 130
  },
  {
    title: '用户',
    dataIndex: 'username',
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
    dataIndex: 'IP',
    sorter: true,
    width: 150
  },
  {
    title: '可用状态',
    dataIndex: 'AvailableStatus',
    sorter: true
  },
  {
    title: '维护模式',
    dataIndex: 'maintain',
    sorter: true
  },
  {
    title: '电源状态',
    dataIndex: 'power',
    sorter: true
  },
  {
    title: '所在服务器',
    dataIndex: 'server',
    sorter: true
  },
  {
    title: '运行时间',
    dataIndex: 'time',
    sorter: true
  },
  {
    title: '错误信息',
    dataIndex: 'error',
    sorter: true
  }
]
export default {
  components: {
    MTable
  },
  data () {
    return {
      columns,
      selectedRowKeys: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
          const obj = {
              name: '计算机一号',
              username: '计算机一号',
              status: '计算机一号',
              IP: '192.168.2.233',
              AvailableStatus: '计算机一号',
              maintain: '计算机一号',
              power: '计算机一号',
              server: '计算机一号',
              time: '计算机一号',
              error: '计算机一号'
          }
        const data = []
        data.push(obj)
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
