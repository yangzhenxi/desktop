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
          <a-dropdown placement="bottomCenter">
            <a-button type="primary" size="small">开关机</a-button>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-button type="primary" size="small" style="margin-left:15px">开机</a-button>
              </a-menu-item>
              <a-menu-item>
                <a-button type="primary" size="small" style="margin-left:15px">关机</a-button>
              </a-menu-item>
              <a-menu-item>
                <a-button type="primary" size="small" style="margin-left:15px">重启</a-button>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-button >
            设置
          </a-button>
          <a-button type="danger" size="small" style="margin-left:15px">
            设置维护模式
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
    sorter: true
  },
  {
    title: '维护模式',
    dataIndex: 'InMaintenanceMode',
    scopedSlots: { customRender: 'InMaintenanceMode' },
    sorter: true
  },
  {
    title: '电源状态',
    dataIndex: 'PowerState',
    scopedSlots: { customRender: 'PowerState' },
    sorter: true
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'Action' },
    sorter: true
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
