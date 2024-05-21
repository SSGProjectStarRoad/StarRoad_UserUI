module.exports = {
  productionSourceMap: false,
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
