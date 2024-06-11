// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load .env file and parse it
dotenv.config();

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // Add other loaders as needed
    ],
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': JSON.stringify(process.env),
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    // }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
  }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      "buffer": require.resolve("buffer")
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
  },
};
