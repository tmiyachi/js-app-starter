/* eslint-env node */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sc|c|sa|)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
        // 画像を埋め込まず任意のフォルダに保存する
        loader: 'file-loader',
        options: {
          name: './images/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    // 生成先のフォルダを空にする
    new CleanWebpackPlugin(),
    // cssファイルをjsファイルにバンドルせず処理するプラグイン
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // webpackで生成したjsとcssを読み込んだhtmlを作成
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
};
