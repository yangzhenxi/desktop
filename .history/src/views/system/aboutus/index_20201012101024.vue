<template>
  <page-header-wrapper :title="false">
    <a-card title="系统信息设置">
      <a-descriptions>
        <a-descriptions-item v-for="(i,index) in system" :key="index" :label="i.title">
          {{ i.value }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <br>
    <a-card title="云桌面许可证">
      <a-descriptions>
        <a-descriptions-item v-for="(i,index) in License" :key="index" :label="i.title">
          {{ i.value }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <br>
    <a-card title="许可信息">
      <a-descriptions >
        <a-descriptions-item v-for="(i,index) in LicenseInfo" :key="index" :label="i.title">
          {{ i.value }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { systemAboutUs } from '@/api/system/About'
export default {
    data () {
        return {
            system: [
                {
                    key: 'siteName',
                    title: '站点名称',
                    value: ''
                },
                {
                    key: 'company',
                    title: '公司名称',
                    value: ''
                },
                {
                    key: 'os',
                    title: '操作系统',
                    value: ''
                },
                {
                    key: '',
                    title: '服务器名称',
                    value: ''
                },
                {
                    key: 'ip',
                    title: '服务器IP',
                    value: ''
                },
                {
                    key: 'port',
                    title: '服务器端口',
                    value: ''
                },
                {
                    key: '',
                    title: 'ISS环境',
                    value: ''
                },
                {
                    key: 'path',
                    title: '目录物理路径',
                    value: ''
                },
                {
                    key: '',
                    title: 'WEB版本',
                    value: '0.0.1'
                },
                {
                    key: 'backVersion',
                    title: '后台版本',
                    value: ''
                }
            ],
            License: [
                {
                    key: 'productName',
                    title: '产品名称',
                    value: ''
                },
                {
                    key: 'num',
                    title: '可用数目',
                    value: ''
                }
            ],
            LicenseInfo: [
                {
                    key: 'userId',
                    title: '用户ID',
                    value: ''
                },
                {
                    key: 'registerType',
                    title: '注册类型',
                    value: ''
                },
                {
                    key: 'registerTime',
                    title: '注册日期',
                    value: ''
                },
                {
                    key: 'registerCompany',
                    title: '单位名称',
                    value: ''
                },
                {
                    key: 'software',
                    title: '授权软件',
                    value: ''
                }
            ]
        }
    },
    created () {
        systemAboutUs().then(res => {
            console.log(Object.keys(res))
            this.system.forEach(u => {
                console.log(u)
                for (i in res) {
                    console.log(res[i])
                }
            })
        })
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
/deep/.ant-card-head  {
    color: white;
    font-size: 20px;
}
/deep/.ant-descriptions-item-label {
    color: white;
    font-weight: normal;
    font-size: 18px;
    line-height: 1.5;
}
/deep/.ant-descriptions-item-content {
    // display: table-cell;
    color: white;
    font-size: 16px;
    line-height: 1.5;
}
</style>
