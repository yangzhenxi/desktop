<template>
  <div>
    <ul>
      <li v-for="i in treeData" :key="i">
        <span>{{ i }}</span>
      </li>
    </ul>
  </div>
  <!-- <a-tree
    :tree-data="treeData"
    show-icon
    :blockNode="blockNode"
    :defaultSelectedKeys="checkedval"
    @select="handleClick"

    default-expand-all>
    <template
      slot="custom"
      slot-scope="item">
      <div
        class="tree-view-item"
        @click="handleRadio(item.eventKey)">
        <span class="tree-view-left">
          <m-icon
            v-if="item.dataRef.scopedSlots.icon"
            type="moban"
            class="icon moban" />
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
  </a-tree> -->

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
      console.log(value)
    },
    handleClick (item, e) {
        console.log(item)
        console.log(e)
      this.$emit('changecheckedval', e.node.title)
    }
  }
}
</script>

<style lang="less" scoped>
ul{
    padding: 0px;
}
ul> li{
    padding: 5px;
    background: #1A233A;
    border-radius: 5px;
    padding-left: 20px;
}

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
