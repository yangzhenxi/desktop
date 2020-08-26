<template>
  <page-header-wrapper>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card>
          <a-row class="tree_head">
            <a-col :span="11">
              <m-icon
                type="moban"
                class="icon" />
              <span
                @click="Allmodules"
                class="All"
                style="font-size:15px;">所有模版</span>
            </a-col>
            <a-col :span="13">
              <span @click="$refs.Add.Add()">
                <m-icon
                  type="yonghutianjia"
                  class="icon" />
              </span>
              <span @click="$refs.Edit.Edit()">
                <m-icon
                  type="xiugai"
                  class="icon" />
              </span>
              <span @click="TreeDelete">
                <m-icon
                  type="shanchu"
                  class="icon" />
              </span>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="18"></a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import MIcon from '@/components/Icon'

export default {
    components: {
        MIcon
    },
    data () {
        return {}
    }
}
</script>

<style>

</style>
