<template>
  <page-header-wrapper :title="false">
    <a-col :span="6">
      <a-card>
        <a-row class="tree_head">
          <a-col :span="11">
            <m-icon
              type="moban"
              class="icon" />
            <span
              class="All"
              style="font-size:15px;">所有模版</span>
          </a-col>
          <a-col :span="13">

            <span @click="$refs.Add.Add()">
              <m-icon
                type="yonghutianjia"
                class="icon" />
            </span>
            <span @click="$refs.Edit.Edit()">
              <m-icon
                type="xiugai"
                class="icon" />
            </span>
            <span @click="TreeDelete">
              <m-icon
                type="shanchu"
                class="icon" />
            </span>
          </a-col>
        </a-row>
        <tree
          :treeData="allBranchListGetter"
          :checkedval="checkedLeftval"
        ></tree>
      </a-card>
    </a-col>
  </page-header-wrapper>
</template>

<script>
import MIcon from '@/components/Icon'
import Tree from '../components/tree'
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
    Tree
  },
  data () {
    return {
      allBranchListGetter,
      checkedLeftval: ['99230713']
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
</style>
