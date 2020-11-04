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
        <a-input-search
          placeholder="请输入你想要查询的用户名"
          enter-button
          :v-model="queryParam.name"
          @search="onSearch" />
      </a-col>
    </a-row>
    <m-table
      style="margin-top:10px;"
      ref="table"
      rowKey="ID"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data="loadData">
      <template slot="state" slot-scope="text">
        <a-badge
          :number-style="{backgroundColor: toDict(text,'T_STATE').color}"
          :count="text | convert('T_STATE')" />
      </template>
      <template slot="progress" slot-scope="text">
        <a-progress :percent="text" status="active" style="color:#fff" />
      </template>
    </m-table>
  </page-header-wrapper>
</template>
<script>
import { MIcon, MTable } from '@/components'
import { CloudDesktopTaskList } from '@/api/CloudDesktop/CloudDesktop'
import { mixinTable } from '@/utils/mixin'
const columns = [
    {
      title: '任务ID',
      dataIndex: 'id',
      sorter: true
    },
    {
      title: '任务描述',
      dataIndex: 'title',
      sorter: true
    },
    {
      title: '当前进度',
      dataIndex: 'progress',
      scopedSlots: { customRender: 'progress' },
      sorter: true
    },
    {
      title: '任务状态',
      dataIndex: 'state',
      scopedSlots: { customRender: 'state' },
      sorter: true
    },
    {
      title: '开始时间',
      dataIndex: 'start_at',
      scopedSlots: { customRender: 'time' },
      sorter: true
    },
    {
      title: '结束时间',
      dataIndex: 'end_at',
      scopedSlots: { customRender: 'time' },
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
        loadData: async (parameter) => {
        try {
           const data = this.deepGet(await CloudDesktopTaskList(), 'data', [])
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
    AllDelete () {
      if (this.selectedRowKeys.length > 0) {
        this.$confirm({
          title: '是否要批量删除',
          content: '点击确定即可批量删除',
          okType: 'danger',
          onOk: () => {
            this.$message.success('删除成功！')
            this.$refs.table.refresh()
            this.selectedRowKeys = []
          }
        })
      } else {
        this.$message.info('请先选择要删除的用户')
      }
    },
       onSearch (value) {
        console.log(value)
      this.queryParam.detail = value
      this.$refs.table.refresh(true)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
