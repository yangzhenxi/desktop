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
      <template slot="ID">
        <span>{{ $store.state.user.info.username }}</span>
      </template>
      <template
        slot="status"
        slot-scope="text,record">
        <!-- 正常禁用 -->
        <a-switch
          :checked="!text"
          @change="onChange(record)"
          checkedChildren="启用"
          unCheckedChildren="禁用" />
      </template>
      <template
        slot="action"
        slot-scope="text,record">
        <a-button
          size="small"
          type="danger"
          icon="delete"
          style="margin-left:15px;"
          @click="Delete(record)">删除</a-button>
      </template>
    </m-table>
  </page-header-wrapper>
</template>

<script>
import { MIcon, MTable } from '@/components'
import { mixinTable } from '@/utils/mixin'
import { systemLogList, systemLogDelete } from '@/api/system/Log'
const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      scopedSlots: { customRender: 'ID' },
      sorter: true
    },
  {
    title: '模块',
    dataIndex: 'module',
    sorter: true,
    ellipsis: true
  },
  {
    title: '详情',
    dataIndex: 'detail',
    ellipsis: true,
    sorter: true
  },
  {
    title: '用户IP',
    dataIndex: 'ip',
    ellipsis: true,
    sorter: true
  },
  {
    title: '添加时间',
    dataIndex: 'createTime',
    ellipsis: true,
    sorter: true,
    scopedSlots: { customRender: 'time' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    sorter: true,
    scopedSlots: { customRender: 'action' }
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
      TAbleData: [],
      dataSource: [],
      selectedRowKeys: [], // Check here to configure the default column
      deleteData: { id: [] },
      loadData: async (parameter) => {
        try {
          const data = this.deepGet(await systemLogList({ userId: this.$store.state.user.info.id }), 'data', [])
            data.forEach(u => {
                this.TAbleData.push(u.module)
            })
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
    },
    Delete (item) {
      this.$confirm({
        title: '是否要删除',
        content: '点击确定即可删除',
        okType: 'danger',
        onOk: () => {
          this.deleteData.id.push(item.id)
          systemLogDelete(this.deleteData).then((res) => {
            this.$message.success('删除成功！')
            this.$refs.table.refresh()
            this.selectedRowKeys = []
          })
        }
      })
    },
    AllDelete () {
      if (this.selectedRowKeys.length > 0) {
      this.$confirm({
        title: '是否要批量删除',
        content: '点击确定即可批量删除',
        okType: 'danger',
        onOk: () => {
          systemLogDelete(this.deleteData).then((res) => {
            this.$message.success('删除成功！')
            this.$refs.table.refresh()
            this.selectedRowKeys = []
          })
        }
      })
      } else {
          this.$message.info('请先选择要删除的用户')
      }
    },

    onSelect (value) {
		value ? this.queryParam.module = value : this.queryParam.module = ''
        this.dataSource = []
        this.$refs.table.refresh()
    },

    handleSearch (value) {
        this.dataSource = []
        let res = []
        this.TAbleData.forEach(u => {
            for (let o = 0; o <= u.toString().length; o++) {
                if (u.substring(o, (value.length) + o) === value) {
                    res.push(u)
                }
            }
        })
        res = [...new Set(res)]
        this.TAbleData.includes(value) ? this.dataSource = [value] : this.dataSource = [...res]
    }
  }
}
</script>

<style>
</style>
