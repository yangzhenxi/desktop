<template>
  <div>
    <div>
      <h3 style="color:white;">绑定的组</h3>
      <m-table
        :columns="GroupColumns"
        :data="Group"
        :scroll="{ y: 200 }"
        ref="Group"
        rowKey="name">
      </m-table>
    </div>
    <br>
    <div>
      <h3 style="color:white;">绑定的用户</h3>
      <m-table
        :columns="UsersColumns"
        :scroll="{ y: 200 }"
        :data="User"
        ref="User"
        rowKey="username">
      </m-table>
    </div>
  </div>
</template>

<script>
import MTable from '@/components/Table/MTable'
import { deepGet } from '@/utils/util'
import { mapState, mapMutations } from 'vuex'
import { CloudDesktopPolicyList } from '@/api/CloudDesktop/CloudDesktop'
const GroupColumns = [
    {
        title: '组',
        dataIndex: 'name'
    }
]
const UsersColumns = [
    {
        title: '用户名',
        dataIndex: 'username'
    },
    {
        title: '姓名',
        dataIndex: 'name'
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
    computed: {
        ...mapState({
            SearchData: state => state.cloudDesktop.Search
        })
    }
}
</script>

<style>
</style>
