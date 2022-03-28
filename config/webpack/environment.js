const { environment } = require('@rails/webpacker')

const path = require('path')

const customConfig = {
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
    }
  }
}

environment.config.merge(customConfig);

environment.splitChunks()

module.exports = environment
