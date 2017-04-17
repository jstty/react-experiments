const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const appStyleExtract = new ExtractTextPlugin("app.css");

module.exports = {
  //devtool: 'eval',
  devtool: 'source-map',
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false
      }
    }
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    'react-hot-loader/patch',
    './app/src/index'
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery"
    // }),
    new CopyWebpackPlugin([
      { from: 'app/assets', to: 'assets' }
    ]),
    appStyleExtract
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        include: path.join(__dirname, 'app/src')
      },
      {
        test: /\.(jpg|jpeg|png|gif|ttf|svg|woff|woff2|eot)(\?.*$|$)/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.css$/,
        use: appStyleExtract.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: "[local]"
              }
            },
            'postcss-loader'
          ]
        })
        // loaders: [
        //   'style-loader',
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       modules: true,
        //       sourceMap: true,
        //       importLoaders: 1,
        //       localIdentName: "[local]___[hash:base64:5]"
        //     }
        //   },
        //   'postcss-loader'
        // ]
      }
    ]
  }
};
