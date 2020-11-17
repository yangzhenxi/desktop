<template>
  <div class="setting-drawer">
    <a-drawer width="30" placement="right" @close="onClose" :closable="false" :visible="visible">
      <template slot="title">
        {{ $store.getters.userInfo.name }}的任务列表
      </template>
      <div class="setting-drawer-index-content">
        <div class="setting-drawer-index-title">
          <p class="state"> <a-icon type="caret-right" />任务状态</p>
          <a-row :gutter="8" style="padding-bottom:20px;">
            <a-col :span="8" v-for="(item,index) in taskState" :key="index">
              <a-card style="text-align:center;">
                <p class="title">{{ item.title }}</p>
                <span class="size" style="color:#fbaa5e;font-size:30px;font-weight:500;">{{ item.size }}</span>
              </a-card>
            </a-col>
          </a-row>
          <p class="state"> <a-icon type="caret-right" />任务列表</p>
          <ul>
            <li class="task_li">
              <span>创建模版</span>
              <a-icon type="check-circle" />
            </li>
            <li class="task_li">
              <span>创建模版</span>
              <a-icon type="close-circle" />
            </li>
            <li>创建模版</li>
            <li>创建模版</li>
          </ul>
        </div>
      </div>
      <div class="setting-drawer-index-handle" @click="toggle" slot="handle">
        <a-icon type="setting" v-if="!visible" />
        <a-icon type="close" v-else />
      </div>
    </a-drawer>
  </div>
</template>

<script>
export default {
    data () {
        return {
            visible: false,
            taskState: [
                {
                    title: '已完成',
                    size: '6'
                },
                {
                    title: '未完成',
                    size: '6'
                },
                {
                    title: '进行中',
                    size: '6'
                }
			],
			taskList: [
				{
					title: 'Ant Design Title 1'
				},
				{
					title: 'Ant Design Title 2'
				},
				{
					title: 'Ant Design Title 3'
				},
				{
					title: 'Ant Design Title 4'
				}
			]
        }
    },
    watch: {},
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
/deep/.ant-drawer-header {
    padding: 23px 24px;
    background: #242424;
    border-radius: inherit;
    .ant-drawer-title {
        color: #fbb261;
    }
}

/deep/.ant-card-body{
	padding:6px 12px;
	background: #202020;
    border-radius: 5px;
    border: 1px solid #454545;
    box-shadow: 0 0 black;
	.title{
		font-size: 16px;
		font-weight: 500;
	}
}

/deep/.ant-drawer-body {
    padding: 0;
}
/deep/.ant-drawer-wrapper-body{
	background: #242424;
}
.setting-drawer-index-content {
	font-size: 16px;
	.state{
		color: white;
		font-weight: 500;
		padding: 10px 12px;
	}
	ul{
		padding: 0px;
	}
	ul > li{
		color: white;
		padding: 10px 12px;
		background: #212121;
		margin: 10px 12px;
		border-radius: 5px;
		border: 1px solid white;
		box-shadow:2px 2px 3px #434343;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
    p {
        margin-bottom: 0em;
	}
	.anticon-check-circle{
		font-size: 20px;
		color: #00ff00;
	}
	.anticon-close-circle{
		font-size: 20px;
		color: #e80000;
	}
	.anticon-caret-right{
		color:#fbaa5e;
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
