const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf.js');
const SW = require('./sw.config.js');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../app/src/main.js'),
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.vue', 'json'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: path.join(__dirname, '../app/index.html'),
      favicon: path.resolve('app/images/favicon.png'),
    }),
    SW,
  ],
  devtool: 'source-map',
  watch: true,
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    stats: {
      colors: true,
    },
    overlay: {
      warnings: true,
      errors: true,
    },
    hot: true,
    contentBase: [path.join(__dirname, '../app'), path.join(__dirname, '../dist')],
    watchContentBase: true,
    port: 23333,
  },
  performance: {
    hints: false,
  },
});
