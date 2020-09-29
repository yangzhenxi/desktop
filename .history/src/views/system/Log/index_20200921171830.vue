<template>
  <page-header-wrapper :title="false">
    <a-row>
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
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
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
import { systemLogList } from '@/api/system/Log'

const columns = [
  {
    title: 'ID',
    dataIndex: 'module',
    sorter: true
  },
  {
    title: '模块',
    dataIndex: 'module',
    sorter: true
  },
  {
    title: '详情',
    dataIndex: 'detail',
    sorter: true
  },
  {
    title: '用户IP',
    dataIndex: 'ip',
    sorter: true
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
    sorter: true,
    scopedSlots: { customRender: 'time' }
  }
]
export default {
 mixins: [mixinTable],
  components: {
    MIcon,
    MTable
  },
  data () {
      return {
      columns,
            selectedRowKeys: [], // Check here to configure the default column
      loadData: async (parameter) => {
          this.queryParam.userId = '1'
        try {
          const data = this.deepGet(await systemLogList(this.queryParam), 'data', [])
          return {
              data,
              queryParam: this.queryParam
          }
        } catch (error) {
          return false
        }
      }
      }
  }
}
</script>

<style>

</style>
