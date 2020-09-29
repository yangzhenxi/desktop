<template>
  <div>
    <br>
    <m-table
      :columns="columns"
      :data="loadData"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      bordered
      ref="table"
      rowKey="key">
    </m-table>
  </div>
</template>

<script>
import MTable from '@/components/Table/MTable'
const columns = [
  {
    title: '计算机名称',
    dataIndex: 'name',
    sorter: true
  },
  {
    title: '用户',
    dataIndex: 'username',
    sorter: true
  },
  {
    title: '数据保存状态',
    dataIndex: 'status',
    sorter: true
  },
  {
    title: 'IP地址',
    dataIndex: 'IP',
    sorter: true
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
    dataIndex: 'point',
    sorter: true
  },
  {
    title: '所在服务器',
    dataIndex: 'version',
    sorter: true
  },
  {
    title: '运行时间',
    dataIndex: 'version',
    sorter: true
  },
  {
    title: '错误信息',
    dataIndex: 'version',
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
        // const data = this.deepGet(await DesktopTemplateVersionList(this.queryParam), 'data', [])
        const data = []
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
