<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip :showTitle="false" dataKey="item*percent" />
      <v-axis />
      <v-legend dataKey="item" />
      <v-pie position="percent" :color="color" :vStyle="pieStyle" :label="labelConfig" />
      <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

export default {
    name: 'PieChart',
    props: {
        dataSource: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
        data: [],
        scale: [{
            dataKey: 'percent',
            min: 0,
            formatter: '.0%'
        }],
        height: 400,
        color: [],
        pieStyle: {
            stroke: '#fff',
            lineWidth: 1
        },
        labelConfig: ['percent', {
            formatter: (val, item) => {
            return item.point.item + ': ' + val
            }
        }]
        }
    },
    created () {
        console.log(this.dataSource)
        if (this.dataSource.type === 'CPU') {
            this.color = ['item', ['#12bd5ec7', '#f59ea7c7']]
        } else {
            this.color = ['item', ['#66aef8c7', '#ef4647c7']]
        }
    },
    mounted () {
        const dv = new DataSet.View().source(this.dataSource)
        dv.transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        })
        this.data = dv.rows
    }
}
</script>
