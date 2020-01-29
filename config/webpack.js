const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports.webpack = {
  config: [
    {
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
            to: path.resolve(__dirname, '..', '.tmp', 'public', 'img')
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
      ],
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js', // Use the full build
        },
      },
      entry: {
        app: './assets/js/app.js',
        jSignature: './assets/js/jSignature.min.js', // https://github.com/brinley/jSignature/blob/master/libs/jSignature.min.js (MIT License)
        styles: './assets/styles/app.scss',
        relationship: './assets/js/pages/relationship.js',
        conditionAdder: './assets/js/pages/conditionAdder.js',
        work: './assets/js/pages/work.js',
      },
      output: {
        filename: 'assets/js/[name].js',
        path: path.resolve(__dirname, '../.tmp/public/build')
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
    }
  ]
};
