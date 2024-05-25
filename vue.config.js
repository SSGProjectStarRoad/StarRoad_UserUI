module.exports = {
  productionSourceMap: true,
  lintOnSave: false,
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
