const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'index.js',
    library: 'forma',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  mode: 'development',
  devtool: 'source-map',
  externals: {
    react: 'commonjs2 react',
    'react-dom': 'commonjs2 react-dom',
    'react-redux': 'commonjs2 react-redux',
    redux: 'commonjs2 redux',
  },
}
