<template>
  <div>
    <m-table
      :columns="columns"
      :data="loadData"
      :scroll="{x}"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      ref="table"
      rowKey="HostedMachineName">
      <template slot="PowerState" slot-scope="text,record">
        <span v-if="record.PowerState !=='loading' ">{{ text | convert('C_D_DESKTOP_LIST_POWER') }}</span>
        <span v-else><a-spin /> </span>
      </template>
      <template slot="PersistUserChanges" slot-scope="text">
        <span>{{ text | convert('C_D_DESKTOP_LIST_PERSISTUSERCHANGES') }}</span>
      </template>
      <template slot="InMaintenanceMode" slot-scope="text,record">
        <span v-if="record.MaintenanceMode !=='loading' ">{{ text | convert('C_D_DESKTOP_LIST_INMAINTENANCEMODE') }}</span>
        <span v-else><a-spin /> </span>
      </template>
      <template slot="RegistrationState" slot-scope="text">
        <span>{{ text | convert('C_D_DESKTOP_LIST_REGISTRATIONSTATE') }}</span>
      </template>
    </m-table>
  </div>
</template>

<script>
import MTable from '@/components/Table/MTable'
import { mixinTable } from '@/utils/mixin'
import { CloudDesktopMachineList, CloudDesktopTaskGet } from '@/api/CloudDesktop/CloudDesktop'
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
      ISstate: 0,
      rawdata: [],
      Ids: [],
      type: '',
      selectedRowKeys: [],
      carryOut: Boolean,
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
            if (this.datasource.Search !== undefined) {
                this.queryParam.HostedMachineName = this.datasource.Search
            }
            let data = []
            this.ISstate ? data = this.rawdata : data = this.deepGet(await CloudDesktopMachineList({ desktop_id: this.datasource.id }), 'data', [])
            this.rawdata = data
        return {
          data,
          queryParam: this.queryParam
        }
      }
    }
  },
  watch: {
      async ISstate (newData, oldData) {
          setTimeout(() => {
            this.getState(this.Ids, this.type)
          }, 1000)
          for (let i = 0; this.Ids.length; i++) {
              const result = this.deepGet(await CloudDesktopTaskGet({ id: this.Ids[i] }), 'data', {})
              if (result.state === 'SYSTEM_TASK_STATE_SUCCESS') {
                  this.carryOut = true
              } else {
                  this.carryOut = false
              }
              console.log(result)
          }
      }
  },
  methods: {
    onSelectChange (selectedRowKeys, e) {
      this.selectedRowKeys = selectedRowKeys
      this.$emit('chaned', e)
    },
    async getState (Ids, type) {
        this.Ids = Ids
        this.type = type
        for (let i = 0; i < Ids.length; i++) {
            await CloudDesktopTaskGet({ id: Ids[i] }).then(res => {
                const result = this.deepGet(res, 'data', '')
                if (result.state === 'SYSTEM_TASK_STATE_RUNNING') {
                    this.ISstate++
                    const name = result.title.split(' ')[1]
                    this.rawdata.forEach(u => {
                        if (name === u.HostedMachineName) {
                            u[type] = 'loading'
                        }
                    })
                }
            })
        }
            this.$refs.table.refresh(false)
    }
  }
}
</script>

<style>
</style>
