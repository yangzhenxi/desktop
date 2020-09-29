<template>
  <div>
    <span>绑定的组</span>
    <m-table
      :columns="columns"
      :data="loadData"
      border
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      ref="table"
      rowKey="key">
    </m-table>
    <div>
      <span>绑定的组</span>
      <m-table
        :columns="columns"
        :data="loadData"
        border
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        ref="table"
        rowKey="key">
      </m-table>
    </div>
  </div>
</template>

<script>
import MTable from '@/components/Table/MTable'
const columns = [
    {
            title: '组',
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
