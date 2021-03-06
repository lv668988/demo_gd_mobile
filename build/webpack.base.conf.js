var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
/******加入loader */
const vuxLoader = require('vux-loader')
/*******加入loader */


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig  = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot, //项目根路径
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  //配置模块加载器
  module: {
    rules: [
      {
        test: /\.vue$/, //所有以.vue结尾的文件都由vue-loader加载
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/, //所有以.js结尾的文件都由babel-loader加载，除了node_modules以外
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
/*****加载vux */
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [{
      name: 'vux-ui'
    },
    {
      name: 'duplicate-style'
    },
    {
      name: 'less-theme',
     // path: 'src/assets/vux/theme.less' //默认
	 path: 'src/assets/vux/poin-theme.less'//平台紫色皮肤样式
    }
    ]
})