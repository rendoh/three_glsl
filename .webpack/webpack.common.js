const webpack = require('webpack');
const path = require('path');
const readdir = require('fs').promises.readdir;

module.exports = {
  context: path.resolve(__dirname, '../src/assets/js'),
  resolve: {
    extensions: ['.ts', '.js'],
  },
  entry: async () => {
    const files = await readdir(path.resolve(__dirname, '../src/assets/js'));
    return files
      .filter(filename => filename.match(/\.(j|t)s$/))
      .reduce((accumulator, currentFilename) => {
        accumulator[currentFilename.replace(/\.(j|t)s$/, '')] = ['@babel/polyfill', `./${currentFilename}`];
        return accumulator;
      }, {});
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/assets/js'),
  },
  optimization: {
    splitChunks: {
      name: 'modules',
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/proposal-object-rest-spread',
              ['@babel/proposal-decorators', { legacy: true }],
              '@babel/proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, '../.tsconfig.json'),
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'tslint-loader',
            options: {
              configFile: path.resolve(__dirname, '../.tslint.json'),
              tsConfigFile: path.resolve(__dirname, '../.tsconfig.json'),
              fix: true,
            },
          },
        ],
      },
    ],
  },
};
