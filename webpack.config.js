var path = require('path');
var webpack = require('webpack');

module.exports = {
   entry: './src/js/app.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/dist'
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            use: {
               loader: 'babel-loader',
               options: {
                  // plugins: ['transform-async-to-generator'],
                  presets: ['es2015']
               }
            }
         },
         // { // file loader
         //    test: /\.(jpg|png|gif)$/,
         //    use: {
         //       loader: 'file-loader',
         //       options: {
         //          name: '[name].[ext]',
         //          outputPath: 'images/',
         //          publicPath: 'images/'
         //       }
         //    }
         // },
         { // base64-image-loader
            test: /\.(jpg|png|gif)$/,
            use: ['base64-image-loader']
         }
      ]
   }
};
