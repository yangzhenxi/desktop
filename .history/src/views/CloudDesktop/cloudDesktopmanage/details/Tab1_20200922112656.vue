<template>
  <div>
    <a-row>
      <a-col offset="18" :span="2">
        <a-input-search
          placeholder="请输入你想要查询的用户名"
          enter-button
          :v-model="data"
          @search="onSearch" />
      </a-col>
      <a-col :span="4">
        <a-button
          type="danger"
          @click="AllDelete">
          批量删除
        </a-button>
      </a-col>
    </a-row>
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
    dataIndex: 'version',
    sorter: true
  },
  {
    title: '用户',
    dataIndex: 'version',
    sorter: true
  },
  {
    title: '数据保存状态',
    dataIndex: 'version',
    sorter: true
  },
  {
    title: 'IP地址',
    dataIndex: 'version',
    sorter: true
  },
  {
    title: '可用状态',
    dataIndex: 'version',
    sorter: true
  },
  {
    title: '维护模式',
    dataIndex: 'version',
    sorter: true
  },
  {
    title: '电源状态',
    dataIndex: 'version',
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
