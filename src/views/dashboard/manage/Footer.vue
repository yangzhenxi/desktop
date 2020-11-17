<template>
  <div>
    <m-table
      style="margin-top:10px;"
      ref="table"
      :columns="columns"
      :data="loadData">
    </m-table>
  </div>
</template>

<script>
import { MIcon, MTable } from '@/components'
export default {
    components: {
        MIcon,
        MTable
    },
    data () {
        return {
          columns: [
            {
              title: '云桌面',
              dataIndex: 'session_key',
              sorter: true,
              ellipsis: true
            },
            {
              title: '桌面数量',
              dataIndex: '',
              sorter: true
            },
            {
              title: '运行数量',
              dataIndex: 'UserFullName',
              sorter: true
            },
            {
              title: '关闭数量',
              dataIndex: 'client_address',
              sorter: true
            }
          ],
        loadData: async (parameter) => {
            try {
                // const result = await CloudDesktopSessionList({ desktop_id: '117' })
                // const data = this.deepGet(result, 'data', [])
                const data = []
              return {
                data,
                queryParam: this.queryParam
              }
            } catch (error) {
              return false
            }
      }
        }
    }
}
</script>

<style lang="less" scoped>
/deep/.ant-card-head-title{
    color: white;
}
/deep/.ant-table-placeholder{
  background: #272e48 !important;
}

</style>
