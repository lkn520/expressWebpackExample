/**
 * Created by Chelly on 2018/6/16.
 */
var path = require('path');
var webpack = require('webpack');

var isDev = process.env.NODE_ENV === 'dev';

// css单独打包
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    main: [resolve('components/main')],
    page: [resolve('components/page/index')]
  },
  output: {
    filename: '[name]/bundle.js',
    path: resolve('static'),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              minimize: true // 压缩
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images/',
            }
          }
        ]
      },
      { // 配置待定
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name]/style.css",
      chunkFilename: "[id].css"
    })
  ]
};