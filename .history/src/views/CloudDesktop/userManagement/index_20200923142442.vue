<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col
        ref="left"
        :span="6">
        <a-card
          style="height:842px;"
          :loading="loading">
          <a-row>
            <a-col :span="10">
              <a-icon
                class="icon"
                type="user" />
              <span
                class="All"
                @click="Users"
                style="font-size:17px;">全部</span>
            </a-col>
            <a-col :span="14">
              <a-button
                type="primary"
                shape="circle"
                @click="$refs.TreeAdd.add(queryParam,OuAllName)">
                <m-icon
                  type="yonghutianjia"
                  class="icon yonghutianjia" />
              </a-button>
              <a-button
                type="primary"
                shape="circle"
                style="margin-left:10px;"
                :disabled="disabled"
                @click="$refs.TreeEdit.Edit(queryParam,treeeventObj,OuAllName)">
                <m-icon
                  type="xiugai"
                  class="icon xiugai" />
              </a-button>
              <a-button
                type="danger"
                shape="circle"
                style="margin-left:10px;"
                :disabled="disabled"
                @click="TreeDelete">
                <m-icon
                  type="shanchu"
                  class="icon shanchu" />
              </a-button>
              <span @click="TreeDelete">
              </span>

            </a-col>
          </a-row>
          <tree
            :treeData="ouList"
            :selectedKeys="selectedKeys"
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
            :columns="columns"
            :data="loadData"
            rowKey="key"
            :scroll="{x}"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
            <template
              slot="accountControl"
              slot-scope="text">
              <a-badge
                :number-style="{backgroundColor: toDict(text.DisableCount,'UM_STATE').color}"
                :count="text.DisableCount | convert('UM_STATE')" />
            </template>
            <template
              slot="whenCreated"
              slot-scope="text">
              {{ text | convert('unix','YYYY-MM-DD') }}
            </template>
            <template
              slot="lastLogon"
              slot-scope="text">
              {{ text | convert('unix','YYYY-MM-DD') }}
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
            @ok="handleOk"></tab-add>
          <tab-edit
            ref="TabEdit"
            @ok="handleOk"></tab-edit>
          <tabbatch-add
            ref="BatchTabAdd"
            @ok="handleOk"></tabbatch-add>
          <tab-exportUser ref="ExportUser"></tab-exportUser>
          <tree-add
            ref="TreeAdd"
            @ok="handleOk"></tree-add>
          <tree-edit
            ref="TreeEdit"
            @ok="TreeEditOk"></tree-edit>
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
import { deepGet } from '@/utils/util'
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
    sorter: true,
    width: 120
  },
  {
    title: '组',
    dataIndex: 'group',
    sorter: true,
    width: 120
  },
  {
    title: '姓名',
    dataIndex: 'displayName',
    sorter: true,
    width: 120
  },
  {
    title: '状态',
    dataIndex: 'accountControl',
    scopedSlots: { customRender: 'accountControl' },
    sorter: true,
    width: 120
  },
  {
    title: '电话',
    dataIndex: 'telephoneNumber',
    sorter: true,
    width: 150
  },
  {
    title: '邮箱',
    dataIndex: 'mail',
    sorter: true,
    width: 170
  },
  {
    title: '添加时间',
    dataIndex: 'whenCreated',
    sorter: true,
    scopedSlots: { customRender: 'time' },
    width: 200
  },
  {
    title: '上次登录时间',
    dataIndex: 'lastLogon',
    sorter: true,
    scopedSlots: { customRender: 'time' },
    width: 150
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    fixed: 'right',
    width: 200
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
      OuAllName: [], // 全部OU的名称  避免重名
      selectedRowKeys: [], // Check here to configure the default column
      deleteTabName: [], // 删除用户的数组
      selectedRows: [],
      ouList: [],
      obj: {},
      treeeventObj: {},
      selectedKeys: [], // 单选框默认选中的值
      disabled: false,
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
        const OuList = await usermanageListOU()
        this.ouList = []
        OuList.ou[0].children[0].children = OuList.ou[0].children[0].children.sort(this.sotsArr)
        if (!this.queryParam.name) {
          this.selectedKeys = ['0']
          this.treeeventObj = OuList.ou[0].children[0].children[0]
          console.log(this.treeeventObj)
          this.queryParam.name =
            'ou=' + OuList.ou[0].children[0].children[0].name + ',ou=Users,ou=Citrix,dc=test,dc=com'
        }
        this.Recursion(OuList.ou[0].children[0].children)
        this.loading = false
        let data = this.deepGet(await usermanageListuser(this.queryParam), 'list')
        if (data === undefined) {
          data = []
        }
        return {
          data
        }
      }
    }
  },
  methods: {
    // 选中用户
    onSelectChange (selectedRowKeys, selectedRows) {
      this.deleteTabName = []
      selectedRows.forEach((u) => {
        this.deleteTabName.push(u.username)
      })
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
    },
    // 删除OU
    TreeDelete () {
        console.log(this.treeeventObj)
      if (this.treeeventObj.userCount !== 0) {
        this.$message.info('当前选中的OU下还有子Ou暂不能删除')
        return false
      }
      this.$confirm({
        title: '是否要删除' + this.treeeventObj.title + '组?',
        content: '点击确定即可删除当前组',
        onOk: () => {
          usermanageDelOu(this.queryParam).then((res) => {
            this.$message.success('删除成功')
            this.queryParam = {}
            this.$refs.table.refresh()
          })
        }
      })
    },
    // 切换OU
    changecheckedval (item) {
        console.log(item)
      this.selectedKeys = []
      this.selectedRowKeys = []
      this.treeeventObj = item
      this.disabled = false
      this.selectedKeys.push(item.eventKey)
      this.queryParam = {}
      this.queryParam.name = item.OU + ',ou=Users,ou=Citrix,dc=test,dc=com'
      this.$refs.table.refresh()
    },
    // 回调
    Recursion (Array, data) {
      Array.forEach((item, index) => {
        this.OuAllName.push(item)
        this.obj = {
          key: index.toString(),
          title: item.name,
          name: item.name,
          userCount: item.userCount,
          scopedSlots: {
            title: 'custom',
            icon: 'smile'
          },
          children: [],
          childrenLength: item.userCount,
          ouSort: [],
          OU: 'ou=' + item.name
        }
        if (data) {
          this.obj.key = data.key + '-' + index
          this.obj.OU = 'ou=' + item.name + ',' + data.OU
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
    // 删除用户
    Delete (record) {
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
            this.selectedRowKeys = []
          })
        }
      })
    },
    // 批量删除用户
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
    // 重置密码
    EditPass () {
      if (this.selectedRowKeys.length > 0) {
        this.$refs.EditPass.Edit(this.selectedRows)
      } else {
        this.$message.info('请选选择要重置的用户(可多选)')
      }
    },
    //
    TreeEditOk () {
      this.queryParam = {}
      this.$refs.table.refresh()
    },
    // 排序
    sotsArr (e1, e2) {
      const s1 = deepGet(e1, 'name')
      const s2 = deepGet(e2, 'name')
      if (e1.children.length > 1) {
        e1.children.sort(this.sotsArr)
      }
      if (e2.children.length > 1) {
        e2.children.sort(this.sotsArr)
      }
      if (s1 > s2 || (s1 && !s2)) {
        return 1
      } else if (s1 < s2 || (!s1 && s2)) {
        return -1
      }
    },
    // 添加Users下的OU
    Users () {
        this.selectedKeys = []
        this.disabled = true
                  this.queryParam.name = 'ou=Users,ou=Citrix,dc=test,dc=com'
    }
  }
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
  background: #272e48;
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
  font-size: 16px;
  margin: 0px 10px;
}
.All {
  font-size: 20px;
  margin-left: 10px;
}
.ant-card {
  background: #272e48;
  color: rgb(255, 255, 255);
  cursor: pointer;
  box-shadow: none;
  border: none;
  height: 770px;
}
/deep/.ant-card-head {
  color: white;
  border: none;
}
.ant-pagination {
  float: right;
  margin-right: 20px;
  margin-top: 20px;
  color: white;
}

/deep/.ant-modal-header {
  background: none;
}
/deep/.ant-modal-content {
  background: #272e48;
  color: white;
  font-weight: 500;
}
/deep/.ant-modal-title,
/deep/.ant-modal-close-x {
  color: white;
}
/deep/thead.ant-table-thead {
  background: #19233f;
}
</style>
