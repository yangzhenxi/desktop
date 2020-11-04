import { Icon, Tree, Abadge } from 'ant-design-vue'
const { TreeNode, DirectoryTree } = Tree
export default {
  name: 'Trees',
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    openKeys: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      localOpenKeys: [],
      expand: true
    }
  },
  created () {
    this.localOpenKeys = this.openKeys.slice(0)
  },
  methods: {
    titleClick (val) {
        this.localOpenKeys = val
        this.$emit('titleClick', val)
    },
    handlePlus (item) {
        this.$emit('Add', item)
    },
    handleEdit (item) {
        this.$emit('Edit', item)
    },
    handleDelete (item) {
        this.$emit('Delete', item)
    },
    renderIcon (icon) {
      return (icon && <Icon style="margin-right:10px" slot="smile" type={icon}></Icon>) || null
    },
    renderItem (item) {
      return item.children ? this.renderSubItem(item, item.key) : this.renderMenuItem(item, item.key)
    },
    renderSubItem (item, key) {
      const childrenItems = item.children && item.children.map(o => {
          return this.renderItem(o, key)
        })
      const title = (
        <span slot="title">
          {/* {this.renderIcon(item.icon)} */}
          <span>{item.title}</span>
          <Abadge></Abadge>
          {/* <a-dropdown>
                    <a class="btn" style="float:right;color:white"><a-icon type="ellipsis"/></a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <a {...{ on: { click: () => this.handlePlus(item) } }}>新增</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a {...{ on: { click: () => this.handleEdit(item) } }}>修改</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a {...{ on: { click: () => this.handleDelete(item) } }}>移除</a>
                        </a-menu-item>
                        </a-menu>
                </a-dropdown> */}
        </span>
      )
      return (
        <TreeNode icon={() => null} key={key}>
          {title}
          {childrenItems}
        </TreeNode>
      )
    },
    renderMenuItem (item, key) {
      return (
        <TreeNode blockNode icon={() => null} key={key} blockNode>
            <span slot="title">
                {/* {this.renderIcon(item.icon)} */}
                {item.title}
                {/* <a-dropdown>
                    <a class="btn" style="float:right;color:white"><a-icon type="ellipsis"/></a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <a {...{ on: { click: () => this.handlePlus(item) } }}>新增</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a {...{ on: { click: () => this.handleEdit(item) } }}>修改</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a {...{ on: { click: () => this.handleDelete(item) } }}>移除</a>
                        </a-menu-item>
                        </a-menu>
                </a-dropdown> */}
            </span>
        </TreeNode>
      )
    }
  },
  render () {
    const { dataSource } = this.$props
    const list = dataSource.map(item => {
      return this.renderItem(item)
    })
    return (
      <div class="tree-wrapper">
        <DirectoryTree defaultExpandAll selectedKeys={this.localOpenKeys} {...{ on: { 'select': (val) => this.titleClick(val) } }}>{list}</DirectoryTree>
      </div>
    )
  }
}
