<template>
  <page-header-wrapper :title="false">
    <a-acrd>
      <a-row :gutter="16">
        <a-col :span="12">
          <h2>当前系统授权</h2>
          <h2>试用版</h2>
          <div class="Time">
            <span>89</span>
            <span>天</span>
          </div>
        </a-col>
        <a-col :span="12">
          <button type="danger">立即升级到正式版</button>
        </a-col>
      </a-row>
    </a-acrd>
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
