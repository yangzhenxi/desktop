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
    </m-table>
  </page-header-wrapper>
</template>
<script>
import { MIcon, MTable } from '@/components'
import { mixinTable } from '@/utils/mixin'
const columns = [
    {
      title: '严重性',
      dataIndex: 'Severity',
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
      dataIndex: 'startTime',
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
            const data = [{
                Severity: '1',
                content: '嘻嘻嘻嘻嘻嘻嘻嘻',
                host: '正常',
                startTime: '1600912125'
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
      AllDelete () {

      }
  }
}
</script>
