<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8" v-for="i in dataSource" :key="i.key">
        <m-card :loading="loading" class="card" hover :style="i.style">
          <div class="info">
            <m-icon :type="i.icon" :class="['icon',i.icon]"/>
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
import { deepGet } from '@/utils/util'
import { MCard, MIcon } from '@/components'
// GetSession
import { GetUserCount, GetSession } from '@/api/dashboard'
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
                    count: 0,
                    text: '在线用户数',
                    style: {
                        background: '#272E48;',
                        border: '1px solid rgba(25, 186, 139, 0.17)'
                    }
                },
                {
                    key: '2',
                    icon: 'All',
                    count: 0,
                    text: '总用户数',
                    style: {
                        background: '#272E48;',
                        border: '1px solid rgba(25, 186, 139, 0.17)'
                    }
                },
                {
                    key: '3',
                    icon: 'jisuanji',
                    count: 0,
                    text: '总桌面数',
                    style: {
                        background: '#272E48;',
                        border: '1px solid rgba(25, 186, 139, 0.17)'
                    }

                }
            ]
        }
    },
    created () {
        this.GetData()
    },
    methods: {
        async GetData () {
            const [Usercount, Session] = (await Promise.all([GetUserCount(), GetSession()]))
            this.dataSource[0].count = this.deepGet(Session, 'data', '0')
            this.dataSource[1].count = this.deepGet(Usercount, 'data', '0')
            // this.dataSource[2].count = this.deepGet(Usercount, 'data', '0')
        },
        deepGet
    }

}
</script>

<style lang="less" scoped>
.info{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 12px 0px;
    .text{
        text-align: center;
        color: rgb(174, 190, 230);
        span{
            font-size: 40px;
        }
        div{
            font-size: 20px;
        }
    }
    .icon{
        font-size: 72px;
        &.ic_user_zx{
            color:rgb(50, 107, 216);
        }
        &.All{
            color: rgb(177, 210, 77);
        }
        &.jisuanji{
            color: rgb(253, 45, 54);
        }
    }
}
</style>
