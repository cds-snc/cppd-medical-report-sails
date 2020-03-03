const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  mode: 'development',

  plugins: [
    new webpack.ProgressPlugin(),

    // This plugin cleans out your .tmp/public folder before lifting.
    new CleanWebpackPlugin(),

    // This plugin copies the `images` and `fonts` folders into
    // the .tmp/public folder.  You can add any other static asset
    // folders to this list and they'll be copied as well.
    new CopyWebpackPlugin([
      {
        from: './assets/img',
        to: path.resolve(__dirname, 'public', 'img')
      },
      {
        from: './assets/js/jSignature.min.js',
        to: path.resolve(__dirname, 'public', 'build', 'assets', 'js')
      },
      {
        from: './assets/js/confirmAction.js',
        to: path.resolve(__dirname, 'public', 'build', 'assets', 'js')
      }
      /* {
        from: "./assets/fonts",
        to: path.resolve(__dirname, "..", ".tmp", "public", "fonts")
      } */
    ]),
    new MiniCssExtractPlugin({
      filename: './assets/styles/app.css'
    }),
    // make sure to include the plugin!
    new VueLoaderPlugin(),

    new NodemonPlugin({
      script: './app.js',
      watch: path.resolve('./'),
      ignore: [
        'config/locales/*.json',
        'sessions/*.json',
        'cypress/**/*.js',
      ]
    })
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js', // Use the full build
    },
  },
  entry: {
    app: './assets/js/app.js',
    styles: './assets/styles/app.scss',
    relationship: './assets/js/pages/relationship.js',
    conditionAdder: './assets/js/pages/conditionAdder.js',
    work: './assets/js/pages/work.js',
    declaration: './assets/js/pages/declaration.js',
  },
  output: {
    filename: 'assets/js/[name].js',
    path: path.resolve(__dirname, 'public/build')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /jSignature/,
        loader: 'babel-loader',
        options: {
          plugins: ['syntax-dynamic-import'],
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false
              }
            ]
          ]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ]
  }
};
