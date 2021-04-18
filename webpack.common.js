const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.jsx', // entry point
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      // rule for .sass, .scss and .css
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          // extracts CSS into separate files
          MiniCssExtractPlugin.loader,
          // inject CSS into the DOM
          // { loader: 'style-loader' },
          // // interprets @import and url() like import/require() and will resolve them
          {
            loader: 'css-loader',
            options: {
              modules: {
                // enable CSS modules and their configuration
                localIdentName: '[local]',
              },
            },
          },
          // loads a Sass/SCSS file and compiles it to CSS
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(svg|png|jpg)$/,
        loader: 'file-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin(),
    new Dotenv({
      path: './config/.env',
    }),
  ],
};
