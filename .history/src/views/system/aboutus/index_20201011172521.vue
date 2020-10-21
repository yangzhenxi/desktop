<template>
  <page-header-wrapper :title="false">
    <a-card title="系统信息设置">
      <a-descriptions>
        <a-descriptions-item label="站点名称">
          豪联HLCloud管理平台
        </a-descriptions-item>
        <a-descriptions-item label="公司名称">
          豪联科技技术有限公司
        </a-descriptions-item>
        <a-descriptions-item label="操作系统">
          Win10
        </a-descriptions-item>
        <a-descriptions-item label="服务器名称">
          *********
        </a-descriptions-item>
        <a-descriptions-item label="服务器IP">
          *********
        </a-descriptions-item>
        <a-descriptions-item label="服务器端口">
          *********
        </a-descriptions-item>
        <a-descriptions-item label="NET框架版本4.0">
          *********
        </a-descriptions-item>
        <a-descriptions-item label="ISS环境">
          *********
        </a-descriptions-item>
        <a-descriptions-item label="目录物理路径">
          *********
        </a-descriptions-item>
        <a-descriptions-item label="WEB版本">
          *********
        </a-descriptions-item>
        <a-descriptions-item label="后台版本">
          *********
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <br>
    <a-card title="云桌面许可证">
      <a-descriptions >
        <a-descriptions-item label="产品名称">
          云桌面
        </a-descriptions-item>
        <a-descriptions-item label="可用数目">
          43
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <br>
    <a-card title="许可信息">
      <a-descriptions >
        <a-descriptions-item label="用户ID">
          *********
        </a-descriptions-item>
        <a-descriptions-item label="注册类型">
          *********
        </a-descriptions-item>
        <a-descriptions-item label="注册日期">
          *********
        </a-descriptions-item>
        <a-descriptions-item label="单位名称">
          *********
        </a-descriptions-item>
        <a-descriptions-item label="授权软件">
          *********
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { systemAboutUs } from '@/api/system/About'
export default {
    created () {
        systemAboutUs().then(res => {
            console.log(res)
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
