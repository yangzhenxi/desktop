<template>
  <page-header-wrapper :title="false">
    <a-row>
      <a-col :span="2">
        <a-button
          type="primary"
          @click="$refs.Add.Add(roleList,UserList)"
          icon="plus">新增</a-button>
      </a-col>
      <a-col :span="4">
        <a-input-search
          placeholder="请输入你想要查询的用户名"
          enter-button
          :v-model="data"
          @search="onSearch" />
      </a-col>
    </a-row>
    <m-table
      style="margin-top:10px;"
      ref="table"
      :columns="columns"
      :data="loadData">
      <template
        slot="role"
        slot-scope="text,role">
        <span>{{ role.role.name }}</span>
      </template>
      <template
        slot="status"
        slot-scope="text,record">
        <!-- 正常禁用 -->
        <a-switch :checked="!text" @change="onChange(record)" checkedChildren="启用" unCheckedChildren="禁用" />
      </template>
      <template slot="action" slot-scope="text,record">
        <a-button
          type="primary"
          icon="form"
          @click="$refs.Edit.Edit(record,roleList)">修改</a-button>
        <a-button
          type="danger"
          icon="delete"
          style="margin-left:15px;"
          @click="Delect(record)">删除</a-button>
        <a-button
          type="primary"
          style="margin-left:15px;"
          @click="ResetPassword(record,UserList)">重置密码</a-button>
      </template>
    </m-table>
  </page-header-wrapper>
</template>

<script>
import { MIcon, MTable } from '@/components'
import { mixinTable } from '@/utils/mixin'
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    sorter: true
  },
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: true
  },
  {
    title: '角色',
    dataIndex: 'role',
    sorter: true,
    scopedSlots: { customRender: 'role' }
  },
  {
    title: '添加时间',
    dataIndex: 'created',
    sorter: true,
    scopedSlots: { customRender: 'time' }
  },
  {
    title: '状态',
    dataIndex: 'locked',
    sorter: true,
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    sorter: true,
    scopedSlots: { customRender: 'action' },
     width: '350px'
  }
]
export default {
 mixins: [mixinTable],
  components: {
    MIcon,
    MTable,
    AddModal,
    EditModal
  }
}
</script>

<style>

</style>
