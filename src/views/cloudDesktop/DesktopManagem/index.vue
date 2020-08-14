<template>
  <a-row>
    <a-col :span="12">
      <a-card>
        <a-tree
          checkable
          checkStrictly
          :checkedKeys="checkedKeys"
          :tree-data="allBranchListGetter"
          :default-expanded-keys="['0-0-0', '0-0-1']"
          :default-checked-keys="['0-0-0', '0-0-1']"
          @check="onCheck">
          <template slot="custom" slot-scope="item">
            <div class="tree-view-item">
              <span class="tree-view-left">{{ item.title }}</span>
              <div class="tree-view-right">
                <a-badge
                  count="4"
                  :number-style="{
                    backgroundColor: '#fff',
                    color: '#999',
                    boxShadow: '0 0 0 1px #d9d9d9 inset',
                  }" />
              </div>
            </div>
          </template>
        </a-tree>
      </a-card>
    </a-col>
  </a-row>

</template>
<script>
const allBranchListGetter = [
    {
        'key': '99230713',
        'title': '万科集团',
        // ⚠️重点这这里⚠️每一条数据上都添加scopedSlots属性
        'scopedSlots': {
            'title': 'custom'
        },
        'children': [
            {
                'key': '99230992',
                'title': '华东区域',
                'scopedSlots': {
                    'title': 'custom'
                },
                'children': [
                    {
                        'key': '99230112',
                        'title': '杭州万科',
                        'scopedSlots': {
                            'title': 'custom'
                        },
                        'children': []
                    }
                ]
            },
            {
                'key': '99230993',
                'title': '华南区域',
                'scopedSlots': {
                    'title': 'custom'
                },
                'children': []
            },
            {
                'key': '99231020',
                'title': '华北区域',
                'scopedSlots': {
                    'title': 'custom'
                },
                'children': []
            }
        ]
    }
]

export default {
  data () {
    return {
      allBranchListGetter,
      treeList: ['title0001', 'title0002'],
      checkedKeys: []
    }
  },
  methods: {
    onCheck (checkedKeys, info) {
      this.checkedKeys = []
      const length = checkedKeys.checked.length - 1
      this.checkedKeys.push(checkedKeys.checked[length])
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-tree li span.ant-tree-node-content-wrapper{
    width: 80%;
    span{
        div{
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
