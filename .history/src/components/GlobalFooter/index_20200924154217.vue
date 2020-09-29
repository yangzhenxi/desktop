<template>
  <div class="footer">
    <div class="links">
      <a href="_self">帮助</a>
      <a href="_self">隐私</a>
      <a href="_self">条款</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" /> 2019 <span>HowLink</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;
  .links {
    margin-bottom: 8px;

    a {
      color: rgba(255, 255, 255, 1);

      &:hover {
        color: rgba(255, 255, 255, 1);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
  }
}
</style>
