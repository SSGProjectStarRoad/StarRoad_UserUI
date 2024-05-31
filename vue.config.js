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
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 프로덕션에서도 Vue DevTools 활성화
      config.devtool = 'source-map';
      config.optimization = {
        minimize: false,
      };
    }
  },
};
