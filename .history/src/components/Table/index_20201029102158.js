import T from 'ant-design-vue/es/table/Table'
import { MIcon } from '@/components'
import { isEmpty, convert } from '@/utils/util'

export default {
  data () {
    return {
      localLoading: false,
      localDataSource: [],
      localPagination: Object.assign({}, this.pagination)
    }
  },
  props: Object.assign({}, T.props, {
    rowKey: {
      type: String,
      default: 'id'
    },
    data: {
      type: Function,
      required: true
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    rowClassName: {
      type: Function,
      default: (record, index) => index % 2 !== 0 ? 'table-row-odd' : ''
    }
  }),
  components: {
    MIcon
  },
  created () {
    this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
      current: this.pageNum,
      pageSize: this.pageSize,
      showSizeChanger: this.showSizeChanger
    }) || false
    this.loadData()
  },
  methods: {
    refresh (bool = false) {
      bool && (this.localPagination = Object.assign({}, {
        current: 1, pageSize: this.pageSize
      }))
      this.loadData()
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData (pagination, filters, sorter) {
      this.localLoading = true
      const parameter = Object.assign({
        page: (pagination && pagination.current) ||
          this.showPagination && this.localPagination.current || this.pageNum,
        size: (pagination && pagination.pageSize) ||
          this.showPagination && this.localPagination.pageSize || this.pageSize
      },
      (sorter && sorter.field && {
        sortField: sorter.field
      }) || {},
      (sorter && sorter.order && {
        sortOrder: sorter.order
      })
      )
      const result = this.data(parameter)
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then(r => {
          this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
            current: r.page,
            total: r.total,
            pageSize: r.size || (pagination && pagination.pageSize) ||
              this.localPagination.pageSize
          }) || false
          this.localDataSource = r.data
          this.localLoading = false
        })
      }
    }
  },

  render () {
    const props = {}
    const localKeys = Object.keys(this.$data)
    Object.keys(T.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey]
        return props[k]
      }
      this[k] && (props[k] = this[k])
      return props[k]
    })
    this.$scopedSlots = Object.assign({}, {
      time: text => convert(text, 'unix'),
      icon: text => !isEmpty(text) ? <m-icon type={text} style="font-size: 40px"/> : '-',
      os: text => !isEmpty(text) ? <m-icon type={text} style="font-size: 20px"/> : '-'
    }, this.$scopedSlots)
    return (
      <div class="table-wrapper">
        <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.loadData}>
          { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
        </a-table>
      </div>
    )
  }
}
