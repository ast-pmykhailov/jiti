const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  target: 'node',
  mode: isProd ? 'production' : 'development',
  entry: {
    jiti: './src/jiti.ts',
    babel: './src/babel.ts'
  },
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@babel/code-frame': require.resolve('./stubs/babel_codeframe'),
      '@babel/helper-compilation-targets': require.resolve('./stubs/helper_compilation_targets')
    }
  },
  stats: {
    // preset: 'detailed',
    warningsFilter: [/critical dependency:/i]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  node: false,
  optimization: {
    nodeEnv: false,
    moduleIds: 'named',
    chunkIds: 'named',
    minimizer: isProd
      ? [
          new TerserPlugin({
            terserOptions: {
              // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
              mangle: false
            }
          })
        ]
      : []
  }
}
