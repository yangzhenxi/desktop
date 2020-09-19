<template>
  <div v-if="visible">
    <a-card :title="modulesData.groupName">
      <a-row :gutter="16">
        <div class="header">
          <a-col :span="14">
            <a-row :gutter="[16,16]">
              <a-col :span="8">
                <div class="box" @click="OnlineEdit">
                  <m-icon
                    type="zaixianbianji"
                    class="icon zaixianbianji"></m-icon>
                  <span class="text">在线编辑</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div
                  class="box"
                  @click="$refs.ManageRelease.Add(modulesData)">
                  <m-icon
                    type="shangchuanmoban"
                    class="icon shangchuanmoban"></m-icon>
                  <span class="text">发布模版</span>
                </div>
              </a-col>
              <a-col
                :span="8"
                @click="$refs.ManageAttributes.Attribute(modulesData)">
                <div class="box">
                  <m-icon
                    type="tongji"
                    class="icon tongji"></m-icon>
                  <span class="text">属性模版</span>
                </div>
              </a-col>
              <a-col
                :span="8"
                @click="reduction">
                <div class="box">
                  <m-icon
                    type="huanyuan1"
                    class="icon huanyuan1"></m-icon>
                  <span class="text">版本还原</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div
                  class="box"
                  @click="merge">
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
          <a-col
            :span="10">
            <a-row
              class="modules"
              :gutter="16">
              <a-col
                :span="8"
                class="icon">
                <a-row
                  type="flex"
                  justify="center"
                  style="margin-top: 35px;">
                  <div>
                    <a-icon
                      class="icon"
                      type="windows" />
                  </div>
                  <div class="icon_title">{{ modulesData.image }}</div>
                </a-row>
              </a-col>
              <a-col :span="16">
                <div
                  class="modules_title"
                  style="margin:5px 0px">{{ modulesData.name }}</div>
                <div class="modules_text">
                  <span>所属分组: </span>
                  <span> {{ modulesData.groupName }}</span>
                </div>
                <div class="modules_text">
                  <span>所在服务器: </span>
                  <span>{{ modulesData.host }}</span>
                </div>
                <div class="modules_text">
                  <span>创建时间: </span>
                  <span>{{ modulesData.createTime }}</span>
                </div>
                <div class="modules_text">
                  <span>版本状态: </span>
                  <span>{{ modulesData.version }}</span>
                </div>
                <div class="modules_text">
                  <span>运行状态: </span>
                  <span>{{ modulesData.isRunning }}</span>
                </div>
                <div class="modules_text">
                  <span>IP: </span>
                  <span>{{ modulesData.ip }}</span>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </div>
      </a-row>
    </a-card>
    <a-card>
      <a-tabs
        type="card"
        @change="callback"
        :tabBarGutter="tabBarGutter">
        <a-tab-pane
          key="1"
          tab="版本">
          <m-table
            :columns="columns"
            :data="loadData"
            ref="table"
            rowKey="key">
            <template
              slot="action"
              slot-scope="text,record">
              <a-button
                type="primary"
                shape="circle"
                icon="form"
                @click="$refs.VersionEdit.Edit(record)"
                style="margin-right:20px" />
              <a-button
                type="danger"
                shape="circle"
                @click="VersionDelete(record)">
                <a-icon type="delete" />
              </a-button>
            </template>
          </m-table>
        </a-tab-pane>
        <a-tab-pane
          key="2"
          tab="硬件配置">
          <a-spin :spinning="loading">
            <a-form :form="form">
              <div style="height:30px;"></div>
              <a-form-item
                label="CPU核心数"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                class="stepFormText">
                <a-select
                  placeholder="请选择CPU核心数"
                  v-decorator="['cpuNum', { rules: [{required: true, message: '请选择CPU核心数'}] }]">
                  <a-select-option value="1">1</a-select-option>
                  <a-select-option value="2">2</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="插槽核心"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                class="stepFormText">
                <a-select
                  placeholder="请选择插槽核心"
                  v-decorator="['socket', { rules: [{required: true, message: '请选择插槽核心'}] }]">
                  <a-select-option value="1">1</a-select-option>
                  <a-select-option value="2">2</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="网络"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                class="stepFormText">
                <a-select
                  placeholder="请选择所属分组"
                  v-decorator="['network', { rules: [{required: true, message: '付款账户必须填写'}] }]">
                  <a-select-option v-for="(i,index) in netword" :key="index" :value="i.name">{{ i.name }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="内存"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                class="stepFormText">
                <div class="slider_title">
                  <div></div>
                  <a-tag color="#2db7f5">
                    32GB
                  </a-tag>
                </div>
                <a-slider
                  v-decorator="['memoryMB', { rules: [{required: true, message: '请选择内存数量'}] }]"
                  :min="2"
                  :max="32" />
              </a-form-item>
              <a-form-item
                label="系统盘"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                class="stepFormText">
                <div class="slider_title">
                  <div></div>
                  <a-tag color="#2db7f5">
                    32GB
                  </a-tag>
                </div>
                <a-slider
                  v-decorator="['capacityKB', { rules: [{required: true, message: '请选择系统盘'}] }]"
                  :min="80"
                  :max="300" />
              </a-form-item>
              <a-form-item :wrapperCol="{span: 10, offset: 12}">
                <a-button
                  type="primary"
                  style="margin-bottom:20px;"
                  @click="Configure">提交</a-button>
              </a-form-item>
            </a-form>
          </a-spin>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <x-managerelease
      ref="ManageRelease"
      @ok="$refs.table.refresh()"></x-managerelease>
    <x-manageattributes
      ref="ManageAttributes"
      @ok="handleOk"></x-manageattributes>
    <version-edit
      ref="VersionEdit"
      @ok="$refs.table.refresh()"></version-edit>
  </div>

</template>

<script>
import { MTable, MIcon } from '@/components/index'
import { mixinFormModal, mixinTable } from '@/utils/mixin'
import XManagerelease from './release'
import XManageattributes from './modulesAttribute'
import VersionEdit from './VersionEdit'
import {
  DesktopTemplateVersionList,
  DesktopTemplateVersionRevert,
  DesktopTemplatePatch,
  DesktopTemplateVersionMerge,
  DesktopTemplateVersionDelete,
  DesktopTemplateConfigure,
  DesktopTemplateDelete,
  DesktopTemplateNetworkList
} from '@/api/CloudDesktop/DesktopManagem'

export default {
  mixins: [mixinFormModal, mixinTable],
  components: {
    MIcon,
    MTable,
    XManagerelease,
    XManageattributes,
    VersionEdit
  },
  data () {
    return {
      tabBarGutter: 20,
      modulesData: {},
      span: '24',
      selectedRowKeys: [], // Check here to configure the default column
      netword: [], // 网络
        visible: false,
      columns: [
        {
          title: '版本号',
          dataIndex: 'version',
          sorter: true
        },
        {
          title: '版本名称',
          dataIndex: 'name',
          sorter: true
        },
        {
          title: '发布时间',
          dataIndex: 'createTime',
          sorter: true
        },
        {
          title: '版本描述',
          dataIndex: 'description',
          sorter: true
        },
        {
          title: '操作',
          sorter: true,
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
        this.queryParam.templateId = this.modulesData.id
        const data = this.deepGet(await DesktopTemplateVersionList(this.queryParam), 'data', [])
        return {
          data
        }
      }
    }
  },

  methods: {
      // 显示详情页面
        OnSingle (record) {
            this.visible = true
            this.modulesData = record
        },
      // 显示详情页面
        OffSingle (record) {
            this.visible = false
        },
      // 获取网络信息
   async  callback (key) {
      const obj = {
          host: this.modulesData.host
      }
      await DesktopTemplateNetworkList(obj).then((res) => {
          this.netword = this.deepGet(res, 'data', [])
      })
    },
    // 在线编辑
    OnlineEdit () {
      const obj = {
        name: this.modulesData.name
      }
      DesktopTemplatePatch(obj).then((res) => {
        window.location.href = res.data
      })
    },
    // 还原版本
    reduction () {
      this.$confirm({
        title: '将模版主机还原至' + this.modulesData.version + '版本，在线编辑的内容将丢失，是否继续?',
        content: '点击确定即可还原',
        onOk: () => {
          const obj = {
            name: this.$route.query.item.name
          }
          DesktopTemplateVersionRevert(obj).then((res) => {
            this.$message.success('还原成功')
          })
        }
      })
    },
    // 合并版本
    merge () {
      this.$confirm({
        title: '合并版本将会把此模板已经发布的所有版本合并成一个新的版本，确定合并么？',
        onOk: () => {
          const obj = {
            name: this.$route.query.item.name
          }
          DesktopTemplateVersionMerge(obj).then((res) => {
            this.$message.success('还原成功')
            this.$emit('ok', res)
          })
        }
      })
    },
    // 删除模版
    ModuleDelete () {
      this.$confirm({
        title: '删除要删除该模版',
        onOk: () => {
          console.log(this.modulesData)
          const obj = {
            name: this.modulesData.name
          }
          DesktopTemplateDelete(obj).then((res) => {
            this.$message.success('删除成功')
            this.$router.push({ name: 'DesktopManagem' })
          })
        }
      })
    },
    // 删除版本
    VersionDelete (record) {
      this.$confirm({
        title: '是否要删除该版本',
        onOk: () => {
          const obj = {
            id: record.id
          }
          DesktopTemplateVersionDelete(obj).then((res) => {
            this.$message.success('删除成功')
            this.$refs.table.refresh()
          })
        }
      })
    },
    // 硬件配置
    Configure () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
            values.name = this.modulesData.name
            values.capacityKB = values.capacityKB * 1024 * 1024
            values.memoryMB = values.memoryMB * 1024
          DesktopTemplateConfigure(values).then((res) => {
            this.$message.success('配置成功')
          })
          this.visible = false
        }
      })
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
  border-bottom: none;
  margin: 0;
}
/deep/.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
  color: white;
  background: #272e48;
  border: none;
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
/deep/.ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
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
/deep/label[title='内存'],
/deep/label[title='系统盘'] {
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
  border: 1px solid ;
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
    // cursor: pointer;
    color: bisque;
  }
  .modules_text {
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
