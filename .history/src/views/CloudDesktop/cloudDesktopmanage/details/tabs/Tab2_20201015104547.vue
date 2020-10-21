<template>
  <div>
    <div>
      <h3 style="color:white;">绑定的组</h3>
      <m-table
        :columns="GroupColumns"
        :data="Group"
        bordered
        :scroll="{ y: 140 }"
        ref="Group"
        rowKey="name">
      </m-table>
    </div>
    <br>
    <div>
      <h3 style="color:white;">绑定的用户</h3>
      <m-table
        :columns="UsersColumns"
        :data="User"
        bordered
        ref="User"
        rowKey="username">
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
        title: '组',
        dataIndex: 'name',
        sorter: true
    }
]
const UsersColumns = [
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
                const data = deepGet(deepGet(await CloudDesktopPolicyList({ desktop_id: this.datasource.id }), 'data', []), 'users', [])
                return {
                    data
                }
            },
            Group: async parameter => {
                const data = deepGet(deepGet(await CloudDesktopPolicyList({ desktop_id: this.datasource.id }), 'data', []), 'groups', [])
                return {
                    data
                }
            }
        }
    },
    created () {
        CloudDesktopPolicyList({ desktop_id: '33' })
    }
}
</script>

<style>
</style>
