<template>
  <a-modal
    title="数据权限设置"
    :width="840"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-table :columns="columns" :data-source="data" >
        <template slot="Edit">
          <a-checkbox @change="onChange"></a-checkbox>
        </template>
        <template slot="Delete">
          <a-checkbox @change="onChange"></a-checkbox>
        </template>
        <template slot="All">
          <a-checkbox @change="onChange"></a-checkbox>
        </template>
      </a-table>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
const columns = [
  {
    title: '权限名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '编辑',
    dataIndex: 'age',
    key: 'age',
     scopedSlots: { customRender: 'Edit' }
  },
  {
    title: '删除',
    dataIndex: 'address',
    key: 'address',
     scopedSlots: { customRender: 'Delete' }
  },
  {
    title: '全选',
    dataIndex: 'address',
    key: 'address',
     scopedSlots: { customRender: 'All' }
  }
]
const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park'
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park'
          }
        ]
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park'
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}
export default {
  mixins: [mixinFormModal],
  name: 'UserManageTreeSet',
  data () {
    return {
        columns,
        data,
        rowSelection
    }
  },
  methods: {
    Set () {
      this.visible = true
    },
    handleSubmit () {
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    },
    onChange (e) {
      console.log(`checked = ${e.target.checked}`)
    }
  }
}
</script>

<style>
</style>
