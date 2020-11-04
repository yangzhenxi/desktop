<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16" class="row">
      <a-col :span="6">
        <empty
          v-if="0"
          :isEmpty="0"></empty>
        <a-card
          v-else
          style="height:875px;">
          <a-row
            tree_head
            type="flex"
            justify="end">
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
                    style="font-size:15px;">桌面组</span>
                </a-col>
              </a-row>
            </a-col>
            <a-col
              :span="14"
              class="flex_end">
              <a-button
                :disabled="disabled"
                type="primary"
                shape="circle"
                @click="$refs.TreeAdd.Add(record)">
                <m-icon
                  type="yonghutianjia"
                  class="icon" />
              </a-button>
              <a-button
                :disabled="disabled"
                type="primary"
                shape="circle"
                style="margin-left:10px"
                @click="$refs.TreeEdit.Edit(record)">
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
            :treeData="OuList"
            :selectedKeys="selectedKeys"
            @changecheckedval="changecheckedLeftval"></tree>
        </a-card>
      </a-col>
      <a-col :span="18">
        <div>
          <div v-if="IsAllmodule">
            <div class="title"> {{ record.name }}
            </div>
            <a-spin :spinning="spinning">
              <a-card style="height:811px">
                <a-row :gutter="[36,24]">
                  <!-- 新增 -->
                  <a-col
                    :span="8"
                    @click="$refs.ModulesAdd.Add()">
                    <a-row
                      class="icon-modules"
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
                  <div v-for="(i,index) in TPList" :key="index">
                    <!-- 新建任务进度 -->
                    <a-col :span="8" v-if="i.state==='DESKTOP_STATE_CREATING'">
                      <a-row
                        class="modules progress"
                        type="flex"
                        :gutter="16">
                        <a-col :span="8">
                          <a-row style="margin-top: 45px; text-align: center;">
                            <m-icon
                              class="icon"
                              type="windowsfuwuqi" />
                            <div class="icon_title">{{ i.name }}</div>
                          </a-row>
                        </a-col>
                        <a-col
                          class="blurry heightAuto"
                          :span="16">
                          <div>
                            <div class="text blurry_text">
                              <span>创建者: </span>
                              <span> groupName</span>
                            </div>
                            <div class="text blurry_text">
                              <span>注册/未注册数量: </span>
                              <span>0/20</span>
                            </div>
                            <div class="text blurry_text">
                              <span>桌面类型: </span>
                              <span>随机桌面</span>
                            </div>
                            <div class="text blurry_text">
                              <span>维护状态: </span>
                              <span>是</span>
                            </div>
                            <div
                              class="text blurry_text"
                              style="overflow: inherit;">
                              <span>电源状态: </span>
                              <span>开启</span>
                            </div>
                            <div class="text blurry_text">
                              <span>创建时间 </span>
                              <span>2020/8/19</span>
                            </div>
                          </div>
                          <div class="progress-position" @click="showDrawer(i)">
                            <water :data="i.progress"></water>
                          </div>
                        </a-col>
                      </a-row>
                    </a-col>
                    <!-- 成功 -->
                    <a-col :span="8" v-else-if="i.state==='DESKTOP_STATE_SUCCESS'">
                      <a-row
                        class="modules"
                        :gutter="16">
                        <a-col :span="8" @click="details(i)">
                          <a-row style="margin-top: 45px; text-align: center;">
                            <m-icon
                              class="icon"
                              type="windowsfuwuqi" />
                            <div class="icon_title">{{ i.name }}</div>
                          </a-row>
                        </a-col>
                        <a-col class="heightAuto" :span="16" @click="details(i)">
                          <div class="text">
                            <span>创建者: </span>
                            <span> {{ i.creator }}</span>
                          </div>
                          <div class="text">
                            <span>注册/未注册数量: </span>
                            <span>{{ i.registered_count }}/{{ i.unregistered_count }}</span>
                          </div>
                          <div class="text">
                            <span>桌面类型: </span>
                            <span>{{ i.desktop_type | convert('C_D_DESKTOP_TYPE') }}</span>
                          </div>
                          <div class="text">
                            <span>维护状态: </span>
                            <a-tag :color="toDict(i.in_maintain_mode,'C_D_INMAINTAINMODE_STATE').color">
                              {{ i.in_maintain_mode | convert('C_D_INMAINTAINMODE_STATE') }}
                            </a-tag>
                          </div>
                          <div
                            class="text"
                            style="overflow: inherit;">
                            <span>电源状态: </span>
                            <a-tag :color="toDict(i.Power,'C_D_POWER_STATE').color">
                              {{ i.Power | convert('C_D_POWER_STATE') }}

                            </a-tag>
                          </div>
                          <div class="text">
                            <span>创建时间: </span>
                            <span>{{ i.created | convert('unix','YYYY-MM-DD') }}</span>
                          </div>
                        </a-col>
                        <div class="hover">
                          <!-- <span @click="details(i)">
                            <m-icon
                              type="chakan"
                              class="chakan" />
                          </span> -->
                          <span @click="DesktopDelete(i)">
                            <m-icon
                              type="shanchu"
                              class="shanchu" />
                          </span>
                        </div>
                      </a-row>
                    </a-col>
                    <!-- 失败 -->
                    <a-col v-else-if="i.state==='DESKTOP_STATE_FAIL'" :span="8">
                      <a-row
                        class="modules progress"
                        type="flex"
                        :gutter="16">
                        <a-col :span="8">
                          <a-row style="margin-top: 45px; text-align: center;">
                            <m-icon
                              class="icon"
                              type="windowsfuwuqi" />
                            <div class="icon_title">{{ i.name }}</div>
                          </a-row>
                        </a-col>
                        <a-col
                          class="blurry heightAuto "
                          :span="16">
                          <div>
                            <div class="text blurry_text">
                              <span>创建者: </span>
                              <span> groupName</span>
                            </div>
                            <div class="text blurry_text">
                              <span>注册/未注册数量: </span>
                              <span>0/20</span>
                            </div>
                            <div class="text blurry_text">
                              <span>桌面类型: </span>
                              <span>随机桌面</span>
                            </div>
                            <div class="text blurry_text">
                              <span>维护状态: </span>
                              <span>是</span>
                            </div>
                            <div
                              class="text blurry_text"
                              style="overflow: inherit;">
                              <span>电源状态: </span>
                              <span>开启</span>
                            </div>
                            <div class="text blurry_text">
                              <span>创建时间 </span>
                              <span>2020/8/19</span>
                            </div>
                          </div>
                          <div class="progress-position" @click="showDrawer(i)">
                            <a-icon type="warning" style="font-size: 90px; color: #f50;" />
                            <br>
                            <b style="font-size:20px;color:#f50">创建失败</b>
                          </div>
                          <div class="hover" style="top:-15px;display:block">
                            <span @click="DesktopDelete(i)">
                              <m-icon
                                type="shanchu"
                                class="shanchu" />
                            </span>
                          </div>
                        </a-col>
                      </a-row>
                    </a-col>
                    <!-- 删除任务进度 -->
                    <a-col
                      :span="8"
                      v-else-if="i.state ==='DESKTOP_STATE_DELETING' " >
                      <a-row
                        class="modules progress"
                        type="flex"
                        :gutter="16">
                        <a-col :span="8">
                          <a-row style="margin-top: 45px; text-align: center;">
                            <m-icon
                              class="icon"
                              type="windowsfuwuqi" />
                            <div class="icon_title">{{ i.name }}</div>
                          </a-row>
                        </a-col>
                        <a-col
                          class="blurry heightAuto"
                          :span="16">
                          <div>
                            <div class="text blurry_text">
                              <span>创建者: </span>
                              <span> groupName</span>
                            </div>
                            <div class="text blurry_text">
                              <span>注册/未注册数量: </span>
                              <span>0/20</span>
                            </div>
                            <div class="text blurry_text">
                              <span>桌面类型: </span>
                              <span>随机桌面</span>
                            </div>
                            <div class="text blurry_text">
                              <span>维护状态: </span>
                              <span>是</span>
                            </div>
                            <div
                              class="text blurry_text"
                              style="overflow: inherit;">
                              <span>电源状态: </span>
                              <span>开启</span>
                            </div>
                            <div class="text blurry_text">
                              <span>创建时间 </span>
                              <span>2020/8/19</span>
                            </div>
                          </div>
                          <div class="progress-position">
                            <loading/>
                            <span class="DeleteCreaing">删除中{{ i.progress }}</span>
                          </div>
                        </a-col>
                      </a-row>
                      <!-- drawer -->
                      <a-drawer
                        placement="right"
                        :closable="false"
                        :visible="visible"
                        width="350px"
                        @close="onClose"
                      >
                        <template slot="title">
                          {{ DesktopCreatingDrawer.name }}的创建步骤
                        </template>
                        <a-timeline>
                          <a-timeline-item v-for="u in DesktopCreatingDrawer.steps" :key="u.id" :color="toDict(u.state,'C_D_DESKTOP_TASK_ATSTE').color">
                            <p v-if="u.state !== 'SYSTEM_TASK_STATE_FAIL'">{{ u.name }} </p>
                            <p v-if="u.state === 'SYSTEM_TASK_STATE_FAIL'">
                              {{ u.name }}
                              <a-tooltip>
                                <template slot="title">
                                  {{ u.detail }}
                                </template>
                                <a-icon type="warning" style="font-size: 15px; margin-left:20px; cursor: pointer; color: #f50;" />
                              </a-tooltip>
                            </p>
                            <p style="display:flex;justify-content: space-between">
                              <span>{{ u.state | convert('C_D_DESKTOP_TASK_ATSTE') }}</span>
                              <a-progress v-if="u.state!== 'SYSTEM_TASK_STATE_SUCCESS'" :percent="parseInt(u.progress)" status="active" style="width:80%;" />
                            </p>
                          </a-timeline-item>
                        </a-timeline>
                      </a-drawer>
                    </a-col>
                  </div>
                </a-row>
                <a-pagination
                  style="float:right;margin: 20px 20px 0 0"
                  :total="AllTPpageList.length"
                  :show-total="total => `共 ${AllTPpageList.length} 条数据`"
                  :page-size="8"
                  @change="changePage"
                  :default-current="1"/>
              </a-card>
            </a-spin>
          </div>
          <singlemodules ref="Single" @handleBack="handleBack"></singlemodules>
        </div>
      </a-col>
    </a-row>
    <tree-add
      ref="TreeAdd"
      @ok="getOu"></tree-add>
    <tree-edit
      ref="TreeEdit"
      @ok="getOu"></tree-edit>
    <module-add
      ref="ModulesAdd"
      @ok="getOu(record)"></module-add>
  </page-header-wrapper>
</template>

<script>
import MIcon from '@/components/Icon'
import Tree from './Tree_modules/Tree'
import Empty from '@/components/Empty'
import TreeAdd from './Tree_modules/TreeAdd'
import TreeEdit from './Tree_modules/TreeEdit'
import ModuleAdd from './modulesAdd'
import Singlemodules from './Details'
import Loading from '@/components/loading/loading1'
import {
    CloudDesktopTPList,
    CloudDesktopOUList,
    CloudDesktopDeleteOU,
    CloudDesktopTPDelete,
    CloudDesktopTaskGet
} from '@/api/CloudDesktop/CloudDesktop'
import { mixin } from '@/utils/mixin'
import Water from '@/components/waterMap/index'
import { throttle } from '@/utils/util'
export default {
    mixins: [mixin],
    components: {
        MIcon,
        Tree,
        Loading,
        Empty,
        Water,
        TreeEdit,
        TreeAdd,
        Singlemodules,
        ModuleAdd
    },
    data () {
        return {
            spinning: true, // 判定加载
            visible: false, // 抽屉的开关
            selectedKeys: [], // 初始化选中的模版组
            TPList: [], // 模版列表
            AllTPpageList: [], // 模版列表
            IsAllmodule: true, // 桌面列表是否显示
            disabled: false,
            OuList: [],
            record: {}, // 当前选中的OU
            validatorName: [], // 重名
            DesktopSuccess: [], // 成功
            DesktopFail: [], // 失败
            DesktopCreating: [], // 创建中
            DesktopDeleting: [], // 创建中
            DesktopCreatingDrawer: {}, // 抽屉数据
            DesktopCreatingId: [], // 创建的ID
            DesktopFailId: [], // 创建失败的ID
            IsDesktopCreating: true // 判读是否要执行定时器任务

        }
    },
    created () {
        this.getOu()
    },
    methods: {
        // 获取组
        async getOu (item) {
            this.OuList = []
            this.selectedKeys = []
            this.validatorName = []
            let OuList = this.deepGet(this.deepGet(await CloudDesktopOUList(), 'ou')[0], 'children', '')
            if (OuList.length >= 2) {
                OuList = OuList.sort(this.sotsArr)
                this.Recursion(OuList)
            } else {
                OuList[0].children = OuList[0].children.sort(this.sotsArr)
                 this.Recursion(OuList)
            }
            if (item) {
                this.selectedKeys.push(item.key)
                this.record = item
            } else {
                this.selectedKeys = ['0']
                this.record = OuList[0]
            }
            this.GetTPList(1)
        },
        // 删除Tree
        TreeDelete () {
            this.$confirm({
                title: '是否要删除桌面组？',
                content: '点击确定即可删除',
                onOk: () => {
                    CloudDesktopDeleteOU({ name: this.record.dn }).then(res => {
                        this.$message.success('删除成功')
                        this.getOu()
                    })
                }
            })
        },
        // 桌面切换事件
        changecheckedLeftval: throttle(function (item) {
            this.selectedKeys = []
            this.selectedKeys.push(item.eventKey)
            this.record = item
            this.GetTPList(item)
            this.IsAllmodule = true
            this.$refs.Single.OffSingle()
        }, 1000),
        // 获取模版列表
        async GetTPList (item, Creating) {
            clearInterval(this.timer)
            if (item) {
                this.spinning = true
            }
            const obj = {
                page: 0,
                size: 20,
                dn: this.record.dn
            }
            try {
                const res = this.deepGet(await CloudDesktopTPList(obj), 'data', [])
                this.DesktopCreatingId = []
                this.IsDesktopCreating = true
                this.DesktopCreating = []
                this.DesktopSuccess = []
                this.DesktopFailId = []
                this.DesktopFail = []
                this.AllTPpageList = []
                this.DesktopDeleting = []
                res.forEach(u => {
                    if (u.state === 'DESKTOP_STATE_CREATING') {
                        this.DesktopCreating.push(u)
                        this.DesktopCreatingId.push(u.task_id)
                    } else if (u.state === 'DESKTOP_STATE_SUCCESS') {
                        this.DesktopSuccess.push(u)
                    } else if (u.state === 'DESKTOP_STATE_FAIL') {
                        this.DesktopFail.push(u)
                        this.DesktopFailId.push(u.task_id)
                    } else if (u.state === 'DESKTOP_STATE_DELETING') {
                        this.DesktopDeleting.push(u)
                    }
                })
                this.DesktopCreatingId.length > 0 ? this.GetTask() : this.IsDesktopCreating = false
                if (this.DesktopFailId.length > 0) {
                    this.GetFail()
                }
                if (this.DesktopCreatingId.length === 0 && this.DesktopFailId.length === 0) {
                    this.AllTPpageList = [...this.DesktopCreating, ...this.DesktopSuccess, ...this.DesktopFail]
                    this.TPList = this.AllTPpageList.slice(0, 8)
                }
                if (this.DesktopDeleting.length > 0) {
                    this.GetDeleteTask()
                }
                this.settime()
            } catch {
                this.spinning = false
            }

            this.spinning = false
        },

        // 查找正在新建的任务
        async GetTask () {
            for (let i = 0; i < this.DesktopCreatingId.length; i++) {
                await CloudDesktopTaskGet({ id: this.DesktopCreatingId[i] }).then(result => {
                    const res = this.deepGet(result, 'data', {})
                    this.DesktopCreating.forEach(u => {
                        if (u.task_id === res.id) {
                            u.steps = res.steps
                            u.progress = {
                                input: 10,
                                output: 20,
                                cpuIdle: res.progress
                            }
                        }
                    })
                })
            }
             this.AllTPpageList = [...this.DesktopCreating, ...this.DesktopSuccess, ...this.DesktopFail]
            this.TPList = this.AllTPpageList.slice(0, 8)
        },
        // 查找删除任务
        async GetDeleteTask () {
            for (let i = 0; i < this.DesktopDeleting.length; i++) {
                await CloudDesktopTaskGet({ id: this.DesktopDeleting[i].task_id }).then(result => {
                    const res = this.deepGet(result, 'data', {})
                    this.DesktopDeleting.forEach((u, index) => {
                        if (res.id === u.task_id) {
                            u.progress = res.progress
                        }
                    })
                     this.DesktopDeleting.forEach((u, index) => {
                         if (u.progress === 100) {
                             this.DesktopDeleting.splice(index, 1)
                         }
                     })
                })
            this.AllTPpageList = [...this.DesktopCreating, ...this.DesktopSuccess, ...this.DesktopFail, ...this.DesktopDeleting]
            this.TPList = this.AllTPpageList.slice(0, 8)
            }
        },

        // 查找失败的原因
        async GetFail () {
            for (let i = 0; i < this.DesktopFailId.length; i++) {
                await CloudDesktopTaskGet({ id: this.DesktopFailId[i] }).then(result => {
                    const res = this.deepGet(result, 'data', {})
                    this.DesktopFail.forEach(u => {
                        u.task_id === res.id ? u.steps = res.steps : console.log(1)
                    })
                })
            }
            this.AllTPpageList = [...this.DesktopCreating, ...this.DesktopSuccess, ...this.DesktopFail]
            this.TPList = this.AllTPpageList.slice(0, 8)
        },
        // 分页
        changePage (page, pagesize) {
            this.TPList = []
            this.AllTPpageList.forEach((u, index) => {
                if (index >= (page - 1) * 8 && index <= page * 8 - 1) {
                    this.TPList.push(u)
                }
            })
        },
        // 桌面详情
        details (item) {
            clearInterval(this.timer)
            this.IsAllmodule = false
            this.$refs.Single.OnSingle(item)
        },

        // 删除桌面
        DesktopDelete (i) {
              this.$confirm({
                title: '是否要删除' + i.name + '？',
                content: '点击确定即可删除',
                onOk: () => {
                    return new Promise(async (resolve, reject) => {
                        await CloudDesktopTPDelete({ id: i.id }).then(res => {
                            this.$message.success('删除成功')
                            this.getOu(this.record)
                            resolve()
                        }).catch(() => {
                            this.$message.error('删除失败')
                            resolve()
                        })
                    })
                }
            })
        },
        // 定时器
        settime () {
            if (this.IsDesktopCreating) {
                this.timer = setInterval(() => {
                    this.GetTPList(false, 'Creating')
                }, 30000)
                this.$once('hook:beforeDestory', () => {
                    clearTimeout(this.timer)
                })
            }
        },
        // 返回
        handleBack () {
            this.IsAllmodule = true
            this.$refs.Single.OffSingle()
        },

        // 查看进度条
        showDrawer (i) {
            this.visible = true
            this.DesktopCreatingDrawer = i
        },

        onClose () {
            this.visible = false
        },
        // 排序
        sotsArr (e1, e2) {
            const s1 = this.deepGet(e1, 'name')
            const s2 = this.deepGet(e2, 'name')
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
        // 递归
        Recursion (Array, data) {
            Array.forEach((u, index) => {
                const obj = {
                    key: index.toString(),
                    title: u.name,
                    name: u.name,
                    children: [],
                    dn: u.dn,
                    userCount: u.user_count,
                    scopedSlots: {
                        title: 'custom',
                        icon: 'smile'
                    }
                }
                this.validatorName.push(u)
                if (data) {
                    obj.key = data.key + '-' + index
                    data.children.push(obj)
                } else {
                    this.OuList.push(obj)
                }
                if (u.children.length > 0) {
                    this.Recursion(u.children, obj)
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
/deep/.ant-card-head-title,
/deep/span.ant-modal-close-x,
/deep/.ant-modal-title {
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
.icon-modules {
    border: 1px solid #ccc;
    border-radius: 10px;
    height: 217px;
    margin-left: -8px;
    margin-right: -8px;
    .add {
        font-size: 105px;
    }
}
.modules {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 8px;
    min-height: 217px;
    max-height: 217px;
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
        padding: 2px 0px;
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
.progress {
    height: 217px;
}
.blurry {
    text-align: center;
    margin: auto;
    position: relative;
}
.progress-position {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.blurry_text {
    color: transparent;
    text-shadow: #ccc 0 0 4px;
}
.percent_text {
    color: #ffcd04;
    font-size: 26px;
    font-weight: 900;
    -webkit-text-stroke: 0.8px #272e48;
}
/deep/.ant-drawer-mask {
    background-color: rgba(0, 0, 0, 0.1);
}

/deep/.ant-drawer-header {
    position: absolute;
    padding: 16px 24px;
    width: 100%;
    z-index: 9980;
    /* bottom: 20px; */
    /* margin-bottom: 20px; */
    color: rgba(0, 0, 0, 0.65);
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 5px 5px 0 0;
}
/deep/.ant-drawer-body {
    margin-top: 50px;
}
.heightAuto{
    position: absolute;
    top: 50%;
    right:0;
    transform: translate(0,-50%);
}
.DeleteCreaing{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    font-weight: 500;
    font-size: 20px;
    color: #f50;
}
</style>
