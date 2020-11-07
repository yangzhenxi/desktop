<template>
  <page-header-wrapper :title="false">
    <a-spin :spinning="loading">
      <a-row :gutter="16" class="row">
        <a-col :span="6">
          <a-card>
            <div class="tree_head">
              <div class="tree_head_left" @click="Users">
                <a-icon
                  class="icon"
                  type="user" />
                <span>组织单位</span>
              </div>
              <div class="tree_head_right">
                <a-button
                  type="primary"
                  shape="circle"
                  @click="$refs.TreeAdd.add(record,OuAllName)">
                  <m-icon
                    type="yonghutianjia"
                    class="yonghutianjia" />
                </a-button>
                <a-button
                  type="primary"
                  shape="circle"
                  style="margin-left:10px;"
                  :disabled="disabled"
                  @click="$refs.TreeEdit.Edit(record,OuAllName)">
                  <m-icon
                    type="xiugai"
                    class="xiugai" />
                </a-button>
                <a-button
                  type="danger"
                  shape="circle"
                  style="margin-left:10px;"
                  :disabled="disabled"
                  @click="TreeDelete">
                  <m-icon
                    type="shanchu"
                    class="shanchu" />
                </a-button>
              </div>
            </div>
            <tree
              :treeData="ouList"
              :selectedKeys="selectedKeys"
              @changecheckedval="changecheckedval"></tree>
          </a-card>
        </a-col>
        <a-col
          ref="right"
          :span="18">
          <a-card>
            <div class="head">
              <div class="btns">
                <a-button
                  @click="$refs.TabAdd.add(record)"
                  type="primary">
                  新增
                </a-button>
                <a-button
                  type="primary"
                  style="margin-left:10px"
                  @click="EditPass(selectedRows)">
                  修改密码
                </a-button>
                <a-button
                  @click="$refs.BatchTabAdd.BatchAdd(record)"
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
              ref="table"
              :columns="columns"
              :data="loadData"
              rowKey="username"
              :scroll="{x}"
              :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
              <template
                slot="accountControl"
                slot-scope="text">
                <a-badge
                  :number-style="{backgroundColor: toDict(text.disable_count,'UM_STATE').color}"
                  :count="text.disable_count | convert('UM_STATE')" />
              </template>
              <template
                slot="action"
                slot-scope="text,item">
                <a-button
                  size="small"
                  type="primary"
                  @click="$refs.TabEdit.Edit(item,ouList)">修改</a-button>
                <a-button
                  size="small"
                  @click="Delete(item)"
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
              @loading="load"
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
            <cloumns
              ref="columns"
              @ok="customizeColumns"></cloumns>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
  </page-header-wrapper>
</template>

<script>
import Tree from '../components/Tree.vue'
import storage from 'store'
import { MTable, MIcon } from '@/components'
import Empty from '@/components/Empty'
import TabAdd from './Tab_modules/Add'
import TabbatchAdd from './Tab_modules/batchAdd'
import TabEdit from './Tab_modules/Edit'
import TabExportUser from './Tab_modules/ ExportUser'
import { deepGet } from '@/utils/util'
import TreeAdd from './Tree_modules/TreeAdd'
import TreeEdit from './Tree_modules/TreeEdit'
import EditPass from './Tab_modules/EditPass'
import Cloumns from './Tab_modules/Cloumns'
import { mixinTable } from '@/utils/mixin'
import { CUSTOMIZE_COLUMNS } from '@/store/mutation-types'
import {
    usermanageListOU,
    usermanageListuser,
    usermanageBatchDelUser,
    usermanageDeluser,
    usermanageDelOu
} from '@/api/CloudDesktop/userManage'

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
        MIcon,
        TabEdit,
        Empty,
        Cloumns
    },
    data () {
        return {
            loading: false,
            record: {}, // 当前选中的组
            OuAllName: [], // 全部OU的名称  避免重名
            selectedRowKeys: [], // Check here to configure the default column
            deleteTabName: [], // 删除用户的数组
            selectedRows: [],
            ouList: [],
            obj: {},
            selectedKeys: [], // 单选框默认选中的值
            disabled: false,
            dataSource: [],
            TAbleData: [],
            columns: [
                {
                    title: '用户名',
                    dataIndex: 'username',
                    sorter: true,
                    width: 150,
                    fixed: 'left',
                     ellipsis: true

                },
                {
                    title: '组',
                    dataIndex: 'group',
                    sorter: true,
                    width: 120
                },
                {
                    title: '姓名',
                    dataIndex: 'display_name',
                    sorter: true,
                    width: 120,
                     ellipsis: true
                },
                {
                    title: '状态',
                    dataIndex: 'account_control',
                    scopedSlots: { customRender: 'accountControl' },
                    sorter: true,
                    width: 100
                },
                {
                    title: '电话',
                    dataIndex: 'telephone_number',
                    sorter: true,
                    width: 150
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' },
                    fixed: 'right',
                    width: 200
                }
            ],
            // 加载数据方法 必须为 Promise 对象
            loadData: async parameter => {
                try {
                    const OuList = await usermanageListOU()
                    this.ouList = []
                    this.TAbleData = []
                    OuList.ou[0].children[0].children = OuList.ou[0].children[0].children.sort(
                        this.sotsArr
                    )
                    if (!this.record.dn) {
                        this.selectedKeys = ['0']
                        this.record = OuList.ou[0].children[0].children[0]
                    }
                    this.OuAllName = []
                    this.Recursion(OuList.ou[0].children[0].children)
                    const data = this.deepGet(await usermanageListuser({ name: this.record.dn }), 'list', [])
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
        const columns = storage.get(CUSTOMIZE_COLUMNS)
        if (columns && columns.userManage) {
            this.columns = storage.get(CUSTOMIZE_COLUMNS).userManage
        }
    },

    methods: {
        // 选中用户
        onSelectChange (selectedRowKeys, selectedRows) {
            this.deleteTabName = []
            selectedRows.forEach(u => {
                this.deleteTabName.push(u.username)
            })
            this.selectedRows = selectedRows
            this.selectedRowKeys = selectedRowKeys
        },
        // 删除OU
        TreeDelete () {
            if (this.record.children.length > 0) {
                this.$message.info('当前选中的OU下还有子Ou暂不能删除')
                return false
            }
            if (this.record.user_count > 0) {
                this.$message.info('当前选中的OU下还有用户暂不能删除')
                return false
            }
            this.$confirm({
                title: '是否要删除' + this.record.name + '组?',
                okType: 'danger',
                content: '点击确定即可删除当前组',
                onOk: () => {
                    usermanageDelOu({ name: this.record.dn }).then(res => {
                        this.$message.success('删除成功')
                        this.record = []
                        this.$refs.table.refresh()
                    })
                }
            })
        },
        // 切换OU
        changecheckedval (item) {
            this.selectedKeys = []
            this.selectedRowKeys = []
            this.record = item
            this.disabled = false
            this.selectedKeys.push(item.eventKey)
            this.$refs.table.refresh()
        },
        // 递归
        Recursion (Array, data) {
            Array.forEach((item, index) => {
                this.OuAllName.push(item)
                this.obj = {
                    key: index.toString(),
                    title: item.name,
                    name: item.name,
                    user_count: item.user_count,
                    childrenLength: item.user_count,
                    scopedSlots: {
                        title: 'custom',
                        icon: 'smile'
                    },
                    children: [],
                    dn: item.dn,
                    ouSort: []
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
                baseDN: this.record.dn,
                username: record.username
            }
            this.$confirm({
                title: '是否要删除' + record.username,
                content: '点击确定即可删除',
                okType: 'danger',
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        usermanageDeluser(deleteData).then(res => {
                            this.$message.success('删除成功！')
                            this.$refs.table.refresh()
                            this.selectedRowKeys = []
                            resolve()
                        }).catch(() => {
                            this.$message.error('删除失败')
                            this.$refs.table.refresh()
                            this.selectedRowKeys = []
                            resolve()
                        })
                    })
                }
            })
        },
        // 批量删除用户
        BatchDelUser () {
            const BatchDel = {}
            BatchDel.users = this.deleteTabName.map(u => {
                const deleteData = {
                    baseDN: this.record.dn,
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
                        usermanageBatchDelUser(BatchDel).then(res => {
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
            this.record = {}
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
            this.record.dn = 'ou=Users,ou=Citrix,dc=cloud,dc=com'
        },

        onSelect (value) {
            value ? this.queryParam.username = value : this.queryParam.username = ''
            this.$refs.table.refresh()
        },
        // 开关加载
        load (val) {
            this.loading = val
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
            this.TAbleData.includes(value) ? this.dataSource = [value] : this.dataSource = [...res]
        },
        customizeColumns (value) {
            this.columns = value
            this.$refs.table.refresh()
        }
    }
}
</script>

<style lang="less" scoped>
.tree_head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tree_head_left{
        cursor: pointer;
        font-size: 20px;
        i{
            font-size: 23px;
            margin-right: 10px;
        }
    }
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
.icon {
    cursor: pointer;
    font-size: 18px;
    margin: 0px 10px;
}

.ant-card {
    background: #272e48;
    color: rgb(255, 255, 255);
    box-shadow: none;
    border: none;
    min-height: 770px;
    height: 100%;
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
