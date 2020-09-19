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

</style>
