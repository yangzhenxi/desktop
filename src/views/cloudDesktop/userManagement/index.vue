<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col
        ref="left"
        :span="6">
        <a-card style="height:842px;" :loading="loading">
          <a-row>
            <a-col
              :xl="8"
              :md="8"
              :sm="8">
              <m-icon
                type="guanyuwomen"
                class="icon guanyuwomen" />
              <span
                class="All"
                style="font-size:17px;">全部</span>
            </a-col>
            <a-col
              :xl="16"
              :md="16"
              :sm="16">
              <span @click="$refs.TreeAdd.add(queryParam)">
                <m-icon
                  type="yonghutianjia"
                  class="icon yonghutianjia" />
              </span>

              <span @click="$refs.TreeEdit.Edit(queryParam)">
                <m-icon
                  type="xiugai"
                  class="icon xiugai" />
              </span>

              <span @click="TreeDelete">
                <m-icon
                  type="shanchu"
                  class="icon shanchu" /> </span>

            </a-col>
          </a-row>
          <tree
            :treeData="ouList"
            :checkedval="treeeventKey.checkedval"
            @changecheckedval="changecheckedval"></tree>
        </a-card>
      </a-col>

      <a-col
        ref="right"
        :span="18">
        <div class="head">
          <div class="btns">
            <a-button
              @click="$refs.TabAdd.add(ouList)"
              type="primary">
              新增
            </a-button>
            <a-button
              type="primary"
              style="margin-left:10px"
              @click="EditPass(selectedRows)">
              重置密码
            </a-button>
            <a-button
              @click="$refs.BatchTabAdd.BatchAdd()"
              type="primary"
              style="margin-left:10px">
              批量新增
            </a-button>
            <a-button
              @click="BatchDelUser()"
              type="danger"
              style="margin-left:10px">
              批量删除
            </a-button>
            <a-button
              type="primary"
              @click="$refs.ExportUser.ExportUser(ouList)"
              style="margin-left:10px">
              全部导出
            </a-button>
          </div>
        </div>
        <a-card>
          <m-table
            ref="table"
            bordered
            :columns="columns"
            :data="loadData"
            rowKey="key"
            :scroll="Tablescroll?{x:1600}:none"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
            <template slot="accountControl" slot-scope="text">
              {{ text.DisableCount }}
            </template>
            <template
              slot="action"
              slot-scope="text,record">
              <a-button
                size="small"
                type="primary"
                @click="$refs.TabEdit.Edit(record,ouList)">修改</a-button>
              <a-button
                size="small"
                @click="Delete(record)"
                type="danger"
                style="margin-left:10px">
                删除
              </a-button>
            </template>
          </m-table>
          <tab-add
            ref="TabAdd"
            @ok="handleTreeTableOk"></tab-add>
          <tab-edit
            ref="TabEdit"
            @ok="handleTreeTableOk"></tab-edit>
          <tabbatch-add
            ref="BatchTabAdd"
            @ok="handleTreeTableOk"></tabbatch-add>
          <tab-exportUser ref="ExportUser"></tab-exportUser>
          <tree-add
            ref="TreeAdd"
            @ok="handleTreeTableOk"></tree-add>
          <tree-edit
            ref="TreeEdit"
            @ok="handleTreeOk"></tree-edit>
          <edit-pass
            ref="EditPass"
            @ok="handleOk"></edit-pass>
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { MTable, MIcon } from '@/components'
import TabAdd from './Tab_modules/Add'
import TabbatchAdd from './Tab_modules/batchAdd'
import TabEdit from './Tab_modules/Edit'
import TabExportUser from './Tab_modules/ ExportUser'

import TreeAdd from './Tree_modules/TreeAdd'
import Tree from './Tree_modules/tree'
import TreeEdit from './Tree_modules/TreeEdit'
import EditPass from './Tab_modules/EditPass'
import Setcolumns from './Tab_modules/Setcolumns'
import { mixinTable } from '@/utils/mixin'
import {
  usermanageListOU,
  usermanageListuser,
  usermanageBatchDelUser,
  usermanageDeluser,
  usermanageDelOu
} from '@/api/CloudDesktop/userManage'

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    sorter: true
  },
  {
    title: '组',
    dataIndex: 'group',
    sorter: true
  },
  {
    title: '姓名',
    dataIndex: 'displayName',
    sorter: true
  },
  {
    title: '电话',
    dataIndex: 'telephoneNumber',
    sorter: true
  },
  {
    title: '邮箱',
    dataIndex: 'mail',
    sorter: true
  },
  {
    title: '状态',
    dataIndex: 'accountControl',
    scopedSlots: { customRender: 'accountControl' },
    sorter: true
  },
  {
    title: '添加时间',
    dataIndex: 'whenCreated',
    sorter: true,
    width: '200px',
    scopedSlots: { customRender: 'time' }
  },
  {
    title: '上次登录时间',
    dataIndex: 'lastLogon',
    sorter: true,
    width: '200px',
    scopedSlots: { customRender: 'time' }
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
    MTable,
    TabAdd,
    TabbatchAdd,
    TabExportUser,
    Tree,
    TreeAdd,
    TreeEdit,
    EditPass,
    Setcolumns,
    MIcon,
    TabEdit
    // Empty
  },
  data () {
    return {
      columns,
      loading: true,
      queryParam: {},
      sechar: [], // 找father
      selectedRowKeys: [], // Check here to configure the default column
      deleteTabName: [], // 删除用户的数组
      Tablescroll: true,
      selectedRows: [],
      treeeventKey: {
          checkedval: ['0']// 单选框默认选中的值
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
          this.Tablescroll = true
        if (this.treeeventKey.checkedval[0] === '0') {
          const OuList = await usermanageListOU()
          this.queryParam.name = 'ou=' + OuList.ou[0].children[0].name + ',ou=Citrix,dc=test,dc=com'
        }
        let data = this.deepGet(await usermanageListuser(this.queryParam), 'list')
        if (data === undefined) {
          data = []
          this.Tablescroll = false
        }
        return {
          data
        }
      },
      ouList: [],
      obj: {}
    }
  },
  methods: {
      // 导出用户
    onSelectChange (selectedRowKeys, selectedRows) {
      this.deleteTabName = []
      selectedRows.forEach((u) => {
        this.deleteTabName.push(u.username)
      })
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
    },
    // 删除Ou
    TreeDelete () {
        if (this.treeeventKey.dataRef.children.length !== 0) {
            this.$message.info('当前选中的OU下还有子Ou暂不能删除')
            return false
        }
      this.$confirm({
        title: '是否要删除' + this.queryParam.onName + '组?',
        content: '点击确定即可删除当前组',
        onOk: () => {
            usermanageDelOu(this.queryParam).then(res => {
                this.$message.success('删除成功')
                this.handleTreeOk()
            })
        }
      })
    },
    changecheckedval (item) {
      this.sechar = []
      this.selectedRowKeys = []
      this.treeeventKey = item
      this.treeeventKey.checkedval = []
      this.treeeventKey.checkedval.push(item.eventKey)
      if (item.ouSort[0] === this.ouList[0].title) {
        item.ouSort.reverse()
      }
      this.queryParam.name = ''

      // 判断当前是不是在子分支下
      if (item.eventKey.search('-') !== -1) {
        item.ouSort.forEach((u) => {
          this.queryParam.name = this.queryParam.name + 'ou=' + u + ','
        })
        this.queryParam.onName = item.ouSort[0]
        this.queryParam.name = this.queryParam.name + 'ou=Citrix,dc=test,dc=com'
        this.$refs.table.refresh()
        return true
      }
      this.queryParam.name = 'ou=' + item.name + ',ou=Citrix,dc=test,dc=com'
      this.$refs.table.refresh()
    },
    Recursion (Array, data) {
      Array.forEach((item, index) => {
        this.obj = {
          key: index.toString(),
          title: item.name,
          scopedSlots: {
            title: 'custom',
            icon: 'smile'
          },
          children: [],
          childrenLength: item.userCount,
          ouSort: []
        }
        if (data) {
          this.obj.key = data.key + '-' + index
          data.children.push(this.obj)
          this.obj.ouSort.push(...data.ouSort)
          this.obj.ouSort.push(item.name)
        } else {
          this.obj.ouSort.push(item.name)
          this.ouList.push(this.obj)
        }
        if (item.children.length > 0) {
          // 执行递归
          this.Recursion(item.children, this.obj)
        }
      })
    },
    eventKeyRecursion (Array, item) {
      console.log(Array.children)
      Array.children.forEach((name) => {
        //   if()
        if (name.key === item.eventKey) {
          return false
        }
        this.sechar.push(name.name)
        if (name.children.length > 0) {
          this.eventKeyRecursion(name, item)
        }
      })
    },
    async getOuList () {
      const OuList = await usermanageListOU()
      this.queryParam.name = 'ou=' + OuList.ou[0].children[0].name + ',ou=Citrix,dc=test,dc=com'
      this.Recursion(OuList.ou[0].children)
      this.loading = false
    },
    Delete (record) {
        console.log(record)
      const deleteData = {
        baseDN: this.queryParam.name,
        username: record.username
      }
        this.$confirm({
          title: '是否要删除' + record.username,
          content: '点击确定即可删除',
          okType: 'danger',
          onOk: () => {
            usermanageDeluser(deleteData).then((res) => {
              this.$message.success('删除成功！')
              this.$refs.table.refresh()
              this.handleTreeOk()
              this.selectedRowKeys = []
            })
          }
        })
    },
    BatchDelUser () {
      const BatchDel = {}
      BatchDel.users = this.deleteTabName.map((u) => {
        const deleteData = {
          baseDN: this.queryParam.name,
          username: u
        }
        return deleteData
      })

      if (this.selectedRowKeys.length === 0) {
        this.$message.info('请选择要删除的用户')
      } else {
        this.$confirm({
          title: '确认要批量删除用户？',
          content: '点击确定即可删除',
          okType: 'danger',
          onOk: () => {
            usermanageBatchDelUser(BatchDel).then((res) => {
              this.$message.success('删除成功')
              this.selectedRowKeys = []
              this.$refs.table.refresh()
            })
          }
        })
      }
    },
    EditPass () {
        if (this.selectedRowKeys.length > 0) {
            this.$refs.EditPass.Edit(this.selectedRows)
        } else {
            this.$message.info('请选选择要重置的用户(可多选)')
        }
    }
  },
  created () {
    this.getOuList()
  }
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
  background: #272e48;
//   border: 1px solid white;
    border-radius: 10px;
  margin-bottom: 20px;
  div:last-child {
    button {
      margin-left: 10px;
    }
    i {
      font-size: 20px;
    }
  }
}
.btns {
    padding: 10px 0;
  button {
    border-radius: 8px;
  }
}
.icon {
  cursor: pointer;
  font-size: 20px;
  margin: 0px 10px;
}
.All {
  font-size: 20px;
  margin-left: 10px;
}

.ant-pagination {
  float: right;
  margin-right: 20px;
  margin-top: 20px;
  color: white;
}

</style>
