<template>
  <div>
    <ul>
      <li v-for="i in treeData" :key="i.baseDN" :class="i.name === value.name?'activeLI':''" @click="handlecheck(i)">
        <span>{{ i.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    treeData: {
      type: Array,
      required: true
    },
    checkedval: {
      type: Object,
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
      // 切换用户组
      handlecheck (item) {
          this.value = item
            this.$emit('changeval', item)
      },
    handleRadio (value) {
      this.value = value
      console.log(value)
    },
    handleClick (item, e) {
        console.log(item)
        console.log(e)
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
    border-radius: 5px;
    padding-left: 20px;
    // margin-bottom: 5px;
}
ul>li:hover{
    background: #1A233A;
}
.activeLI{
    background: #1A233A;
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
