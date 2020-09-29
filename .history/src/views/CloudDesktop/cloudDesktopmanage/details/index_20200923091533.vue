<template>
  <div v-if="visible">
    <a-card title="计算机基础">
      <a-row :gutter="16">
        <div class="header">
          <a-col :span="14">
            <a-row :gutter="[16,16]">
              <a-col :span="8">
                <div class="box" @click="OnCloudDesktop">
                  <m-icon
                    type="zaixianbianji"
                    class="icon zaixianbianji"></m-icon>
                  <span class="text">开启云桌面</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="box" @click="OffCloudDesktop">
                  <m-icon
                    type="shangchuanmoban"
                    class="icon shangchuanmoban"></m-icon>
                  <span class="text">关闭云桌面</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="box" @click="RebootCloudDesktop">
                  <m-icon
                    type="tongji"
                    class="icon tongji"></m-icon>
                  <span class="text">重启云桌面</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="box" @click="$refs.EditCloudDesktop.Edit()">
                  <m-icon
                    type="huanyuan1"
                    class="icon huanyuan1"></m-icon>
                  <span class="text">编辑云桌面</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="box" @click="OnMaintain">
                  <m-icon
                    type="hebing"
                    class="icon hebing"></m-icon>
                  <span class="text">开启维护模式</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="box" @click="DeteleCloudDesktop">
                  <m-icon
                    type="shanchu"
                    class="icon shanchu"></m-icon>
                  <span class="text">删除桌面</span>
                </div>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="10">
            <a-row
              class="modules"
              :gutter="16">
              <a-col
                :span="8"
                class="icon">
                <a-row
                  type="flex"
                  justify="center"
                  style="margin-top: 35px;">
                  <div>
                    <a-icon
                      class="icon"
                      type="windows" />
                  </div>
                  <div class="icon_title">开机数量/桌面总数</div>
                  <div class="icon_title">5/10</div>
                </a-row>
              </a-col>
              <a-col :span="16">
                <div
                  class="modules_title"
                  style="margin:5px 0px">name</div>
                <div class="modules_text">
                  <span>桌面名称: </span>
                  <span> 测试桌面</span>
                </div>
                <div class="modules_text">
                  <span>创建者: </span>
                  <span>admin</span>
                </div>
                <div class="modules_text">
                  <span>桌面类型: </span>
                  <span>静态不还原 </span>
                </div>
                <div class="modules_text">
                  <span>维护模式 </span>
                  <span>ss</span>
                </div>
                <div class="modules_text">
                  <span>模版信息</span>
                  <span>模版测试-01</span>
                </div>
                <div class="modules_text">
                  <span>已注册数量</span>
                  <span>5 </span>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </div>
      </a-row>
    </a-card>
    <a-card>
      <div>
        <a-tabs default-active-key="1" @change="changeActive" type="card" :tabBarGutter="tabBarGutter">
          <a-tab-pane key="1" tab="桌面列表">
            <tab1></tab1>
          </a-tab-pane>
          <a-tab-pane key="2" tab="用户配置" force-render>
            <tab2></tab2>
          </a-tab-pane>
          <a-tab-pane key="3" tab="会话列表">
            <tab3></tab3>
          </a-tab-pane>
          <a-tab-pane key="4" tab="电源策略">
            <tab4></tab4>
          </a-tab-pane>
          <a-input-search
            slot="tabBarExtraContent"
            style="width: 220px"
            placeholder="请输入你想要查询的用户名"
            enter-button
            :v-model="data"
            @search="onSearch" />
          <a-select default-value="操作" slot="tabBarExtraContent" style="width: 170px;margin-left:20px;">
            <a-select-option value="jack">
              新增桌面
            </a-select-option>
            <a-select-option value="lucy">
              开机
            </a-select-option>
            <a-select-option value="1">
              重启
            </a-select-option>
            <a-select-option value="2">
              重新生产
            </a-select-option>
            <a-select-option value="Yiminghe">
              开启维护模式
            </a-select-option>
          </a-select>
        </a-tabs>
      </div>
    </a-card>
    <edit-cloud-desktop ref="EditCloudDesktop"></edit-cloud-desktop>
  </div>
</template>

<script>
import { MIcon } from '@/components/index'
import EditCloudDesktop from './EditCloudDesktop'
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import Tab4 from './Tab4'
export default {
  components: {
    MIcon,
    Tab1,
    Tab2,
    Tab3,
    Tab4,
    EditCloudDesktop
  },
  data () {
    return {
      visible: false,
        tabBarGutter: 20
    }
  },
  methods: {
      // 开启详细界面
    OnSingle (item) {
      this.visible = true
    },
    // 关闭详细页面
    OffSingle (item) {
      this.visible = false
    },
    // 开启云桌面
    OnCloudDesktop () {
      this.$confirm({
        title: '确定开启此云桌面吗?',
        onOk: () => {
          return new Promise((resolve, reject) => {
              resolve()
          })
        }
      })
    },
    // 关闭云桌面
    OffCloudDesktop () {
      this.$confirm({
        title: '确定关闭此云桌面吗?',
        onOk: () => {
          return new Promise((resolve, reject) => {
              resolve()
          })
        }
      })
    },
    // 重启云桌面
    RebootCloudDesktop () {
      this.$confirm({
        title: '确定重启此云桌面吗?',
        onOk: () => {
          return new Promise((resolve, reject) => {
              resolve()
          })
        }
      })
    },
    // 编辑云桌面
    EditCloudDesktop () {

    },
    // 开启维护模式
    OnMaintain () {
      this.$confirm({
        title: '确定开启维护模式吗?',
        onOk: () => {
          return new Promise((resolve, reject) => {
              resolve()
          })
        }
      })
    },

    // 删除云桌面
    DeteleCloudDesktop () {
      this.$confirm({
        title: '确定要删除此云桌面吗?',
        content: '最大级别的快照被删除。',
        okType: 'danger',
        onOk: () => {
          return new Promise((resolve, reject) => {
              resolve()
          })
        }
      })
    },
    // tabs操作按钮
    changeActive (val) {
        if (val === 1) {

        }
        console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  background: #272e48;
  border-radius: 10px;
  padding: 10px 0px;
  border: 1px solid;
}
.icon {
  font-size: 35px;
  display: block;
}
.text {
  display: block;
  text-align: center;
  margin-top: 15px;
  font-size: 18px;
  font-weight: 500;
}
.modules {
  border: none;
  border: 1px solid;
  background-color: #272e48;
}
// 详情
.modules_title {
  font-size: 17px;
  font-weight: 500;
}
.icon-modules {
  border: 1px solid #ccc;
  border-radius: 10px;
  .add {
    font-size: 100px;
  }
}
.modules {
  border-radius: 10px;
  padding: 8px;
  .icon {
    font-size: 80px;
  }
  .icon_title {
    font-size: 12px;
    color: bisque;
  }
  .modules_text {
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header {
    display: flex;
    align-items: center;
  }
}
</style>
