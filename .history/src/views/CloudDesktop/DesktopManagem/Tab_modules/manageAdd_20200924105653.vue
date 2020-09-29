<template>
  <div>
    <a-modal
      :width="840"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel"
      destroyOnClose>
      <template slot="title">
        新建模版
      </template>
      <a-spin :spinning="loading">
        <a-row style="padding-top:25px;">
          <a-col
            :span="16"
            :offset="4">
            <a-steps
              class="steps"
              size="small"
              :current="currentTab">
              <a-step title="填写模版信息" />
              <a-step title="填写硬件信息" />
              <a-step title="选择目标存储" />
              <a-step title="完成" />
            </a-steps>
          </a-col>
        </a-row>

        <div class="content">
          <step1
            v-if="currentTab === 0"
            @close="close"
            :data="AddData"
            :validatorName="TPAllList"
            @nextStep="nextStep" />
          <step2
            v-if="currentTab === 1"
            @nextStep="nextStep"
            :data="AddData"
            @prevStep="prevStep" />
          <step3
            v-if="currentTab === 2"
            @nextStep="nextStep"
            :data="dataStores"
            :capacity="AllData.capacityKB"
            @prevStep="prevStep" />
          <step4
            v-if="currentTab === 3"
            @prevStep="prevStep"
            :data="AllData"
            @close="close"
            @finish="finish" />
        </div>
      </a-spin>
    </a-modal>
  </div>

</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  components: {
    Step1,
    Step2,
    Step3,
    Step4
  },
  data () {
    return {
      currentTab: 0,
      dataStores: [],
      AllData: {},
      AddData: {},
      TPAllList: []
    }
  },
  methods: {
    Add (AddData, TPAllList) {
        console.log(AddData)
        console.log(TPAllList)
        this.AllData = {}
      this.visible = true
      this.AddData = AddData
      this.TPAllList = TPAllList
    },
    nextStep (value, item) {
      if (this.currentTab < 3) {
        this.currentTab += 1
      }
      if (item) {
          this.dataStores = item
      }
      Object.assign(this.AllData, value)
    },
    prevStep () {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish () {
      this.currentTab = 0
    },
    close (res) {
        if (res) {
            this.currentTab = 0
            this.$emit('ok', res)
        }
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.ant-form-vertical .ant-form-item {
  padding-bottom: 0px;
  margin-bottom: 10px;
}
/deep/.ant-modal-header {
  background: none;
}
/deep/.ant-modal-content {
  background:#272E48;
  color: white;
}
/deep/.ant-modal-title,
/deep/.ant-modal-close-x {
  color: white;
}
/deep/.ant-steps-item-title,
/deep/.ant-form-item-required {
  color: white !important;
}
</style>
