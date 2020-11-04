<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card>
          <template slot="title">
            <div class="title">
              <div>
                <m-icon :type="shizhong" :class="['icon',shizhong]"/>

                <span>CPU</span>
              </div>
              <div>
                xiala
              </div>
            </div>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { MIcon } from '@/components'

export default {
    components: {
        MIcon
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
.title{
    display: flex;
    justify-content: space-between;

}
</style>
