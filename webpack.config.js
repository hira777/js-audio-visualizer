const path = require('path');

module.exports = {
  entry: {
    'visualizer1/app': './src/js/visualizer1/app',
    'visualizer2/app': './src/js/visualizer2/app',
    'visualizer3/app': './src/js/visualizer3/app',
    'visualizer4/app': './src/js/visualizer4/app',
  },

  output: {
    path: path.join(__dirname, 'docs/js'),
    filename: '[name].js',
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        },
      }],
    }],
  },
};
