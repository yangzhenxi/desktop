<template>
  <div>
    <div>
      <h3 style="color:white;">绑定的组</h3>
      <m-table
        :columns="columns"
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
        :columns="columnss"
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
const columns = [
    {
        title: '组',
        dataIndex: 'group',
        sorter: true
    }
]
const columnss = [
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
    data () {
        return {
            columns,
            columnss,
            selectedRowKeys: [],
            User: async parameter => {
                const data = deepGet(deepGet(CloudDesktopPolicyList({ desktop_id: '33' }), 'data'), 'groups')
                ]
                return {
                    data
                }
            },
            Group: async parameter => {
                const data = [
                    {
                        username: '系统管理员',
                        name: 'admin'
                    }
                ]
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
