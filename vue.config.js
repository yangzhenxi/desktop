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
    externals: {}
  },

  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))

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
    port: 8000,
    proxy: {
      '/api/system': {
        target: 'http://192.168.2.194:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/api/system': '/api/system.v1'
        }
      },
      '/api': {
        target: 'http://192.168.2.235:8090',
        changeOrigin: true,
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
  transpileDependencies: []

  //   assetsDir: 'static'
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
