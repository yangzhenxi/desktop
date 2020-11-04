<template>
  <div>
    <m-table
      :columns="columns"
      :data="loadData"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      ref="table"
      rowKey="session_key">
      <template slot="SessionState" slot-scope="text">
        <span>{{ text |convert("C_D_SESSION_LIST_STATE") }}</span>
      </template>
    </m-table>
  </div>
</template>

<script>
import { mixinTable } from '@/utils/mixin'
import MTable from '@/components/Table/MTable'
import { CloudDesktopSessionList, CloudDesktopMachineList } from '@/api/CloudDesktop/CloudDesktop'
const columns = [
  {
    title: '计算机名称',
    dataIndex: 'session_key',
    sorter: true
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
    sorter: true
  }
]
export default {
  mixins: [mixinTable],
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
      selectedRowKeys: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
        if (this.datasource.name) {
            this.queryParam.MachineName = this.datasource.name
        }
        this.queryParam.desktop_id = this.datasource.id
        const result = await CloudDesktopSessionList(this.queryParam)
        const result2 = await CloudDesktopMachineList(this.queryParam)
        console.log(result)
        const data = this.deepGet(result2, 'data', [])
        return {
          data,
          queryParam: this.queryParam
        }
      }
    }
  },
  methods: {
    onSelectChange (selectedRowKeys, e) {
      this.selectedRowKeys = selectedRowKeys
      this.$emit('chaned', e)
    }
  }
}
</script>

<style>
</style>
