<template>
  <div>
    <empty :isEmpty="isEmpty(data)">
      <v-chart
        :scale="scale"
        :forceFit="true"
        :height="height"
        :data="data">
        <v-tooltip/>
        <v-axis
          dataKey="valName"
          :label="label" />
        <v-axis
          dataKey="val"
          :label="label"
        />
        <v-legend />
        <v-stack-bar
          position="valName*val"
          :color="color" />
      </v-chart>
    </empty>
  </div>
</template>

<script>
import Empty from '@/components/Empty'
import { isEmpty } from '@/utils/util'
export default {
    name: 'StorageCharts',
    props: {
        dataSource: {
            type: Array,
            required: true
        }
    },
    components: {
        Empty
    },
    data () {
        return {
            data: [],
            height: 400,
            label: {
                textStyle: {
                    fill: '#fff'
                }
            },
            scale: [{
              dataKey: 'val',
              tickCount: 5,
              min: 0,
              formatter: (item) => {
                return item + 'GB'
              }
            }],
            color: ['name', ['rgb(57, 198, 111)', 'rgb(119, 147, 227)']]
        }
    },
    watch: {
        dataSource: {
            handler (newdata, olddata) {
                this.data = newdata
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        isEmpty
    }
}
</script>
