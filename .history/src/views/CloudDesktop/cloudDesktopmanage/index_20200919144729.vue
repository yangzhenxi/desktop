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
                  @click="$refs.Add.Add(TPgroup.key,TPgroupNameList)">
                  <m-icon
                    type="yonghutianjia"
                    class="icon" />
                </a-button>
                <a-button
                  :disabled="disabled"
                  type="primary"
                  shape="circle"
                  style="margin-left:10px"
                  @click="$refs.Edit.Edit(TPgroup,TPgroupNameList)">
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
              <tree
                :treeData="allBranchListGetter"
                :selectedKeys="selectedKeys"
                @changecheckedval="changecheckedLeftval"></tree>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
  </page-header-wrapper>
</template>

<script>
import MIcon from '@/components/Icon'
import Tree from './Tree_modules/Tree'
import Empty from '@/components/Empty'

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
    Empty
  },
  data () {
    return {
      allBranchListGetter,
      checkedLeftval: ['99230713'],
      spinning: false,
      selectedKeys: [] // 初始化选中的模版组
    }
  },
  methods: {
    TreeDelete () {
      this.$confirm({
        title: '是否要删除' + this.queryParam.onName + '组?',
        content: '点击确定即可删除当前组',
        onOk: () => {
            this.$message.success('删除成功')
            this.handleTreeOk()
        }
      })
    },
    changecheckedLeftval (item) {
        this.record = item
    }
  }
}
</script>

<style lang="less" scoped>
.ant-progress-circle-wrap,
.ant-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
