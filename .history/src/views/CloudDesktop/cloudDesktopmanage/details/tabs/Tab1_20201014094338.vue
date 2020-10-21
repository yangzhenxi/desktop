<template>
  <div>
    <m-table
      :columns="columns"
      :data="loadData"
      :scroll="{x}"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      bordered
      ref="table"
      rowKey="HostedMachineName">
      <template slot="PowerState" slot-scope="text">
        <span>{{ text | convert('C_D_DESKTOP_LIST_POWER') }}</span>
      </template>
      <template slot="PersistUserChanges" slot-scope="text">
        <span>{{ text | convert('C_D_DESKTOP_LIST_PERSISTUSERCHANGES') }}</span>
      </template>
      <template slot="InMaintenanceMode" slot-scope="text">
        <span>{{ text | convert('C_D_DESKTOP_LIST_INMAINTENANCEMODE') }}</span>
      </template>
      <template slot="RegistrationState" slot-scope="text">
        <span>{{ text | convert('C_D_DESKTOP_LIST_REGISTRATIONSTATE') }}</span>
      </template>
    </m-table>
    <set-columns ref="columns" @ok="customizeColumns"></set-columns>
  </div>
</template>

<script>
import MTable from '@/components/Table/MTable'
import SetColumns from './SetColumns'
import { mixinTable } from '@/utils/mixin'
import { CloudDesktopMachineList } from '@/api/CloudDesktop/CloudDesktop'
const columns = [
  {
    title: '计算机名称',
    dataIndex: 'HostedMachineName',
    sorter: true,
    width: 150
  },
  {
    title: '用户',
    dataIndex: 'SessionUserName',
    sorter: true,
    width: 120
  },
  {
    title: 'IP地址',
    dataIndex: 'AssignedIPAddress',
    sorter: true,
    width: 150
  },
  {
    title: '维护模式',
    dataIndex: 'InMaintenanceMode',
    scopedSlots: { customRender: 'InMaintenanceMode' },
    sorter: true,
    width: 150
  },
  {
    title: '电源状态',
    dataIndex: 'PowerState',
    scopedSlots: { customRender: 'PowerState' },
    sorter: true,
    width: 150
  },
  {
    title: '所在服务器',
    dataIndex: 'HostingServerName',
    sorter: true,
    width: 150
  }
]
export default {
  mixins: [mixinTable],
  components: {
    MTable,
    SetColumns
  },
  props: {
     datasource: {
      type: Object,
      required: true
    }
  },
  mounted () {
      this.$refs.table.refresh()
  },
  data () {
    return {
      columns,
      selectedRowKeys: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
          this.queryParam.desktop_id = this.datasource.id
           const data = this.deepGet(await CloudDesktopMachineList(this.queryParam), 'data', [])
        return {
          data
        }
      }
    }
  },
  methods: {
    onSelectChange (selectedRowKeys, e) {
      this.selectedRowKeys = selectedRowKeys
      this.$emit('chaned', e)
    },
    customizeColumns (value) {
            this.columns = value
            this.$refs.table.refresh()
        }
  }
}
</script>

<style>
</style>
