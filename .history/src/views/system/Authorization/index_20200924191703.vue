<template>
  <page-header-wrapper :title="false">
    <a-form
      layout="inline"
      :labelCol="{
        xs: { span: 24 },
        sm: { span: 7 }
      },"
      :wrapperCol="wrapperCol">
      <a-row :gutter="48">
        <a-col :span="8">
          <a-form-item label="可用状态" style="width:100%">
            <a-select v-model="queryParam.useStatus" placeholder="请选择" allowClear>
              <a-select-option value="1">正常</a-select-option>
              <a-select-option value="0">异常</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="可用状态" style="width:100%">
            <a-select v-model="queryParam.useStatus" placeholder="请选择" allowClear>
              <a-select-option value="1">正常</a-select-option>
              <a-select-option value="0">异常</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <template v-if="advanced">
          <a-col :md="8" :sm="24">
            <a-form-item label="实例用户">
              <a-input v-model="queryParam.userName" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="可用状态">
              <a-select v-model="queryParam.useStatus" placeholder="请选择" allowClear>
                <a-select-option value="1">正常</a-select-option>
                <a-select-option value="0">异常</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </template>
        <a-col :md="!advanced && 8 || 24" :sm="24">
          <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
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
import { mixinTable } from '@/utils/mixin'

export default {
  mixins: [mixinTable],
  data () {
    return {
           expand: false,
      queryParam: {}
    }
  },
    computed: {
    count () {
      return this.expand ? 11 : 7
    }
  },
  methods: {
         toggle () {
      this.expand = !this.expand
    }
  }
}
</script>
