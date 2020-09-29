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
                  <a-select-option
                    value="邮箱"
                    label="邮箱">邮箱</a-select-option>
                  <a-select-option
                    value="手机号码"
                    label="手机号码">手机号码</a-select-option>
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
              :showUploadList="true"
              :fileList="fileList"
              :beforeUpload="beforeUpload">
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
import { usermanageAllUser } from '@/api/CloudDesktop/userManage'
// import { usermanageBatchAddUser } from '@/api/CloudDesktop/userManage'
import Papa from 'papaparse'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageBatchTabAdd',
  data () {
    return {
      dataArr: [], // 提交的数据
      optionvalue: [], // 选择列表的列
      itemList: [], // 下载csv的模版
      fileList: [], // 上传列表
      filename: String, // 上传的名称
      filetype: String, // 上传的类型
      ErrorArr: [], // 错误的头部
      ErrorIndex: [], // 错误的下标
      AllData: [], // 没有处理的的数据
      format: null, // 格式问题
      validatorName: [], // 重名校验
      rowuserPas: null,
      rowpasNoExpired: null
    }
  },
  methods: {
    BatchAdd () {
      this.fileList = []
      this.AllData = []
      this.ErrorArr = []
      this.ErrorArr = []
      this.dataArr = []
      this.visible = true
    },
    beforeUpload (file) {
      this.fileList = [file]
      this.dataArr = []
      this.filename = file.name
      this.filetype = file.type
      if (file.type !== 'text/csv') {
        this.$message.error('上传文件格式错误')
        this.fileList = []
        return
      }
      var reader = new FileReader() // new一个FileReader实例
      reader.readAsText(file, 'UTF-8')
      reader.onloadend = (evt) => {
        const res = evt.target.result
        const dataArr = res.split('\n')
        this.AllData = res.split('\n')
        dataArr.forEach((u, index) => {
          if (index < dataArr.length - 1) {
            const Arr = dataArr[index].split(',')
            Arr.forEach((u, index) => {
              if (u.length === 0) this.ErrorIndex.push(index)
              if (index === Arr.length - 1 && u.length === 1) this.ErrorIndex.push(index)
            })
            let add = dataArr[index].replace(new RegExp(',', 'g'), ' ')
            if (index === 0) this.ErrorArr = Arr
            if (index !== dataArr.length - 2) add += '\n'
            if (add.length > 8) {
              const Base64 = require('js-base64').Base64
              this.dataArr.push(Base64.encode(add)) // 加密
            }
          }
        })
      }
      return false
    },
    async handleSubmit () {
      this.confirmLoading = true
      if (this.dataArr.length === 0) {
        this.$message.info('请先选择上传文件')
        this.confirmLoading = false
        return false
      }
      console.log(this.ErrorArr)
      if (this.ErrorIndex.length !== 0) {
        this.$message.error(this.ErrorArr[this.ErrorIndex[0]] + '等字段不能为空')
        this.confirmLoading = false
        return false
      }
      this.validatorName = this.deepGet(await usermanageAllUser(), 'list')
      this.AllData.forEach((u, index) => {
        if (index > 0 && index < this.AllData.length - 1) {
          const row = u.split(',')
          this.rowuserPas = null
          this.rowrowpasNoExpired = null
          row.forEach((o, sum) => {
            if (this.titleNameChange(this.ErrorArr[sum], o) === 1) this.$message.error('第' + index + '行，' + this.ErrorArr[sum] + '格式错误')
          })
        }
      })
      //   const obj = {
      //     filename: this.filename,
      //     filetype: this.filetype,
      //     fileData: this.dataArr
      //   }
      //   usermanageBatchAddUser(obj).then((res) => {
      //     this.$message.success('上传成功')
      //     this.visible = false
      //   })
      this.confirmLoading = false
    },

    option () {
      this.itemList = []
      const obj = {
        用户名: 'linqiankai',
        姓名: '林千凯',
        密码: '123456',
        是否下次登录修改密码: '否',
        是否不能修改密码: '是',
        是否禁用账户: '否',
        是否密码永不过期: '否'
      }
      this.optionvalue.forEach((u) => {
        console.log(u)
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
      el.download = 'AD_USER.csv'
      // 必须点击否则不会下载
      el.click()
      // 移除链接释放资源
      urlObject.revokeObjectURL(url)
    },
    titleNameChange (key, val) {
        key = key.replace(/\s+/g, '')
        debugger
      switch (key) {
        case '用户名':
          return this.username(val)
        case '姓名':
          return this.length(val, 2, 8)
        case '密码':
          return this.length(val, 7, 16)
        case '是否不能修改密码':
            return this.pasNoExpired(val)
        case '是否禁用账户':
          return this.whether(val)
        case '是否密码永不过期':
            return this.pasNoExpired(val)
        case '是否下次登录修改密码':
          return this.userPas(val)
        case '邮箱':
          return this.EmailValidator(val)
        default:
          return this.telValidator(val)
      }
    },
    // 校验用户名
    username (value) {
      const pattern = /^[a-zA-Z][A-Za-z0-9]+$/
      if (!pattern.test(value)) {
        return 1
      }
      const target = this.validatorName.find((u) => u['username'] === value)
      if (target) {
        return 1
      }
      this.validatorName.push({ username: value })
    },
    // 字段的长度
    length (value, min, max) {
      if (value.length > max || value.length < min) {
        return 1
      }
    },
    // 判断是或者否
    whether (value) {
      if (!(value === '是' || value === '否')) {
        return 1
      }
    },
    // 校验电话
    telValidator (value) {
      value = parseInt(value)
      const pattern = /^1[0-9]{10}$/
      if (!pattern.test(value)) {
        return 1
      }
    },
    // 校验邮箱
    EmailValidator (value) {
      var pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!pattern.test(value)) {
        return 1
      }
    },
    // 校验用户不能修改密码
    userPas (value) {
        this.whether(value)
        if (value === '是') {
            this.rowuserPas = true
        } else {
            this.rowuserPas = null
        }
    },
    // 校验用户密码永不过期和用户下次登录必须修改密码
    pasNoExpired (value) {
        this.whether(value)
        if (this.rowuserPas) {
            if (value === '是') { return 1 }
        }
        if (value === '是') {
            if (this.rowuserPas) {
return 1
            }
            this.rowrowpasNoExpired = true
        } else {
            this.rowrowpasNoExpired = null
        }
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
/deep/.ant-upload-list-item:hover .ant-upload-list-item-info {
  background: none;
  cursor: pointer;
}
/deep/i.anticon.anticon-paper-clip,
/deep/i.anticon.anticon-delete,
/deep/span.ant-upload-list-item-name {
  color: white;
}
</style>
