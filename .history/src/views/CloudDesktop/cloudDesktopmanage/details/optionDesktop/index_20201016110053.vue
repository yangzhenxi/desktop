<template>
  <a-modal
    title="绑定用户组"
    :width="740"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <div class="btn">

      </div>
      <m-table
        :columns="columns"
        :data="loadData"
        :scroll="{y:300}"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
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
                <a-button type="primary" size="small">开机</a-button>
              </a-menu-item>
              <a-menu-item>
                <a-button type="danger" size="small">关机</a-button>
              </a-menu-item>
              <a-menu-item>
                <a-button type="primary" size="small">重启</a-button>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown placement="bottomCenter" style="margin-left:15px;">
            <a-button type="primary" size="small">维护模式</a-button>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-button type="primary" size="small">开启维护模式</a-button>
              </a-menu-item>
              <a-menu-item>
                <a-button type="danger" size="small">关闭维护模式</a-button>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
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
    width: 150
  },
  {
    title: '维护模式',
    dataIndex: 'InMaintenanceMode',
    scopedSlots: { customRender: 'InMaintenanceMode' },
    sorter: true,
    width: 100
  },
  {
    title: '电源状态',
    dataIndex: 'PowerState',
    scopedSlots: { customRender: 'PowerState' },
    sorter: true,
    width: 100
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
/deep/.ant-modal-body {
    padding: 24px 0;
}
</style>
