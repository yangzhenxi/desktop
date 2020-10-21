<template>
  <div v-if="visible">
    <a-spin :spinning="spinning">
      <a-card :title="moduleData.name">
        <a-button
          slot="extra"
          @click="handleBack">返回</a-button>
        <a-row :gutter="16">
          <div class="header">
            <a-col :span="14">
              <a-row :gutter="[16,16]">
                <a-col :span="8">
                  <div
                    class="box"
                    @click="OnlineEdit">
                    <m-icon
                      type="zaixianbianji"
                      class="icon zaixianbianji"></m-icon>
                    <span class="text">在线编辑</span>
                  </div>
                </a-col>
                <a-col :span="8">
                  <div
                    class="box"
                    @click="$refs.ManageRelease.Add(moduleData)">
                    <m-icon
                      type="shangchuanmoban"
                      class="icon shangchuanmoban"></m-icon>
                    <span class="text">发布模版</span>
                  </div>
                </a-col>
                <a-col
                  :span="8"
                  @click="$refs.ManageAttributes.Attribute(moduleData)">
                  <div class="box">
                    <m-icon
                      type="tongji"
                      class="icon tongji"></m-icon>
                    <span class="text">模版属性</span>
                  </div>
                </a-col>
                <a-col
                  :span="8"
                  @click="reduction">
                  <div :class="['box', disabled ?'disabled':'']">
                    <m-icon
                      type="huanyuan1"
                      class="icon huanyuan1"></m-icon>
                    <span class="text">版本还原</span>
                  </div>
                </a-col>
                <a-col
                  :span="8"
                  @click="merge">
                  <div :class="['box', disabled ?'disabled':'']">
                    <m-icon
                      type="hebing"
                      class="icon hebing"></m-icon>
                    <span class="text">版本合并</span>
                  </div>
                </a-col>
                <a-col :span="8">
                  <div
                    class="box"
                    @click="ModuleDelete">
                    <m-icon
                      type="shanchu"
                      class="icon shanchu"></m-icon>
                    <span class="text">删除模版</span>
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="10">
              <a-row
                class="modules"
                :gutter="16">
                <a-col
                  :span="8"
                  class="icon">
                  <a-row style="margin-top: 25px;">
                    <div>
                      <m-icon
                        class="icon"
                        type="windows" />
                    </div>
                    <div class="icon_title">{{ moduleData.image }}</div>
                  </a-row>
                </a-col>
                <a-col :span="16">
                  <div
                    class="modules_title"
                    style="margin:5px 0px">{{ moduleData.name }}</div>
                  <div class="modules_text">
                    <span>所属分组: </span>
                    <span> {{ moduleData.group_name }}</span>
                  </div>
                  <div class="modules_text">
                    <span>所在服务器: </span>
                    <span>{{ moduleData.host }}</span>
                  </div>
                  <div class="modules_text">
                    <span>创建时间: </span>
                    <span>{{ moduleData.create_time| convert('unix','YYYY-MM-DD') }}</span>
                  </div>
                  <div class="modules_text">
                    <span>版本状态: </span>
                    <a-tag color="#108ee9">
                      {{ moduleData.version | Isversion }}
                    </a-tag>
                  </div>
                  <div
                    class="modules_text"
                    style="overflow: inherit;">
                    <span>运行状态: </span>
                    <a-badge :number-style="{backgroundColor: toDict(moduleData.isRunning,'C_STATE').color}" :count="moduleData.is_running"/>
                  </div>
                  <div class="modules_text">
                    <span>IP: </span>
                    <span>{{ moduleData.ip }}</span>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </div>
        </a-row>
      </a-card>
      <a-card>
        <tabs ref="tabs"></tabs>
      </a-card>
      <x-managerelease
        ref="ManageRelease"
        @ok="Release"></x-managerelease>
      <x-manageattributes
        ref="ManageAttributes"
        @ok="handleOk"></x-manageattributes>
    </a-spin>
  </div>

</template>

<script>
import { MIcon } from '@/components/index'
import { mixinFormModal, mixinTable } from '@/utils/mixin'
import XManagerelease from './release'
import XManageattributes from './modulesAttribute'
import Tabs from './tabs/tabs'
import { mapState, mapMutations } from 'vuex'
import {
    DesktopTemplateVersionRevert,
    DesktopTemplatePatch,
    DesktopTemplateVersionMerge,
    DesktopTemplateDelete,
    DesktopGetTemplate
} from '@/api/CloudDesktop/DesktopManagem'
export default {
    mixins: [mixinFormModal, mixinTable],
    components: {
        MIcon,
        XManagerelease,
        XManageattributes,
        Tabs
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
    computed: {
        ...mapState({
            disabled: state => state.DesktopManage.disabled,
            Version: state => state.DesktopManage.Version
        })
    },
    data () {
        return {
            moduleData: {},
            span: '24',
            selectedRowKeys: [], // Check here to configure the deffault column
            visible: false,
            spinning: true
        }
    },
    methods: {
        ...mapMutations(['SET_MODULEDATA', 'SET_TEMPLATEID', 'SET_DISABLED']),
        // 显示详情页面
        async OnSingle (record) {
            this.visible = true
            this.SET_TEMPLATEID(record.id)
            this.moduleData = this.deepGet(await DesktopGetTemplate({ id: record.id }), 'data', [])
            this.SET_MODULEDATA(this.moduleData)
            this.Isdisabled()
            this.spinning = false
        },
        // 关闭详情页面
        OffSingle () {
            this.visible = false
            this.spinning = true
            this.moduleData = []
            this.SET_DISABLED(true)
        },
        // 在线编辑
        OnlineEdit () {
            const obj = {
                name: this.moduleData.name
            }
            DesktopTemplatePatch(obj).then(res => {
                window.location.href = res.data
            })
        },
        // 还原版本
        reduction () {
            if (!this.disabled) {
                this.$confirm({
                    title:
                        '将模版主机还原至' + 'V1' + '版本，在线编辑的内容将丢失，是否继续?',
                    content: '点击确定即可还原',
                    onOk: () => {
                        return new Promise((resolve, reject) => {
                            const obj = {
                                name: this.moduleData.name
                            }
                            DesktopTemplateVersionRevert(obj).then(res => {
                                this.$message.success('还原成功')
                                this.OnSingle(this.moduleData)
                                this.$refs.tabs.$refs.tab1.$refs.table.refresh()
                                resolve()
                            })
                        })
                    }
                })
            }
        },
        // 合并版本
        merge () {
            if (!this.disabled) {
                this.$confirm({
                    title:
                        '合并版本将会把此模板已经发布的所有版本合并成一个新的版本，确定合并么？',
                    onOk: () => {
                        return new Promise((resolve, reject) => {
                            const obj = {
                                name: this.moduleData.name
                            }
                            DesktopTemplateVersionMerge(obj).then(res => {
                                this.$message.success('合并成功')
                                this.OnSingle(this.moduleData)
                                this.$refs.tabs.$refs.tab1.$refs.table.refresh()
                                resolve()
                            })
                        })
                    }
                })
            }
        },
        // 删除模版
        ModuleDelete () {
            this.$confirm({
                title: '删除要删除该模版',
                okType: 'danger',
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        DesktopTemplateDelete({ name: this.moduleData.name }).then(res => {
                            this.$message.success('删除成功')
                            this.visible = true
                            resolve()
                        })
                    })
                }
            })
        },
        // 发布版本
        Release (res) {
            if (res) {
                this.moduleData.version = parseInt(this.moduleData.version) + 1
            }
            this.Isdisabled()
            this.$refs.tabs.$refs.tab1.$refs.table.refresh()
            //   this.$refs.table.refresh()
        },
        // 判断版本还原和版本合并是否可以使用
        Isdisabled (Boole) {
            this.$store.dispatch('GetVersionList').then(res => {
                if (res.data.length > 0) {
                    this.SET_DISABLED(false)
                }
            })
        },
        // 返回
        handleBack () {
            this.SET_DISABLED(true)
            this.$emit('handleBack')
        }
    }
}
</script>

<style lang="less" scoped>
.box {
    background: #272e48;
    border-radius: 10px;
    padding: 10px 0px;
    border: 1px solid;
}
.icon {
    font-size: 35px;
    display: block;
}
.text {
    display: block;
    text-align: center;
    margin-top: 15px;
    font-size: 18px;
    font-weight: 500;
}
.ant-card {
    background: none;
    color: rgb(255, 255, 255);
    cursor: pointer;
    box-shadow: none;
    border: none;
    height: auto !important;
    margin-bottom: 20px;
}
/deep/.ant-tabs-bar {
    //   border-bottom: none;
    margin: 0;
}
/deep/.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    color: white;
    background: #272e48;
    //   border: none;
    font-weight: 500;
}
/deep/.ant-tabs-tabpane-active {
    background: #272e48;
    border-radius: 5px;
}
/deep/.ant-table-header,
/deep/.ant-table-thead > tr > th {
    background: none !important;
}
/deep/.ant-tree li .ant-tree-node-content-wrapper,
/deep/.ant-table-thead > tr > th,
/deep/.ant-table-tbody {
    color: white;
}
/deep/.ant-table-tbody
    > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td {
    background: none;
}

/deep/.ant-modal-title,
/deep/.ant-form-item-required {
    color: white !important;
    font-weight: 500;
}
.stepFormText {
    margin-bottom: 24px;
    .ant-form-item-label,
    .ant-form-item-control {
        line-height: 22px;
    }
}
/deep/label[title="内存"],
/deep/label[title="系统盘"] {
    color: white;
    font-weight: 500;
}
.slider_title {
    display: flex;
    justify-content: space-between;
}

.header {
    display: flex;
    align-items: center;
}
/deep/.ant-card-head-wrapper {
    padding-left: 20px;
    background: #272e48;
    border-radius: 10px;
}
.modules {
    border: none;
    border: 1px solid;
    background-color: #272e48;
}

// 详情
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
    border-radius: 10px;
    padding: 8px;
    .icon {
        font-size: 80px;
    }
    .icon_title {
        font-size: 20px;
        margin-top: 10px;
        text-align: center;
        color: bisque;
    }
    .modules_text {
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
.disabled {
    color: rgba(0, 0, 0, 0.25);
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    text-shadow: none;
    box-shadow: none;
    cursor: not-allowed;
}
/deep/.ant-tabs-tab-active.ant-tabs-tab {
    background: #1890ff !important;
}
</style>
