<template>
  <div>
    <a-card title="计算机基础">
      <a-row :gutter="16">
        <div class="header">
          <a-col :span="14">
            <a-row :gutter="[16,16]">
              <a-col :span="8">
                <div class="box">
                  <m-icon
                    type="zaixianbianji"
                    class="icon zaixianbianji"></m-icon>
                  <span class="text">在线编辑</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div
                  class="box"
                  @click="$refs.ManageRelease.Add(modulesData)">
                  <m-icon
                    type="shangchuanmoban"
                    class="icon shangchuanmoban"></m-icon>
                  <span class="text">发布模版</span>
                </div>
              </a-col>
              <a-col
                :span="8"
                @click="$refs.ManageAttributes.Attribute(modulesData)">
                <div class="box">
                  <m-icon
                    type="tongji"
                    class="icon tongji"></m-icon>
                  <span class="text">属性模版</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="box">
                  <m-icon
                    type="huanyuan1"
                    class="icon huanyuan1"></m-icon>
                  <span class="text">版本还原</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div class="box">
                  <m-icon
                    type="hebing"
                    class="icon hebing"></m-icon>
                  <span class="text">版本合并</span>
                </div>
              </a-col>
              <a-col :span="8">
                <div
                  class="box"
                >
                  <m-icon
                    type="shanchu"
                    class="icon shanchu"></m-icon>
                  <span class="text">删除模版</span>
                </div>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="10">
            <a-row
              class="modules"
              :gutter="16">
              <a-col
                :span="8"
                class="icon">
                <a-row
                  type="flex"
                  justify="center"
                  style="margin-top: 35px;">
                  <div>
                    <a-icon
                      class="icon"
                      type="windows" />
                  </div>
                  <div class="icon_title">123456</div>
                </a-row>
              </a-col>
              <a-col :span="16">
                <div
                  class="modules_title"
                  style="margin:5px 0px">name</div>
                <div class="modules_text">
                  <span>所属分组: </span>
                  <span> 所属分组</span>
                </div>
                <div class="modules_text">
                  <span>所在服务器: </span>
                  <span>所在服务器</span>
                </div>
                <div class="modules_text">
                  <span>创建时间: </span>
                  <span>创建时间: </span>
                </div>
                <div class="modules_text">
                  <span>版本状态: </span>
                  <a-tag color="#108ee9">
                    未发布
                    <!-- V{{ parseInt(modulesData.version) + 1 }} -->
                  </a-tag>
                </div>
                <div class="modules_text" style="overflow: inherit;">
                  <span>运行状态: </span>
                  <span>运行状态: </span>
                  <!-- <a-badge :number-style="{backgroundColor: toDict(modulesData.isRunning,'C_STATE').color}" :count="modulesData.isRunning | convert('C_STATE')" /> -->
                </div>
                <div class="modules_text">
                  <span>IP: </span>
                  <span>IP: </span>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </div>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
    data () {
        return {
            visible: false
        }
    },
    methods: {
         OnSingle (item) {
            this.visible = true
        }
    }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
}
</style>
