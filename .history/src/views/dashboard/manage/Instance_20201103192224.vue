<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8" v-for="i in dataSource" :key="i.key">
        <m-card :loading="loading" class="card" hover :style="i.style">
          <div class="info">
            <a-icon type="question-circle" :class="['icon',i.icon]"/>
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
import { MCard, MIcon } from '@/components'
export default {
    components: {
        MCard,
        MIcon
    },
    data () {
        return {
            loading: false,

            dataSource: [
                {
                    key: '1',
                    icon: 'ic_user_zx',
                    count: 121,
                    text: '在线用户数',
                    style: {
                        background: '#272E48;',
                        border: '1px solid rgba(25, 186, 139, 0.17)'
                        // background: 'linear-gradient(135deg,#6aa7ff,#558bf6 50%,#4476ec)',
                    }
                },
                {
                    key: '2',
                    icon: 'All',
                    count: 367,
                    text: '总用户数',
                    style: {
                        background: '#272E48;',
                        border: '1px solid rgba(25, 186, 139, 0.17)'
                        // background: 'linear-gradient(135deg,#9ad8d8,#45c2ce 50%,#00aec6)',
                    }
                },
                {
                    key: '3',
                    icon: 'jisuanji',
                    count: 351,
                    text: '总桌面数',
                    style: {
                        background: '#272E48;',
                        border: '1px solid rgba(25, 186, 139, 0.17)'
                        // background: 'linear-gradient(135deg, #bba8ec, #9773f7, 50%, #7a46ff)',
                        // border: '2px solid transparent'
                    }

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
