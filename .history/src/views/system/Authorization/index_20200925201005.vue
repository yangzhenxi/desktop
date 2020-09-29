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
          <a-button type="primary" block :size="size">
            立即升级到正式版
          </a-button>

          <br>
          <br>
          <br>
          <a-checkbox-group>
            <a-row>
              <a-col :span="24">
                <a-checkbox value="A" checked>
                  <span>升级到正式版本之后，您可以获得：</span>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox value="B" checked>
                  <span>使用不受限制</span>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox value="C" checked>
                  <span>7*24小时售后服务</span>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox value="D" checked>
                  <span>快速的软件与安全服务</span>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox value="E" checked>
                  <span>更多特权，可访问豪联科技官网查看</span>
                </a-checkbox>
              </a-col>
            </a-row>

          </a-checkbox-group>
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
