<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8" v-for="i in dataSource" :key="i.key">
        <m-card :loading="loading" class="card" hover :style="{'background':i.background}">
          <div class="info">
            <a-icon type="question-circle" class="icon"/>
            <div class="text">
              <span>{{ i.count }}</span>
              <div>{{ i.text }}</div>
            </div>
          </div>
        </m-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { MCard } from '@/components'
export default {
    components: {
        MCard
    },
    data () {
        return {
            loading: false,

            dataSource: [
                {
                    key: '1',
                    icon: '',
                    count: 121,
                    text: '在线用户数',
                    style:{
                        background: 'linear-gradient(135deg,#6aa7ff,#558bf6 50%,#4476ec)'
                        border: 2px solid transparent;
}
                    }
                },
                {
                    key: '2',
                    icon: '',
                    count: 367,
                    text: '总用户数',
                    background: 'linear-gradient(135deg,#6aa7ff,#558bf6 50%,#4476ec)'
                },
                {
                    key: '3',
                    icon: '',
                    count: 351,
                    text: '总桌面数',
                    background: 'linear-gradient(135deg, #bba8ec, #9773f7, 50%, #7a46ff)'
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
