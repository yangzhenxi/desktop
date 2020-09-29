<template>
  <a-modal
    title="批量新增用户信息"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form
        :form="form"
        layout="vertical">
        <a-row
          type="flex"
          justify="center"
          align="middle">
          <a-col
            :span="12"
            style="display:flex;justify-content: center;">
            <a-row>
              <a-col :span="24">

              </a-col>
            </a-row>
            <a-button
              type="primary"
              @click="option"
              icon="download">
              <a
                style="color:white"
                :href="`${path}assets/AD_USER.CSV`"
                download="批量添加模版">下载模版</a>
            </a-button>
          </a-col>
          <a-col
            :span="12"
            style="display:flex;justify-content: center;">
            <a-upload
              name="file"
              :multiple="true"
              accept="text"
              :headers="headers"
              :beforeUpload="beforeUpload"
              :file-list="fileList"
              :remove="handleRemove">
              <a-button type="primary">
                <a-icon type="upload" /> 上传批量用户信息
              </a-button>
            </a-upload>
          </a-col>
          <a-col
            :span="24"
            style="margin-top:20px;color:white;text-align:center;">
            请先下载模板，并按模板格式整理数据再上传
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { usermanageBatchAddUser } from '@/api/CloudDesktop/userManage'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageBatchTabAdd',
  data () {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      dataArr: [],
      path: process.env.BASE_URL,
      fileList: null,
      filename: String,
      filetype: String,
      isboole: Boolean,
      ErrorArr: [],
      ErrorIndex: []
    }
  },
  methods: {
    BatchAdd () {
      this.visible = true
    },
    beforeUpload (file) {
      this.filename = file.name
      this.filetype = file.type
      if (file.type !== 'text/csv') {
        this.isboole = false
      }
      var reader = new FileReader() // new一个FileReader实例
      reader.readAsText(file, 'UTF-8')
      reader.onloadend = (evt) => {
        const res = evt.target.result
        const dataArr = res.split('\n')
        dataArr.forEach((u, index) => {
          if (index < dataArr.length - 1) {
            const Arr = dataArr[index].split(',')
            Arr.forEach((u, index) => {
              if (u.length === 0) this.ErrorIndex.push(index)
              if (index === Arr.length - 1 && u.length === 1) this.ErrorIndex.push(index)
            })
            if (index === 0) this.ErrorArr = Arr

            let add = dataArr[index].replace(new RegExp(',', 'g'), ' ')
            if (index !== dataArr.length - 2) add += '\n'
            const Base64 = require('js-base64').Base64
            this.dataArr.push(Base64.encode(add)) // 加密
          }
        })
      }
      return false
    },
    handleRemove (file) {

    },
    handleSubmit () {
      this.confirmLoading = true
      if (!this.isboole) {
        this.$message.error('上传文件格式错误')
      }
      this.ErrorIndex.forEach((u) => {
        console.log(this.ErrorArr[u])
      })
      const obj = {
        filename: this.filename,
        filetype: this.filetype,
        fileData: this.dataArr
      }
      usermanageBatchAddUser(obj).then((res) => {
        this.$message.success('上传成功')
        this.visible = false
      })
      this.confirmLoading = false
    },
    option () {

    }
  }
}
</script>

<style lang="less" scoped>
.ant-form-vertical .ant-form-item {
  padding-bottom: 0px;
  margin-bottom: 10px;
}
.ant-input-number {
  width: 100%;
}
/deep/label[title='首次修改密码'],
/deep/label[title='是否修改密码'] {
  color: white;
  font-weight: 500;
}
</style>
