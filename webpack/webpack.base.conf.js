const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.css$/,
        loaders: [devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        loaders: [devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|jpg|png)\??.*$/,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:7].[ext]',
          publicPath: '../images/',
          outputPath: 'images/',
        },
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin({
      format: `  ${chalk.blue('build')} [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      summary: false,
      summaryContent: chalk.green('Build completed'),
    }),
    new VueLoaderPlugin(),
  ],
};
