const path = require('path')
const webpack = require('webpack');
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /node_modules\/mand-mobile/
      },
      {
        test: /\.styl$/,
        use: [
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              import: [path.resolve(__dirname, '@/assets/theme.custom.styl')]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        include: /node_modules\/mand-mobile/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    // ...
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          // pxtorem (配置可根据项目需要而定)
          use: [
            poststylus(pxtorem({ 
                rootValue: 100, 
                minPixelValue: 2, 
                propWhiteList: [] 
            }))]
        }
      }
    }),
     // ...
    new webpack.ProvidePlugin({
        mandMobile: 'mand-mobile',
    }),
    // ...
  ],
  postcss: [
    pxtorem({
      rootValue: 100,
      minPixelValue: 2,
      propWhiteList: []
    })
  ]
}
