<template>
  <page-header-wrapper :title="false">
    <a-row
      :gutter="16"
      class="row">
      <a-col :span="6">
        <a-card>
          <empty
            v-if="!TPgroupList.length>0"
            :isEmpty="!TPgroupList.length>0" />
          <a-row
            v-else
            class="tree_head">
            <a-col :span="10">
              <a-row style="height:32px;">
                <a-col
                  :span="8"
                  style="height:100%;">
                  <m-icon
                    type="moban"
                    @click="close"
                    class="icon  title_icon"
                    style="font-size:18px;" />
                </a-col>
                <a-col :span="14">
                  <div
                    class="All"
                    @click="close"
                    style="font-size:15px;margin-top:5px; cursor: pointer;">所有模版</div>
                </a-col>
              </a-row>
            </a-col>
            <a-col
              :span="14"
              class="flex_end">
              <a-button
                :disabled="disabledAdd"
                type="primary"
                shape="circle"
                @click="$refs.Add.Add(record)">
                <m-icon
                  type="yonghutianjia"
                  class="icon" />
              </a-button>
              <a-button
                :disabled="disabledEdit"
                type="primary"
                shape="circle"
                style="margin-left:10px"
                @click="$refs.Edit.Edit(record)">
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
          <a-spin :spinning="spinning">

            <div>
              <div v-if="IsAllmodule">
                <div class="title"> {{ record.title }} </div>
                <a-card style="height:730px;">
                  <a-row :gutter="[36,24]">
                    <!-- 添加按钮 -->
                    <a-col
                      :span="8"
                      @click="$refs.ManageAdd.Add()">
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

                    <div
                      v-for="(i,index) in showTPpageList"
                      :key="index">
                      <!-- 要创建任务的数据 -->
                      <a-col
                        :span="8"
                        v-if="i.data">
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
                              <div class="text blurry_text">
                                <span>所属分组: </span>
                                <span> groupName</span>
                              </div>
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
                              <water :data="i.data"></water>
                            </div>
                          </a-col>
                          <div class="hover">
                            <a-icon
                              v-if="i.progressBar <= 90"
                              type="delete"
                              @click="closeTask(i)"
                              class="delete" />
                          </div>
                        </a-row>
                      </a-col>

                      <!-- 完成的数据 -->
                      <a-col
                        :span="8"
                        v-else>
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
                              <span> {{ i.group_name }}</span>
                            </div>
                            <div class="text">
                              <span>服务器: </span>
                              <span> {{ i.host }}</span>
                            </div>
                            <div class="text">
                              <span>创建时间: </span>
                              <span>{{ i.create_time | convert('unix','YYYY-MM-DD') }}</span>
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
                            <!-- <span @click="details(i)">
                              <m-icon
                                type="chakan"
                                class="chakan" />
                            </span> -->
                            <span @click="Delete(i)">
                              <m-icon
                                type="shanchu"
                                class="shanchu" />
                            </span>
                          </div>
                        </a-row>
                      </a-col>
                    </div>

                  </a-row>
                  <!-- 分页器 -->
                  <a-pagination
                    :total="AllTPpageList.length"
                    :show-total="total => `共 ${AllTPpageList.length} 条数据`"
                    :page-size="8"
                    @change="changePage"
                    :default-current="1" />
                </a-card>
              </div>
              <singlemodules
                ref="Single"
                @ok="Single"
                @handleBack="back"></singlemodules>
            </div>
          </a-spin>
        </div>
      </a-col>
    </a-row>
    <x-treeadd
      ref="Add"
      @ok="getOUGroup"></x-treeadd>
    <x-treeedit
      ref="Edit"
      @ok="getOUGroup"></x-treeedit>
    <x-manageadd
      ref="ManageAdd"
      @ok="getOUGroup"></x-manageadd>
    <x-managerelease
      ref="ManageRelease"
      @ok="handleOk"></x-managerelease>
  </page-header-wrapper>
</template>

<script>
import MIcon from '@/components/Icon'
import Empty from '@/components/Empty'
import Tree from '../cloudDesktopmanage/Tree_modules/Tree'
import XTreeadd from './Tree_modules/Add'
import XTreeedit from './Tree_modules/Edit'
import XManageadd from './Tab_modules/manageAdd'
import XManagerelease from './Tab_modules/release'
import Singlemodules from './Tab_modules/singlemodules'
import { mixinTable } from '@/utils/mixin'
import Water from '@/components/waterMap/index'
import { mapMutations } from 'vuex'
import {
    DesktopTemplateGroupList,
    DesktopTemplateGroupDelete,
    DesktopTemplateAllList,
    DesktopTemplateImageList,
    DesktopTemplateDataCenterList,
    DesktopTemplateDelete,
    DesktopTemplateCheckTask,
    DesktopTemplateCloseTask,
    DesktopGetTemplate
} from '@/api/CloudDesktop/DesktopManagem'
import { deepGet } from '@/utils/util'
export default {
    mixins: [mixinTable],
    components: {
        Empty,
        MIcon,
        Tree,
        Water,
        XTreeadd,
        XManageadd,
        XTreeedit,
        XManagerelease,
        Singlemodules
    },
    data () {
        return {
            record: {},
            TPgroupList: [], // 模版组列表
            disabledAdd: false,
            disabledEdit: false,
            disabledDelete: false,
            TPpageList: [], // 分页的数据
            AllTPpageList: [], // 全部的数据
            showTPpageList: [], // 显示的数据
            TPData: [], // 单个模版信息
            isTPData: false, // 判断单个模版信息获取成功没有
            selectedKeys: [], // 初始化选中的模版组
            spinning: true,
            timer: Function, // 定时器
            IsAllmodule: true, // 是否显示详情页面
            AllTask: [], // 全部的任务Task
            Allprogress: [], // 全部的任务数据
            progress: [], // 当前组的任务数据
            timeTaskcatch: true // 定时任务接口是否成功
        }
    },
    created () {
        this.getOUGroup()
        this.changePage(1)
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
        ...mapMutations([
            'SET_DATACENTERLIST',
            'SET_IMAGELIST',
            'SET_TPGROUPLIST'
        ]),
        async getOUGroup (record) {
            this.TPgroupList = []
            this.selectedKeys = []
            const GroupList = deepGet(
                await DesktopTemplateGroupList(),
                'data',
                []
            )
            if (record) {
                this.selectedKeys.push(record.key)
                this.record = record
                this.Recursion(GroupList.children)
                this.SET_TPGROUPLIST(this.TPgroupList)
                this.getTP()
            } else if (GroupList) {
                this.Recursion(GroupList.children)
                this.selectedKeys.push(this.TPgroupList[0].id)
                this.SET_TPGROUPLIST(this.TPgroupList)
                this.record = GroupList.children[0]
                this.record.title = this.record.name
                if (this.record.name === '默认分组') {
                    this.disabledAdd = true
                    this.disabledEdit = true
                    this.disabledDelete = true
                }
                this.getTP()
            }
        },
        async getTP () {
            this.spinning = true
            this.TPpageList = []
            const [ImageList, DataCenterList] = await Promise.all(
                [
                    DesktopTemplateImageList(),
                    DesktopTemplateDataCenterList()
                ].map(u => u.catch(e => console.log(e)))
            )
            const GetTP = await DesktopTemplateAllList({ group: parseInt(this.record.id) })
            const Task = deepGet(GetTP, 'task', [])
            Task.length > 0 ? this.GetTask(Task) : clearInterval(this.timer)
            this.SET_IMAGELIST(deepGet(ImageList, 'data', []))
            this.SET_DATACENTERLIST(DataCenterList)
            this.TPpageList = deepGet(GetTP, 'data', [])
            this.AllTPpageList = this.TPpageList
            this.AllTPpageList.length > 8
                ? (this.showTPpageList = this.AllTPpageList.slice(0, 8))
                : (this.showTPpageList = this.AllTPpageList)
            this.spinning = false
        },
        // 用户点击模版组切换
        changecheckedLeftval (item) {
            this.record = item
            this.selectedKeys = []
            this.selectedKeys.push(item.key)
            this.disabledAdd = false
            this.disabledEdit = false
            this.disabledDelete = false
            if (item.title === '默认分组') {
                this.disabledAdd = true
                this.disabledEdit = true
                this.disabledDelete = true
            }
            this.getTP()
            this.IsAllmodule = true
            this.$refs.Single.OffSingle()
        },
        // 删除模版组
        TreeDelete () {
            if (this.record.children.length > 0) {
                this.$message.info('该模版组里还有模版，请先删除')
                return false
            }
            this.$confirm({
                title: '是否要删除当前组?',
                content: '点击确定即可删除当前组',
                onOk: async () => {
                    await DesktopTemplateGroupDelete({
                        id: this.record.key
                    }).then(res => {
                        this.$message.success('删除成功')
                        this.getOUGroup()
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
        async Delete (i) {
            this.$confirm({
                title: '删除后将无法恢复，确定删除么',
                okType: 'danger',
                onOk: async () => {
                    return new Promise(async (resolve, reject) => {
                        const res = this.deepGet(
                            await DesktopGetTemplate({ id: i.id }),
                            'data',
                            []
                        )
                        if (res.is_running === '关机') {
                            try {
                                await DesktopTemplateDelete({ name: i.name })
                                this.$message.success('删除成功')
                                this.isTPData = false
                                this.getOUGroup(this.record)
                                resolve()
                            } catch {
                                resolve()
                            }
                        } else {
                            this.$message.info(
                                '当前模版正在运行或被挂起，请关机在尝试'
                            )
                            resolve()
                        }
                    })
                }
            })
        },
        // 显示详细模版信息
        Single () {
            this.spinning = true
            this.isTPData = false
            this.IsAllmodule = true
        },
        // 页页码改变事件
        changePage (page) {
            const AllList = this.AllTPpageList
            this.showTPpageList = []
            AllList.forEach((u, index) => {
                if (index >= (page - 1) * 8 && index <= page * 8 - 1) {
                    this.showTPpageList.push(u)
                }
            })
        },
        // close模版组的选择取消
        async close () {
            this.disabledAdd = false
            this.disabledEdit = true
            this.disabledDelete = true
            this.selectedKeys = []
            this.TPpageList = this.deepGet(
                await DesktopTemplateAllList(),
                'data',
                []
            )
        },
        // 开启定时器任务
        Task () {
            this.setTimedTask()
            if (this.AllTask.length > 0) {
                this.timer = setInterval(() => {
                    this.setTimedTask()
                }, 10000)
                 this.$once('hook:beforeDestory', () => {
                    clearTimeout(this.timer)
                })
            }
        },

        // 查找正在新建的任务
        async GetTask () {

        },
        // 定时器任务
        async setTimedTask () {
            if (this.AllTask.length > 0 && this.AllTask[0] !== ':') {
                const obj = {}
                obj.task = []
                this.AllTask.forEach(u => {
                    obj.task.push({
                        task: u.task_ref,
                        id: u.id
                    })
                })
                await DesktopTemplateCheckTask(obj)
                    .then(res => {
                        this.Allprogress = [
                            ...this.deepGet(res, 'progress', [])
                        ]
                    })
                    .catch(e => {
                        this.timeTaskcatch = false
                    })
                // this.gettask()
                this.isAllTask()
            }
        },
        // 判断全部创建的任务创建成功没有&&分类
        async isAllTask () {
            if (this.AllTask.length > 0) {
                const TPList = await DesktopTemplateAllList({
                    group: parseInt(this.record.id)
                })
                this.AllTPpageList = deepGet(TPList, 'data', [])
                const progress = []
                this.Allprogress.forEach(u => {
                    if (
                        u.group === this.selectedKeys[0] &&
                        u.progress_bar !== 100
                    ) {
                        u.data = {
                            input: 10,
                            output: 20,
                            cpuIdle: u.progress_bar
                        }
                        progress.push(u)
                    }
                })

                this.AllTPpageList = [...progress, ...this.AllTPpageList]
                this.AllTPpageList.length > 8
                    ? (this.showTPpageList = this.AllTPpageList.slice(0, 8))
                    : (this.showTPpageList = this.AllTPpageList)
            } else {
                clearInterval(this.timer)
            }
        },
        // 取消任务
        closeTask (task) {
            this.$confirm({
                title: '确认要取消这个任务吗？点击确定即可取消',
                okType: 'danger',
                onOk: () => {
                    const obj = {
                        task: task.task
                    }
                    return new Promise(async (resolve, reject) => {
                        try {
                            await DesktopTemplateCheckTask({
                                task: [task.task]
                            }).then(res => {
                                if (res.progress[0].progressBar >= 90) {
                                    this.$message.info(
                                        '该任务即将完成，无法取消'
                                    )
                                    resolve()
                                    return true
                                } else {
                                    DesktopTemplateCloseTask(obj).then(res => {
                                        if (res.code === 100) {
                                            this.$message.info(
                                                '该任务即将完成，无法取消'
                                            )
                                        } else {
                                            this.$message.success('取消成功')
                                        }
                                        this.spinning = true
                                        this.isTPData = false
                                        this.getTP()
                                        resolve()
                                    })
                                }
                            })
                        } catch (error) {
                            resolve()
                        }
                    })
                }
            })
        },
        // 返回
        back () {
            this.$refs.Single.OffSingle()
            this.IsAllmodule = true
            this.getOUGroup(this.record)
        },
        // 获取模版组信息的递归
        Recursion (Array, data) {
            Array.forEach((item, index) => {
                const obj = {
                    key: item.id,
                    id: item.id,
                    title: item.name,
                    value: item.id,
                    parent: item.parent,
                    userCount: item.tp_count,
                    scopedSlots: {
                        title: 'custom',
                        icon: 'smile'
                    },
                    children: []
                }
                if (data) {
                    data.children.push(obj)
                } else {
                    this.TPgroupList.push(obj)
                }
                if (item.children.length > 0) {
                    // 执行递归
                    this.Recursion(item.children, obj)
                }
            })
        }
    },
    beforeDestroy () {
        // 页面关闭时清除定时器
        clearInterval(this.timer)
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
    background: #272e48;
    padding: 10px;
    padding-left: 20px;
    border-radius: 10px;
    color: #bcd0f7;
}
.modules_title {
    font-size: 17px;
    font-weight: 500;
    white-space: nowrap;
    width: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
}
.icon-modules {
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    .add {
        font-size: 100px;
    }
}
.modules {
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 8px;
    .icon {
        font-size: 80px;
        text-align: center;
        width: 100%;
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
        display: none;
        i {
            padding-right: 20px;
        }
        .delete,
        .shanchu {
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
.progress {
    height: 174px;
}
.progress-position {
    position: absolute;
    top: 0px;
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
