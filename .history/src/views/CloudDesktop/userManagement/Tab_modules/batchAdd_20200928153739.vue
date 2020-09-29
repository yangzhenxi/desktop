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
            <a-row :gutter="[16,16]">
              <a-col :span="24">
                <div style="color:white;margin-bottom:10px">请选择你想要添加的列</div>
                <a-select
                  mode="multiple"
                  style="width: 100%"
                  option-label-prop="label"
                  placeholder="请选择你想要添加的列"
                  v-model="optionvalue">
                  <a-select-option value="邮箱" label="邮箱">邮箱</a-select-option>
                  <a-select-option value="手机号码" label="手机号码">手机号码</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="24">
                <div style="width:100%;text-align:center">
                  <a-button
                    type="primary"
                    @click="option"
                    icon="download">
                    下载模版
                  </a-button>
                </div>
              </a-col>
            </a-row>

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
import Papa from 'papaparse'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageBatchTabAdd',
  data () {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      dataArr: [],
      optionvalue: [],
      itemList: [], // 下载csv的模版
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
        this.dataArr = []
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
          if (index < dataArr.length) {
            const Arr = dataArr[index].split(',')
            Arr.forEach((u, index) => {
              if (u.length === 0) this.ErrorIndex.push(index)
              if (index === Arr.length - 1 && u.length === 1) this.ErrorIndex.push(index)
            })
            if (index === 0) this.ErrorArr = Arr
            let add = dataArr[index].replace(new RegExp(',', 'g'), ' ')
            console.log(add)
            if (index !== dataArr.length - 2) add += '\n'
            const Base64 = require('js-base64').Base64
            this.dataArr.push(Base64.encode(add)) // 加密
          }
        })
      }
      return false
    },
    handleRemove (file) {},
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
      const obj = {
        用户名: '林千凯',
        姓名: '林千凯',
        密码: '123456',
        组织单位: 'howlink',
        // 邮箱: '',
        // 手机号码: '',
        用户不能修改密码: '是',
        是否禁用账户: '否',
        用户密码永不过期: '否',
        用户下次登录必须修改密码: '否'
      }
      this.optionvalue.forEach(u => {
          if (u === '邮箱') obj.邮箱 = 'howlink@qq.com'
          if (u === '手机号码') obj.手机号码 = '188xxxx0929'
      })
      this.itemList.push(obj)
      var csv = Papa.unparse(this.itemList)
      // 定义文件内容，类型必须为Blob 否则createObjectURL会报错
      const content = new Blob([csv])
      // 生成url对象
      const urlObject = window.URL || window.webkitURL || window
      const url = urlObject.createObjectURL(content)
      // 生成<a></a>DOM元素
      const el = document.createElement('a')
      // 链接赋值
      el.href = url
      el.download = '批量上传模版.csv'
      // 必须点击否则不会下载
      el.click()
      // 移除链接释放资源
      urlObject.revokeObjectURL(url)
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
