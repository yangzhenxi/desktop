<template>
  <!-- <empty :isEmpty="isEmpty(data)"> -->
  <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
    <v-tooltip :showTitle="false" dataKey="item*percent" />
    <v-axis/>
    <v-legend dataKey="item" :show="true" :textStyle="textStyle" />
    <v-pie position="percent" :color="color" :vStyle="pieStyle" :label="labelConfig" />
    <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
  </v-chart>
  <!-- </empty> -->
</template>

<script>
import { Empty } from '@/components'
import { isEmpty } from '@/utils/util'
export default {
    name: 'PieChart',
    props: {
        dataSource: {
            type: Object,
            required: true
        }
    },
    components: {
        Empty
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
    data () {
        return {
            data: [],
            scale: [{
                dataKey: 'percent',
                min: 0,
                formatter: '.0%'

            }],
            height: 300,
            color: [],
            textStyle: {
                fill: 'rgb(174, 190, 230)' // 文本的颜色
            },
            pieStyle: {
                stroke: '#fff',
                lineWidth: 1

            },
            labelConfig: ['percent', {
                formatter: (val, item) => {
                if (item.point.item === '剩余内存' || item.point.item === '已用内存') {
                        return item.point.item + ': ' + item.point.count + 'GB'
                } else {
                        return item.point.item + ': ' + item.point.count + 'GHz'
                }
                },
                textStyle: {
                    fill: 'rgb(174, 190, 230)' // 文本的颜色
                }
            }]
        }
    },
    created () {
        if (this.dataSource.type === 'CPU') {
            this.color = ['item', ['rgb(249, 201, 74)', 'rgb(0, 150, 84)']]
        } else {
            this.color = ['item', ['rgb(50, 107, 216)', 'rgb(253, 54, 62)']]
        }
    },
    methods: {
        isEmpty
    }
}
</script>
