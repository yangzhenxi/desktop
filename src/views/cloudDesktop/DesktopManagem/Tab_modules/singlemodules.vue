<template>
  <div v-if="visible">
    <a-spin :spinning="spinning">
      <a-card>
        <template slot="title">
          <div class="head-title">
            <span style="margin-left:15px;">模版名称：{{ moduleData.name }}</span>
            <a-button type="primary" @click="handleBack">返回</a-button>
          </div>
        </template>
        <a-row :gutter="16">
          <div class="header">
            <a-col :span="14">
              <a-row :gutter="[16,24]">
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
                    @click="release()">
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
                    style="margin:5px 0px">模版名：{{ moduleData.name }}</div>
                  <div class="modules_text" v-for="(i,index) in TPDetails" :key="index">
                    <span>{{ i.title }}:  </span>
                    <a-tag v-if="i.tag && i.tag ==='version'" color="#108ee9">
                      {{ i.value | Isversion }}
                    </a-tag>
                    <a-tag v-else-if="i.tag && i.tag ==='running'" :color="toDict(i.value,'C_STATE').color">
                      {{ i.value | convert('C_STATE') }}
                    </a-tag>
                    <span v-else>{{ i.value }}</span>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </div>
        </a-row>
      </a-card>
      <a-card style="min-height:460px;height:100%;margin-bottom:0px;">
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
import { isNumber } from '@/utils/util'
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
			if (!isNumber(item)) {
				return item
			}
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
            Version: state => state.DesktopManage.Version,
            ModuleData: state => state.DesktopManage.ModuleData
        })
	},
	watch: {
		'$store.state.DesktopManage.ModuleData': {
			deep: true,
			handler: function (newdata) {
				this.TPDetails = this.TPDetails.map(u => {
					return Object.assign(u, {
						value: this.deepGet(newdata, u.key)
					})
				})
			}
		}
	},
    data () {
        return {
            moduleData: {},
            span: '24',
            selectedRowKeys: [], // Check here to configure the deffault column
            visible: false,
			spinning: true,
			TPDetails: [
				{
					title: '所属分组',
					key: 'group_name',
					value: '默认分组',
					tag: false,
					filters: false
				},
				{
					title: '主机',
					key: 'host',
					value: '192.168.5.100',
					tag: false,
					filters: false
				},
				{
					title: '最新版本',
					key: 'version',
					value: '1',
					tag: 'version',
					filters: false
				},
				{
					title: '运行状态',
					key: 'is_running',
					value: '开启',
					tag: 'running',
					filters: 'C_STATE'
				},
				{
					title: 'IP',
					key: 'ip',
					value: '192.168.2.53',
					tag: false,
					filters: false
				},
				{
					title: '创建时间',
					key: 'create_time',
					value: '2020-09-30',
					tag: false,
					filters: false
				}
			]
        }
    },
    methods: {
        ...mapMutations(['SET_MODULEDATA', 'SET_TEMPLATEID', 'SET_DISABLED']),
        // 显示详情页面
        async OnSingle (record) {
            this.visible = true
            this.SET_TEMPLATEID(record.id)
            this.moduleData = this.deepGet(
                await DesktopGetTemplate({ id: record.id }),
                'data',
                []
            )
            this.SET_MODULEDATA(this.moduleData)
			this.Isdisabled()
			this.moduleData.create_time = this.convert(this.moduleData.create_time, 'unix', 'YYYY-MM-DD')
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
        async OnlineEdit () {
            const obj = { name: this.moduleData.name }
            DesktopTemplatePatch(obj).then(res => { window.location.href = res.data })
            this.moduleData.is_running = '开启'
            this.SET_MODULEDATA(this.moduleData)
        },
        // 还原版本
        reduction () {
            if (!this.disabled) {
                this.$confirm({
                    title:
                        '将模版主机还原至V' +
                        this.Version[this.Version.length - 1].version +
                        '版本，在线编辑的内容将丢失，是否继续?',
                    content: '点击确定即可还原',
                    okType: 'danger',
                    onOk: () => {
                        return new Promise((resolve, reject) => {
                            const obj = {
                                name: this.moduleData.name
                            }
                            DesktopTemplateVersionRevert(obj)
                                .then(res => {
                                    this.$message.success('还原成功')
                                    this.OnSingle(this.moduleData)
                                    this.$refs.tabs.$refs.tab1.$refs.table.refresh()
                                    resolve()
                                })
                                .catch(() => {
                                    this.$message.error('还原失败')
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
                    okType: 'danger',
                    onOk: () => {
                        return new Promise((resolve, reject) => {
                            const obj = {
                                name: this.moduleData.name
                            }
                            DesktopTemplateVersionMerge(obj)
                                .then(res => {
                                    this.$message.success('合并成功')
                                    this.OnSingle(this.moduleData)
                                    this.$refs.tabs.$refs.tab1.$refs.table.refresh()
                                    resolve()
                                })
                                .catch(() => {
                                    this.$message.error('还原失败')
                                    resolve()
                                })
                        })
                    }
                })
            }
        },
        // 删除模版
        async ModuleDelete () {
            this.$confirm({
                title: '删除要删除该模版',
                okType: 'danger',
                onOk: () => {
                    return new Promise(async (resolve, reject) => {
                        const res = this.deepGet(
                            await DesktopGetTemplate({
                                id: this.moduleData.id
                            }),
                            'data',
                            []
                        )
                        if (res.is_running === '关机') {
                            DesktopTemplateDelete({
                                name: this.moduleData.name
                            })
                                .then(res => {
                                    this.$message.success('删除成功')
                                    this.visible = true
                                    this.$emit('handleBack')
                                    resolve()
                                })
                                .catch(() => {
                                    this.$message.error('删除失败')
                                    resolve()
                                })
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
        // 发布版本
        Release (res) {
            if (res) {
                this.moduleData.version = parseInt(this.moduleData.version) + 1
            }
            this.Isdisabled()
            this.$refs.tabs.$refs.tab1.$refs.table.refresh()
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
		},
		// 发布快照
		release () {
			this.moduleData.is_running === '开启' ? this.$message.info('请先将模版挂起或者关机在进行操作') : this.$refs.ManageRelease.Add(this.moduleData)
		},
		isNumber
    }
}
</script>

<style lang="less" scoped>
.head-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
        color:white;
    }
}
.box {
    background: #272e48;
    border-radius: 10px;
    padding: 13px 0px;
    border: 1px solid;
}
.box:hover{
	background: #0c1433;
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
}
/deep/.ant-card-head-wrapper {
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
    display: flex;
    .icon {
		font-size: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
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
		padding: 3px 0px;
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
