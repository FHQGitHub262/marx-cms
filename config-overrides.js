const { override, fixBabelImports, addLessLoader } = require("customize-cra");

const pluginConfig = require("./webpack.config.override");

module.exports = {
  webpack: function(config) {
    const overrideConfig = override(
      // pluginConfig,
      fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true
      }),
      addLessLoader({
        javascriptEnabled: true
      })
    )(config);
    console.log(overrideConfig.plugins);
    overrideConfig.plugins = [
      ...overrideConfig.plugins,
      ...pluginConfig.plugins
    ];
    return overrideConfig;
  }
};
