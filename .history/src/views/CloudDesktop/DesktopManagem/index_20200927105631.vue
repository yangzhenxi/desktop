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
                      @click="close"
                      style="font-size:15px;">所有模版组</span>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :span="14">
                <a-button
                  :disabled="disabledAdd"
                  type="primary"
                  shape="circle"
                  @click="$refs.Add.Add(TPgroup.key,TPgroupNameList)">
                  <m-icon
                    type="yonghutianjia"
                    class="icon" />
                </a-button>
                <a-button
                  :disabled="disabledEdit"
                  type="primary"
                  shape="circle"
                  style="margin-left:10px"
                  @click="$refs.Edit.Edit(TPgroup,TPgroupNameList)">
                  <m-icon
                    type="xiugai"
                    class="icon" />
                </a-button>
                <a-button
                  :disabled="disabledDelete"
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
                    <!-- 添加按钮 -->
                    <a-col
                      :span="8"
                      @click="$refs.ManageAdd.Add(AddData,TPAllList)">
                      <a-row
                        class="icon-modules"
                        style="height:170px;"
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

                    <!-- 要创建任务的数据 -->
                    <div v-if="progress">
                      <a-col
                        :span="8"
                        v-for="(i,index) in progress"
                        :key="index">
                        <a-row
                          class="modules progress"
                          type="flex"
                          :gutter="16">
                          <a-col :span="8">
                            <a-row style="margin-top: 35px;">
                              <m-icon
                                class="icon"
                                type="windows" />
                              <div class="icon_title ">{{ i.image }}</div>
                            </a-row>
                          </a-col>
                          <a-col
                            class="blurry"
                            :span="16">
                            <div class="">
                              <div
                                class="modules_title"
                                style="margin:5px 0px">{{ i.name }}</div>
                              <div class="text blurry_text">
                                <span>所属分组: </span>
                                <span> groupName</span>
                              </div>
                              <div class="text blurry_text">
                                <span>服务器: </span>
                                <span>0/20</span>
                              </div>
                              <div class="text blurry_text">
                                <span>创建时间: </span>
                                <span>随机桌面</span>
                              </div>
                              <div class="text blurry_text">
                                <span>版本状态: </span>
                                <span>是</span>
                              </div>
                              <div class="text blurry_text">
                                <span>IP: </span>
                                <span>开启</span>
                              </div>
                            </div>
                            <div class="progress-position">
                              <a-progress
                                type="circle"
                                :percent="i.progressBar"
                                :stroke-color="{
                                  '0%': '#108ee9',
                                  '100%': '#87d068',
                                }">
                                <template #format="percent">
                                  <span class="percent_text">创建中{{ percent }}%</span>
                                </template>
                              </a-progress>
                            </div>
                          </a-col>
                          <div class="hover">
                            <a-icon
                              type="delete"
                              @click="closeTask(i)"
                              class="delete" />
                          </div>
                        </a-row>
                      </a-col>
                    </div>

                    <!-- 完成的数据 -->
                    <a-col
                      :span="8"
                      v-for=" i in TPpageList"
                      :key="i.id">
                      <a-row
                        class="modules"
                        :gutter="16">
                        <a-col
                          :span="8"
                          @click="details(i)">
                          <a-row style="margin-top: 25px;">
                            <m-icon
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
                            <span>服务器: </span>
                            <span> {{ i.host }}</span>
                          </div>
                          <div class="text">
                            <span>创建时间: </span>
                            <span>{{ i.createTime | convert('unix','YYYY-MM-DD') }}</span>
                          </div>
                          <div class="text">
                            <span>版本状态: </span>
                            <a-tag color="#108ee9">
                              {{ i.version | Isversion }}
                            </a-tag>
                          </div>
                          <div class="text">
                            <span>IP: </span>
                            <span>{{ i.ip }}</span>
                          </div>
                        </a-col>
                        <div class="hover">
                          <span @click="details(i)">
                            <m-icon
                              type="chakan"
                              class="chakan" />
                          </span>
                          <span @click="Delete(i)">
                            <m-icon
                              type="shanchu"
                              class="shanchu" />
                          </span>

                        </div>
                      </a-row>
                    </a-col>
                  </a-row>
                  <!-- 分页器 -->
                  <a-pagination
                    :total="TPData.length+1"
                    :show-total="total => `共 ${TPData.length + progress.length} 条数据`"
                    :page-size="9"
                    @change="changePage"
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
  DesktopTemplateDelete,
  DesktopTemplateGetAllTask,
  DesktopTemplateCheckTask,
  DesktopTemplateCloseTask
} from '@/api/CloudDesktop/DesktopManagem'
import { deepGet } from '@/utils/util'
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
      TPgroupNameList: [], // 模版组名称  验证重名
      disabledAdd: false,
      disabledEdit: false,
      disabledDelete: false,
      TPAllList: [], // 全部模版列表信息
      TPpageList: [], // 分页的数据
      TPData: [], // 单个模版信息
      isTPData: false, // 判断单个模版信息获取成功没有
      selectedKeys: [], // 初始化选中的模版组
      spinning: true,
      timer: Function, // 定时器
      IsAllmodule: true, // 是否显示详情页面
      TPname: null, // 模版名称
      AllTask: [], // 全部的任务Task
      Allprogress: [], // 全部的任务数据
      progress: [], // 当前组的任务数据
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
  filters: {
    Isversion (item) {
      if (item === '0') {
        return '未发布'
      } else {
        return 'V' + item
      }
    }
  },
  methods: {
    // 获取模版组的信息
    async getTPgroup () {
      this.spinning = true
      this.isTPData = false
      this.TPgroupList = []
      this.selectedKeys = []
      this.Allprogress = []
      this.AllTask = []
      // 获取数据中心和系统镜像接口
      const [AllTask, ImageList, GroupList, TemplateAllList] = (
        await Promise.all(
          [
            DesktopTemplateGetAllTask(),
            DesktopTemplateImageList(),
            DesktopTemplateGroupList(),
            DesktopTemplateAllList()
          ].map((u) =>
            u.catch((e) => {
              this.spinning = false
            })
          )
        )
      ).map((u) => deepGet(u, 'data', []))
      if (AllTask.length > 0) {
        this.AllTask = AllTask
        this.Task()
      }
      if (GroupList) {
        this.selectedKeys.push(GroupList.children[0].id)
        this.TPgroup = GroupList.children[0]
        if (this.TPgroup.name === '默认分组') {
          this.disabledAdd = true
          this.disabledEdit = true
          this.disabledDelete = true
        }
        this.TPname = GroupList.children[0].name
        this.Recursion(GroupList.children)
        this.AddData.ImageList = ImageList
        this.AddData.TPgroupList = this.TPgroupList
        this.TPAllList = TemplateAllList
        this.toRouter(this.selectedKeys[0], GroupList.children[0].name)
        this.isTPData = true
        this.spinning = false
        const DataCenterList = await DesktopTemplateDataCenterList()
        this.AddData.DataCenterList = DataCenterList
      }
    },
    // 获取模版组信息的递归
    Recursion (Array, data) {
      Array.forEach((item, index) => {
        this.TPgroupNameList.push(item)
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
      this.selectedKeys = []
      this.selectedKeys.push(item.key)
      this.TPgroup = item
      this.TPname = item.title
      this.disabledAdd = false
      this.disabledEdit = false
      this.disabledDelete = false
      if (item.title === '默认分组') {
        this.disabledAdd = true
        this.disabledEdit = true
        this.disabledDelete = true
      }
      this.toRouter(item.key, item.title)
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
        if (i.name === 'win7Ex86') {
            this.$message.info('正在测试中，暂不能删除')
        }
      const obj = {
        name: i.name
      }
      this.$confirm({
        title: '删除后将无法恢复，确定删除么',
        okType: 'danger',
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
    },
    // 页页码改变事件
    changePage (page, pagesize) {
      this.TPpageList = []
      this.TPData.forEach((u, index) => {
        if (index >= (page - 1) * 8 && index <= page * 8 - 1) {
          this.TPpageList.push(u)
        }
      })
    },
    // close模版组的选择取消
    async close () {
      this.disabledAdd = false
      this.disabledEdit = true
      this.disabledDelete = true
      this.selectedKeys = []
      this.TPname = '所有模版'
      this.TPpageList = this.deepGet(await DesktopTemplateAllList(), 'data', [])
    },
    // 检测有没有任务
    async Task () {
        this.timer = setInterval(() => {
            this.setTimedTask()
        }, 1000)
    },
    // 定时器任务
    async setTimedTask () {
      if (this.AllTask.length > 0 && this.AllTask[0] !== ':') {
        const obj = {
          task: this.AllTask
        }
        await DesktopTemplateCheckTask(obj).then((res) => {
         this.Allprogress = this.deepGet(res, [], [])
        })
        this.Allprogress.forEach(u => {
            if (u.msg === '任务全部完成') {
                clearInterval(this.timer)
                this.getTPgroup()
            }
        })
      }
    },
    // 用户点击模版组的切换时，模版的分组
    toRouter (key, name) {
      this.TPData = []
      this.TPpageList = []
      this.IsAllmodule = true
      if (this.$refs.Single) {
        this.$refs.Single.OffSingle()
      }
      let i = 0
      console.log(this.Allprogress)
      this.Allprogress.progress.forEach(u => {
          console.log(u)
      })
      this.TPAllList.forEach((u) => {
        if (u.groupId === key) {
          i++
          if (i <= 8) {
            this.TPpageList.push(u)
          }
          this.TPData.push(u)
        }
      })
    },
    // 取消任务
    closeTask (task) {
      this.$confirm({
        title: '确认要取消这个任务吗？点击确定即可取消',
        okType: 'danger',
        onOk: async () => {
            const obj = {
                    task: task.task
            }
          return new Promise((resolve, reject) => {
            DesktopTemplateCloseTask(obj).then((res) => {
              this.$message.success('取消成功')
              this.spinning = true
              this.isTPData = false
              this.getTPgroup()
              resolve()
            })
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
    text-align: center;
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
    font-size: 25px;
    // display: none;
    i {
      padding-right: 20px;
    }
    .delete,.shanchu {
      color: red;
    }
    .chakan {
      color: #16bedd;
    }
  }
}
.modules:hover > .hover {
  display: block;
}

.blurry {
  text-align: center;
  margin: auto;
  position: relative;
}
.progress-position {
  position: absolute;
  top: 35px;
  left: 40px;
}
.blurry_text {
  color: transparent !important;
  text-shadow: #ccc 0 0 5px;
}
.percent_text {
  color: #ffcd04;
  font-size: 26px;
  font-weight: 900;
  -webkit-text-stroke: 0.8px #272e48;
}
</style>
