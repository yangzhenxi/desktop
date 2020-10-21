<template>
  <div>
    <div>
      <h3 style="color:white;">绑定的组</h3>
      <m-table
        :columns="GroupColumns"
        :data="Group"
        bordered
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        ref="table"
        rowKey="group">
      </m-table>
    </div>
    <br>
    <div>
      <h3 style="color:white;">绑定的用户</h3>
      <m-table
        :columns="UsersColumns"
        :data="User"
        bordered
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        ref="table"
        rowKey="name">
      </m-table>
    </div>
  </div>
</template>

<script>
import MTable from '@/components/Table/MTable'
import { deepGet } from '@/utils/util'
import { CloudDesktopPolicyList } from '@/api/CloudDesktop/CloudDesktop'
const GroupColumns = [
    {
        title: 'id',
        dataIndex: 'sid',
        sorter: true
    },
    {
        title: '组',
        dataIndex: 'name',
        sorter: true
    }
]
const UsersColumns = [
    {
        title: 'id',
        dataIndex: 'sid',
        sorter: true
    },
    {
        title: '用户名',
        dataIndex: 'username',
        sorter: true
    },
    {
        title: '姓名',
        dataIndex: 'name',
        sorter: true
    }
]
export default {
    components: {
        MTable
    },
    props: {
        datasource: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            GroupColumns,
            UsersColumns,
            selectedRowKeys: [],
            User: async parameter => {
                const data = deepGet(deepGet(CloudDesktopPolicyList({ desktop_id: this.datasource.id }), 'data', []), 'users', [])
                return {
                    data
                }
            },
            Group: async parameter => {
                // console.log(deepGet(, 'data', []))
                CloudDesktopPolicyList({ desktop_id: this.datasource.id }).then(res => {
                    console.log(res)
                })
                const data = deepGet(deepGet(CloudDesktopPolicyList({ desktop_id: this.datasource.id }), 'data', []), 'groups', [])
                console.log(data)
                return {
                    data
                }
            }
        }
    },
    created () {
        CloudDesktopPolicyList({ desktop_id: '33' })
    },
    methods: {
        onSelectChange (selectedRowKeys) {
            console.log('selectedRowKeys changed: ', selectedRowKeys)
            this.selectedRowKeys = selectedRowKeys
        }
    }
}
</script>

<style>
</style>
