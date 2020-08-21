<template>
  <page-header-wrapper>
    <a-card>
      <div class="btns">
        <a-button
          type="primary"
          @click="$refs.Add.Add()">增加</a-button>
        <a-button
          type="danger"
          style="margin-left:15px;"
          @click="Delete">删除</a-button>
      </div>
      <s-table
        ref="table"
        :columns="columns"
        :data="loadData"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        rowKey="key">
        <template slot="action" slot-scope="text,record">
          <a-button
            type="primary"
            size="small"
            @click="$refs.Increase.Add(record)" >增加子集</a-button>
          <a-button
            size="small"
            type="danger"
            style="margin-left:10px;"
            @click="$refs.Edit.Add(record)">修改</a-button>
        </template>
      </s-table>
      <add
        ref="Add"
        @ok="handleOk"></add>
      <increase ref="Increase" @ok="handleOk"></increase>
      <edit ref="Edit" @ok="handleOk"></edit>

    </a-card>
  </page-header-wrapper>
</template>

<script>
import { mixinTable } from '@/utils/mixin'
import { STable } from '@/components'
import Add from './manage/Add'
import Increase from './manage/Increase'
import Edit from './manage/Edit'
export default {
  mixins: [mixinTable],
  components: {
    STable,
    Add,
    Increase,
    Edit
  },
  data () {
    return {
      selectedRowKeys: [], // Check here to configure the default column
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          sorter: true
        },
        {
          title: '联机Id',
          dataIndex: 'key',
          sorter: true
        },
        {
          title: '排序',
          dataIndex: 'order',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: async (parameter) => {
        return new Promise((resolve) => {
          resolve({
            data: [
              {
                key: 1,
                name: 'John Brown sr.',
                order: 60,
                children: [
                  {
                    key: 11,
                    name: 'John Brown',
                    order: 42
                  },
                  {
                    key: 12,
                    name: 'John Brown jr.',
                    order: 30,
                    children: [
                      {
                        key: 121,
                        name: 'Jimmy Brown',
                        order: 16
                      }
                    ]
                  },
                  {
                    key: 13,
                    name: 'Jim Green sr.',
                    order: 72,
                    children: [
                      {
                        key: 131,
                        name: 'Jim Green',
                        order: 42,
                        children: [
                          {
                            key: 1311,
                            name: 'Jim Green jr.',
                            order: 25
                          },
                          {
                            key: 1312,
                            name: 'Jimmy Green sr.',
                            order: 18
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                key: 2,
                name: 'Joe Black',
                order: 32,
                address: 'Sidney No. 1 Lake Park'
              }
            ],
            pageSize: 10,
            pageNo: 1,
            totalPage: 1,
            totalCount: 0
          })
        }).then((res) => {
          return res
        })
      }
    }
  },
  methods: {
    Delete () {
        if (this.selectedRowKeys.length === 0) {
            this.$message.info('请勾选后在删除')
            return false
        }
        this.$confirm({
            title: '是否删除',
            content: '点击确定删除',
            maskClosable: true,
            onOk: () => {
                setTimeout(() => {
                    this.$message.success('删除成功')
                }, 1000)
                this.handleOk()
            }
        })
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style lang="less" scoped>
.btns {
  margin-bottom: 20px;
}
</style>
