var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './',
    publicPath: '/',
    filename: '[name].js'
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
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'dist/static/img/[name]_[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'dist/static/fonts/[name]_[hash:7].[ext]'
        }
      }
    ]
  },
};

if (process.env.NODE_ENV !== 'production') {
  module.exports.module.loaders = module.exports.module.loaders.concat([
    {
      test: /\.css$/,
      loaders: 'style!css'
    },
    {
      test: /\.less$/,
      loader: 'style!css!less'
    }
  ]);

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
} else {
  module.exports.output.publicPath = '/Detective-Conan-main-plot/';
  module.exports.output.filename = 'dist/static/js/[name]_[chunkhash:7].js';

  module.exports.module.loaders = module.exports.module.loaders.concat([
    {
      test: /\.css$/,
      loaders: ExtractTextPlugin.extract('css')
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('css!less')
    }
  ]);

  module.exports.plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/templates/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('dist/static/css/[name]_[contenthash:7].css')
  ];
}
