var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (dev) {
  var config = {
    mode: dev ? 'development' : 'production',
    devtool: dev ? 'eval-source-map' : 'source-map',
    entry: {
      app: ['./app/index'],
      vendor: [
        'history',
        'whatwg-fetch',
        '@material-ui/core',
        '@material-ui/icons',
        'react',
        'react-dom',
        'react-redux',
        'react-router',
        'react-tap-event-plugin',
        'redux',
        'redux-logger',
        'connected-react-router',
        'redux-thunk'
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", ".scss"]
    },
    devServer: {
      stats: {
        chunks: false,
        colors: true
      },
      contentBase: './www/',  //Relative directory for base of server
      hot: dev,
      inline: true,
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: dev ? '[name].js' : '[name].[hash].js',
      publicPath: dev ? '/' : '/'
    },
    optimization: {
      runtimeChunk: {
        name: "manifest"
      },
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all"
          }
        }
      }
    },
    plugins: [
      new ExtractTextPlugin(dev ? '[name].css' : '[name].[hash].css'),
      new HtmlWebpackPlugin({
        template: './www/index.html',
        inject: 'body'
      }),
    ],
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'})
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      }, {
        test: /\.html$/,
        loader: 'raw-loader'
      }]
    }
  }
  if (dev) {
    config.entry.app.unshift('react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8100', 'webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
  } else {
    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    )
  }
  return config
}

