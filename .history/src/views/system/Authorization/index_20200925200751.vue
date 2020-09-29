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
          <br>
          <a-checkbox-group>
            <a-row>
              <a-col :span="24">
                <a-checkbox value="A" checked>
                  升级到正式版本之后，您可以获得：
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox value="B" checked>
                  使用不受限制
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox value="C" checked>
                  7*24小时售后服务
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox value="D" checked>
                  快速的软件与安全服务
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox value="E" checked>
                  更多特权，可访问豪联科技官网查看
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
