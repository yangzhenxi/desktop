const path = require('path')
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const GitRevision = new GitRevisionPlugin()
const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// check Git
function getGitHash () {
  try {
    return GitRevision.version()
  } catch (e) {}
  return 'unknown'
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
  ]
}

// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        GIT_HASH: JSON.stringify(getGitHash()),
        BUILD_DATE: buildDate
      })
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'layout-body-background': '#1A233A',
            'menu-dark-submenu-bg': '#0c1425',
          'border-radius-base': '5px',
          'table-row-hover-bg': 'none',
          'table-selected-row-bg': 'none',
          'table-selected-row-hover-bg': 'none',
          'tree-directory-selected-bg': 'none',
          'tree-directory-selected-color': '#fff',
          'modal-header-bg': '#272e48',
          'modal-footer-bg': '#272e48'

        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8000,
    proxy: {
      // '/api': {
      //   target: 'http://192.168.2.220:8090',
      //   pathRewrite: {
      //       '': ''
      //   }
      // }
      // '/api': {
      //   target: 'http://192.168.2.220:8082',
      //   pathRewrite: {
      //       '': ''
      //   }
      // }
    //   '/api': {
    //     target: 'http://192.168.5.15:80',
    //     pathRewrite: {
    //         '': ''
    //     }
    //   }
      // '/api': {
      //   target: 'http://192.168.2.223:8081',
      //   pathRewrite: {
      //       '': ''
      //   }
      // }
      '/api': {
        target: 'http://192.168.5.11:8090',
        pathRewrite: {
            '': ''
        }
      }
    }
  },

  // disable source map in production
  productionSourceMap: false,

  lintOnSave: undefined,

  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],

  assetsDir: 'static'
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
