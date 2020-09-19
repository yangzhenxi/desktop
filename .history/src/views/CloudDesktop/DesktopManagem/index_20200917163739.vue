<template>
  <page-header-wrapper :title="false">
    <a-spin :spinning="spinning">
      <a-row :gutter="16">
        <a-col :span="6">
          <empty
            v-if="!TPgroupList.length>0"
            :isEmpty="!TPgroupList.length>0" />
          <a-card v-else>
            <a-row class="tree_head">
              <a-col :span="10">
                <a-row style="height:32px;">
                  <a-col
                    :span="8"
                    style="height:100%;">
                    <m-icon
                      type="moban"
                      class="icon  title_icon"
                      style="font-size:18px;" />
                  </a-col>
                  <a-col :span="14">
                    <span
                      class="All"
                      style="font-size:15px;">所有模版组</span>
                  </a-col>
                </a-row>
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
          <div>
            <empty
              v-if="!this.isTPData"
              :isEmpty="!this.isTPData" />
            <div v-else>
              <div v-if="IsAllmodule">
                <div class="title"> {{ TPname }} </div>
                <a-card style="height:730px;">
                  <a-row :gutter="[36,24]">
                    <a-col
                      :span="8"
                      @click="$refs.ManageAdd.Add(AddData,TPAllList)">
                      <a-row
                        class="icon-modules"
                        style="height:197px;"
                        align="middle"
                        type="flex"
                        justify="center">
                        <div class="add">
                          <a-col>
                            <a-icon type="plus-circle" />
                          </a-col>
                        </div>
                      </a-row>
                    </a-col>
                    <a-col
                      :span="8"
                      v-for=" i in TPData"
                      :key="i.id">
                      <a-row
                        class="modules"
                        :gutter="16">
                        <a-col
                          :span="8"
                          @click="details(i)">
                          <a-row style="margin-top: 35px;">
                            <a-icon
                              class="icon"
                              type="windows" />
                            <div class="icon_title">{{ i.image }}</div>
                          </a-row>
                        </a-col>
                        <a-col
                          :span="16"
                          @click="details(i)">
                          <div
                            class="modules_title"
                            style="margin:5px 0px">{{ i.name }}</div>
                          <div class="text">
                            <span>所属分组: </span>
                            <span> {{ i.groupName }}</span>
                          </div>
                          <div class="text">
                            <span>所在服务器: </span>
                            <span> {{ i.host }}</span>
                          </div>
                          <div class="text">
                            <span>创建时间: </span>
                            <span>{{ i.createTime }}</span>
                          </div>
                          <div class="text">
                            <span>版本状态: </span>
                            <span>{{ i.version }}</span>
                          </div>
                          <div class="text">
                            <span>运行状态: </span>
                            <span>{{ i.isRunning }}</span>
                          </div>
                          <div class="text">
                            <span>IP: </span>
                            <span>{{ i.ip }}</span>
                          </div>
                        </a-col>
                        <div class="hover">
                          <a-icon
                            type="form"
                            @click="details(i)"
                            class="details" />
                          <a-icon
                            type="delete"
                            @click="Delete(i)"
                            class="delete" />
                        </div>
                      </a-row>
                    </a-col>
                  </a-row>
                  <a-pagination
                    :total="TPData.length+1"
                    :show-total="total => `共 ${TPData.length} 条数据`"
                    :page-size="6"
                    :default-current="1" />
                </a-card>
              </div>
              <singlemodules
                ref="Single"
                @ok="Single"></singlemodules>
            </div>
          </div>
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
        @ok="ManageAdd()"></x-manageadd>
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
import Singlemodules from './Tab_modules/singlemodules'
import { mixinTable } from '@/utils/mixin'
import {
  DesktopTemplateGroupList,
  DesktopTemplateGroupDelete,
  DesktopTemplateAllList,
  DesktopTemplateImageList,
  DesktopTemplateDataCenterList,
  DesktopTemplateDelete
} from '@/api/CloudDesktop/DesktopManagem'
import { deepGet, convert } from '@/utils/util'
export default {
  mixins: [mixinTable],
  components: {
    Empty,
    MIcon,
    Tree,
    XTreeadd,
    XManageadd,
    XTreeedit,
    XManagerelease,
    Singlemodules
  },
  data () {
    return {
      parent: 'null',
      obj: {},
      TPgroup: {},
      TPgroupList: [], // 模版组列表
      disabled: false,
      TPAllList: [], // 全部模版列表信息
      TPpageList: [], // 分页的数据
      TPData: [], // 单个模版信息
      isTPData: false, // 判断单个模版信息获取成功没有
      selectedKeys: [], // 初始化选中的模版组
      spinning: true,
      IsAllmodule: true, // 是否显示详情页面
      TPname: null, // 模版组名称
      AddData: {
        DataCenterList: [], // 中心数据
        ImageList: [], // 系统镜像
        TPgroupList: [] // 模版组列表
      }
    }
  },
  created () {
    this.getTPgroup()
  },
  methods: {
    // 获取模版组的信息
    async getTPgroup () {
      this.TPgroupList = []
      // 获取数据中心和系统镜像接口
      const [DataCenterList, ImageList, GroupList, TemplateAllList] = (
        await Promise.all(
          [
            DesktopTemplateDataCenterList(),
            DesktopTemplateImageList(),
            DesktopTemplateGroupList(),
            DesktopTemplateAllList()
          ].map((u) => u.catch((e) => e))
        )
      ).map((u) => deepGet(u, 'data', []))
      if (GroupList) {
        this.selectedKeys.push(GroupList.children[0].id)
        this.TPname = GroupList.children[0].name
        this.Recursion(GroupList.children)
        this.AddData.ImageList = ImageList
        this.AddData.DataCenterList = DataCenterList
        this.AddData.TPgroupList = this.TPgroupList
        this.TPAllList = TemplateAllList
        console.log(TemplateAllList)
        this.toRouter(this.selectedKeys[0])
        this.isTPData = true
        this.spinning = false
      }
    },
    // 获取模版组信息的递归
    Recursion (Array, data) {
      Array.forEach((item, index) => {
        this.obj = {
          key: item.id,
          title: item.name,
          value: item.id,
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
      this.TPname = item.title
      this.disabled = false
      if (item.title === '默认分组') {
        this.disabled = true
      }
      this.toRouter(item.key)
    },
    // 跳转详细页面
    toRouter (key) {
      this.TPData = []
      this.IsAllmodule = true
      if (this.$refs.Single) {
        this.$refs.Single.OffSingle()
      }
      this.TPAllList.forEach((u) => {
        if (u.groupId === key) {
          u.createTime = convert(u.createTime, 'unix', 'YYYY-MM-DD')
          //   u.version = 'V' + (parseInt(u.version) + 1)
          if (u.isRunning) {
            u.isRunning = '正在运行'
          } else {
            u.isRunning = '已关机'
          }
          this.TPData.push(u)
        }
      })
    },
    // 删除模版组
    TreeDelete () {
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
          DesktopTemplateGroupDelete(obj).then((res) => {
            this.$message.success('删除成功')
            this.getTPgroup()
          })
        }
      })
    },
    // 详情
    details (i) {
      this.IsAllmodule = false
      this.$refs.Single.OnSingle(i)
    },
    // 模版删除
    Delete (i) {
      const obj = {
        name: i.name
      }
      this.$confirm({
        title: '删除后将无法恢复，确定删除么',
        onOk: async () => {
          return new Promise((resolve, reject) => {
            DesktopTemplateDelete(obj).then((res) => {
              this.$message.success('删除成功')
                this.spinning = true
                this.isTPData = false
              this.getTPgroup()
              resolve()
            })
          })
        }
      })
    },
    // 显示详细模版信息
    Single () {
      this.spinning = true
      this.isTPData = false
      this.IsAllmodule = true
      this.getTPgroup()
    },
      // 添加模版
  ManageAdd () {
    this.spinning = true
    this.isTPData = false
    this.getTPgroup()
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
.title_icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 20px;
}
/deep/.ant-card {
  background: #272e48;
  color: rgb(255, 255, 255);
  cursor: pointer;
  box-shadow: none;
  border: none;
  height: 795px;
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

.ant-pagination {
  float: right;
  margin-right: 20px;
  margin-top: 20px;
  color: white;
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
.modules_title {
  font-size: 17px;
  font-weight: 500;
}
.icon-modules {
  border: 1px solid #ccc;
  border-radius: 10px;
  .add {
    font-size: 100px;
  }
}
.modules {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px;
  .icon {
    font-size: 80px;
  }
  .icon_title {
    font-size: 15px;
    color: bisque;
  }
  .text {
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hover {
    position: absolute;
    right: 0px;
    font-size: 20px;
    display: none;
    i {
      padding-right: 20px;
    }
    .delete {
      color: red;
    }
    .details {
      color: #16bedd;
    }
  }
}
.modules:hover > .hover {
  display: block;
}
</style>
