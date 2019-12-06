const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports.webpack = {
  config: [
    {
      mode: "development",

      plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: "./assets/styles/app.css"
        })
      ],

      entry: {
        app: "./assets/js/app.js",
        styles: "./assets/styles/app.scss"
      },
      output: {
        filename: "assets/js/[name].js",
        path: path.resolve(__dirname, "../.tmp/public/build")
      },
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
          },
          {
            test: /\.(js|jsx)$/,
            include: [path.resolve(__dirname, "src")],
            loader: "babel-loader",
            options: {
              plugins: ["syntax-dynamic-import"],
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false
                  }
                ]
              ]
            }
          }
        ]
      }
    }
  ]
};
