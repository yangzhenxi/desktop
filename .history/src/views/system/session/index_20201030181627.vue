<template>
  <page-header-wrapper :title="false">
    <a-row>
      <a-col :span="2">
        <a-button
          type="danger"
          @click="AllDelete">
          批量删除
        </a-button>
      </a-col>
      <a-col :span="4">
        <div class="global-search-wrapper" style="width: 300px">
          <a-auto-complete
            class="global-search"
            :data-source="dataSource"
            style="width: 100%"
            placeholder="输入要查询的模块"
            v-model="queryParam.module"
            @select="onSelect"
            @search="handleSearch">
            <a-input>
              <a-button
                @click="onSelect(queryParam.module)"
                slot="suffix"
                style="margin-right: -12px"
                class="search-btn"
                type="primary">
                <a-icon type="search" />
              </a-button>
            </a-input>
          </a-auto-complete>
        </div>
      </a-col>
    </a-row>
    <m-table
      style="margin-top:10px;"
      ref="table"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data="loadData">
    </m-table>
  </page-header-wrapper>
</template>

<script>
import { MIcon, MTable } from '@/components'
import { mixinTable } from '@/utils/mixin'
import { CloudDesktopSessionList } from '@/api/CloudDesktop/CloudDesktop'
const columns = [
  {
    title: '计算机名称',
    dataIndex: 'session_key',
    sorter: true
  },
  {
    title: 'IP地址',
    dataIndex: 'ip_address',
    sorter: true
  },
  {
    title: '当前用户名',
    dataIndex: 'UserFullName',
    sorter: true
  },
  {
    title: '客户端IP',
    dataIndex: 'client_address',
    sorter: true
  },
  {
    title: '会话状态',
    dataIndex: 'session_state',
    scopedSlots: { customRender: 'SessionState' },
    sorter: true
  },
  {
    title: '代理版本',
    dataIndex: 'agent_version',
    sorter: true
  },
  {
    title: '会话开始时间',
    dataIndex: 'start_time',
    sorter: true
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
      data: '',
      selectedRowKeys: [], // Check here to configure the default column
      loadData: async (parameter) => {
        try {
            const result = await CloudDesktopSessionList({ desktop_id: '117' })
            const data = this.deepGet(result, 'data', [])
          return {
            data,
            queryParam: this.queryParam
          }
        } catch (error) {
          return false
        }
      }
    }
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.deleteData.id = selectedRows.map((u) => u.id)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style>
</style>
