<template>
  <a-directory-tree
    multiple
    v-if="treeData && treeData.length"
    :tree-data="treeData"
    show-icon
    :selectedKeys="selectedKeys"
    :blockNode="blockNode"
    default-expand-all>
    <template
      slot="custom"
      slot-scope="item">
      <div
        class="tree-view-item"
        @click="handleRadio(item)">
        <span class="tree-view-left">
          <m-icon
            v-if="item.dataRef.scopedSlots.icon"
            class="icon"
            :style="{fontSize:item.dataRef.scopedSlots.size}"
            :type="item.dataRef.scopedSlots.icon" />
          {{ item.title }}
        </span>
        <div class="tree-view-right">
          <a-badge
            :count="item.dataRef.userCount"
            :number-style="{
              backgroundColor: '#fff',
              color: '#999',
              boxShadow: '0 0 0 1px #d9d9d9 inset',
            }" />
        </div>
      </div>
    </template>
  </a-directory-tree>

</template>
<script>
import MIcon from '@/components/Icon'
export default {
  components: {
    MIcon
  },
  props: {
    treeData: {
      type: Array,
      required: true
    },
    selectedKeys: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      blockNode: true
    }
  },
  methods: {
    handleRadio (item) {
      this.$emit('changecheckedval', item)
    }

  }
}
</script>

<style lang="less" scoped>
/deep/.ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper:hover, .ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper:hover{
  background:#1a233a !important
}
/deep/.ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper:hover::before, .ant-tree.ant-tree-directory .ant-tree-child-tree > /deep/li span.ant-tree-node-content-wrapper:hover::before{
  background:#1a233a !important
}
.ant-radio-group-default {
  width: 90%;
}

.tree-view-right{
    float: right;
}
.guanyuwomen {
  font-size: 18px;
  margin-right: 10px;
}
/deep/ .ant-tree li span.ant-tree-node-content-wrapper {
  width: 100%;
  span {
    div {
      display: flex;
      justify-content: space-between;
    }
  }
}
.icon {
  font-size: 16px;
  margin-right: 5px;
}
/deep/.ant-tree-title{
    color: white;
}
/deep/span.ant-tree-switcher.ant-tree-switcher_open,/deep/span.ant-tree-switcher.ant-tree-switcher_close {
    color: white;
}
</style>
