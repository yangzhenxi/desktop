<template>
  <page-header-wrapper :title="false">
    <m-table
      style="margin-top:10px;"
      ref="table"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data="loadData">
      <template slot="SessionState" slot-scope="text">
        {{ text }}
      </template>
    </m-table>
  </page-header-wrapper>
</template>

<script>
import { MIcon, MTable } from '@/components'
import { mixinTable } from '@/utils/mixin'
import { CloudDesktopSessionList } from '@/api/CloudDesktop/CloudDesktop'
const columns = [
  {
    title: '计算机名称',
    dataIndex: 'session_key',
    sorter: true,
     ellipsis: true
  },
  {
    title: 'IP地址',
    dataIndex: 'ip_address',
    sorter: true
  },
  {
    title: '当前用户名',
    dataIndex: 'UserFullName',
    sorter: true
  },
  {
    title: '客户端IP',
    dataIndex: 'client_address',
    sorter: true
  },
  {
    title: '会话状态',
    dataIndex: 'session_state',
    scopedSlots: { customRender: 'SessionState' },
    sorter: true
  },
  {
    title: '代理版本',
    dataIndex: 'agent_version',
    sorter: true
  },
  {
    title: '会话开始时间',
    dataIndex: 'start_time',
    // scopedSlots: { customRender: 'time' },
    // scopedSlots: { customRender: 'time' },
    sorter: true
  }
]
export default {
  mixins: [mixinTable],
  components: {
    MIcon,
    MTable
  },
  data () {
    return {
      columns,
      data: '',
      selectedRowKeys: [], // Check here to configure the default column
      loadData: async (parameter) => {
        try {
            const result = await CloudDesktopSessionList({ desktop_id: '117' })
            const data = this.deepGet(result, 'data', [])
          return {
            data,
            queryParam: this.queryParam
          }
        } catch (error) {
          return false
        }
      }
    }
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.deleteData.id = selectedRows.map((u) => u.id)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style>
</style>
