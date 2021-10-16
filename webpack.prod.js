const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { BannerPlugin } = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const common = require('./webpack.common.js');

const BANNER = `
/*! FOLLOWING LIBRARIES ARE USED.
 * - core-js (https://github.com/zloirock/core-js/blob/master/LICENSE)
 *   The MIT License (MIT)
 *   Copyright (c) 2014-2021 Denis Pushkarev
 */`;

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              // cssのコメントはLICENSE含めて除去（BANNERに記載する）
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        extractComments: /^\**! FOLLOWING LIBRARIES ARE USED/i, // BANNERに記載したLICENSEを抽出して別ファイルで配置する
      }),
    ],
  },
  plugins: [
    new BannerPlugin({
      banner: BANNER,
      raw: true,
    }),
  ],
});
