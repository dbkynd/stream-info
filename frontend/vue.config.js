module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Stream Info',
    },
  },

  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '^/socket.io/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
      '^/emotes': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
};
