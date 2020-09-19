<template>
  <div>
    <empty v-if="!treeData.length" :isEmpty="!treeData.length"/>
    <ul>
      <li v-for="i in treeData" :key="i.baseDN" :class="i.name === checkedval?'activeLI':''" @click="handlecheck(i)">
        <m-icon
          type="guanyuwomen"
          class="icon guanyuwomen" />{{ i.name }}
      </li>
    </ul>
  </div>
</template>
<script>
import Empty from '@/components/Empty'
import { MIcon } from '@/components'

export default {
    components: {
    Empty,
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
    margin: 5px;
    padding: 3px;
    border-radius: 5px;
}
ul>li:hover{
    background: #1A233A;
}
.activeLI{
    background: #1A233A;
}
.icon{
    font-size:16px;
    padding-right: 10px;
}
.icon + span{
    font-size:16px;
}

</style>
