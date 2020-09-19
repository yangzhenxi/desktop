<template>
  <div>
    <empty v-if="!treeData.length" :isEmpty="!treeData.length"/>
    <ul>
      <li v-for="i in treeData" :key="i.baseDN" :class="i.name === value.name?'activeLI':''" @click="handlecheck(i)">
        <a-icon
          class="icon"
          type="user" /><span>{{ i.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import Empty from '@/components/Empty'
export default {
    components: {
    Empty
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
.icon{
    font-size:18px;
    padding-right: 10px;
}
.icon + span{
    font-size:16px;
}

</style>
