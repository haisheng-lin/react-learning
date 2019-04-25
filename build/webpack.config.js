const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  target: 'web',
  entry: path.join(__dirname, '../src/index.jsx'),
  output: {
    filename: 'bundle.[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'], // 在 react 环境下,也可以进行打包
          }
        },
        include: path.join(__dirname, '../src'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    // 前端路由使用了 history 模式的话，如果用户手动刷新浏览器，那么会默认请求到服务端
    // 但是服务端没做配置的话，就会返回 404 cannot GET...
    // webpack 加上这个配置的话，那么就能匹配到打包文件的 index.html
    historyApiFallback: {
      // index: '/index.html',
      rewrites: [
        {
          from: /.*/g,
          to: '/public/index.html',
        },
      ],
    },
    hot: true, // 只重加载改动的组件
    // open: true, // 每次都会自动打开页面
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
    }),
  ],
};

module.exports = config;
