var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var StyleLintPlugin = require('stylelint-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var isProd = process.env.NODE_ENV === 'production'
var enableSourceMap = false
var VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    'vue-address': './src/lib/index.js'
  },
  externals: {},
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    library: 'vue-address',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'vue-style-loader'
        })
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          use:  [
            'css-loader',
            'postcss-loader',
            'less-loader'
          ],
          fallback: 'vue-style-loader'
        })
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
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: isProd ? '#source-map' : '#eval-source-map',
  plugins:
    [
      new VueLoaderPlugin(),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),

      new ExtractTextPlugin('vue-address.css'),

      new webpack.optimize.UglifyJsPlugin({
        sourceMap: enableSourceMap,
        compress: {
          warnings: false
        }
      }),

      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),

      new webpack.optimize.ModuleConcatenationPlugin()
    ]
}
