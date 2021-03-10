const path = require('path');

module.exports = {
  entry: './server-blog.js',
  output: {
    filename: 'server-blog.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
};