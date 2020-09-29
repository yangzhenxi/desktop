<template>
  <div>
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
            <m-icon
              v-if="item.dataRef.scopedSlots.icon"
              type="moban"
              class="icon moban" />
            {{ item.title }}
            {{ selectedKeys }}
          </span>
          <div class="tree-view-right">
          </div>
        </div>
      </template>
    </a-tree>
  </div>

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
.ant-radio-group-default {
  width: 90%;
}
/deep/ .ant-tree li span.ant-tree-node-content-wrapper {
  width: 90%;
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
