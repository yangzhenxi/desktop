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
          @search="onSearch" />
      </a-col>
    </a-row>
    <m-table
      style="margin-top:10px;"
      ref="table"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      rowKey="id"
      :data="loadData">
      <template slot="Level" slot-scope="text">
        <a-tag :color="toDict(text,'A_LEVEL').color">
          {{ text |convert('A_LEVEL') }}
        </a-tag>
      </template>
      <template slot="Action" slot-scope="text,record">
        <a-button type="danger" icon="delete" @click="Delete(record)">删除</a-button>
      </template>
    </m-table>
  </page-header-wrapper>
</template>
<script>
import { MIcon, MTable } from '@/components'
import { mixinTable } from '@/utils/mixin'
import { systemAlertList, systemAlertDelete } from '@/api/system/alarm'
const columns = [
  {
    title: '严重性',
    dataIndex: 'level',
    scopedSlots: { customRender: 'Level' },
    sorter: true
  },
  {
    title: '内容',
    dataIndex: 'content',
    sorter: true
  },
  {
    title: '主机',
    dataIndex: 'host',
    sorter: true
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    scopedSlots: { customRender: 'time' },
    sorter: true
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'Action' },
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
          const data = this.deepGet(await systemAlertList(), 'data', [])
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
        console.log(this.selectedRowKeys)
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
    Delete (record) {
        const obj = { id: [record.id] }
         this.$confirm({
          title: '是否要删除？',
          content: '点击确定即可删除',
          okType: 'danger',
          onOk: async () => {
            await systemAlertDelete(obj).then(res => {
                this.$message.success('删除成功！')
                this.$refs.table.refresh()
            }).catch(() => {
                this.$message.error('删除失败')
            })
            this.selectedRowKeys = []
          }
        })
    },
       onSearch (value) {
      this.queryParam.detail = value
      this.$refs.table.refresh(true)
    }
  }
}
</script>
