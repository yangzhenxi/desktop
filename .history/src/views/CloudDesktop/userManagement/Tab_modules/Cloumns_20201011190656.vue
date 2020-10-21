<template>
  <a-modal
    title="新增用户信息"
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
              <a-checkbox value="A">
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
    width: 120
  },
  {
    title: '组',
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
    scopedSlots: { customRender: 'accountControl' },
    sorter: true,
    width: 120
  },
  {
    title: '电话',
    dataIndex: 'telephoneNumber',
    sorter: true,
    width: 150
  },
  {
    title: '邮箱',
    dataIndex: 'mail',
    sorter: true,
    width: 200
  },
  {
    title: '添加时间',
    dataIndex: 'whenCreated',
    sorter: true,
    scopedSlots: { customRender: 'time' },
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
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    fixed: 'right',
    width: 200
  }
]

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
        columns
    }
  },
  methods: {
    Add (record) {
      this.visible = ''
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
