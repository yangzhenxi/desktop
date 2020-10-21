<template>
  <div class="step4">
    <a-descriptions title="桌面信息">
      <a-descriptions-item label="桌面名称">
        {{ data.name }}
      </a-descriptions-item>
      <a-descriptions-item label="名称前缀">
        {{ data.namingScheme }}
      </a-descriptions-item>
      <a-descriptions-item label="选择模版">
        {{ data.template }}
      </a-descriptions-item>
      <a-descriptions-item label="版本号">
        {{ data.version }}
      </a-descriptions-item>
      <a-descriptions-item label="DN">
        {{ data.group }}
      </a-descriptions-item>
      <a-descriptions-item label="名称格式">
        {{ data.NamingSchemeType }}
      </a-descriptions-item>
      <a-descriptions-item label="起始数字">
        {{ data.Number }}
      </a-descriptions-item>
      <a-descriptions-item label="桌面数量">
        {{ data.count }}
      </a-descriptions-item>
      <a-descriptions-item label="桌面类型">
        {{ data.DesktopType | convert('C_D_DESKTOP_TYPE') }}
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="硬件参数">
      <a-descriptions-item label="托管资源" :span="3">
        {{ data.hostingUnit }}
      </a-descriptions-item>
      <a-descriptions-item label="网络">
        {{ data.network }}
      </a-descriptions-item>
    </a-descriptions>
    <a-row>
      <a-col
        :offset="9"
        :span="10">
        <a-button
          @click="prevStep">上一步</a-button>
        <a-button
          type="primary"
          style="margin-left: 8px"
          @click="close"
          :loading="loading">提交</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { CloudDesktopTPAdd } from '@/api/CloudDesktop/DesktopManagem'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
      computed: {
        ...mapState({
            'formValue': state => state.DesktopManage.formValue
        })
    },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    prevStep () {
      this.$emit('prevStep')
    },
    async close () {
      this.loading = true
      await CloudDesktopTPAdd(this.data)
        .then((res) => {
          this.$message.success('新建成功')
          this.loading = false
          this.$emit('close', res)
        })
        .catch(() => {
          this.$message.error('新建失败')
          this.loading = false
        })
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.step4 {
  margin-top: 40px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding: 10px;
}
.modules {
  padding: 10px;
  background-color: wheat;
  margin: 10px;
  box-sizing: border-box;
}
/deep/.ant-descriptions-title,
/deep/.ant-descriptions-item-label,
/deep/.ant-descriptions-item-content {
  color: white;
}
</style>
