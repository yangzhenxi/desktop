<template>
  <page-header-wrapper :title="false">
    <a-form layout="inline">
      <a-row :gutter="48">
        <a-col :md="8" :sm="24">
          <a-form-item label="类型">
            <a-select v-model="queryParam.types" placeholder="请选择状态" optionLabelProp="label" allowClear>
              <a-select-option value="item.key" :label="item.val" class="flex">
                {{ item.val }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item label="级别">
            <a-select v-model="queryParam.grade" placeholder="请选择状态" optionLabelProp="label" allowClear>
              <a-select-option v-for="item in gradeList" :key="item.key" :value="item.key" :label="item.val" class="flex">
                {{ item.val }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <template v-if="advanced">
          <a-col :md="8" :sm="24">
            <a-form-item label="已读">
              <a-select v-model="queryParam.isRead" placeholder="请选择" optionLabelProp="label" allowClear>
                <a-select-option v-for="item in readList" :key="item.key" :value="item.key" :label="item.val" class="flex">
                  {{ item.val }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </template>
        <a-col :md="!advanced && 8 || 24" :sm="24">
          <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
            <a-button type="primary" @click="$refs.table.refresh()">查询</a-button>
            <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? '收起' : '展开' }}
              <a-icon :type="advanced ? 'up' : 'down'"/>
            </a>
          </span>
        </a-col>
      </a-row>
    </a-form>
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
