<template>
  <div>
    <m-table
      :columns="columns"
      :data="loadData"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      ref="table"
      rowKey="MachineName">
      <template slot="SessionState" slot-scope="text">
        <span>{{ text |convert("C_D_SESSION_LIST_STATE") }}</span>
      </template>
    </m-table>
  </div>
</template>

<script>
import MTable from '@/components/Table/MTable'
import { deepGet } from '@/utils/util'
import { CloudDesktopSessionList } from '@/api/CloudDesktop/CloudDesktop'
const columns = [
  {
    title: '计算机名称',
    dataIndex: 'machine_name',
    sorter: true
  },
  {
    title: 'IP地址',
    dataIndex: 'ip_address',
    sorter: true
  },
  {
    title: '当前用户名',
    dataIndex: 'client_name',
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
    dataIndex: 'cpb_version',
    sorter: true
  },
  {
    title: '会话开始时间',
    dataIndex: 'start_time',
    sorter: true
  }
]
export default {
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
        const data = deepGet(CloudDesktopSessionList(this.queryParam), 'data', [])
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
  },
  deepGet
}
</script>

<style>
</style>
