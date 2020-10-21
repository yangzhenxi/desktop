<template>
  <div>
    <a-card>
      <div>
        <a-tabs
          default-active-key="1"
          @change="changeActive"
          type="card"
          :tabBarGutter="tabBarGutter">
          <a-tab-pane
            key="1"
            tab="桌面列表">
            <tab1
              :datasource="datasource"
              @chaned="chaned"></tab1>
          </a-tab-pane>
          <a-tab-pane
            key="2"
            tab="用户配置"
            force-render>
            <tab2 :datasource="TableData"></tab2>
          </a-tab-pane>
          <a-tab-pane
            key="3"
            tab="会话列表">
            <tab3 :datasource="datasource"></tab3>
          </a-tab-pane>
          <a-tab-pane
            key="4"
            tab="电源策略">
            <tab4 :datasource="datasource"></tab4>
          </a-tab-pane>
          <a-input-search
            v-if="isSearchVisible"
            slot="tabBarExtraContent"
            style="width: 220px"
            placeholder="请输入你想要查询的用户名"
            enter-button
            :v-model="data"
            @search="onSearch" />
          <a-form>
            <a-select
              v-if="isActiveVisible"
              default-value="操作"
              @select="changeSelect"
              slot="tabBarExtraContent"
              style="width: 170px;margin-left:20px;">
              <a-select-option
                v-for="i in ActiveList"
                :key="i.value"
                :value="i.value">
                {{ i.name }}
              </a-select-option>
            </a-select>
          </a-form>

        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import Tab4 from './Tab4'
import { deepGet } from '@/utils/util'
import { CloudDesktopMachinePower } from '@/api/CloudDesktop/CloudDesktop'

export default {
  components: {
    Tab1,
    Tab2,
    Tab3,
    Tab4
  },
  props: {
    datasource: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tabBarGutter: 20,
      data: '', // 默认搜索值
      ActiveList: [
        { name: '开机', value: 'DesktopOn' },
        { name: '开启维护模式', value: 'DesktopMaintain' }
      ],
      DesktopList: [
        { name: '开机', value: 'DesktopOn' },
        { name: '开启维护模式', value: 'DesktopMaintain' }
      ],
      UserConfig: [
        { name: '添加用户', value: 'UserAdd' },
        { name: '添加用户组', value: 'UserAddGroup' },
        { name: '桌面配置用户', value: 'UserDesktopConfig' },
        { name: '移除', value: 'UserDelete' }
      ],
      SessionList: [
        { name: '注销会话', value: 'SessionDelete' },
        { name: '发送消息', value: 'SessionSend' }
      ],
      isActiveVisible: true,
      isSearchVisible: true,
      TableData: [],
      queryParam: {},
      checked: [] // 表格选中的tr
    }
  },
  methods: {
    // tabs操作按钮
    changeActive (val) {
      this.queryParam.desktop_id = this.datasource.id
      this.TableData = []
      if (val === '1') {
        this.isActiveVisible = true
        this.isSearchVisible = true
        this.ActiveList = deepGet(this.DesktopList, [], [])
      } else if (val === '2') {
        this.isActiveVisible = true
        this.isSearchVisible = false
        this.ActiveList = deepGet(this.UserConfig, [], [])
      } else if (val === '3') {
        this.isSearchVisible = false
        this.isActiveVisible = true
        this.ActiveList = deepGet(this.SessionList, [], [])
      } else if (val === '4') {
        this.isSearchVisible = false
        this.isActiveVisible = false
      }
    },
    // 选中表格中的tr
    chaned (item) {
      this.checked = []
      this.checked = item
    },
    // 桌面列表 搜索按钮
    onSearch (value) {},
    // select 下拉框选中事件
    changeSelect (value, option) {
      const self = this
      Object.keys(self).forEach((u) => {
        if (u === value) {
          this[u]()
        }
      })
    },
    // 桌面列表 新增
    DesktopAdd () {},
    // 桌面列表 开机
    DesktopOn () {
      if (this.checked.length > 0) {
        this.$confirm({
          title: '确定要将选中桌面开机吗?',
          onOk: () => {
            return new Promise((resolve, reject) => {
              const obj = {
                HostedMachineName: 'Name',
                power: true
              }
              CloudDesktopMachinePower(obj).then((res) => {
                console.log(obj)
                resolve()
              })
            })
          }
        })
      } else {
        this.$message.info('请先勾选')
      }
    },
    // 桌面列表 重启
    Desktopreset () {},
    // 桌面列表 重新生成
    DesktopRe () {},
    // 桌面列表 开启维护模式
    DesktopMaintain () {},
    // 用户配置 添加用户
    UserAdd () {},
    // 用户配置 添加用户组
    UserAddGroup () {},
    // 用户配置 桌面配置用户
    UserDesktopConfig () {},
    // 用户配置 移除
    UserDelete () {},
    // 会话列表 注销会话
    SessionDelete () {},
    // 会话列表 发送消息
    SessionSend () {}
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-tabs-bar {
  border-bottom: none;
}

/deep/.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
  background: none;
  color: white;
}
/deep/.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
  background: #1890ff !important;
}
/deep/.ant-tabs-extra-content {
  margin-top: 10px;
}
</style>
