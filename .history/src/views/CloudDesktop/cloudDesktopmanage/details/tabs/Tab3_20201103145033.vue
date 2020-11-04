<template>
  <m-table
    style="margin-top:10px;"
    ref="table"
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    :columns="columns"
    :data="loadData">
    <template slot="SessionState" slot-scope="text">
      {{ text | convert('C_D_SESSION_LIST_STATE') }}
    </template>
  </m-table>
</template>

<script>
import { mapState } from 'vuex'
import { MIcon, MTable } from '@/components'
import { mixinTable } from '@/utils/mixin'
// import { CloudDesktopSessionList } from '@/api/CloudDesktop/CloudDesktop'
const columns = [
  {
    title: '计算机名称',
    dataIndex: 'hosted_machine_name',
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
    ellipsis: true,
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
    ellipsis: true,
    sorter: true
  },
  {
    title: '会话开始时间',
    dataIndex: 'start_time',
    ellipsis: true,
    sorter: true
  }
]
export default {
    mixins: [mixinTable],
    components: {
        MIcon,
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
        data: '',
        selectedRowKeys: [], // Check here to configure the default column
        loadData: async (parameter) => {
            try {
                const data = this.deepGet(this.Tab_three_data, 'data', [])
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
    computed: {
        ...mapState({
            Tab_three_data: state => state.cloudDesktop.Tab_three_data
        })
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
