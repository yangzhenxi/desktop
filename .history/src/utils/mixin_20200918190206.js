import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'
import pick from 'lodash.pick'
import { queryBuild, columnsBuild, deepGet, convert, toDict } from '@/utils/util'

const mixinTable = {
  data () {
    return {
      advanced: false,
      queryParam: {},
      selectedRowKeys: [],
      selectedRows: [],
      deleteInput: null
    }
  },
  computed: {
    x: {
        get () {
            console.log(this.columns.reduce((pre, cur) => pre + cur.width, 0))
            this.columns.reduce((pre, cur) => {

            })
            return this.columns.reduce((pre, cur) => pre + cur.width, 0)
        },
        set (x) {
            return x
        }
    }
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleOk (bool = true) {
      this.selectedRowKeys = []
      this.selectedRows = []
      this.$refs.table.refresh(bool)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    handleTreeOk () {
        this.obj = {}
        this.ouList = []
    },
    queryBuild,
    deepGet,
    columnsBuild,
    convert,
    toDict
  }
}

const mixinFormModal = {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      loading: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      record: null,
      sid: null,
      id: null
    }
  },
  methods: {
    handleCancel () {
      this.visible = false
    },
    deepGet,
    columnsBuild,
    pick,
    queryBuild,
    convert,
    toDict
  }
}

const mixin = {
  computed: {
    ...mapState({
      layoutMode: state => state.app.layout,
      navTheme: state => state.app.theme,
      primaryColor: state => state.app.color,
      colorWeak: state => state.app.weak,
      fixedHeader: state => state.app.fixedHeader,
      fixSiderbar: state => state.app.fixSiderbar,
      fixSidebar: state => state.app.fixSiderbar,
      contentWidth: state => state.app.contentWidth,
      autoHideHeader: state => state.app.autoHideHeader,
      sidebarOpened: state => state.app.sidebar,
      multiTab: state => state.app.multiTab
    })
  },
  methods: {
    isTopMenu () {
      return this.layoutMode === 'topmenu'
    },
    isSideMenu () {
      return !this.isTopMenu()
    }
  }
}

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

const AppDeviceEnquire = {
  mounted () {
    const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop')
          $store.dispatch('setSidebar', true)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          $store.dispatch('setSidebar', true)
          break
      }
    })
  }
}

export {
  mixinTable,
  mixinFormModal,
  mixin,
  AppDeviceEnquire,
  mixinDevice
}
