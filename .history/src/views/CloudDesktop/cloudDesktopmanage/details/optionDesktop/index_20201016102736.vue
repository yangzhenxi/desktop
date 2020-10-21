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
        :scroll="{x}"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        ref="table"
        rowKey="HostedMachineName">
        <template slot="PowerState" slot-scope="text">
          <span>{{ text | convert('C_D_DESKTOP_LIST_POWER') }}</span>
        </template>
        <template slot="InMaintenanceMode" slot-scope="text">
          <span>{{ text | convert('C_D_DESKTOP_LIST_INMAINTENANCEMODE') }}</span>
        </template>
      </m-table>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
// import { CloudDesktopPolicyPatch, CloudDesktopPolicyList } from '@/api/CloudDesktop/CloudDesktop'
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
    mixins: [mixinFormModal],
    data () {
        return {
            record: {},
            columns
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

</style>
