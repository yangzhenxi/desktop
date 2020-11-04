<template>
  <div>
    <a-card>
      <template slot="title" style="color:thite">
        桌面  总共660个  其中
        <m-icon type="shape" class="icon shape blue"/>
        2354
        <m-icon type="shape" class="icon shape"/>
        3392
      </template>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        场景名
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;" :hoverable="false">
        桌面数量
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        运行数量
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        关闭数量
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        ATA考试
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        310
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        0
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        310
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        测试桌面
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        350
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        0
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center;padding: 12px;">
        350
      </a-card-grid>
    </a-card>
  </div>
</template>

<script>
import { MIcon } from '@/components'
export default {
    components: {
        MIcon
    },
    data () {
        // dataSource:[]
    }
}
</script>

<style lang="less" scoped>

</style>
