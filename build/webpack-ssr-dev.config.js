const path = require('path');

const config = {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../src/ssr/server-entry.tsx'),
  },
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public',
    libraryTarget: 'commonjs2',
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    // 简化 import 路径，使用的时候是 import xxx from '@/xxx'，css 则是 'import ~@/xxx'
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: 'awesome-typescript-loader',
        include: path.resolve(__dirname, '../src'),
      },
      {
        test: /\.ts$/,
        loader:[
          // 'babel-loader',
          'ts-loader',
        ],
        include: path.resolve(__dirname, '../src'),
        exclude: [
          path.join(__dirname, '../node_modules'),
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules'),
        ],
      },
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
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
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
          to: '/index.html',
        },
      ],
    },
    hot: true, // 只重加载改动的组件
    // open: true, // 每次都会自动打开页面
  },
};

module.exports = config;
