const path = require('path')
const workboxPlugin = require('workbox-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, dir)
}

const workboxOptions = {
  swSrc: resolve('src/sw/serviceWorker.js'),
  swDest: 'serviceWorker.js',
  importWorkboxFrom: 'disabled',
  exclude: [/^workbox/, /\.map/]
}

module.exports = {
  configureWebpack: (config) => {
    config.plugins.push(
      new workboxPlugin.InjectManifest(workboxOptions)
    )
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') {
      config.output
        .set('filename', 'static/js/[name].[hash].js')
        .set('chunkFilename', 'static/js/[name].[hash].js')
    }

    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('styles', resolve('src/assets/styles'))
      .set('utils', resolve('src/utils'))

    config
      .plugin('copy')
      .tap(args => {
        if (args.length !== 0) {
          args[0][0].ignore = isProd ? ['*.dev.*'] : ['*.prod.*']
        }
        return args
      })
  }
}
