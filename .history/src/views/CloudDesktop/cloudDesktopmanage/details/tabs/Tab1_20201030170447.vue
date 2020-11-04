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
        <span v-if="record.Power !=='loading' ">{{ text | convert('C_D_DESKTOP_LIST_POWER') }}</span>
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
import storage from 'store'
import { CUSTOMIZE_COLUMNS } from '@/store/mutation-types'
import MTable from '@/components/Table/MTable'
import { mixinTable } from '@/utils/mixin'
import { mapState, mapMutations } from 'vuex'
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
      carryOut: Boolean,
      Power: true,
      MaintenanceMode: true,
      selectedRowKeys: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
            if (this.datasource.Search !== undefined) {
                this.queryParam.HostedMachineName = this.datasource.Search
            }
            let data = []
            this.ISstate ? data = this.rawdata : data = this.deepGet(await CloudDesktopMachineList({ desktop_id: this.datasource.id }), 'data', [])
            this.rawdata = data
           if (data.every(u => u.PowerState === 'POWER_STATE_ON') && data.length > 0) {
               this.Data.Power = true
               this.SET_DETAILSDATA(this.Data)
           } else {
               this.Data.Power = false
               this.SET_DETAILSDATA(this.Data)
           }
            let count = 0
            data.forEach(u => {
                if (u.PowerState === 'POWER_STATE_ON') {
                    count++
                }
            })
            this.Data.registered_count = count
            this.SET_DETAILSDATA(this.Data)
            console.log(data)
        return {
          data,
          queryParam: this.queryParam
        }
      }
    }
  },
    mounted () {
        const columns = storage.get(CUSTOMIZE_COLUMNS)
        if (columns && columns.DesktopList) {
            this.columns = storage.get(CUSTOMIZE_COLUMNS).DesktopList
        }
    },
      computed: {
        ...mapState({
            'Data': state => state.cloudDesktop.DetailsData
        })
    },
  watch: {
      async ISstate (newData, oldData) {
          const state = []
          if (typeof (this.Ids) === 'object') {
            for (let i = 0; i < this.Ids.length; i++) {
                const result = this.deepGet(await CloudDesktopTaskGet({ id: this.Ids[i] }), 'data', {})
                state.push(result.state)
            }
          } else {
                const result = this.deepGet(await CloudDesktopTaskGet({ id: this.Ids }), 'data', {})
                state.push(result.state)
          }

          this.carryOut = true
          state.forEach(u => {
              if (u !== 'SYSTEM_TASK_STATE_SUCCESS') {
                  this.carryOut = false
              }
          })
          if (this.carryOut) {
              this.ISstate = 0
              this.$refs.table.refresh(false)
          } else {
            setTimeout(() => {
                this.getState(this.Ids, this.type)
            }, 2000)
          }
      }
  },
  methods: {
    ...mapMutations(['SET_DETAILSDATA']),
    onSelectChange (selectedRowKeys, e) {
        this.Power = true
        this.MaintenanceMode = true
        for (let i = 0; i < e.length; i++) {
            if (e[i].hasOwnProperty('MaintenanceMode')) {
                this.MaintenanceMode = false
                break
            }
        }
        for (let i = 0; i < e.length; i++) {
            if (e[i].hasOwnProperty('Power')) {
                this.Power = false
                break
            }
        }
        if (!this.Power) {
            this.$message.info('当前正在对电源进行操作，请稍后重试')
            return false
        }
        if (!this.MaintenanceMode) {
            this.$message.info('当前正在开启或关闭维护模式,请稍后重试')
            return false
        }
        this.selectedRowKeys = selectedRowKeys
        this.$emit('chaned', e)
    },

    async getState (Ids, type) {
        this.Ids = Ids
        this.type = type
        this.ISstate++
        if (typeof (Ids) === 'object') {
            for (let i = 0; i < Ids.length; i++) {
                await CloudDesktopTaskGet({ id: Ids[i] }).then(res => {
                    const result = this.deepGet(res, 'data', '')
                    if (result.state === 'SYSTEM_TASK_STATE_RUNNING') {
                        const name = result.title.split(' ')[1]
                        this.rawdata.forEach(u => {
                            if (name === u.HostedMachineName) {
                                u[type] = 'loading'
                            }
                        })
                    }
                })
            }
        } else {
            await CloudDesktopTaskGet({ id: Ids }).then(res => {
                const result = this.deepGet(res, 'data', '')
                if (result.state === 'SYSTEM_TASK_STATE_RUNNING') {
                    const names = result.title.split(' ')
                    names.forEach(o => {
                        this.rawdata.forEach(u => {
                            if (o.split(',')[0] === u.HostedMachineName) {
                                u[type] = 'loading'
                            }
                        })
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
