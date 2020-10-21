<template>
  <page-header-wrapper :title="false">
    <a-card>
      <a-row :gutter="16">
        <a-col :span="12">
          <div class="version">
            <span>当前系统授权:</span>
            <span>试用版</span>
          </div>
          <div class="Time">
            <span class="Date">89</span>
            <span class="Day">天</span>
          </div>
        </a-col>
        <a-col :span="12">
          <a-button type="primary" >
            <span class="btn-span">立即升级到正式版</span>
          </a-button>
          <br>
          <br>
          <br>
          <a-checkbox-group defaultChecked>
            <a-row>
              <a-col :span="24">
                <a-checkbox value="A" defaultChecked>
                  <span>升级到正式版本之后，您可以获得：</span>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox value="B" defaultChecked>
                  <span>使用不受限制</span>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox value="C" defaultChecked>
                  <span>7*24小时售后服务</span>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox value="D" defaultChecked>
                  <span>快速的软件与安全服务</span>
                </a-checkbox>
              </a-col>
              <a-col :span="24">
                <a-checkbox value="E" defaultChecked>
                  <span>更多特权，可访问豪联科技官网查看</span>
                </a-checkbox>
              </a-col>
            </a-row>

          </a-checkbox-group>
        </a-col>
      </a-row>
    </a-card>
    <a-button @click.ctrl="btn('1', $event)">我是按钮</a-button>
    <input type="text" v-model="msg">
  </page-header-wrapper>
</template>
<script>

export default {
  data () {
    return {
        msg: 'Hello,Word'
    }
  },

  methods: {
      btn (Number, event) {
         setTimeout(() => {
            console.log(Number)
            console.log(event)
         }, 1000)
      },
      btn (Number, event) {
         setTimeout(() => {
            console.log(Number)
            console.log(event)
         }, 1000)
      }
  }
}
</script>

<style lang="less" scoped>
.version{
    font-size: 20px;
    text-align: center;
    span:last-child{
        margin-left: 20px;
    }
}
.Time{
    text-align: center;
}
.Date{
    font-size: 180px;
}
.Day{
    font-size:30px;
}
.ant-checkbox-wrapper {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: white;
    font-size: 20px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
    display: inline-block;
    line-height: unset;
    cursor: pointer;
}
.ant-btn{
    height: auto;
}
.btn-span{
    margin: 20px 30px;
    font-size: 20px;
}
</style>
