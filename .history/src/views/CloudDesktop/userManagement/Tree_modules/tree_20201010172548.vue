<template>
  <a-tree
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
          <a-icon
            v-if="item.dataRef.scopedSlots.icon"
            class="icon"
            type="user" />
          {{ item.title }}
        </span>
        <div class="tree-view-right">
          <a-badge
            :count="item.dataRef.childrenLength"
            :number-style="{
              backgroundColor: '#fff',
              color: '#999',
              boxShadow: '0 0 0 1px #d9d9d9 inset',
            }" />
        </div>
      </div>
    </template>
  </a-tree>

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
        console.log(item)
      this.$emit('changecheckedval', item)
    }

  }
}
</script>

<style lang="less" scoped>
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
.moban {
  font-size: 16px;
  margin-right: 10px;
}
/deep/.ant-tree-title{
    color: white;
}
</style>
