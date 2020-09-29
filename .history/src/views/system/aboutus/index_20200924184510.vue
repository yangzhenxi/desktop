<template>
  <page-header-wrapper :title="false">
    <a-descriptions title="模版信息">
      <a-descriptions-item label="所属分组">
        {{ group }}
      </a-descriptions-item>
      <a-descriptions-item label="模版名称">
        {{ data.name }}
      </a-descriptions-item>
      <a-descriptions-item label="系统镜像">
        {{ data.image }}
      </a-descriptions-item>
      <a-descriptions-item
        label="软件信息"
        span="2">
        {{ data.software }}
      </a-descriptions-item>
    </a-descriptions>
  </page-header-wrapper>
</template>

<script>
export default {

}
</script>

<style>

</style>
