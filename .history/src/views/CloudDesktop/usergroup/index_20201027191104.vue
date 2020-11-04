<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16" class="row">
      <a-col :span="6">
        <a-card >
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
              <a-col
                :span="14"
                class="flex_end">
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
        <a-card style="height:100%;">
          <div class="head">
            <div class="btns">
              <a-button
                type="primary"
                @click="$refs.TableAdd.Add(record,checkedObj,Allusers)">批量设置用户</a-button>
            </div>
            <div class="Serch">
              <div class="global-search-wrapper" style="width: 300px">
                <a-auto-complete
                  class="global-search"
                  :data-source="dataSource"
                  style="width: 100%"
                  placeholder="输入要查询的用户名"
                  v-model="queryParam.username"
                  @select="onSelect"
                  @search="handleSearch">
                  <a-input>
                    <a-button
                      @click="onSelect(queryParam.username)"
                      slot="suffix"
                      style="margin-right: -12px"
                      class="search-btn"
                      type="primary">
                      <a-icon type="search" />
                    </a-button>
                  </a-input>
                </a-auto-complete>
              </div>
              <div
                class="set"
                @click="$refs.columns.Add(columns)">
                <a-icon type="setting"></a-icon>
              </div>
            </div>
          </div>
          <m-table
            :scroll="{x}"
            rowKey="username"
            ref="table"
            :columns="columns"
            :data="loadData">
            <template
              slot-scope="text"
              slot="status">
              <a-badge
                :number-style="{backgroundColor: toDict(text.disable_count,'U_STATE').color}"
                :count="text.disable_count | convert('U_STATE')" />
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
              slot-scope="text,item">
              <a-button
                type="danger"
                size="small"
                @click="Delect(item)">移除用户</a-button>
            </template>
          </m-table>
        </a-card>
      </a-col>
    </a-row>
    <tree-add
      ref="TreeAdd"
      @ok="$refs.table.refresh()"></tree-add>
    <tree-edit
      ref="TreeEdit"
      @ok="ok"></tree-edit>
    <table-add
      ref="TableAdd"
      @ok="$refs.table.refresh()"></table-add>
    <columns
      ref="columns"
      @ok="customizeColumns"></columns>
  </page-header-wrapper>
</template>

<script>
import storage from 'store'
import Tree from './TreeModules/tree'
import MIcon from '@/components/Icon'
import Columns from './TableModules/Columns'
import MTable from '@/components/Table/MTable'
import { mixinTable } from '@/utils/mixin'
import TreeAdd from './TreeModules/Add'
import TableAdd from './TableModules/TableAdd'
import TreeEdit from './TreeModules/Edit'
import { CUSTOMIZE_COLUMNS } from '@/store/mutation-types'
import {
    usermanageListusergroup,
    userDelUserGroup,
    userSetUserGroup
} from '@/api/CloudDesktop/usergroup'

export default {
    mixins: [mixinTable],
    components: {
        Tree,
        MTable,
        TreeAdd,
        TreeEdit,
        TableAdd,
        MIcon,
        Columns
    },
    data () {
        return {
            treedata: [],
            checkedval: '',
            checkedObj: {},
            columns: [
                {
                    title: '用户名',
                    dataIndex: 'username',
                    sorter: true,
                    width: 120,
                    fixed: 'left'
                },
                {
                    title: '组织单位',
                    dataIndex: 'group',
                    sorter: true,
                    width: 120
                },
                {
                    title: '姓名',
                    dataIndex: 'display_name',
                    sorter: true,
                    width: 120
                },
                {
                    title: '状态',
                    dataIndex: 'account_control',
                    scopedSlots: { customRender: 'status' },
                    width: 120
                },
                {
                    title: '电话',
                    dataIndex: 'telephone_number',
                    sorter: true,
                    width: 140
                },
                {
                    title: '操作',
                    sorter: true,
                    scopedSlots: { customRender: 'action' },
                    width: 120,
                    fixed: 'right'
                }
            ],
            baseDN: [],
            record: [],
            Allusers: [],
            dataSource: [],
            TAbleData: [],
            loadData: async parameter => {
                try {
                    this.TAbleData = []
                    const res = await usermanageListusergroup()
                    res.group.forEach(u => {
                        this.baseDN.push(u.baseDN)
                    })
                    if (!this.checkedval) {
                        this.checkedval = this.deepGet(res, [
                            'group',
                            0,
                            'name'
                        ])
                    }
                    this.treedata = res.group
                    res.group.forEach(u => {
                        this.Allusers.push(...u.users)
                    })
                    this.record = res.group.find(
                        u => u.name === this.checkedval
                    ).users
                    const data = this.record
                    this.checkedObj = res.group.find(
                        u => u.name === this.checkedval
                    )
                    data.forEach(u => {
                        this.TAbleData.push(u.username)
                    })
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
    mounted () {
        console.log(this.columns)
        console.log(this.storage.get(CUSTOMIZE_COLUMNS))
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
                if (this.checkedObj.users.length === 0) {
                    this.$confirm({
                        title: '是否删除' + this.checkedObj.name,
                        content: '点击确定即可删除组',
                        onOk: () => {
                            userDelUserGroup({ baseDN: this.checkedObj.baseDN }).then(res => {
                                this.$message.success('删除成功')
                                this.checkedval = false
                                this.$refs.table.refresh()
                            })
                        }
                    })
                } else {
                    this.$message.info('该组下还有用户还没删除')
                }
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
            console.log(res)
            this.checkedval = res
            this.$refs.table.refresh()
        },
        Delect (item) {
            this.$confirm({
                title: '是否移除' + item.username + '用户',
                content: '点击确定即可移除用户',
                onOk: () => {
                    const data = {
                        user: item.baseDN,
                        baseDN:
                            'CN=' +
                            this.checkedval +
                            ',ou=Group,ou=Citrix,dc=cloud,dc=com',
                        operator: 'delete'
                    }
                    userSetUserGroup(data).then(res => {
                        this.$message.success('移除成功')
                        this.$refs.table.refresh()
                    })
                }
            })
        },
         onSelect (value) {
            value ? this.queryParam.username = value : this.queryParam.username = ''
            this.$refs.table.refresh()
        },

        handleSearch (value) {
            this.dataSource = []
            let res = []
            this.TAbleData.forEach(u => {
                for (let o = 0; o <= u.toString().length; o++) {
                    if (u.substring(o, (value.length) + o) === value) {
                        res.push(u)
                    }
                }
            })
            res = [...new Set(res)]
            this.TAbleData.includes(value) ? this.dataSource = [value, ...res] : this.dataSource = res
        },
        customizeColumns (value) {
            this.columns = value
            this.$refs.table.refresh()
        }
    }
}
</script>

<style lang="less" scoped>
.ant-card {
    background: #272e48;
    color: rgb(255, 255, 255);
    cursor: pointer;
    box-shadow: none;
    border: none;
    min-height: 770px;
    height: 100%;
}
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
.head {
    display: flex;
    justify-content: space-between;
    background: #272e48;
    border-radius: 10px;
    margin-bottom: 20px;
    padding-left: 20px;
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
.Serch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 15px;
    .set {
        background: #1890ff;
        border-radius: 5px;
        color: white;
        margin-left: 10px;
        cursor: pointer;
        i {
            padding: 8px;
            font-size: 15px !important;
        }
    }
}
</style>
