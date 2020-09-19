<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card>
          <div class="tree-header">
            <a-row
              :gutter="16"
              type="flex"
              justify="center"
              align="middle">
              <a-col :span="10">
                <a-icon
                  class="icon"
                  type="user" />全部
              </a-col>
              <a-col :span="14">
                <a-button
                  type="primary"
                  shape="circle"
                  @click="$refs.TreeAdd.Add()">
                  <a-icon
                    class="icon"
                    type="diff"></a-icon>
                </a-button>
                <a-button
                  type="primary"
                  shape="circle"
                  style="margin-left:10px;"
                  @click="$refs.TreeEdit.Edit()">
                  <a-icon
                    class="icon"
                    type="form"></a-icon>
                </a-button>
                <a-button
                  type="danger"
                  shape="circle"
                  style="margin-left:10px;"
                  @click="DeleteTree">
                  <a-icon
                    class="icon"
                    type="delete"></a-icon>
                </a-button>
              </a-col>
            </a-row>
          </div>
          <tree
            :treeData="treedata"
            :checkedval="checkedval"
            icon="user"
            @changecheckedval="changecheckedval"></tree>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card>
          <a-button
            type="primary"
            @click="$refs.TableAdd.Add()">添加</a-button>
          <a-button
            type="danger"
            style="margin-left:15px;"
            @click="DeleteTableAllUser">批量移除</a-button>
        </a-card>
        <a-card style="margin-top:20px;">
          <m-table
            :scroll="{ x: 1300 }"
            ref="table"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            :columns="columns"
            :data="loadData">
            <template slot="action">
              <a-button type="primary">修改</a-button>
              <a-button
                type="danger"
                style="margin-left:15px"
                @click="DeleteTableUser">删除</a-button>
            </template>
          </m-table>
        </a-card>
      </a-col>
    </a-row>
    <tree-add ref="TreeAdd"></tree-add>
    <tree-edit ref="TreeEdit"></tree-edit>
    <table-add ref="TableAdd"></table-add>
  </page-header-wrapper>
</template>

<script>
import Tree from '../components/tree'
import MTable from '@/components/Table/MTable'
import { mixinTable } from '@/utils/mixin'
import { systemUserList } from '@/api/system/user'
import TreeAdd from './TreeModules/Add'
import TableAdd from './TableModules/TableAdd'
import TreeEdit from './TreeModules/Edit'
const treedata = [
  {
    key: '99230713',
    title: '豪联科技',
    // ⚠️重点这这里⚠️每一条数据上都添加scopedSlots属性
    scopedSlots: {
      title: 'custom',
      icon: 'smile'
    },
    children: [
      {
        key: '99230992',
        title: '软件部',
        scopedSlots: {
          title: 'custom',
          icon: 'smile'
        },
        children: [
          {
            key: '99230112',
            title: '前端',
            scopedSlots: {
              title: 'custom'
            },
            children: []
          },
          {
            key: '9923011222',
            title: '后端',
            scopedSlots: {
              title: 'custom'
            },
            children: []
          },
          {
            key: '992307222',
            title: '测试',
            scopedSlots: {
              title: 'custom'
            },
            children: []
          }
        ]
      },
      {
        key: '99230993',
        title: '人事',
        scopedSlots: {
          title: 'custom',
          icon: 'smile',
          id: '4'
        },
        children: [
          {
            key: '99230152',
            title: '行政',
            scopedSlots: {
              title: 'custom'
            },
            children: []
          },
          {
            key: '9923015222',
            title: '商务助理',
            scopedSlots: {
              title: 'custom'
            },
            children: []
          }
        ]
      },
      {
        key: '99231020',
        title: '实施',
        scopedSlots: {
          title: 'custom',
          icon: 'smile'
        },
        children: []
      },
      {
        key: '99231050',
        title: '财务',
        scopedSlots: {
          title: 'custom',
          icon: 'smile'
        },
        children: []
      }
    ]
  }
]
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    sorter: true
  },
  {
    title: '组',
    dataIndex: 'name',
    sorter: true
  },
  {
    title: '姓名',
    dataIndex: 'role',
    sorter: true,
    scopedSlots: { customRender: 'role' }
  },
  {
    title: '电话',
    dataIndex: 'created',
    sorter: true,
    scopedSlots: { customRender: 'time' }
  },
  {
    title: '邮箱',
    dataIndex: 'locked',
    sorter: true,
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '添加时间',
    sorter: true
  },
  {
    title: '上次登录时间',
    sorter: true
  },
  {
    title: '状态',
    sorter: true
  },
  {
    title: '操作',
    sorter: true,
    // fixed: 'right',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [mixinTable],
  components: {
    Tree,
    MTable,
    TreeAdd,
    TreeEdit,
    TableAdd
  },
  data () {
    return {
      treedata,
      checkedval: ['99230713'],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loadData: async (parameter) => {
        try {
          const data = this.deepGet(await systemUserList(), 'data', [])
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
    changecheckedval (checkval) {
      console.log(checkval)
      this.checkedval = []
      this.checkedval.push(checkval)
    },
    DeleteTree () {
      this.$confirm({
        title: '是否删除组',
        content: '点击确定即可删除组',
        onOk: () => {}
      })
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    // 批量移除用户
    DeleteTableAllUser () {
      if (this.selectedRowKeys.length > 0) {
        this.$confirm({
          title: '是否批量移除用户',
          content: '点击确定即可批量移除用户',
          onOk: () => {
              this.selectedRowKeys = []
              this.$message.success('移除成功')
          }
        })
      } else {
        this.$message.info('请先选择要移除的用户')
      }
    },
    // 移除用户
    DeleteTableUser () {
      this.$confirm({
        title: '是否移除该用户',
        content: '点击确定即可移除',
        onOk: () => {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tree-header {
  margin-bottom: 10px;
  font-size: 16px;
  .icon {
    font-size: 16px;
  }
  /deep/i.icon.anticon.anticon-user {
    font-size: 20px;
  }
}
</style>
