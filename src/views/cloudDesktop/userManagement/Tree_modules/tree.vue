<template>
  <a-radio-group v-model="checkedval">
    <a-tree
      :tree-data="treeData"
      show-icon
      :blockNode="blockNode"
      default-expand-all>
      <template
        slot="custom"
        slot-scope="item">
        <div
          class="tree-view-item"
          @click="handleRadio(item.eventKey)">
          <span class="tree-view-left">
            <a-radio :value="item.eventKey"></a-radio> {{ item.title }}
          </span>
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
  </a-radio-group>

</template>
<script>
export default {
  props: {
    treeData: {
      type: Array,
      required: true
    },
    checkedval: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      value: this.checkedval,
      blockNode: true,
      item1: false,
      item2: false
    }
  },
  methods: {
    handleRadio (value) {
      this.value = value
      this.$emit('changecheckedval', value)
    }
  }
}
</script>

<style lang="less" scoped>
.ant-radio-group-default {
  width: 90%;
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
</style>
