<template>
  <page-header-wrapper :title="false">
    <a-form layout="inline">
      <a-row :gutter="48">
        <a-col :md="8" :sm="24">
          <a-form-item label="类型">
            <a-select v-model="queryParam.types" placeholder="请选择状态" optionLabelProp="label" allowClear>
              <a-select-option value="item.key" class="flex">
                123
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item label="级别">
            <a-select v-model="queryParam.grade" placeholder="请选择状态" optionLabelProp="label" allowClear>
              <a-select-option value="item.key" class="flex">
                123
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <template v-if="advanced">
          <a-col :md="8" :sm="24">
            <a-form-item label="已读">
              <a-select v-model="queryParam.isRead" placeholder="请选择" optionLabelProp="label" allowClear>
                <a-select-option value="item.key" class="flex">
                  123
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
    </a-form>
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
