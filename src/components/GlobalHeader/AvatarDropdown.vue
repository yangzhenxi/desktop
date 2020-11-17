<template>
  <a-dropdown v-if="this.$store.getters.userInfo && this.$store.getters.userInfo.name" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" class="antd-pro-global-header-index-avatar" />
      <span> {{ this.$store.getters.userInfo.name }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <a-icon type="user" />
          个人中心
        </a-menu-item>
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'

export default {
  name: 'AvatarDropdown',
  props: {
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleToCenter () {
      this.$router.push({ path: '/system/info' })
    },
    handleLogout (e) {
      Modal.confirm({
        title: this.$t('退出提示'),
        content: this.$t('确定要注销登录嘛'),
        onOk: () => {
          return this.$store.dispatch('Logout').then(() => {
            // this.$router.go(0)
            location.reload()
            // this.$router.push({ name: 'login' })
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
.ant-dropdown-menu{
  background-color: rgb(47, 51, 73);
}
.ant-dropdown-menu-item:hover, .ant-dropdown-menu-submenu-title:hover {
    background-color: rgb(34, 34, 34)
}
.ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title{
      color: rgba(255, 255, 255, 0.65);
}
</style>
