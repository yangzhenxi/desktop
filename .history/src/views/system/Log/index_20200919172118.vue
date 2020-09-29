<template>
  <page-header-wrapper :title="false">
    <a-row>
      <a-col :span="2">
        <a-button
          type="primary"
          @click="$refs.Add.Add(roleList,UserList)"
          icon="plus">新增</a-button>
      </a-col>
      <a-col :span="4">
        <a-input-search
          placeholder="请输入你想要查询的用户名"
          enter-button
          :v-model="data"
          @search="onSearch" />
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
export default {

}
</script>

<style>

</style>
