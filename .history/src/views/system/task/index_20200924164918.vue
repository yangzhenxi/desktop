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
          type="danger"
          icon="Delete"
          style="margin-left:15px;"
          @click="Delete(record)">删除</a-button>
      </template>
    </m-table>
  </page-header-wrapper>
</template>
<script>
import { MIcon, MTable } from '@/components'
import { mixinTable } from '@/utils/mixin'
const columns = [
    {
      title: '任务描述',
      dataIndex: 'ID',
      sorter: true
    },
    {
      title: '任务详情',
      dataIndex: 'Details',
      sorter: true
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      sorter: true
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      scopedSlots: { customRender: 'time' },
      sorter: true
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      scopedSlots: { customRender: 'time' },
      sorter: true
    },
    {
      title: '完成率',
      dataIndex: 'carry',
      sorter: true
    },
    {
      title: '任务状态',
      dataIndex: 'status',
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
            const data = [{
                ID: '1',
                Details: '嘻嘻嘻嘻嘻嘻嘻嘻',
                priority: '正常',
                startTime: '1600912125',
                endTime: '1610912125',
                carry: '100%',
                status: '正常'
            }]
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
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
}
</script>
