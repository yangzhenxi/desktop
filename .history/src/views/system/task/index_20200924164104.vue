<template>
  <page-header-wrapper :title="false">
    <a-row>
      <a-col :span="2">
        <a-button
          type="danger"
          @click="AllDelete">
          批量删除
        </a-button>
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
import { mixinTable } from '@/utils/mixin'
export default {
  mixins: [mixinTable],
  data () {
    return {
      queryParam: {}
    }
  },
  methods: {
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
}
</script>
