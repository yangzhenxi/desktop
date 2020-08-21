<template>
  <page-header-wrapper>
    <a-row :gutter="16">
      <a-col
        :xl="6"
        :md="24"
        :sm="24">
        <a-card>
          <a-row class="tree_head">
            <a-col
              :xl="11"
              :md="11"
              :sm="11">
              <m-icon
                type="moban"
                class="icon" />
              <span
                class="All"
                style="font-size:17px;">所有模版</span>
            </a-col>
            <a-col
              :xl="13"
              :md="13"
              :sm="13">

              <span @click="$refs.Add.Add()">
                <m-icon
                  type="yonghutianjia"
                  class="icon" />
              </span>
              <span>
                <m-icon
                  type="xiugai"
                  class="icon" />
              </span>
              <span>

                <m-icon
                  type="shanchu"
                  class="icon" />
              </span>
            </a-col>
          </a-row>
          <tree
            :treeData="allBranchListGetter"
            :checkedval="checkedval"
            @changecheckedval="changecheckedval"></tree>
        </a-card>
      </a-col>

      <a-col
        :xl="18"
        :md="24"
        :sm="24">
        <a-card title="全部">
          <div class="btns">
            <a-button
              type="primary"
              @click="$refs.ManageAdd.Add()">新建模版</a-button>
            <a-button type="primary">在线编辑</a-button>
            <a-button type="primary">发布模版</a-button>
            <a-button type="primary">重新生成</a-button>
            <a-button type="primary">还原版本</a-button>
            <a-button type="primary">合并版本</a-button>
            <a-button type="primary">模版恢复</a-button>
            <a-button type="danger">删除</a-button>
          </div>
          <a-row :gutter="16">
            <a-col
              :xxl="8"
              :xl="12"
              :md="12"
              :sm="24">
              <a-row class="modules">
                <a-col :xl="8" :md="12" :sm="24">
                  <m-icon type="windows1" class="windows1"></m-icon>
                </a-col>
                <a-col :xl="16" :md="12" :sm="24">
                  <div class="title">计算机基础</div>
                  <div class="text">
                    <span>所属分组: </span>
                    <span>基础模版</span>
                  </div>
                  <div class="text">
                    <span>创建者: </span>
                    <span>基础模版</span>
                  </div>
                  <div class="text">
                    <span>桌面数量: </span>
                    <span>基础模版</span>
                  </div>
                  <div class="text">
                    <span>所在服务器: </span>
                    <span>基础模版</span>
                  </div>
                  <div class="text">
                    <span>创建时间: </span>
                    <span>基础模版</span>
                  </div>
                  <div class="text">
                    <span>版本状态: </span>
                    <span>基础模版</span>
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col
              :xxl="8"
              :xl="12"
              :md="12"
              :sm="24">
              abc
            </a-col>
            <a-col
              :xl="8"
              :md="12"
              :sm="24">
              abc
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <x-treeadd
      ref="Add"
      @ok="handleOk"></x-treeadd>
    <x-manageadd
      ref="ManageAdd"
      @ok="handleOk"></x-manageadd>
  </page-header-wrapper>
</template>

<script>
import { mixinTable } from '@/utils/mixin'

import MIcon from '@/components/Icon'
import Tree from './Tree_modules/tree'
import XTreeadd from './Tree_modules/Add'
import XManageadd from './Tab_modules/manageAdd'
const allBranchListGetter = [
  {
    key: '99230713',
    title: '豪联科技',
    // ⚠️重点这这里⚠️每一条数据上都添加scopedSlots属性
    scopedSlots: {
      title: 'custom',
      icon: 'smile'
    },
    children: [
      {
        key: '99230992',
        title: '软件部',
        scopedSlots: {
          title: 'custom',
          icon: 'smile'
        },
        children: [
          {
            key: '99230112',
            title: '前端',
            scopedSlots: {
              title: 'custom'
            },
            children: []
          },
          {
            key: '9923011222',
            title: '后端',
            scopedSlots: {
              title: 'custom'
            },
            children: []
          },
          {
            key: '992307222',
            title: '测试',
            scopedSlots: {
              title: 'custom'
            },
            children: []
          }
        ]
      },
      {
        key: '99230993',
        title: '人事',
        scopedSlots: {
          title: 'custom',
          icon: 'smile',
          id: '4'
        },
        children: [
          {
            key: '99230152',
            title: '行政',
            scopedSlots: {
              title: 'custom'
            },
            children: []
          },
          {
            key: '9923015222',
            title: '商务助理',
            scopedSlots: {
              title: 'custom'
            },
            children: []
          }
        ]
      },
      {
        key: '99231020',
        title: '实施',
        scopedSlots: {
          title: 'custom',
          icon: 'smile'
        },
        children: []
      },
      {
        key: '99231050',
        title: '财务',
        scopedSlots: {
          title: 'custom',
          icon: 'smile'
        },
        children: []
      }
    ]
  }
]
export default {
  mixins: [mixinTable],
  components: {
    MIcon,
    Tree,
    XTreeadd,
    XManageadd
  },
  data () {
    return {
      allBranchListGetter,
      checkedval: 'null'
    }
  },
  methods: {
    changecheckedval (value) {
      this.checkedval = value
    }
  }
}
</script>

<style lang="less" scoped>
.icon {
  cursor: pointer;
  font-size: 20px;
  margin: 0px 10px;
}
.tree_head {
  margin-bottom: 15px;
}
.btns {
  button {
    margin-right: 10px;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1500) {
  .All {
    display: none;
  }
}
.modules{
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    .title{
        margin-top: 20px;
    }
    .text{
        font-size: 15px;
          margin: 5px 0px;
    }
    .text:last-child{
        margin-bottom: 20px;
    }
}
.windows1{
    margin-top: 30px;
    font-size: 100px;
    width: 100%;
}

</style>
