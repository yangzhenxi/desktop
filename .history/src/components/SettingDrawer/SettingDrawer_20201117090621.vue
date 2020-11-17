<template>
  <div class="setting-drawer">
    <a-drawer
      width="300"
      placement="right"
      @close="onClose"
      :closable="false"
      :visible="visible">
      <template slot="title">
        任务列表
      </template>
      <div class="setting-drawer-index-content">
        <div class="setting-drawer-index-title">
          <h2>早上好,{{ $store.getters.userInfo.name }}</h2>
		  <ul>
			  <li></li>
		  </ul>
        </div>
      </div>
      <div class="setting-drawer-index-handle" @click="toggle" slot="handle">
        <a-icon type="setting" v-if="!visible"/>
        <a-icon type="close" v-else/>
      </div>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  watch: {

  },
  methods: {
    onClose () {
      this.visible = false
    },
    toggle () {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="less" scoped>
	/deep/.ant-drawer-header{
        padding: 23px 24px;
		background: #242424;
		border-radius:inherit;
		.ant-drawer-title{
			color: #fbb261;
		}
	}
	/deep/.ant-drawer-body{
		padding: 0;
	}
  .setting-drawer-index-content {
		font-size: 16px;
		p{
			margin-bottom: 0em;
		}
    .setting-drawer-index-blockChecbox {
      display: flex;

      .setting-drawer-index-item {
        margin-right: 16px;
        position: relative;
        border-radius: 4px;
        cursor: pointer;

        img {
          width: 48px;
        }

        .setting-drawer-index-selectIcon {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          padding-top: 15px;
          padding-left: 24px;
          height: 100%;
          color: #1890ff;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .setting-drawer-theme-color-colorBlock {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      float: left;
      cursor: pointer;
      margin-right: 8px;
      padding-left: 0px;
      padding-right: 0px;
      text-align: center;
      color: #fff;
      font-weight: 700;

      i {
        font-size: 14px;
      }
    }
  }

  .setting-drawer-index-handle {
    position: absolute;
    top: 240px;
    background: #1890ff;
    width: 48px;
    height: 48px;
    right: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    z-index: 1001;
    text-align: center;
    font-size: 16px;
    border-radius: 4px 0 0 4px;

    i {
      color: rgb(255, 255, 255);
      font-size: 16px;
    }
  }
</style>
