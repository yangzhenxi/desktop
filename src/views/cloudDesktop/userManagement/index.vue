<template>
  <page-header-wrapper>
    <a-row :gutter="16">
      <a-col
        ref="left"
        :xl="6"
        :md="24"
        :sm="24">
        <a-card
          style="height:790px;"
          :loading="loading">
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
              <span @click="$refs.TreeAdd.add()">
                <m-icon
                  type="yonghutianjia"
                  class="icon yonghutianjia" />
              </span>

              <span @click="$refs.TreeEdit.Edit()">
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
          <!-- <a-empty
            v-if="!allBranchListGetter[0]"
            style="margin-top:100px;" /> -->
          <tree
            :treeData="ouList"
            :checkedval="checkedval"
            @changecheckedval="changecheckedval"></tree>
        </a-card>
      </a-col>

      <a-col
        ref="right"
        :xl="18"
        :md="24"
        :sm="24">
        <a-card>
          <div class="head">
            <div class="btns">
              <a-button
                @click="$refs.TabAdd.add()"
                type="primary">
                新增
              </a-button>
              <a-button
                @click="$refs.BatchTabAdd.BatchAdd()"
                type="primary"
                style="margin-left:10px">
                批量新增
              </a-button>
              <a-button
                type="primary"
                style="margin-left:10px"
                @click="$refs.EditPass.Edit()">
                重置密码
              </a-button>
              <a-button
                type="danger"
                style="margin-left:10px">
                删除
              </a-button>
              <a-button
                type="danger"
                style="margin-left:10px">
                批量删除
              </a-button>
            </div>
          </div>
          <m-table
            ref="table"
            :columns="columns"
            :data="loadData"
            :scroll="{ x: 800 }"
            rowKey="key"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
            <template slot="action">
              <a-button size="small">修改</a-button>
            </template>
          </m-table>
          <tab-add
            ref="TabAdd"
            @ok="handleOk"></tab-add>
          <tabbatch-add
            ref="BatchTabAdd"
            @ok="handleOk"></tabbatch-add>
          <tree-add
            ref="TreeAdd"
            @ok="handleOk"></tree-add>
          <tree-edit
            ref="TreeEdit"
            @ok="handleOk"></tree-edit>
          <tree-set
            ref="TreeSet"
            @ok="handleOk"></tree-set>
          <edit-pass
            ref="EditPass"
            @ok="handleOk"></edit-pass>
          <setcolumns
            ref="SetColumns"
            :data="columns"
            @ok="handleOk"></setcolumns>
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { MTable, MIcon } from '@/components'
import TabAdd from './Tab_modules/Add'
import TabbatchAdd from './Tab_modules/batchAdd'
import TreeAdd from './Tree_modules/TreeAdd'
import TreeSet from './Tree_modules/TreeSet'
import Tree from './Tree_modules/tree'
import TreeEdit from './Tree_modules/TreeEdit'
import EditPass from './Tab_modules/EditPass'
import Setcolumns from './Tab_modules/Setcolumns'
import { Empty } from '@/components/Empty'
import { mixinTable } from '@/utils/mixin'
import { usermanageListOU, usermanageListuser } from '@/api/CloudDesktop/userManage'

const columns = [
  {
    title: '名称',
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
    title: '添加时间',
    dataIndex: 'whenCreated',
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
    Tree,
    TreeAdd,
    TreeEdit,
    TreeSet,
    EditPass,
    Setcolumns,
    MIcon,
    Empty
  },
  data () {
    return {
      columns,
      loading: true,
      checkedval: '0', // 单选框默认选中的值
      queryParam: {},
      sechar: [], // 找father
      selectedRowKeys: [], // Check here to configure the default column
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
        if (this.checkedval === '0') {
          const OuList = await usermanageListOU()
          this.queryParam.name = 'ou=' + OuList.ou[0].children[0].name + ',ou=Citrix,dc=test,dc=com'
        }
        const data = this.deepGet(await usermanageListuser(this.queryParam), 'list')
        return {
          data
        }
      },
      ouList: [],
      obj: {}
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
    changecheckedval (item) {
      this.sechar = []
      this.checkedval = item.eventKey
      // 判断当前是不是在子分支下
      if (item.eventKey.search('-') !== -1) {
        const key = item.eventKey.split('-', 1)
        this.ouList.forEach((u) => {
          if (u.key === key[0]) {
            this.sechar.push(u.title)
            this.eventKeyRecursion(u, item)
          }
        })
        this.queryParam.name = ''
        this.sechar.reverse()
        this.sechar.forEach((u) => {
          this.queryParam.name = this.queryParam.name + 'ou=' + u + ','
        })
        this.queryParam.name = this.queryParam.name + 'ou=Citrix,dc=test,dc=com'
        this.$refs.table.refresh()
        return true
      }
      this.queryParam.name = 'ou=' + item.title + ',ou=Citrix,dc=test,dc=com'
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
          childrenLength: item.children.length
        }
        if (data) {
          this.obj.key = data.key + '-' + index
          data.children.push(this.obj)
        } else {
          this.ouList.push(this.obj)
        }
        if (item.children.length > 0) {
          // 执行递归
          this.Recursion(item.children, this.obj)
        }
      })
    },
    eventKeyRecursion (Array, item) {
      Array.children.forEach((name) => {
          console.log(item)
          console.log(name.key)
        this.sechar.push(name.title)
        if (name.key === item.eventKey) {
              return false
          }
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
  margin-bottom: 20px;
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

@media screen and (min-width: 1200px) and (max-width: 1470px) {
  .All {
    display: none;
  }
}
</style>
