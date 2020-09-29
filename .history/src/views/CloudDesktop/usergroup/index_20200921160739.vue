<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card style="height:795px;">
          <div class="tree-header">
            <a-row
              :gutter="16"
              type="flex"
              justify="center"
              align="middle">
              <a-col :span="10">
                <m-icon
                  type="guanyuwomen"
                  style="margin-right:10px;"
                  class="icon guanyuwomen" />
                <span>全部</span>
              </a-col>
              <a-col :span="14">
                <a-button
                  type="primary"
                  shape="circle"
                  @click="$refs.TreeAdd.Add(treedata)">
                  <a-icon
                    class="icon"
                    type="diff"></a-icon>
                </a-button>
                <a-button
                  type="primary"
                  shape="circle"
                  style="margin-left:10px;"
                  @click="handleTreeEdit()">
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
            @changeval="changeval"></tree>
        </a-card>
      </a-col>
      <a-col :span="18">
        <div class="title">
          <a-button
            type="primary"
            @click="$refs.TableAdd.Add(record,checkedObj,Allusers)">批量设置用户</a-button> </div>
        <a-card style="margin-top:20px;height:722px;">
          <m-table
            :scroll="{x}"
            ref="table"
            :columns="columns"
            :data="loadData">
            <template slot-scope="text" slot="status">
              <a-badge :number-style="{backgroundColor: toDict(text.DisableCount,'U_STATE').color}" :count="text.DisableCount | convert('U_STATE')" />
            </template>
            <template
              slot="whenCreated"
              slot-scope="text">
              {{ text | convert('unix','YYYY-HH-DD') }}
            </template>
            <template
              slot="lastLogon"
              slot-scope="text">
              {{ text | convert('unix','YYYY-HH-DD') }}
            </template>
            <template
              slot="action"
              slot-scope="text,record">
              <a-button type="primary" @click="Delect(record)">移除用户</a-button>
            </template>
          </m-table>
        </a-card>
      </a-col>
    </a-row>
    <tree-add ref="TreeAdd" @ok="$refs.table.refresh()"></tree-add>
    <tree-edit ref="TreeEdit" @ok="ok"></tree-edit>
    <table-add ref="TableAdd" @ok="$refs.table.refresh()"></table-add>
  </page-header-wrapper>
</template>

<script>
import Tree from './TreeModules/tree'
import MIcon from '@/components/Icon'

import MTable from '@/components/Table/MTable'
import { mixinTable } from '@/utils/mixin'
import TreeAdd from './TreeModules/Add'
import TableAdd from './TableModules/TableAdd'
import TreeEdit from './TreeModules/Edit'
import { usermanageListusergroup, userDelUserGroup, userSetUserGroup } from '@/api/CloudDesktop/usergroup'
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    sorter: true,
    width: 120

  },
  {
    title: '组织单位',
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
    scopedSlots: { customRender: 'status' },
    width: 120

  },
  {
    title: '电话',
    dataIndex: 'telephoneNumber',
    sorter: true,
    width: 120

  },
  {
    title: '邮箱',
    dataIndex: 'mail',
    sorter: true,
    width: 180

  },
  {
    title: '添加时间',
    dataIndex: 'whenCreated',
    scopedSlots: { customRender: 'whenCreated' },
    sorter: true,
    width: 200,
    fixed: 'right'

  },
  {
    title: '上次登录时间',
    dataIndex: 'lastLogon',
    sorter: true,
    scopedSlots: { customRender: 'lastLogon' },
    width: 200,
    fixed: 'right'
  },
  {
    title: '操作',
    sorter: true,
    scopedSlots: { customRender: 'action' },
    width: 120,
    fixed: 'right'
  }
]
export default {
  mixins: [mixinTable],
  components: {
    Tree,
    MTable,
    TreeAdd,
    TreeEdit,
    TableAdd,
    MIcon
  },
  data () {
    return {
      treedata: [],
      checkedval: '',
      checkedObj: {},
      columns,
      baseDN: [],
      record: [],
      Allusers: [],
      loadData: async (parameter) => {
        try {
            const res = await usermanageListusergroup()
            res.group.forEach((u) => {
                this.baseDN.push(u.baseDN)
            })
            if (!this.checkedval) {
                this.checkedval = this.deepGet(res, ['group', 0, 'name'])
            }
            this.treedata = res.group
            res.group.forEach(u => {
                this.Allusers.push(...u.users)
            })
            this.record = res.group.find(u => u.name === this.checkedval).users
            const data = this.record
            this.checkedObj = res.group.find(u => u.name === this.checkedval)
          return {
            data: data
          }
        } catch (error) {
          return false
        }
      }
    }
  },
  methods: {
    // 切换用户组
    changeval (checkval) {
        this.checkedval = checkval.name
        this.$refs.table.refresh()
    },
    // 删除用户组
    DeleteTree () {
        if (this.checkedObj !== '') {
            this.$confirm({
                title: '是否删除' + this.checkedObj.name,
                content: '点击确定即可删除组',
                onOk: () => {
                    const obj = {
                        baseDN: this.checkedObj.baseDN
                    }
                    userDelUserGroup(obj).then(res => {
                        this.$message.success('删除成功')
                        this.checkedval = false
                        this.$refs.table.refresh()
                    })
                }
            })
        } else {
            this.$message.info('请先选择对应的用户组')
        }
    },
    // 修改用户组
    handleTreeEdit () {
        if (this.checkedObj !== '') {
            this.$refs.TreeEdit.Edit(this.checkedObj, this.treedata)
        } else {
            this.$message.info('请先选择对应的用户组')
        }
    },
    // 编辑后的事件
    ok (res) {
        this.checkedval = false
        this.$refs.table.refresh()
    },
    Delect (item) {
        console.log(item)
        this.$confirm({
            title: '是否移除' + item.username + '用户',
            content: '点击确定即可移除用户',
                onOk: () => {
                        const data = {
                            req: {
                                user: item.baseDN,
                                baseDN: item.username,
                                operator: 'delete'
                            }
                        }
                    userSetUserGroup(data).then(res => {
                        this.$message.success('移除成功')
                        this.checkedval = false
                        this.$refs.table.refresh()
                    })
                }
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
/deep/thead.ant-table-thead {
    background: #19233f;
}
.title {
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 20px;
  // border: 2px solid red;
  background: #272e48;
  padding: 10px;
  padding-left: 20px;
  border-radius: 10px;
  color: #bcd0f7;
}
</style>
