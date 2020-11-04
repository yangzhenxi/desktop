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
import storage from 'store'
import { CUSTOMIZE_COLUMNS } from '@/store/mutation-types'
import { mixinFormModal } from '@/utils/mixin'

const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        sorter: true,
        disabled: true,
        width: 120,
        fixed: 'left'
    },
    {
        title: '组',
        dataIndex: 'group',
        sorter: true,
        disabled: true,
        width: 120
    },
    {
        title: '姓名',
        dataIndex: 'display_name',
        disabled: true,
        sorter: true,
        width: 120
    },
    {
        title: '状态',
        dataIndex: 'account_control',
        scopedSlots: { customRender: 'accountControl' },
        sorter: true,
        disabled: true,
        width: 100
    },
    {
        title: '电话',
        dataIndex: 'telephone_number',
        sorter: true,
        disabled: true,
        width: 150
    },
    {
        title: '邮箱',
        dataIndex: 'mail',
        sorter: true,
        disabled: false,
        width: 200
    },
    {
        title: '添加时间',
        dataIndex: 'when_created',
        sorter: true,
        scopedSlots: { customRender: 'time' },
        disabled: false,
        width: 200
    },
    {
        title: '上次登录时间',
        dataIndex: 'last_logon',
        sorter: true,
        scopedSlots: { customRender: 'time' },
        disabled: false,
        width: 150
    },
    {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
        fixed: 'right',
        disabled: true,
        width: 200
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
            const Columns = {
                usergroup: result
            }
            storage.get(CUSTOMIZE_COLUMNS)

            storage.set(CUSTOMIZE_COLUMNS, Columns, parseInt(result.expired) * 1000)

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
