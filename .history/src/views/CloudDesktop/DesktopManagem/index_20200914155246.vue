<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card>
          <a-row class="tree_head">
            <a-col :span="11">
              <m-icon
                type="moban"
                class="icon"
                style="font-size:18px;" />
              <span
                @click="Allmodules"
                class="All"
                style="font-size:15px;">所有模版</span>
            </a-col>
            <a-col :span="13">
              <a-button type="primary" shape="circle" @click="$refs.Add.Add()">
                <m-icon
                  type="yonghutianjia"
                  class="icon" />
              </a-button>
              <a-button type="primary" shape="circle" style="margin-left:20px" @click="$refs.Edit.Edit()">
                <m-icon
                  type="xiugai"
                  class="icon" />
              </a-button>
              <a-button style="margin-left:20px" type="danger" shape="circle" @click="TreeDelete">
                <m-icon
                  type="shanchu"
                  class="icon" />
              </a-button>

            </a-col>
          </a-row>
          <tree
            :treeData="allBranchListGetter"
            :checkedval="checkedLeftval"
            @changecheckedval="changecheckedLeftval"></tree>
        </a-card>
      </a-col>

      <a-col :span="18">
        <router-view/>
      </a-col>
    </a-row>
    <x-treeadd
      ref="Add"
      @ok="handleOk"></x-treeadd>
    <x-treeedit
      ref="Edit"
      @ok="handleOk"></x-treeedit>
    <x-manageadd
      ref="ManageAdd"
      @ok="handleOk"></x-manageadd>
    <x-managerelease
      ref="ManageRelease"
      @ok="handleOk"></x-managerelease>
  </page-header-wrapper>
</template>

<script>
import MIcon from '@/components/Icon'
import Tree from './Tree_modules/tree'
import XTreeadd from './Tree_modules/Add'
import XTreeedit from './Tree_modules/Edit'
import XManageadd from './Tab_modules/manageAdd'
import XManagerelease from './Tab_modules/release'
import { mixinTable } from '@/utils/mixin'

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
    XManageadd,
    XTreeedit,
    XManagerelease
  },
  data () {
    return {
      allBranchListGetter,
      checkedLeftval: 'null'
    }
  },
  methods: {
    changecheckedLeftval (value) {
      this.checkedLeftval = value
      this.$router.push({ path: `/CloudDesktop/DesktopManagem/${value}/singlemodules` })
    },

    TreeDelete () {
      this.$confirm({
        title: '是否要删除当前组?',
        content: '点击确定即可删除当前组',
        onOk () {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        }
      })
    },
    Allmodules () {
        this.$router.push('/CloudDesktop/DesktopManagem/')
    }
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
/deep/.ant-card {
  background: #272E48;
  color: rgb(255, 255, 255);
  cursor: pointer;
  box-shadow: none;
  border: none;
  height: 770px;
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

</style>
