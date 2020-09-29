<template>
  <page-header-wrapper :title="false">
  </page-header-wrapper>
</template>
<script>
export default {
  data () {
    return {
      headers: {
        authorization: 'authorization-text'
      }
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
