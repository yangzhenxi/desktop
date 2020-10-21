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
              <!-- <a-col :span="24">
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
              </a-col> -->
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
            <span>请先下载模板，并按模板格式整理数据再上传</span>
            <span style="color:red;"> (最大可上传200条数据)</span>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import {
    usermanageAllUser,
    usermanageBatchAddUser
} from '@/api/CloudDesktop/userManage'

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
            AllData: [], // 没有处理的的数据
            format: null, // 格式问题
            validatorName: [], // 重名校验
            rowuserPas: null,
            rowpasNoExpired: null,
            IsvalidatorSuccess: true, // 校验成功的结果
            record: null,
            boole: true
        }
    },
    methods: {
        async BatchAdd (record) {
            this.record = null
            this.fileList = []
            this.AllData = []
            this.ErrorArr = []
            this.dataArr = []
            this.record = record
            this.IsvalidatorSuccess = true
            this.visible = true
        },
        beforeUpload (file) {
            this.fileList = [file]
            this.dataArr = []
            this.filename = file.name
            this.filetype = file.type
            // console.log(file.type)
            // if (file.type !== 'text/csv' || file.type !== 'application/vnd.ms-excel') {
            //     this.$message.error('上传文件格式错误')
            //     this.fileList = []
            //     return
            // }
            var reader = new FileReader() // new一个FileReader实例
            file.type === 'text/csv' ? reader.readAsText(file, 'UTF-8') : reader.readAsText(file, 'GB2312')
            reader.onloadend = evt => {
                const res = evt.target.result
                const dataArr = res.split('\n')
                this.AllData = res.split('\n')
                dataArr[0] =
                    '用户名, 姓名, 密码, 用户下次登录必须修改密码, 用户不能修改密码, 是否禁用账户, 用户密码永不过期'
                this.ErrorArr = [
                    '用户名',
                    '姓名',
                    '密码',
                    '是否下次登录修改密码',
                    '是否不能修改密码',
                    '是否禁用账户',
                    '是否密码永不过期'
                ]
                dataArr.forEach((u, index) => {
                    if (index < dataArr.length) {
                        let add = dataArr[index].replace(new RegExp(',', 'g'), ' ')
                        if (index !== dataArr.length - 2) add += '\n'
                        if (add.length > 8) {
                            const Base64 = require('js-base64').Base64
                            this.dataArr.push(Base64.encode(add)) // 加密
                            // this.dataArr.push(add) // 加密
                        }
                    }
                })
            }
            return false
        },
        // 验证
        verification () {
            if (this.dataArr.length > 201) {
                this.$message.info('上传用户数量超过200个，请重新编辑')
                this.IsvalidatorSuccess = false
                this.confirmLoading = false
            }
            if (this.dataArr.length === 0) {
                this.$message.info('请先选择上传文件')
                this.IsvalidatorSuccess = false
                this.confirmLoading = false
                return false
            } else if (this.dataArr.length === 1) {
                this.$message.info('请填写数据后在上传')
                this.IsvalidatorSuccess = false
                this.confirmLoading = false
                return false
            }
            this.AllData.forEach((u, index) => {
                if (index > 0 && index < this.AllData.length) {
                    if (u !== '') {
                        const row = u.split(',')
                        this.rowuserPas = null
                        this.rowrowpasNoExpired = null
                        row.forEach((o, sum) => {
                            if (this.titleNameChange(this.ErrorArr[sum], o)) {
                                this.$message.error('第' + index + '行，' + this.titleNameChange(this.ErrorArr[sum], o))
                                this.IsvalidatorSuccess = false
                                this.confirmLoading = false
                            }
                        })
                    }
                }
            })
        },
        // 提交
        async handleSubmit () {
            this.confirmLoading = true
            this.validatorName = this.deepGet(await usermanageAllUser(), 'list')
            this.verification()
            if (this.IsvalidatorSuccess) {
                const apis = []
                this.boole = true
                let u = 0
                if (this.dataArr.length <= 30) {
                    const newDate = new Date().getTime()
                    const obj = {
                            filename: 'filename' + newDate,
                            filetype: this.filetype,
                            fileData: this.dataArr,
                            ou: this.record.dn
                        }
                        u = u + 1
                        usermanageBatchAddUser(obj).then(res => {
                            this.$message.success('上传成功')
                            this.$emit('ok')
                            this.confirmLoading = false
                            this.visible = false
                        })
                } else {
                    for (let i = 0; i < (this.dataArr.length - 30); i = i + 30) {
                        let fileData = []
                        if (Math.floor((this.dataArr.length - u * 30) / 30) > 1 && i === 0) {
                            fileData = this.dataArr.slice((u * 30), (u + 1) * 30)
                        } else if (Math.floor((this.dataArr.length - u * 30) / 30) > 1) {
                            const arr = this.dataArr.slice((u * 30), (u + 1) * 30)
                            fileData = [this.dataArr[0], ...arr]
                        } else {
                            const arr = this.dataArr.slice((u * 30))
                            fileData = [this.dataArr[0], ...arr]
                        }
                        const newDate = new Date().getTime()
                        const obj = {
                            filename: 'filename' + newDate,
                            filetype: this.filetype,
                            fileData: fileData,
                            ou: this.record.dn
                        }
                        u = u + 1
                        apis.push(await usermanageBatchAddUser(obj))
                    }
                    apis.forEach(async u => {
                        await u().then((err) => {
                            console.log(err)
                        }).catch(e => {
                            this.boole = false
                        })
                    })
                    if (this.boole) {
                            this.$message.success('上传成功')
                            this.$emit('ok')
                            this.confirmLoading = false
                            this.visible = false
                    } else {
                            this.confirmLoading = false
                    }
                }
            }
        },

        option () {
            this.itemList = []
            const obj = {
                '用户名(英文加数字,长度为2-8)': 'TestOne',
                '姓名(长度为2-8)': '豪联科技',
                '密码(长度为7-16)': '123456789',
                '是否下次登录修改密码(是或否)': '否',
                '是否不能修改密码(是或否)': '否',
                '是否禁用账户(是或否)': '否',
                '是否密码永不过期(是或否)': '否'
            }
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
            el.download = '批量添加用户模版.csv'
            // 必须点击否则不会下载
            el.click()
            // 移除链接释放资源
            urlObject.revokeObjectURL(url)
        },
        titleNameChange (key, val) {
            key = key.replace(/\s+/g, '')
            console.log(typeof (val))
            val = val.replace(/\s+/g, '')
            switch (key) {
                case '用户名':
                    if (!val) {
                        return key + '不能为空'
                    }
                    return this.username(val)
                case '姓名':
                    if (!val) {
                        return key + '不能为空'
                    }
                    return this.length(val, 2, 8)
                case '密码':
                    if (!val) {
                        return key + '不能为空'
                    }
                    return this.length(val, 7, 16)
                case '是否不能修改密码':
                    if (!val) {
                        return key + '不能为空'
                    }
                    return this.pasNoExpired(val, key)
                case '是否禁用账户':
                    if (!val) {
                        return key + '不能为空'
                    }
                    return this.whether(val)
                case '是否密码永不过期':
                    if (!val) {
                        return key + '不能为空'
                    }
                    return this.pasNoExpired(val, key)
                case '是否下次登录修改密码':
                    if (!val) {
                        return key + '不能为空'
                    }
                    return this.userPas(val)
                case '邮箱':
                    return this.EmailValidator(val)
                case '手机号码':
                    return this.telValidator(val)
            }
        },
        // 校验用户名
        username (value) {
            const pattern = /^[a-zA-Z][A-Za-z0-9]+$/
            if (!pattern.test(value)) {
                return '用户名必须以字母开头，且仅有英文和数字'
            }
            this.length(value, 2, 8)
            const target = this.validatorName.find(u => u['username'] === value)
            if (target) {
                return '用户名重复'
            }
            this.validatorName.push({ username: value })
            return false
        },
        // 字段的长度
        length (value, min, max) {
            if (value.length > max || value.length < min) {
                return '长度错误'
            }
            return false
        },
        // 判断是或者否
        whether (value) {
            if (!(value === '是' || value === '否')) {
                return '请填写是或者否'
            }
            return false
        },
        // 校验电话
        telValidator (value) {
            value = parseInt(value)
            const pattern = /^1[0-9]{10}$/
            if (!pattern.test(value)) {
                return '格式有误'
            }
            return false
        },
        // 校验邮箱
        EmailValidator (value) {
            var pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (!pattern.test(value)) {
                return '格式有误'
            }
            return false
        },
        // 校验用户不能修改密码
        userPas (value) {
            if (!(value === '是' || value === '否')) {
                return '用户不能修改密码里只能填写是或者否'
            }
            if (value === '是') {
                this.rowuserPas = true
                if (this.rowrowpasNoExpired) {
                    return '格式有误'
                }
            } else {
                this.rowuserPas = null
            }
            return false
        },
        // 校验用户密码永不过期和用户下次登录必须修改密码
        pasNoExpired (value, key) {
            if (!(value === '是' || value === '否')) {
                return key + '里只能填写是或者否'
            }
            if (value === '是') {
                if (this.rowuserPas) {
                    return '格式有误'
                }
                this.rowrowpasNoExpired = true
            } else {
                this.rowrowpasNoExpired = null
            }
            return false
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
