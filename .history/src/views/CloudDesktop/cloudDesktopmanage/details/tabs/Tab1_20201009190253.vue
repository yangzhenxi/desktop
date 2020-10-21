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
      <template slot="PowerState"></template>
    </m-table>
  </div>
</template>

<script>
import MTable from '@/components/Table/MTable'
import { mixinTable } from '@/utils/mixin'
import { CloudDesktopMachineList } from '@/api/CloudDesktop/CloudDesktop'
const columns = [
  {
    title: '计算机名称',
    dataIndex: 'HostedMachineName',
    sorter: true,
    width: 130
  },
  {
    title: '用户',
    dataIndex: 'SessionUserName',
    sorter: true,
    width: 120
  },
  {
    title: '保存用户修改',
    dataIndex: 'PersistUserChanges',
    sorter: true,
    width: 140
  },
  {
    title: 'IP地址',
    dataIndex: 'AssignedIPAddress',
    sorter: true,
    width: 150
  },
  {
    title: '注册状态',
    dataIndex: 'RegistrationState',
    sorter: true,
    width: 130
  },
  {
    title: '维护模式',
    dataIndex: 'InMaintenanceMode',
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
  },
  {
    title: '会话开始时间',
    dataIndex: 'StartTime',
    sorter: true,
    width: 200,
    scopedSlots: { customRender: 'time' }
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
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style>
</style>
