<template>
  <a-tree
    :tree-data="treeData"
    show-icon
    :blockNode="blockNode"
    :defaultSelectedKeys="checkedval"
    default-expand-all>
    <template
      slot="custom"
      slot-scope="item">
      <div
        class="tree-view-item"
        @click="handleRadio(item.eventKey)">
        <span class="tree-view-left">
          <a-icon
            v-if="item.dataRef.scopedSlots.icon"
            :type="icon"
            :class="['icon',icon]" />
          {{ item.title }}
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
      type: Array,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      value: this.checkedval,
      blockNode: true
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
.tree-view-right{
    float: right;
}
.moban {
  font-size: 16px;
  margin-right: 10px;
}
/deep/.ant-tree-title{
    color: white;
}
.tree_head {
  margin-bottom: 15px;
}

.icon {
  cursor: pointer;
  font-size: 18px;
  margin: 0px 9px;
}

</style>
