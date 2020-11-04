<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8" v-for="i in dataSource" :key="i.key">
        <a-card :loading="loading" hover>
          <div class="info">
            <a-icon type="question-circle" class="icon"/>
            <div class="text">
              <span>{{ i.count }}</span>
              <div>{{ i.text }}</div>
            </div>
          </div>
        </a-card>
      </a-col>

    </a-row>
  </div>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
            dataSource: [
                {
                    key: '1',
                    icon: '',
                    count: 121,
                    text: '在线用户数'
                },
                {
                    key: '2',
                    icon: '',
                    count: 367,
                    text: '总用户数'
                },
                {
                    key: '3',
                    icon: '',
                    count: 351,
                    text: '总桌面数'
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.info{
    display: flex;
    justify-content: space-around;
    align-items: center;
    .text{
        text-align: center;
        span{
            font-size: 72px;
        }
        div{
            font-size: 20px;
        }
    }
    .icon{
        font-size: 72px;
        &.shizhong{
            color:wheat;
        }
        &.storage{
            color: turquoise;

        }
    }
}
</style>
