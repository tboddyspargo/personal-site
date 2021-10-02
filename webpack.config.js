const { resolve } = require("path");
const WebPack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
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
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, use: ["ts-loader"] },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader", // translates CSS into CommonJS modules
            options: {
              url: {
                filter: (url, cssPath) => !url.match(/\.(png|jpg|jpeg)$/),
              },
            },
          },
          {
            loader: "postcss-loader", // Run post css actions
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
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
