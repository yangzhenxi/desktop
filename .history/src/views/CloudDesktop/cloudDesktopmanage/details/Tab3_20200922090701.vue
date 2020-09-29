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
            title: '计算机名称',
            dataIndex: 'version',
            sorter: true
            },
             {
            title: 'IP地址',
            dataIndex: 'version',
            sorter: true
            },
             {
            title: '当前用户',
            dataIndex: 'version',
            sorter: true
            },
             {
            title: '客户端IP',
            dataIndex: 'version',
            sorter: true
            },
             {
            title: '登录时间',
            dataIndex: 'version',
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
