<template>
  <div class="step4">
    <a-descriptions title="模版信息">
      <a-descriptions-item label="所属分组">
        Zhou Maomao
      </a-descriptions-item>
      <a-descriptions-item label="模版名称">
        1810000000
      </a-descriptions-item>
      <a-descriptions-item label="系统镜像">
        Hangzhou, Zhejiang
      </a-descriptions-item>
      <a-descriptions-item
        label="软件信息"
        span="2">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </a-descriptions-item>
      <a-descriptions-item label="系统类型">
        empty
      </a-descriptions-item>
      <a-descriptions-item label="系统类型">
        empty
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="硬件信息">
      <a-descriptions-item label="所属分组">
        Zhou Maomao
      </a-descriptions-item>
      <a-descriptions-item label="模版名称">
        1810000000
      </a-descriptions-item>
      <a-descriptions-item label="系统镜像">
        Hangzhou, Zhejiang
      </a-descriptions-item>
      <a-descriptions-item
        label="软件信息"
        span="2">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </a-descriptions-item>
      <a-descriptions-item label="系统类型">
        empty
      </a-descriptions-item>
      <a-descriptions-item label="系统类型">
        empty
      </a-descriptions-item>
    </a-descriptions>
    <a-row>
      <a-col :offset="9" :span="10">
        <a-button
          type="primary"
          @click="prevStep">上一步</a-button>
        <a-button
          style="margin-left: 8px"
          @click="close">提交</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  methods: {
    prevStep () {
      this.$emit('prevStep')
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.step4 {
  margin-top: 40px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding: 10px;
}
.modules {
  padding: 10px;
  background-color: wheat;
  margin: 10px;
  box-sizing: border-box;
}
/deep/.ant-descriptions-title,/deep/.ant-descriptions-item-label,/deep/.ant-descriptions-item-content {
    color: white;
}
</style>
