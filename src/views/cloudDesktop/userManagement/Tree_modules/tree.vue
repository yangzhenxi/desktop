<template>
  <a-radio-group v-model="checkedval">
    <a-tree
      :style="style"
      :tree-data="treeData"
      show-icon
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
              type="guanyuwomen"
              class="icon guanyuwomen" />
            <a-radio :value="item.eventKey"></a-radio> {{ item.title }}
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
  </a-radio-group>

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
      item2: false,
      style: {
                  background: '#063478'

      }
    }
  },
  methods: {
    handleRadio (item) {
      this.value = item.eventKey
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
  width: 100%;
  span {
    div {
      display: flex;
      justify-content: space-between;
    }
  }
}
.guanyuwomen {
  font-size: 18px;
  margin-right: 10px;
}
</style>
