<template>
  <div>
    <a-modal
      :width="840"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
      :footer="null"
      destroyOnClose>
      <template slot="title">
        <!-- {{ this.$route.query.AddData }} -->
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
            :data="$route.query.AddData"
            @nextStep="nextStep" />
          <step2
            v-if="currentTab === 1"
            @nextStep="nextStep"
            :data="$route.query.AddData"
            @prevStep="prevStep" />
          <step3
            v-if="currentTab === 2"
            @nextStep="nextStep"
            :data="dataStores"
            @prevStep="prevStep" />
          <step4
            v-if="currentTab === 3"
            @prevStep="prevStep"
            :data="AddData"
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
      AllData: {}
    }
  },
  methods: {
    Add () {
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.visible = false
        }
      })
    },
    nextStep (value, item) {
      if (this.currentTab < 3) {
        this.currentTab += 1
      }
      if (item) {
          this.dataStores = item
      }
      Object.assign(this.AllData, value)
      console.log(this.AllData)
    },
    prevStep () {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish () {
      this.currentTab = 0
    },
    close () {
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
