/**
 * Created by Chelly on 2018/6/18.
 */
var path = require('path');
var merge = require('webpack-merge');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  // 关闭警告
  performance: {
    hints: false
  },
  plugins: [
    // 清空文件夹
    new CleanWebpackPlugin(['static'], {
      root: path.resolve(__dirname, '..'),
      verbose: true,
    }),
    // 复制静态文件
    new CopyWebpackPlugin([
      {from: path.resolve(__dirname, '../public')}
    ])
  ]
})