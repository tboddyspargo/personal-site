"use strict";
const { resolve } = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostcssPresetEnv = require("autoprefixer");
const WebPack = require("webpack");

module.exports = (env, options) => {
  const isDevMode = options.mode === "development";
  return {
    mode: isDevMode ? options.mode : "production",
    entry: {
      main: ["./src/index.ts"],
    },
    output: {
      filename: "[name].js",
      path: resolve(__dirname, "public/dist"),
      clean: true,
    },
    resolve: {
      modules: ["node_modules"],
      extensions: [".ts", ".tsx", ".js"],
    },
    devtool: isDevMode ? "eval-source-map" : false,
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "../index.html",
        favicon: "./src/favicon.ico",
      }),
      new WebPack.HotModuleReplacementPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: "src/favicon.ico",
            to: "favicon.ico",
          },
          {
            from: "src/sitemap.xml",
            to: "../sitemap.xml",
          },
        ],
      }),
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        { test: /\.tsx?$/, use: ["ts-loader"] },
        {
          test: /\.css$/,
          use: [isDevMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            {
              loader: isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                url: {
                  filter: (url, cssPath) => !url.match(/\.(png|jpg|jpeg)$/),
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [require("autoprefixer")],
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.html$/,
          exclude: /index\.html$/,
          type: "asset/resource",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        // helps to load bootstrap's css.
        {
          test: /\.(svg|eot|woff|woff2|ttf)$/,
          type: "asset/resource",
          generator: {
            filename: "fonts/[hash][ext][query]",
          },
        },
      ],
    },
    optimization: {
      minimizer: isDevMode ? [`...`] : [`...`, new CssMinimizerPlugin()],
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  };
};
