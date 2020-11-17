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
import { mixinFormModal } from '@/utils/mixin'
import storage from 'store'
import { CUSTOMIZE_COLUMNS } from '@/store/mutation-types'

const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        disabled: true,
        sorter: true,
        width: 150,
        fixed: 'left',
        scopedSlots: { customRender: 'username' }

    },
    {
        title: '组织单位',
        dataIndex: 'group',
        disabled: true,
        sorter: true,
        width: 150,
        scopedSlots: { customRender: 'group' }

    },
    {
        title: '姓名',
        dataIndex: 'display_name',
        disabled: true,
        sorter: true,
        width: 150,
        scopedSlots: { customRender: 'display_name' }

    },
    {
        title: '状态',
        disabled: true,
        dataIndex: 'account_control',
        scopedSlots: { customRender: 'status' },
        width: 120
    },
    {
        title: '电话',
        dataIndex: 'telephone_number',
        sorter: true,
        disabled: true,
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
        dataIndex: 'when_created',
        scopedSlots: { customRender: 'time' },
        sorter: true,
        width: 200
    },
    {
        title: '上次登录时间',
        dataIndex: 'last_logon',
        sorter: true,
        scopedSlots: { customRender: 'time' },
        width: 150
    },
    {
        title: '操作',
        disabled: true,
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
            checkedValues: []
        }
    },
    methods: {
        Add (record) {
            this.visible = true
			this.checkedValues = []
			const columnsTitle = record.map(u => u.title)
            this.columns.forEach(u => {
				if(columnsTitle.indexOf(u.title) !== -1) return 
                // record.forEach(o => {
                //     if (o.title === u.title) {
                //        this.checkedValues.push(u.title)
                //     }
                // })
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
            let columns = {}
            if (storage.get(CUSTOMIZE_COLUMNS)) {
                 columns = storage.get(CUSTOMIZE_COLUMNS)
            }
            columns.usergroup = result
            storage.set(CUSTOMIZE_COLUMNS, columns)
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
