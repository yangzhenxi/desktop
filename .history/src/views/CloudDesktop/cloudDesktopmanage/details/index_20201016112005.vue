<template>
  <div v-if="visible">
    <a-card>
      <template slot="title">
        {{ Data.name }}
      </template>
      <a-row :gutter="16">
        <div class="header">
          <a-col :span="14">
            <a-row :gutter="[16,16]">
              <a-col :span="8">
                <div
                  class="box"
                  @click="OnCloudDesktop">
                  <m-icon
                    type="kaiqi"
                    class="icon zaixianbianji"></m-icon>
                  <span class="text">开启云桌面</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div
                  class="box"
                  @click="OffCloudDesktop">
                  <m-icon
                    type="guanbi"
                    class="icon shangchuanmoban"></m-icon>
                  <span class="text">关闭云桌面</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div
                  class="box"
                  @click="RebootCloudDesktop">
                  <m-icon
                    type="zhongqi2"
                    class="icon tongji"></m-icon>
                  <span class="text">重启云桌面</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div
                  class="box"
                  @click="$refs.EditCloudDesktop.Edit()">
                  <m-icon
                    type="zaixianbianji"
                    class="icon"></m-icon>
                  <span class="text">编辑云桌面</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div
                  class="box"
                  @click="OnMaintain">
                  <m-icon
                    type="banshou"
                    class="icon banshou"></m-icon>
                  <span class="text">开启维护模式</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div
                  class="box"
                  @click="DeteleCloudDesktop">
                  <m-icon
                    type="shanchu"
                    class="icon"></m-icon>
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
                :span="10"
                class="icon">
                <a-row
                  type="flex"
                  justify="center"
                  style="margin-top: 15px;">
                  <div>
                    <m-icon
                      class="icon"
                      type="windowsfuwuqi" />
                  </div>
                  <div class="icon_title">开机数量/桌面总数</div>
                  <div class="icon_title">{{ Data.registered_count }}/{{ Data.unregistered_count }}</div>
                </a-row>
              </a-col>
              <a-col :span="14">
                <div class="modules_text">
                  <span>创建者: </span>
                  <span> {{ Data.creator }}</span>
                </div>
                <div class="modules_text">
                  <span>桌面类型: </span>
                  <span>{{ Data.desktopType | convert('C_D_DESKTOP_TYPE') }}</span>
                </div>
                <div class="modules_text">
                  <span>维护状态: </span>
                  <a-tag :color="toDict(Data.inMaintainMode,'C_D_INMAINTAINMODE_STATE').color">
                    {{ Data.inMaintainMode | convert('C_D_INMAINTAINMODE_STATE') }}
                  </a-tag>
                </div>
                <div class="modules_text">
                  <span>电源状态: </span>
                  <a-tag :color="toDict(Data.Power,'C_D_POWER_STATE').color">
                    {{ Data.Power | convert('C_D_POWER_STATE') }}
                  </a-tag>
                </div>
                <div class="modules_text">
                  <span>云桌面状态: </span>
                  <a-tag :color="toDict(Data.state,'C_D_DESKTOP_STATE').color">
                    {{ Data.state | convert('C_D_DESKTOP_STATE') }}
                  </a-tag>
                </div>
                <div class="modules_text">
                  <span>创建时间: </span>
                  <span>{{ Data.created | convert('unix','YYYY-MM-DD') }}</span>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </div>
      </a-row>
    </a-card>
    <br>
    <tabs :datasource="Data"></tabs>
    <edit-cloud-desktop ref="EditCloudDesktop"/>
    <option-desktop ref="OptionDesktop">
    </option-desktop>
  </div>
</template>

<script>
import { MIcon } from '@/components/index'
import EditCloudDesktop from './EditCloudDesktop'
import Tabs from './tabs/tabs'
import OptionDesktop from './optionDesktop/index'
import { deepGet, toDict } from '@/utils/util'

export default {
  components: {
    Tabs,
    MIcon,
    EditCloudDesktop,
    OptionDesktop
  },
  data () {
    return {
      visible: false,
      Data: {}
    }
  },
  methods: {
    // 开启详细界面
    OnSingle (item) {
      this.visible = true
      this.Data = item
    },
    // 关闭详细页面
    OffSingle (item) {
      this.visible = false
    },
    // 开启云桌面
    OnCloudDesktop () {
        // this.$refs.OptionDesktop.Add(this.Data)
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
    EditCloudDesktop () {},
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
    toDict,
    deepGet
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
  padding: 26px 0;
    border: 1px solid;
  background-color: #272e48;
  .icon {
    font-size: 100px;
  }
  .icon_title {
    font-size: 15px;
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
/deep/.ant-tabs-extra-content {
    display: flex;
}
</style>
