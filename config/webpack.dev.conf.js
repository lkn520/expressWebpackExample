/**
 * Created by Chelly on 2018/6/16.
 */

var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWepbackConfig = require('./webpack.base.conf');

var HotMiddleWareConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';

// 开发模式加入热加载
Object.keys(baseWepbackConfig.entry).forEach(function (name) {
  baseWepbackConfig.entry[name] = baseWepbackConfig.entry[name].concat(HotMiddleWareConfig);
});

module.exports = merge(baseWepbackConfig, {
  mode: 'development',
  devtool: '#source-map',
  plugins: [
    // 自动刷新浏览器必写
    new webpack.HotModuleReplacementPlugin()
  ]
});