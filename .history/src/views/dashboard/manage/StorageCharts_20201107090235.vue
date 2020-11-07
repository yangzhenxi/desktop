<template>
  <div>
    <empty :isEmpty="isEmpty(data)">
      <v-chart :forceFit="true" :height="height" :data="data">
        <v-tooltip />
        <v-axis dataKey="val" :label="label" />
        <v-legend />
        <v-stack-bar position="Host*val" :color="color" />
      </v-chart>
    </empty>
  </div>
</template>

<script>
import Empty from '@/components/Empty'
import { isEmpty } from '@/utils/util'

//   const DataSet = require('@antv/data-set')
  export default {
    name: 'StorageCharts',
    props: {
        dataSource: {
            type: Object,
            required: true
        }
    },
    components: {
        Empty
    },
    data () {
      return {
        data: [],
        height: 500,
        label: {
            textStyle: {
                fill: '#fff'
            }
        },
        color: ['name', ['rgb(253, 45, 54)', 'rgb(52, 170, 248)']]
      }
    },
    watch: {
        dataSource: {
            handler (newdata, olddata) {
                this.data = newdata.ChartsData
            },
            deep: true,
            immediate: false
        }
    },
    methods: {
        isEmpty
    }
    // mounted () {
    //     const dv = new DataSet.View().source(this.dataSource.ChartsData)
    //     dv.transform({
    //         type: 'fold',
    //         fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
    //         key: '月份',
    //         value: '月均降雨量'
    //     })
    //     this.data = dv.rows
    //     console.log(this.data)
    // }
}
</script>
