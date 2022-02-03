module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'StreamInfo',
    },
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
};
