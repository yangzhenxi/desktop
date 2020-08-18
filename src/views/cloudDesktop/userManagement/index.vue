<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card>
          <div class="tree_bens">
            <div>
              <a-icon
                type="smile"
                theme="twoTone" />
              <span>全部</span>
            </div>
            <div>
              <a-icon type="setting" @click="$refs.TreeSet.Set()" />
              <a-icon type="user-add" @click="$refs.TreeAdd.add()"/>
              <a-icon type="edit" @click="$refs.TreeEdit.Edit()" />
              <a-icon type="delete" @click="TreeDelete" />
            </div>
          </div>
          <tree :treeData="allBranchListGetter" :checkedval="checkedval" @changecheckedval="changecheckedval"></tree>
        </a-card>

      </a-col>
      <a-col :span="18">
        <a-card>
          <div class="head">
            <div class="btns">
              <a-button
                @click="$refs.TabAdd.add()"
                type="primary"
                size="large">
                新增
              </a-button>
              <a-button
                @click="$refs.BatchTabAdd.BatchAdd()"
                type="primary"
                size="large"
                style="margin-left:15px">
                批量新增
              </a-button>
              <a-button
                type="primary"
                size="large"
                style="margin-left:15px">
                权限设置
              </a-button>
              <!-- disabled -->
              <a-button
                type="primary"
                size="large"
                style="margin-left:15px"
                @click="$refs.EditPass.Edit()">
                重置密码
              </a-button>
              <a-button
                type="danger"
                size="large"
                style="margin-left:15px">
                删除
              </a-button>
              <a-button
                type="danger"
                size="large"
                style="margin-left:15px">
                批量删除
              </a-button>
            </div>
            <div>
              <a-input-search placeholder="input search text" style="width: 200px" @search="onSearch" />
              <a-button type="primary" @click="$refs.SetColumns.Set()">
                <a-icon type="setting" />
              </a-button>
            </div>
          </div>
          <s-table
            :columns="columns"
            :data="loadData"
            rowKey="key"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
            <template slot="action">
              <a-button size="small">修改</a-button>
              <a-button
                size="small"
                type="danger">删除</a-button>
            </template>
          </s-table>
          <tab-add ref="TabAdd" @ok="handleOk"></tab-add>
          <tabbatch-add ref="BatchTabAdd" @ok="handleOk"></tabbatch-add>
          <tree-add ref="TreeAdd" @ok="handleOk"></tree-add>
          <tree-edit ref="TreeEdit" @ok="handleOk"></tree-edit>
          <tree-set ref="TreeSet" @ok="handleOk"></tree-set>
          <edit-pass ref="EditPass" @ok="handleOk"></edit-pass>
          <setcolumns ref="SetColumns" :data="columns" @ok="handleOk"></setcolumns>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { STable } from '@/components'
import TabAdd from './Tab_modules/Add'
import TabbatchAdd from './Tab_modules/batchAdd'
import TreeAdd from './Tree_modules/TreeAdd'
import TreeSet from './Tree_modules/TreeSet'
import Tree from './Tree_modules/tree'
import TreeEdit from './Tree_modules/TreeEdit'
import EditPass from './Tab_modules/EditPass'
import Setcolumns from './Tab_modules/Setcolumns'
import { mixinTable } from '@/utils/mixin'

const allBranchListGetter = [
  {
    key: '99230713',
    title: '豪联科技',
    // ⚠️重点这这里⚠️每一条数据上都添加scopedSlots属性
    scopedSlots: {
      title: 'custom'
    },
    children: [
      {
        key: '99230992',
        title: '软件部',
        scopedSlots: {
          title: 'custom'
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
          title: 'custom'
        },
        children: []
      },
      {
        key: '99231050',
        title: '财务',
        scopedSlots: {
          title: 'custom'
        },
        children: []
      }
    ]
  }
]
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    sorter: true
  },
  {
    title: '组',
    dataIndex: 'host',
    sorter: true
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    sorter: true
  },
  {
    title: '电话',
    dataIndex: 'status',
    sorter: true
  },
  {
    title: '邮箱',
    dataIndex: 'vmwareName',
    sorter: true
  },
  {
    title: '添加时间',
    dataIndex: 'version',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [mixinTable],
  components: {
    STable,
    TabAdd,
    TabbatchAdd,
    Tree,
    TreeAdd,
    TreeEdit,
    TreeSet,
    EditPass,
    Setcolumns
  },
  data () {
    return {
      allBranchListGetter,
      columns,
      checkedval: 'null',
      selectedRowKeys: [], // Check here to configure the default column
      loadData: async (parameter) => {
        return new Promise((resolve) => {
          resolve({
            data: [

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
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    TreeDelete () {
      this.$confirm({
        title: '是否要删除当前组?',
        content: '点击确定即可删除当前组',
        onOk () {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        }
      })
    },
    changecheckedval (value) {
      this.checkedval = value
    },
    onSearch (value) {
      console.log(value)
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.tree_bens{
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    div:first-of-type{
        margin: 0px 10px;
        i{
            margin-right: 20px;
        }
    }
    div:last-of-type{
        i{
            margin: 0px 10px;
        }
    }
}
.head{
    display:flex;
    justify-content: space-between;
    div:last-child {
        button{
            margin-left: 10px;
        }
        i{
            font-size: 20px;
        }
    }
}
.btns {
    margin-bottom: 20px;
  button {
    border-radius: 8px;
  }
}
</style>
