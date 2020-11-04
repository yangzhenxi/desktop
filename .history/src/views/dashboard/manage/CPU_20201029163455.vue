<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card>
          <template slot="title">
            <div class="title">
              <div>
                <a-icon type="question-circle" class="icon"/>
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
export default {
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
