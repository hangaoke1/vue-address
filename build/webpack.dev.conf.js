var path = require('path')
var webpack = require('webpack')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var StyleLintPlugin = require('stylelint-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var isProd = process.env.NODE_ENV === 'production'
var enableSourceMap = false
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var opn = require('opn')
var PORT = process.env.PORT || '8080'
const HtmlWebpackPlugin = require('html-webpack-plugin')

opn(`http://localhost:${PORT}`)
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      }, {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {},
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: {
      index: '/dist/'
    },
    noInfo: true,
    overlay: true,
    host: '0.0.0.0',
    port: PORT,
    open: false
  },
  performance: {
    hints: false
  },
  devtool: isProd ? '#source-map' : '#eval-source-map',
  plugins:
    [
      new VueLoaderPlugin(),
      new StyleLintPlugin({
        cache: true,
        // 正则匹配想要 styleLint 监测的文件
        files: ['src/styles/*.l?(e|c)ss', 'src/**/*.vue']
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }),
      new FriendlyErrorsPlugin()
    ]
}
