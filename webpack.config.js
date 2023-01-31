// Generated using webpack-cli https://github.com/webpack/webpack-cli
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefineWebpackPlugin = require('webpack').DefinePlugin;
const isProduction = process.env.NODE_ENV == 'production';
const subscriptionKeyFileName = '.sub'

let azureSubscriptionKey = undefined;
try {
  const subExists = fs.existsSync(subscriptionKeyFileName)
  if (subExists) {
    azureSubscriptionKey = fs.readFileSync(subscriptionKeyFileName, 'utf8')
  }
} catch {}

// unset if hot module reload gives troubles (possible)
const hmrEnabled = true

const config = {
  entry: './src/index.ts',
  output: {
      path: path.resolve(__dirname, 'dist'),
  },
  // devtool: "source-map",
  devServer: {
      open: true,
      host: 'localhost',
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
        "Access-Control-Expose-Headers": "x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Last-Modified,ETag,x-ms-lease-status,x-ms-blob-type,Content-Length,Date,Transfer-Encoding"
      }
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: 'index.html',
      }),
      /*
      new CopyWebpackPlugin({
        patterns: []
      }),
      */
      new DefineWebpackPlugin({
        ENVIRONMENT: JSON.stringify({
          hmr: hmrEnabled,
          azureSubscriptionKey
        })
      })
      // Add your plugins here
      // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              insert: "az-map"
            }
          },
          {
            loader: "css-loader",
          }
        ]
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = () => {
  config.mode = isProduction ? 'production' : 'development';
  return config;
};
