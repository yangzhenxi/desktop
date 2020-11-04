<template>
  <a-card>
    <a-tabs
      default-active-key="1"
      @change="changeActive"
      type="card"
      :tabBarGutter="tabBarGutter">
      <a-tab-pane
        key="1"
        tab="桌面列表">
        <tab1
          ref="tab1"
          :datasource="datasource"
          @chaned="chaned"></tab1>
      </a-tab-pane>
      <a-tab-pane
        key="2"
        tab="用户配置"
        force-render>
        <tab2 ref="tab2" :datasource="datasource"></tab2>
      </a-tab-pane>
      <a-tab-pane
        key="3"
        tab="会话列表"
        force-render>
        <tab3 ref="tab3" :datasource="datasource" @chaned="chaned"></tab3>
      </a-tab-pane>
      <a-tab-pane
        key="4"
        tab="电源策略"
        force-render>
        <tab4 ref="tab4" :datasource="datasource"></tab4>
      </a-tab-pane>
      <!-- <a-input-search
        slot="tabBarExtraContent"
        style="width: 220px"
        placeholder=""
        enter-button
        :v-model="data"
        @search="onSearch" /> -->
      <div class="global-search-wrapper" v-if="isSearchVisible" slot="tabBarExtraContent" style="width: 250px;padding-right:0px">
        <a-auto-complete
          class="global-search"
          :data-source="dataSearch"
          style="width: 100%"
          placeholder="请输入你想要查询的计算机名称"
          option-label-prop="title"
          @select="onSelect"
          @search="handleSearch">
          <a-input>
            <a-button
              slot="suffix"
              style="margin-right: -12px"
              class="search-btn"
              type="primary">
              <a-icon type="search" />
            </a-button>
          </a-input>
        </a-auto-complete>
      </div>
      <a-select
        v-if="isActiveVisible"
        v-model="defaultValue"
        @select="changeSelect"
        slot="tabBarExtraContent"
        style="width: 170px; margin:auto; margin-left:20px;">
        <a-select-option
          v-for="i in ActiveList"
          :key="i.value"
          :value="i.value">
          {{ i.name }}
        </a-select-option>
      </a-select>
      <div
        v-if="isSetColumns"
        class="set"
        slot="tabBarExtraContent"
        @click="$refs.columns.Add($refs.tab1.columns)">
        <a-icon type="setting"></a-icon>
      </div>
    </a-tabs>
    <set-columns ref="columns" @ok="customizeColumns"></set-columns>
    <add-user ref="user" @ok="changeActive('2')"></add-user>
    <add-group ref="group" @ok="changeActive('2')"></add-group>
    <remove ref="remove" @ok="changeActive('2')"></remove>
  </a-card>
</template>

<script>
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import Tab4 from './Tab4'
import AddUser from './UserConfig/AddUsers'
import AddGroup from './UserConfig/AddGroup'
import Remove from './UserConfig/Remove'
import { deepGet } from '@/utils/util'
import SetColumns from './SetColumns'
import {
  CloudDesktopMachinePower,
  CloudDesktopMachineSetMaintenanceMode,
  CloudDesktopSessionStop,
  CloudDesktopMachineList
} from '@/api/CloudDesktop/CloudDesktop'
export default {
  components: {
    Tab1,
    Tab2,
    Tab3,
    Tab4,
    AddUser,
    AddGroup,
    Remove,
    SetColumns
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
        { name: '关机', value: 'DesktopOff' },
        { name: '重启', value: 'DesktopReSet' },
        { name: '开启维护模式', value: 'DesktopOnMaintain' },
        { name: '关闭维护模式', value: 'DesktopOffMaintain' }
      ],
      DesktopList: [
        { name: '开机', value: 'DesktopOn' },
        { name: '关机', value: 'DesktopOff' },
        { name: '重启', value: 'DesktopReSet' },
        { name: '开启维护模式', value: 'DesktopOnMaintain' },
        { name: '关闭维护模式', value: 'DesktopOffMaintain' }
      ],
      UserConfig: [
        { name: '添加用户', value: 'AddUsers' },
        { name: '添加用户组', value: 'AddGroup' },
        { name: '移除', value: 'DeleteUser' }
      ],
      SessionList: [
        { name: '注销会话', value: 'SessionDelete' }
      ],
      isActiveVisible: true,
      isSearchVisible: true,
      isSetColumns: true,
      queryParam: {},
      checked: [], // 表格选中的tr
      defaultValue: '操作',
      dataSearch: [],
      TAbleData: []
    }
  },
  methods: {
    // tabs操作按钮
    async changeActive (val) {
        this.checked = []
        this.$refs.tab1.selectedRowKeys = []
        this.$refs.tab2.selectedRowKeys = []
        this.queryParam.desktop_id = this.datasource.id
      if (val === '1') {
        this.isActiveVisible = true
        this.isSearchVisible = true
        this.isSetColumns = true
        this.ActiveList = deepGet(this.DesktopList, [], [])
        this.getDesktopList()
        this.$refs.tab1.$refs.table.refresh()
      } else if (val === '2') {
        this.isActiveVisible = true
        this.isSearchVisible = false
        this.isSetColumns = false
        this.ActiveList = deepGet(this.UserConfig, [], [])
        this.$refs.tab2.$refs.Group.refresh()
        this.$refs.tab2.$refs.User.refresh()
      } else if (val === '3') {
        this.isSearchVisible = true
        this.isActiveVisible = true
        this.isSetColumns = true
        this.ActiveList = deepGet(this.SessionList, [], [])
        this.$refs.tab3.$refs.table.refresh()
      } else if (val === '4') {
        this.isSearchVisible = false
        this.isActiveVisible = false
        this.isSetColumns = false
        this.$refs.tab4.getdata()
      }
    },
    // 选中表格中的tr
    chaned (item) {
      this.checked = []
      this.checked = item
    },
    // 桌面列表 搜索按钮
    onSearch (value) {
        this.datasource.Search = value
        this.$refs.tab1.$refs.table.refresh()
    },
    // select 下拉框选中事件
    changeSelect (value, option) {
      const self = this
      Object.keys(self).forEach((u) => {
        if (u === value) {
            try {
                this[u]()
            } catch {
                this.defaultValue = '操作'
            }
        }
      })
      this.defaultValue = '操作'
    },
    // 桌面列表 开机
    DesktopOn () {
      if (this.checked.length > 0) {
        this.$confirm({
          title: '确定要将选中桌面开机吗?',
          onOk: () => {
            return new Promise(async (resolve, reject) => {
                const power = []
                 this.checked.find(u => {
                    if (u.PowerState === 'POWER_STATE_OFF') {
                        power.push(u.HostedMachineName)
                    }
                })
                if (power.length === 0) {
                    this.$message.info('当前选中的桌面都已开机')
                    resolve()
                    return false
                }
                const obj = {
                    DesktopId: this.datasource.id,
                    HostedMachineName: power,
                    power: 'POWER_ACTION_START'
                }
                await CloudDesktopMachinePower(obj).then(res => {
                    this.$message.success('操作成功')
                    this.$refs.tab1.$refs.table.refresh()
                    resolve()
                }).catch(() => {
                    this.$message.error('操作失败')
                    resolve()
                })
            })
          }
        })
      } else {
        this.$message.info('请先勾选要操作的数据')
      }
    },
    // 桌面列表 关机
    DesktopOff () {
      if (this.checked.length > 0) {
        this.$confirm({
          title: '确定要将选中桌面关机吗?',
          onOk: () => {
            return new Promise(async (resolve, reject) => {
                const power = []
                this.checked.forEach(u => {
                    if (u.PowerState === 'POWER_STATE_ON') {
                        power.push(u.HostedMachineName)
                    }
                })
                if (power.length === 0) {
                    this.$message.info('当前选中的桌面都已关机')
                    resolve()
                    return false
                }
              const obj = {
                DesktopId: this.datasource.id,
                HostedMachineName: power,
                power: 'POWER_ACTION_STOP'
              }
                await CloudDesktopMachinePower(obj).then(() => {
                    this.$message.success('操作成功')
                    this.$refs.tab1.$refs.table.refresh()
                    resolve()
                }).catch(() => {
                this.$message.error('操作失败')
                    resolve()
                })
            })
          }
        })
      } else {
        this.$message.info('请先勾选要操作的数据')
      }
    },
    // 桌面列表 重启
    DesktopReSet () {
      if (this.checked.length > 0) {
        this.$confirm({
          title: '确定要将选中桌面重启吗?',
          onOk: () => {
            return new Promise(async (resolve, reject) => {
             const power = []
              this.checked.forEach(u => {
                    if (u.PowerState === 'POWER_STATE_ON') {
                        power.push(u.HostedMachineName)
                    }
                })
                if (power.length === 0) {
                    this.$message.info('只有在开机的情况下才能重启')
                    resolve()
                    return false
                }
              const obj = {
                DesktopId: this.datasource.id,
                HostedMachineName: power,
                power: 'POWER_ACTION_REBOOT'
              }
                await CloudDesktopMachinePower(obj).then(() => {
                    this.$message.success('操作成功')
                    this.$refs.tab1.$refs.table.refresh()
                    resolve()
                }).catch(() => {
                    this.$message.error('操作失败')
                    this.$refs.tab1.$refs.table.refresh()
                    resolve()
                })
            })
          }
        })
      } else {
        this.$message.info('请先勾选要操作的数据')
      }
    },
    // 桌面列表 开启维护模式
    DesktopOnMaintain () {
      if (this.checked.length > 0) {
        this.$confirm({
          title: '确定要将选中开启维护模式?',
          onOk: () => {
            return new Promise(async (resolve, reject) => {
                const power = []
              this.checked.forEach(u => {
                    if (u.InMaintenanceMode === false) {
                        power.push(u.HostedMachineName)
                    }
                })
                if (power.length === 0) {
                    this.$message.info('当前选中的计算机已经开启维护模式')
                    resolve()
                    return false
                }
              const obj = {
                HostedMachineName: power,
                MaintenanceMode: true
              }
                await CloudDesktopMachineSetMaintenanceMode(obj).then(res => {
                    this.$message.success('操作成功')
                    this.$refs.tab1.$refs.table.refresh()
                    resolve()
                }).catch(() => {
                    this.$message.error('操作失败')
                    resolve()
                })
            })
          }
        })
      } else {
        this.$message.info('请先勾选要操作的数据')
      }
    },
    // 桌面列表 关闭维护模式
    DesktopOffMaintain () {
      if (this.checked.length > 0) {
        this.$confirm({
          title: '确定要将选中关闭维护模式?',
          onOk: () => {
            return new Promise(async (resolve, reject) => {
                const power = []
              this.checked.forEach(u => {
                    if (u.InMaintenanceMode === true) {
                        power.push(u.HostedMachineName)
                    }
                })
                if (power.length === 0) {
                    this.$message.info('当前选中的计算机已经关闭维护模式')
                    resolve()
                    return true
                }
              const obj = {
                HostedMachineName: power,
                MaintenanceMode: false
              }
                await CloudDesktopMachineSetMaintenanceMode(obj).then(res => {
                    this.$message.success('操作成功')
                    this.$refs.tab1.$refs.table.refresh()
                    resolve()
                }).catch(() => {
                    this.$message.error('操作失败')
                    resolve()
                })
            })
          }
        })
      } else {
        this.$message.info('请先勾选要操作的数据')
      }
    },
    // 会话列表 注销会话
    SessionDelete () {
      if (this.checked.length > 0) {
        this.$confirm({
          title: '确认要停止该会话吗?',
          onOk: () => {
            return new Promise(async (resolve, reject) => {
              const obj = {
                SessionKey: this.checked.SessionKey
              }
              try {
                await CloudDesktopSessionStop(obj)
                this.$message.success('操作成功')
              } catch {
                resolve()
                this.$message.error('操作失败')
              }
            })
          }
        })
      } else {
        this.$message.info('请先勾选要操作的数据')
      }
    },

    AddUsers () {
        this.$refs.user.Add(this.datasource)
    },

    AddGroup () {
        this.$refs.group.Add(this.datasource)
    },

    DeleteUser () {
        this.$refs.remove.Add(this.datasource)
    },

    onSelect (value) {
        this.queryParam.username = value
        this.$refs.table.refresh()
    },

        handleSearch (value) {
            this.dataSearch = []
            const res = []
            this.TAbleData.forEach(u => {
                for (let o = 0; o <= u.toString().length; o++) {
                    if (u.substring(o, (value.length) + o) === value) {
                        res.push(u)
                    }
                }
            })
            this.TAbleData.includes(value) ? this.dataSearch = [value, ...res] : this.dataSearch = res
        },

    async getDesktopList () {
        const data = deepGet(await CloudDesktopMachineList({ desktop_id: this.datasource.id }), 'data', [])
        data.forEach(u => {
            this.TAbleData.push(u.HostedMachineName)
        })
    },
    customizeColumns (value) {
        this.$refs.tab1.columns = value
        this.$refs.tab1.$refs.table.refresh()
    }
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
    .set {
        background: #1890ff;
        border-radius: 5px;
        color: white;
        margin-left: 10px;
        max-height: 32px;
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 40px;
        margin: auto 0;
        margin-left: 20px;
        i {
            padding: 0 8px;
            font-size: 15px !important;
        }
    }
.ant-tabs-bar{
    margin: 0;
}
</style>
