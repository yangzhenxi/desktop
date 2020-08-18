<template>
  <a-modal
    title="自定义列表项"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-checkbox-group @change="onChange" :defaultValue="data">
        <a-row>
          <a-col
            :span="8"
            v-for="(item,index) in data"
            :key="index">
            <a-checkbox
              checked
              @change="onChange"
              :value="item">
              {{ item.title }}
            </a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
        checkedValues: this.data
    }
  },
  methods: {
    Set () {
      this.visible = true
    },
    onChange (checkedValues) {
      this.checkedValues = checkedValues
    },
    handleSubmit () {
    //   console.log(this.checkedValues)
        this.visible = false
    }
  }
}
</script>

<style>
</style>
