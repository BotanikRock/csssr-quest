const path = require('path');

const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  entry: './src/script/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /(script)\/.*(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /(style)\/.*(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};
