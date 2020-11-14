const { override, fixBabelImports, addLessLoader } = require("customize-cra");
const path = require("path");
const pluginConfig = require("./webpack.config.override");
// const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

// const options = {
//   stylesDir: path.join(__dirname, "./src/less"),
//   antDir: path.join(__dirname, "./node_modules/antd"),
//   varFile: path.join(__dirname, "./src/less/vars.less"),
//   mainLessFile: path.join(__dirname, "./src/less/main.less"),
//   themeVariables: [
//     "@primary-color",
//     "@secondary-color",
//     "@text-color",
//     "@text-color-secondary",
//     "@heading-color",
//     "@btn-primary-bg",
//     "@select-background",
//     "@layout-body-background",
//     "@layout-header-background",
//     "@layout-trigger-background",
//     "@layout-sider-background-light",
//     "@border-color-base",
//     "@body-background",
//     "@component-background"
//   ],
//   indexFileName: "index.html",
//   generateOnce: false // generate color.less on each compilation
// };

module.exports = {
  webpack: function (config) {
    const overrideConfig = override(
      // pluginConfig,
      fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true,
      }),
      addLessLoader({
        javascriptEnabled: true,
        modifyvars: {
          "@primary-color": "#005752",
        },
      })
    )(config);
    overrideConfig.plugins = [
      ...overrideConfig.plugins,
      ...pluginConfig.plugins,
      // new AntDesignThemePlugin(options)
    ];
    return overrideConfig;
  },
};
