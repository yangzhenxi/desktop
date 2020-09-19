<template>
  <div>
    <div class="title"> 软件部 </div>
    <!-- <div class="btns">
      <a-button
        type="primary"
        @click="$refs.ManageAdd.Add()">新建模版</a-button>
      <a-button
        type="primary"
        :disabled="disabled">在线编辑</a-button>
      <a-button
        type="primary"
        :disabled="disabled"
        @click="$refs.ManageRelease.Add()">发布模版</a-button>
      <a-button
        type="primary"
        :disabled="disabled"
        @click="Re">重新生成</a-button>
      <a-button
        type="primary"
        :disabled="disabled"
        @click="reduction">还原版本</a-button>
      <a-button
        type="primary"
        :disabled="disabled"
        @click="merge">合并版本</a-button>
      <a-button
        type="primary"
        :disabled="disabled"
        @click="restore">模版恢复</a-button>
      <a-button
        type="danger"
        :disabled="disabled"
        @click="ModuleDelete">删除</a-button>
    </div> -->
    <a-card style="height:635px;">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-row class="icon-modules" style="height:221px;" align="middle" type="flex" justify="center">
            <div class="add">
              <a-col>
                <a-icon type="plus-circle" />
              </a-col>
            </div>
          </a-row>
        </a-col>
        <a-col :span="8">
          <a-row class="modules" type="flex" justify="center" :gutter="16">
            <a-col :span="8" class="icon">
              <a-row type="flex" justify="center" style="margin-top: 35px;">
                <div>
                  <a-icon class="icon" type="windows" />
                </div>
                <div class="icon_title">Win7Test</div>
              </a-row>
            </a-col>
            <a-col :span="16">
              <div class="title" style="margin:5px 0px">计算机基础</div>
              <div class="text">
                <span>所属分组: </span>
                <span> 基础模版</span>
              </div>
              <div class="text">
                <span>创建者: </span>
                <span>admin</span>
              </div>
              <div class="text">
                <span>所在服务器: </span>
                <span> Dec01Xen-1</span>
              </div>
              <div class="text">
                <span>创建时间: </span>
                <span>2020年8月13日</span>
              </div>
              <div class="text">
                <span>版本状态: </span>
                <span>V7</span>
              </div>
              <div class="text">
                <span>运行状态: </span>
                <span>装在运行</span>
              </div>
              <div class="text">
                <span>IP: </span>
                <span>192.168.2.78</span>
              </div>
            </a-col>
            <div class="hover">
              <a-icon type="form" class="details"/>
              <a-icon type="delete" class="delete" />
            </div>
          </a-row>
        </a-col>
      </a-row>
      <a-pagination
        :total="6"
        :show-total="total => `共 ${total} 条数据`"
        :page-size="10"
        :default-current="1" />
      <x-manageadd
        ref="ManageAdd"
        @ok="handleOk"></x-manageadd>
      <x-managerelease
        ref="ManageRelease"
        @ok="handleOk"></x-managerelease>
    </a-card>
  </div>
</template>

<script>
import { mixinTable } from '@/utils/mixin'
import ModulesInfo from './modulesinfo'
import XManageadd from './manageAdd'
import XManagerelease from './release'
import MIcon from '@/components/Icon'

const modulesData = [
        {
          title: '计算机基础',
          text: {
            Belonging: '计算机基础',
            creator: '计算机基础',
            DesktopsNum: '计算机基础',
            server: '计算机基础',
            date: '计算机基础',
            status: '计算机基础'
          }
        },
        {
          title: '计算机基础',
          text: {
            Belonging: '计算机基础',
            creator: '计算机基础',
            DesktopsNum: '计算机基础',
            server: '计算机基础',
            date: '计算机基础',
            status: '计算机基础'
          }
        },
        {
          title: '计算机基础',
          text: {
            Belonging: '计算机基础',
            creator: '计算机基础',
            DesktopsNum: '计算机基础',
            server: '计算机基础',
            date: '计算机基础',
            status: '计算机基础'
          }
        },
        {
          title: '计算机基础',
          text: {
            Belonging: '计算机基础',
            creator: '计算机基础',
            DesktopsNum: '计算机基础',
            server: '计算机基础',
            date: '计算机基础',
            status: '计算机基础'
          }
        },
        {
          title: '计算机基础',
          text: {
            Belonging: '计算机基础',
            creator: '计算机基础',
            DesktopsNum: '计算机基础',
            server: '计算机基础',
            date: '计算机基础',
            status: '计算机基础'
          }
        },
        {
          title: '计算机基础',
          text: {
            Belonging: '计算机基础',
            creator: '计算机基础',
            DesktopsNum: '计算机基础',
            server: '计算机基础',
            date: '计算机基础',
            status: '计算机基础'
          }
        }

]
export default {
  mixins: [mixinTable],
  components: {
    ModulesInfo,
    XManageadd,
    XManagerelease,
    MIcon
  },
  data () {
    return {
      disabled: true,
      checkedRightval: 'null',
      modulesData,
      span: '8'
    }
  },
  methods: {
    changecheckedRightval (value) {
      this.disabled = false
      this.checkedRightval = value
    },
    // 重新生成
    Re () {
      this.$confirm({
        title: '确定重新生成么?',
        content: '点击确定即可重新生成',
        onOk () {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        }
      })
    },
    // 还原版本
    reduction () {
      this.$confirm({
        title: '将模版主机还原至2号版本，在线编辑的内容将丢失，是否继续?',
        content: '点击确定即可还原',
        onOk () {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        }
      })
    },
    // 合并版本
    merge () {
      this.$confirm({
        title: '合并版本将会把此模板已经发布的所有版本合并成一个新的版本，确定合并么？',
        onOk () {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        }
      })
    },
    // 模版恢复
    restore () {
      this.$confirm({
        title: '该功能主要是针对于两种情况可以进行模板恢复，模板所对应的虚拟机被删除、模板的最大级别的快照被删除。',
        onOk () {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        }
      })
    },
    ModuleDelete () {
      this.$confirm({
        title: '删除后将无法恢复，确定删除么',
        onOk () {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pagination {
  float: right;
  margin-right: 20px;
  margin-top: 20px;
  color: white;
}
.title{
    font-size: 17px;
    font-weight: 500;
}
.icon-modules{
    border: 1px solid #ccc;
    border-radius: 10px;
    .add{
        font-size: 100px;

    }
}
.modules{
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 8px;
    .icon{
        font-size: 80px;
    }
    .icon_title{
        font-size: 20px;
        margin-top: 10px;
        // cursor: pointer;
        color: bisque;
    }
    .text{
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .hover{
        position: absolute;
        right: 0px;
        font-size: 20px;
        // display: none;
        i{
            padding-right: 20px;
        }
        .delete{
            color:red
        }
        .details{
            color: #16bedd;
        }
    }
}
.modules:hover > .hover{
    display: block;
}
</style>
