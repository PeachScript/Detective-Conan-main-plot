var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    publicPath: '/',
    filename: 'dist/main.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /(node_modules|libs)/
      },
    ],
    resolve: {
      extensions: ['', '.js']
    },
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|libs)/,
        loader: 'babel'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.css$/,
        loaders: 'style!css'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/img/[name]_[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/fonts/[name]_[hash:7].[ext]'
        }
      }
    ]
  },
};

if (process.env.NODE_ENV !== 'production') {
  module.exports.plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/templates/index.html'
    })
  ];

  module.exports.devServer = {
    contentBase: './'
  };

  module.exports.devtool = '#source-map';
}
