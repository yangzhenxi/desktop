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
          <a-button type="primary">
            立即升级到正式版
          </a-button>
          <br>
          <br>
          <a-checkbox-group @change="onChange">
            <a-row>
              <a-col :span="24">
                <a-checkbox value="A">
                  升级到正式版本之后，您可以获得：
                </a-checkbox>
              </a-col>
            </a-row>

            <span></span>
            <br>
            <span>使用不受限制</span>
            <br>
            <span>7*24小时售后服务</span>
            <br>
            <span>快速的软件与安全服务</span>
            <br>
            <span>更多特权，可访问豪联科技官网查看</span>
          </a-checkbox-group></a-col></a-checkbox-group></a-row></a-checkbox-group></a-col></a-row></a-col>
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
