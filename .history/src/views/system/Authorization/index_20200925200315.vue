<template>
  <page-header-wrapper :title="false">
    <a-card>
      <a-row :gutter="16">
        <a-col :span="12">
          <span>当前系统授权:</span>
          <span>试用版</span>
          <div class="Time">
            <span>89</span>
            <span>天</span>
          </div>
        </a-col>
        <a-col :span="12">
          <button type="danger">立即升级到正式版</button>
          <br>
          <br>
          <span>升级到正式版本之后，您可以获得：</span>
          <br>
          <span>使用不受限制</span>
          <br>
          <span>7*24小时售后服务</span>
          <br>
          <span>快速的软件与安全服务</span>
          <br>
          <span>更多特权，可访问豪联科技官网查看</span>
        </a-col>
      </a-row>
    </a-card>
  </page-header-wrapper>
</template>
<script>

export default {
  data () {
    return {

    }
  },

  methods: {

  }
}
</script>
