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
            <tab1></tab1>
          </a-tab-pane>
          <a-tab-pane
            key="2"
            tab="用户配置"
            force-render>
            <tab2></tab2>
          </a-tab-pane>
          <a-tab-pane
            key="3"
            tab="会话列表">
            <tab3></tab3>
          </a-tab-pane>
          <a-tab-pane
            key="4"
            tab="电源策略">
            <tab4></tab4>
          </a-tab-pane>
          <a-input-search
            v-if="isSearchVisible"
            slot="tabBarExtraContent"
            style="width: 220px"
            placeholder="请输入你想要查询的用户名"
            enter-button
            :v-model="data"
            @search="onSearch" />
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
export default {
    components: {
        Tab1,
        Tab2,
        Tab3,
        Tab4
    },
    data () {
        return {
                  tabBarGutter: 20,
      data: '', // 默认搜索值
      ActiveList: [],
      DesktopList: [
        { name: '新增桌面', value: 'DesktopAdd' },
        { name: '开机', value: 'DesktopOn' },
        { name: '重启', value: 'Desktopreset' },
        { name: '重新生成', value: 'DesktopRe' },
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
      isSearchVisible: true
        }
    }
}
</script>

<style>

</style>
