<template>
  <page-header-wrapper :title="false">
    <a-card>
      <div class="head">
        <div class="btns">
          <a-button
            type="primary"
            @click="$refs.Add.Add()">增加</a-button>
          <a-button
            type="primary"
            style="margin-left:15px;"
            @click="$refs.Set.Set()">设置部门</a-button>
          <a-button
            type="danger"
            style="margin-left:15px;"
            @click="Delete">删除</a-button>
        </div>
        <div>
          <a-input-search
            placeholder="input search text"
            style="width: 200px"
            @search="onSearch" />
        </div>
      </div>
      <m-table
        ref="table"
        bordered
        :columns="columns"
        :data="loadData"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template slot="action" slot-scope="text,record">
          <a-button type="primary" @click="$refs.Edit.Edit(record)">
            修改
          </a-button>
        </template>
      </m-table>
      <add
        ref="Add"
        @ok="handleOk"></add>
      <set
        ref="Set"
        @ok="handleOk"></set>
      <edit ref="Edit" @ok="handleOk"></edit>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { MTable, MIcon } from '@/components'
import { mixinTable } from '@/utils/mixin'
import Add from './manage/Add'
import Set from './manage/Set'
import Edit from './manage/Edit'
import { getServiceList } from '@/api/manage'

export default {
  mixins: [mixinTable],
  components: {
    Set,
    Add,
    MTable,
    Edit,
    MIcon
  },
  data () {
    return {
      selectedRowKeys: [], // Check here to configure the default column
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '角色名称',
          dataIndex: 'description'
        },
        {
          title: '类型',
          dataIndex: 'callNo',
          sorter: true,
          needTotal: true,
          customRender: (text) => text + ' 次'
        },
        {
          title: '部门',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.result
        })
      }
    }
  },
  methods: {
    onSearch (value) {
      console.log(value)
    },
    Delete () {
      this.$confirm({
        title: '是否要删除当前角色?',
        content: '点击确定即可删除当前角色',
        onOk () {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
