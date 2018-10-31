var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var StyleLintPlugin = require('stylelint-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var isProd = process.env.NODE_ENV === 'production'
var enableSourceMap = false
var VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'address-demo': './src/main.js'
  },
  externals: {},
  output: {
    path: path.resolve(__dirname, '../dist/address'),
    publicPath: '/address/',
    filename: '[name].[chunkhash].js'
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

      new ExtractTextPlugin('address-demo.[chunkhash].css'),

      new webpack.optimize.UglifyJsPlugin({
        sourceMap: enableSourceMap,
        compress: {
          warnings: false
        }
      }),

      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),

      new webpack.optimize.ModuleConcatenationPlugin(),

      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
      })
    ]
}
