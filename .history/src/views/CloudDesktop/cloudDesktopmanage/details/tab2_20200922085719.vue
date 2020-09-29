<template>
  <div>
    <m-table
      :columns="columns"
      :data="loadData"
      ref="table"
      rowKey="key">
    </m-table>
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
               // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
        // const data = this.deepGet(await DesktopTemplateVersionList(this.queryParam), 'data', [])
        const data = []
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
