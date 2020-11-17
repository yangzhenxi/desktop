<template>
  <a-modal
    title="自定义列表项"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form
        :form="form"
        layout="vertical">
        <a-checkbox-group
          v-model="checkedValues"
          @change="onChange">
          <a-row :gutter="[16,16]">
            <a-col
              :span="6"
              v-for="(i,index) in columns"
              :key="index">
              <a-checkbox
                :value="i.title"
                :disabled="i.disabled"
                style="color:white">
                {{ i.title }}
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import storage from 'store'
import { CUSTOMIZE_COLUMNS } from '@/store/mutation-types'
import { mixinFormModal } from '@/utils/mixin'

const columns = [
  {
    title: '计算机名称',
    dataIndex: 'HostedMachineName',
    sorter: true,
    disabled: true,
    fixed: 'left',
    width: 130
  },
  {
    title: '用户',
    dataIndex: 'SessionUserName',
    sorter: true,
    disabled: true,
    width: 120
  },
  {
    title: '保存用户修改',
    dataIndex: 'PersistUserChanges',
    scopedSlots: { customRender: 'PersistUserChanges' },
    sorter: true,
    width: 140
  },
  {
    title: 'IP地址',
    dataIndex: 'AssignedIPAddress',
    sorter: true,
    disabled: true,
    width: 150
  },
  {
    title: '注册状态',
    dataIndex: 'RegistrationState',
    scopedSlots: { customRender: 'RegistrationState' },
    sorter: true,
    disabled: true,
    width: 130
  },
  {
    title: '维护模式',
    dataIndex: 'InMaintenanceMode',
    scopedSlots: { customRender: 'InMaintenanceMode' },
    sorter: true,
    disabled: true,
    width: 150
  },
  {
    title: '电源状态',
    dataIndex: 'PowerState',
    scopedSlots: { customRender: 'PowerState' },
    sorter: true,
    disabled: true,
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
    mixins: [mixinFormModal],
    name: 'Columns',
    data () {
        return {
            columns,
            record: [],
            checkedValues: []
        }
    },
    methods: {
        Add (record) {
            this.visible = true
			this.checkedValues = []
			const columnsTitle = record.map(u => u.id)
            this.columns.forEach(u => { if (columnsTitle.indexOf(u.title) !== -1) { return this.checkedValues.push(u.title) } })
        },
        handleSubmit () {
            const result = this.columns.forEach(u => {
                return this.checkedValues.indexOf(u.title) !== -1
            })
            let columns = {}
            if (storage.get(CUSTOMIZE_COLUMNS)) {
                 columns = storage.get(CUSTOMIZE_COLUMNS)
            }
            columns.DesktopList = result
            storage.set(CUSTOMIZE_COLUMNS, columns)
            this.$emit('ok', result)
            this.visible = false
        },
        onChange (checkedValues) {
			this.checkedValues = [...new Set(checkedValues)]
			console.log(this.checkedValues)
        }
    }
}
</script>

<style lang="less" scoped>
</style>
