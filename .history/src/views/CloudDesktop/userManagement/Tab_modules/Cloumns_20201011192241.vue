<template>
  <a-modal
    title="自定义列表项"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose
  >
    <a-spin :spinning="loading">
      <a-form :form="form" layout="vertical">
        <a-checkbox-group @change="onChange">
          <a-row :gutter="[16,16]">
            <a-col :span="6" v-for="(i,index) in columns" :key="index">
              <a-checkbox :value="i.dataIndex" :disabled="i.disabled" :default-checked="i.disabled.toString()" style="color:white">
                {{ i.title }}
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
        <a-checkbox :default-checked="true" disabled />
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
    disabled: false,
    width: 120
  },
  {
    title: '组',
    dataIndex: 'group',
    sorter: true,
    disabled: false,
    width: 120
  },
  {
    title: '姓名',
    dataIndex: 'displayName',
    sorter: true,
    disabled: false,
    width: 120
  },
  {
    title: '状态',
    dataIndex: 'accountControl',
    scopedSlots: { customRender: 'accountControl' },
    sorter: true,
    disabled: false,
    width: 120
  },
  {
    title: '电话',
    dataIndex: 'telephoneNumber',
    sorter: true,
    disabled: false,
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
    dataIndex: 'whenCreated',
    sorter: true,
    scopedSlots: { customRender: 'time' },
    disabled: false,
    width: 200
  },
  {
    title: '上次登录时间',
    dataIndex: 'lastLogon',
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
    disabled: false,
    width: 200
  }
]

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
        columns,
        record: []
    }
  },
  methods: {
    Add (record) {
      this.visible = ''
        this.columns.forEach(u => {
            record.forEach(o => {
                if (o.title === u.title) {
                    u.disabled = true
                }
            })
        })
        console.log(this.columns)
    },
    handleSubmit () {
    //   this.form.validateFields(async (errors, values) => {
    //   })
    },
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
