<template>
  <a-modal
    title="绑定用户组"
    :width="640"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <m-table
        :columns="columns"
        :data="loadData"
        ref="table"
        rowKey="HostedMachineName">
        <template slot="PowerState" slot-scope="text">
          <span>{{ text | convert('C_D_DESKTOP_LIST_POWER') }}</span>
        </template>
        <template slot="InMaintenanceMode" slot-scope="text">
          <span>{{ text | convert('C_D_DESKTOP_LIST_INMAINTENANCEMODE') }}</span>
        </template>
        <template slot="Action">
          <a-button type="primary">
            Primary
          </a-button>
        </template>
      </m-table>
    </a-spin>
  </a-modal>
</template>

<script>
import MTable from '@/components/Table/MTable'
import { mixinTable, mixinFormModal } from '@/utils/mixin'

import { CloudDesktopMachineList } from '@/api/CloudDesktop/CloudDesktop'
// import { usermanageListusergroup } from '@/api/CloudDesktop/usergroup'
const columns = [
  {
    title: '计算机名称',
    dataIndex: 'HostedMachineName',
    sorter: true,
    width: 130
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
    title: '操作',
    scopedSlots: { customRender: 'Action' },
    sorter: true,
    width: 150
  }
]
export default {
    mixins: [mixinFormModal, mixinTable],
    components: {
        MTable
    },
    data () {
        return {
            record: {},
            columns,
            loadData: async (parameter) => {
                this.queryParam.desktop_id = this.record.id
                const data = this.deepGet(await CloudDesktopMachineList(this.queryParam), 'data', [])
                    return {
                        data
                    }
            }
        }
    },
    methods: {
        async Add (record) {
          this.visible = true
          this.record = record
        },
        handleSubmit () {
            // this.confirmLoading = true
        }
    }
}
</script>

<style lang="less" scoped>
.ant-modal-body {
    padding: 24px 0;
}
</style>
