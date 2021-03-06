const path = require('path');

module.exports = {
  entry: {
    'visualizer1/app': './src/js/visualizer1/app',
    'visualizer1-with-p5js/app': './src/js/visualizer1-with-p5js/app',
    'visualizer2/app': './src/js/visualizer2/app',
    'visualizer2-with-p5js/app': './src/js/visualizer2-with-p5js/app',
    'visualizer3-with-p5js/app': './src/js/visualizer3-with-p5js/app',
    'visualizer4-with-p5js/app': './src/js/visualizer4-with-p5js/app',
    'visualizer5/app': './src/js/visualizer5/app',
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
