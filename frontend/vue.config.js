module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'StreamInfo',
    },
  },
  devServer: {
    proxy: {
      '^/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
};
