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
          v-model="defaultColumns"
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
import { mixinFormModal } from '@/utils/mixin'
const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        sorter: true,
        width: 120,
                    fixed: 'left'

    },
    {
        title: '组织单位',
        dataIndex: 'group',
        sorter: true,
        width: 120
    },
    {
        title: '姓名',
        dataIndex: 'displayName',
        sorter: true,
        width: 120
    },
    {
        title: '状态',
        dataIndex: 'accountControl',
        scopedSlots: { customRender: 'status' },
        width: 120
    },
    {
        title: '电话',
        dataIndex: 'telephoneNumber',
        sorter: true,
        width: 140
    },
    {
        title: '邮箱',
        dataIndex: 'mail',
        sorter: true,
        width: 180
    },
    {
        title: '添加时间',
        dataIndex: 'whenCreated',
        scopedSlots: { customRender: 'time' },
        sorter: true,
        width: 200
    },
    {
        title: '上次登录时间',
        dataIndex: 'lastLogon',
        sorter: true,
        scopedSlots: { customRender: 'time' },
        width: 150
    },
    {
        title: '操作',
        sorter: true,
        scopedSlots: { customRender: 'action' },
        width: 120,
        fixed: 'right'
    }
]
export default {
    mixins: [mixinFormModal],
    name: 'Columns',
    data () {
        return {
            columns,
            record: [],
            defaultColumns: [],
            checkedValues: []
        }
    },
    methods: {
        Add (record) {
            this.visible = true
            this.checkedValues = []
            this.columns.forEach(u => {
                record.forEach(o => {
                    if (o.title === u.title) {
                       this.defaultColumns.push(u.title)
                    }
                })
            })
        },
        handleSubmit () {
            const result = []
            this.columns.forEach(u => {
                this.checkedValues.forEach(o => {
                    if (u.title === o) {
                        result.push(u)
                    }
                })
            })
            this.$emit('ok', result)
            this.visible = false
        },
        onChange (checkedValues) {
            this.checkedValues = [...new Set(checkedValues)]
        }
    }
}
</script>

<style lang="less" scoped>
</style>
