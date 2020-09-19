<template>
  <page-header-wrapper :title="false">
    <a-spin>
      <a-row :gutter="16">
        <a-col :span="6">
          <a-card>
            <a-row class="tree_head">
              <a-col :span="10">
                <m-icon
                  type="moban"
                  class="icon"
                  style="font-size:18px;" />
                <span
                  class="All"
                  style="font-size:15px;">所有模版组</span>
              </a-col>
              <a-col :span="14">
                <a-button
                  :disabled="disabled"
                  type="primary"
                  shape="circle"
                  @click="$refs.Add.Add(TPgroup.key)">
                  <m-icon
                    type="yonghutianjia"
                    class="icon" />
                </a-button>
                <a-button
                  :disabled="disabled"
                  type="primary"
                  shape="circle"
                  style="margin-left:10px"
                  @click="$refs.Edit.Edit(TPgroup)">
                  <m-icon
                    type="xiugai"
                    class="icon" />
                </a-button>
                <a-button
                  :disabled="disabled"
                  style="margin-left:10px"
                  type="danger"
                  shape="circle"
                  @click="TreeDelete">
                  <m-icon
                    type="shanchu"
                    class="icon" />
                </a-button>
              </a-col>
            </a-row>
            <tree
              :treeData="TPgroupList"
              :selectedKeys="selectedKeys"
              @changecheckedval="changecheckedLeftval"></tree>
          </a-card>
        </a-col>
        <a-col :span="18">
          <router-view />
        </a-col>
      </a-row>
      <x-treeadd
        ref="Add"
        @ok="getTPgroup"></x-treeadd>
      <x-treeedit
        ref="Edit"
        @ok="getTPgroup"></x-treeedit>
      <x-manageadd
        ref="ManageAdd"
        @ok="handleOk"></x-manageadd>
      <x-managerelease
        ref="ManageRelease"
        @ok="handleOk"></x-managerelease>
    </a-spin>
  </page-header-wrapper>
</template>

<script>
import MIcon from '@/components/Icon'
import Empty from '@/components/Empty'

import Tree from './Tree_modules/tree'
import XTreeadd from './Tree_modules/Add'
import XTreeedit from './Tree_modules/Edit'
import XManageadd from './Tab_modules/manageAdd'
import XManagerelease from './Tab_modules/release'
import { mixinTable } from '@/utils/mixin'
import {
  DesktopTemplateGroupList,
  DesktopTemplateDelete,
  DesktopTemplateAllList
} from '@/api/CloudDesktop/DesktopManagem'
export default {
  mixins: [mixinTable],
  components: {
      Empty,
    MIcon,
    Tree,
    XTreeadd,
    XManageadd,
    XTreeedit,
    XManagerelease
  },
  data () {
    return {
      parent: 'null',
      obj: {},
      TPgroup: {},
      TPgroupList: [],
      disabled: false,
      TPAllList: [], // 全部模版列表信息
      TPData: [], // 单个模版信息
      selectedKeys: [] // 初始化选中的模版组
    }
  },
  created () {
    this.getTPgroup()
  },
  methods: {
    // 获取模版列表信息
    async getTPAllList () {
      await DesktopTemplateAllList().then((res) => {
        this.TPAllList = res.data
        console.log(1)
      })
    },
    // 获取模版组的信息
    async getTPgroup () {
      this.TPgroupList = []
      const res = await DesktopTemplateGroupList()
      await DesktopTemplateAllList().then((res) => {
        this.TPAllList = res.data
        console.log(1)
      })
    //   this.getTPAllList()
      console.log(2)
      if (res.data) {
        this.selectedKeys.push(res.data.children[0].id)
        this.toRouter(this.selectedKeys[0])
      }
      this.Recursion(res.data.children)
    },
    // 获取模版组信息的递归
    Recursion (Array, data) {
      Array.forEach((item, index) => {
        this.obj = {
          key: item.id,
          title: item.name,
          parent: item.parent,
          scopedSlots: {
            title: 'custom',
            icon: 'smile'
          },
          children: []
        }
        if (data) {
          data.children.push(this.obj)
        } else {
          this.TPgroupList.push(this.obj)
        }
        if (item.children.length > 0) {
          // 执行递归
          this.Recursion(item.children, this.obj)
        }
      })
    },
    // 用户点击模版组切换
    changecheckedLeftval (item) {
      this.TPData = []
      this.selectedKeys = []
      this.selectedKeys.push(item.key)
      this.TPgroup = item
      this.disabled = false
      if (item.title === '默认分组') {
        this.disabled = true
      }
      this.toRouter(item.key)
    },
    // 跳转路由
    toRouter (key) {
      console.log(this.TPAllList)
      this.TPAllList.forEach((u) => {
        if (u.groupId === key) {
          this.TPData.push(u)
        }
      })
      console.log(this.TPData)
      this.$router.push({
        name: 'Allmodules',
        query: {
          item: this.TPData
        }
      })
    },
    // 删除模版组
    TreeDelete () {
      console.log(this.TPgroup)
      if (this.TPgroup.children.length > 0) {
        this.$message.info('该模版组里还有模版，请先删除')
        return false
      }
      this.$confirm({
        title: '是否要删除当前组?',
        content: '点击确定即可删除当前组',
        onOk: () => {
          const obj = {
            id: this.TPgroup.key
          }
          DesktopTemplateDelete(obj).then((res) => {
            this.$message.success('删除成功')
            this.getTPgroup()
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tree_head {
  margin-bottom: 15px;
}

.icon {
  cursor: pointer;
  //   font-size: 18px;
  margin: 0px 9px;
}
/deep/.ant-card {
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
</style>
