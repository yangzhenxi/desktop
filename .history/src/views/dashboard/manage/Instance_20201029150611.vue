<template>
  <div>
    <a-row :gutter="16">
      <a-span :span="8" v-for="i in dataSource" :key="i.key">

      </a-span>
    </a-row>
    <a-card :loading="loading" title="123">
      <a-tooltip title="1" slot="extra" @click.stop>
        <a-icon type="info-circle-o"></a-icon>
      </a-tooltip>
      <div style="margin: 32px 0;">
        <div class="info">
          <a-icon type="question-circle" class="icon"/>
          <span class="text">136</span>
        </div>
        <div class="info">
          <span></span>
          <span>在线用户数</span>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
    data () {
        return {
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
