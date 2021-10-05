"use strict";
const { resolve } = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const FontminPlugin = require("fontmin-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostcssPresetEnv = require("autoprefixer");
const WebPack = require("webpack");

module.exports = (env, options) => {
  const isDevMode = options.mode === "development";
  return {
    mode: isDevMode ? options.mode : "production",
    entry: {
      "main": ["./src/index.ts"],
      "bootstrap": ["./src/bootstrap.ts"],
      "bootstrap-style": ["./src/bootstrap-style.ts"],
      "font-awesome": ["./src/font-awesome.ts"],
      "style": ["./src/style.ts"],
      "firebase": ["./src/firebase.ts"],
    },
    output: {
      filename: "[name].[contenthash:8].js",
      path: resolve(__dirname, "public/dist"),
      clean: true,
    },
    resolve: {
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
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
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
            filename: "./fonts/[name][hash][ext][query]",
          },
        },
      ],
    },
    optimization: {
      minimizer: isDevMode ? [`...`] : [`...`, new CssMinimizerPlugin()],
      runtimeChunk: "single",
      moduleIds: "deterministic",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
    },
  };
};
