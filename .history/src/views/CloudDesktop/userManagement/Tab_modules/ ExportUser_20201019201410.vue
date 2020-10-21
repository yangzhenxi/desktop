<template>
  <a-modal
    title="导出用户"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form
        :form="form"
        layout="horizontal">
        <a-row
:gutter="30"
key=" :labelCol="labelCol"
               :wrapperCol="wrapperCol"
">
          <a-form-item label="组织单位">
            <a-select
              placeholder="请选择组织单位"
              v-decorator="['baseDN', {rules: [{ required: true, message: '请选择对应的组织单位' }] }]">
              <a-select-option
                v-for="item in record"
                :key="deepGet(item,'key')"
                :value="deepGet(item, 'value')">{{ deepGet(item, 'name') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { usermanageExportUser } from '@/api/CloudDesktop/userManage'
 import Papa from 'papaparse'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
      record: [],
      header: [],
      itemList: []
    }
  },
  methods: {
    ExportUser (record) {
      this.record = []
      this.visible = ''
      this.ouSort(record)
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        this.confirmLoading = true
        this.itemList = []
        if (!errors) {
          usermanageExportUser(values)
            .then((res) => {
              this.confirmLoading = false
              if (res.file_data.length === 0) {
                  return this.$message.info('当前组织下没有用户')
              }
              res.file_data.forEach((u, index) => {
                 let data = res.file_data[index].replace(/ /g, ',')
                   data = data.split(',')
                    if (index === 0) {
                        this.header.push(data)
                    } else {
                        const obj = {
                            '用户名': data[0],
                            '姓名': data[1],
                            '邮箱': data[2],
                            '手机号码': data[3],
                            '用户下次登录必须修改密码': data[4],
                            '用户不能修改密码': data[5],
                            '用户密码永不过期': data[6]
                        }
                        this.itemList.push(obj)
                    }
              })
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
                el.download = '导出用户文件.csv'
                // 必须点击否则不会下载
                el.click()
                // 移除链接释放资源
                urlObject.revokeObjectURL(url)
              this.$message.success('导出成功')
              this.visible = false
            })
            .catch(() => {
              this.confirmLoading = false
            })
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    ouSort (record) {
      record.forEach((item) => {
        let ouSortvalue = ' '
        if (item.ouSort[0] === record[0].title) {
          item.ouSort.reverse()
        }
        item.ouSort.reverse()
        item.ouSort.forEach((u, index) => {
          ouSortvalue = ouSortvalue + 'ou=' + u + ','
        })
        ouSortvalue = (ouSortvalue + 'ou=Users,ou=Citrix,dc=cloud,dc=com').replace(/(^\s*)/g, '')
        const obj = {
          name: item.title,
          value: ouSortvalue,
          key: item.key
        }
        this.record.push(obj)
        if (item.children.length > 0) {
          this.ouSort(item.children)
        }
      })
    },

    genUrl (encoded, options) {
      const dataBlob = new Blob([`\ufeff${encoded}`], { type: 'text/plain;charset=utf-8' }) // 返回的格式
      return window.URL.createObjectURL(dataBlob)
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

/deep/label[title='邮箱'],
/deep/label[title='下次登录时修改密码'],
/deep/label[title='用户密码永不过期'],
/deep/label[title='禁用账户'],
/deep/label[title='能否修改密码'] {
  color: white;
  font-weight: 500;
}
</style>
