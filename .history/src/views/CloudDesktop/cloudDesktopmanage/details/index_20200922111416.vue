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
                <div class="box" @click="EditCloudDesktop">
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
                  <div class="icon_title">123456</div>
                </a-row>
              </a-col>
              <a-col :span="16">
                <div
                  class="modules_title"
                  style="margin:5px 0px">name</div>
                <div class="modules_text">
                  <span>所属分组: </span>
                  <span> 所属分组</span>
                </div>
                <div class="modules_text">
                  <span>所在服务器: </span>
                  <span>所在服务器</span>
                </div>
                <div class="modules_text">
                  <span>创建时间: </span>
                  <span>创建时间: </span>
                </div>
                <div class="modules_text">
                  <span>版本状态: </span>
                  <a-tag color="#108ee9">
                    未发布
                    <!-- V{{ parseInt(modulesData.version) + 1 }} -->
                  </a-tag>
                </div>
                <div
                  class="modules_text"
                  style="overflow: inherit;">
                  <span>运行状态: </span>
                  <span>运行状态: </span>
                  <!-- <a-badge :number-style="{backgroundColor: toDict(modulesData.isRunning,'C_STATE').color}" :count="modulesData.isRunning | convert('C_STATE')" /> -->
                </div>
                <div class="modules_text">
                  <span>IP: </span>
                  <span>IP: </span>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </div>
      </a-row>
    </a-card>
    <a-card>
      <div>
        <a-tabs default-active-key="1" @change="callback" type="card" :tabBarGutter="tabBarGutter">
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
          <a-select slot="tabBarExtraContent" default-value="lucy" style="width: 120px">
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="disabled" disabled>
              Disabled
            </a-select-option>
            <a-select-option value="Yiminghe">
              yiminghe
            </a-select-option>
          </a-select>
        </a-tabs>
      </div>
    </a-card>

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
    OnSingle (item) {
      this.visible = true
    },
    callback (key) {
      console.log(key)
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
    font-size: 20px;
    margin-top: 10px;
    // cursor: pointer;
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
