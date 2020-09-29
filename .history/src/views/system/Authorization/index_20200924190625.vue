<template>
  <page-header-wrapper :title="false">
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col
          v-for="i in 6"
          :key="i"
          :span="8"
        >
          <a-form-item :label="`Field ${i}`">
            <a-input
              v-decorator="[
                `field-${i}`,
                {
                  rules: [
                    {
                      required: true,
                      message: 'Input something!',
                    },
                  ],
                },
              ]"
              placeholder="placeholder"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit">
            Search
          </a-button>
          <a-button :style="{ marginLeft: '8px' }">
            Clear
          </a-button>
          <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
            Collapse <a-icon :type="expand ? 'up' : 'down'" />
          </a>
        </a-col>
      </a-row>
    </a-form>
  </page-header-wrapper>
</template>
<script>
import { mixinTable, mixinFormModal } from '@/utils/mixin'

export default {
  mixins: [mixinTable, mixinFormModal],
  data () {
    return {
           expand: false,
      queryParam: {}
    }
  },
    computed: {
    count () {
      return this.expand ? 11 : 7
    }
  },
  methods: {
  }
}
</script>
