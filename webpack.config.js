var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: './src/script/ts/main.ts',
  output: {
    filename: 'script/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  target: 'node', // in order to ignore built-in modules like path, fs, etc. 
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 

  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.less$/,
        loader: 'less-loader', // compiles Less to CSS
      }
    ]
  }

};