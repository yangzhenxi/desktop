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

}
</script>

<style>

</style>
