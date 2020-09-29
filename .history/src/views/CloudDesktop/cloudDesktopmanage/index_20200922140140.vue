<template>
  <page-header-wrapper :title="false">
    <a-spin :spinning="spinning">
      <a-row :gutter="16">
        <a-col :span="6">
          <empty
            v-if="0"
            :isEmpty="0" ></empty>
          <a-card v-else>
            <a-row tree_head type="flex" justify="end">
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
              <a-col :span="14" class="flex_end">
                <a-button
                  :disabled="disabled"
                  type="primary"
                  shape="circle"
                  @click="$refs.TreeAdd.Add()">
                  <m-icon
                    type="yonghutianjia"
                    class="icon" />
                </a-button>
                <a-button
                  :disabled="disabled"
                  type="primary"
                  shape="circle"
                  style="margin-left:10px"
                  @click="$refs.TreeEdit.Edit()">
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
              :treeData="allBranchListGetter"
              :selectedKeys="selectedKeys"
              @changecheckedval="changecheckedLeftval"></tree>
          </a-card>
        </a-col>
        <a-col :span="18">
          <empty
            v-if="0"
            :isEmpty="0" />
          <div v-else>
            <div v-if="IsAllmodule">
              <div class="title"> 测试教师01</div>
              <a-card>
                <a-row :gutter="[36,24]" >
                  <a-col :span="8" @click="$refs.ModulesAdd.Add()">
                    <a-row
                      class="icon-modules"
                      align="middle"
                      type="flex"
                      justify="center" >
                      <div class="add">
                        <a-col>
                          <a-icon type="plus-circle" />
                        </a-col>
                      </div>
                    </a-row>
                  </a-col>
                  <a-col
                    :span="8"
                    v-for=" (i,index) in TPpageList"
                    :key="index">
                    <a-row
                      class="modules"
                      :gutter="16">
                      <a-col :span="8">
                        <a-row style="margin-top: 35px;">
                          <a-icon
                            class="icon"
                            type="windows" />
                          <div class="icon_title">HL_Win7x86</div>
                        </a-row>
                      </a-col>
                      <a-col :span="16">
                        <div
                          class="modules_title"
                          style="margin:5px 0px">Test模版</div>
                        <div class="text">
                          <span>创建者: </span>
                          <span> groupName</span>
                        </div>
                        <div class="text">
                          <span>注册/未注册数量: </span>
                          <span>0/20</span>
                        </div>
                        <div class="text">
                          <span>桌面类型: </span>
                          <span>随机桌面</span>
                        </div>
                        <div class="text">
                          <span>维护状态: </span>
                          <a-tag color="#108ee9">
                            是
                          </a-tag>
                        </div>
                        <div class="text" style="overflow: inherit;">
                          <span>电源状态: </span>
                          开启
                        <!-- <a-badge :number-style="{backgroundColor: toDict(i.isRunning,'C_STATE').color}" :count="i.isRunning | convert('C_STATE')" /> -->
                        </div>
                        <div class="text">
                          <span>创建时间 </span>
                          <span>2020/8/19</span>
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
                  <a-col :span="8">
                    <a-row
                      class="modules"
                      :gutter="16">
                      <a-col :span="8">
                        <a-row style="margin-top: 35px;">
                          <a-icon
                            class="icon"
                            type="windows" />
                          <div class="icon_title">HL_Win7x86</div>
                        </a-row>
                      </a-col>
                      <a-col :span="16">
                      </a-col>
                      <!-- <div class="hover">
                        <a-icon
                          type="form"
                          @click="details(i)"
                          class="details" />
                        <a-icon
                          type="delete"
                          @click="Delete(i)"
                          class="delete" />
                      </div> -->
                    </a-row>
                  </a-col>
                </a-row>
                <a-pagination
                  style="float:right"
                  :total="5"
                  :show-total="total => `共 5 条数据`"
                  :page-size="9"
                  @change="changePage"
                  :default-current="1" />
              </a-card>
            </div>
            <singlemodules
              ref="Single"
            ></singlemodules>
          </div>
        </a-col>
      </a-row>
      <tree-add ref="TreeAdd" @ok="getCloudList"></tree-add>
      <tree-edit ref="TreeEdit" @ok="getCloudList"></tree-edit>
      <module-add ref="ModulesAdd" @ok="getCloudList"></module-add>
    </a-spin>
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
  components: {
    MIcon,
    Tree,
    Empty,
    TreeEdit,
    TreeAdd,
    Singlemodules,
    ModuleAdd
  },
  data () {
    return {
      allBranchListGetter,
      spinning: false, // 判定加载
      selectedKeys: [], // 初始化选中的模版组
      TPpageList: [1, 2, 3, 4, 5, 6], // 模版列表
      IsAllmodule: true, // 桌面列表是否显示
      disabled: false
    }
  },
  methods: {
      // 删除Tree
    TreeDelete () {
      this.$confirm({
        title: '是否要删除',
        content: '点击确定即可删除当前组',
        onOk: () => {
            this.$message.success('删除成功')
            this.handleTreeOk()
        }
      })
    },
    changecheckedLeftval (item) {
        this.record = item
    },
    // 分页
    changePage (page, pagesize) {

    },
    //
    getCloudList () {

    },
    // 桌面详情
    details (item) {
         this.IsAllmodule = false
         console.log(this.$refs.Single)
        this.$refs.Single.OnSingle(item)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-card-head-title{
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
  height:197px;
  .add {
    font-size: 100px;
  }
}
.modules {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px;
  .modules_title {
    font-size: 17px;
    font-weight: 500;
    }
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
