<template>
  <div>
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
        
    }
}
</script>
