const {
  override,
  fixBabelImports,
  addLessLoader,
  addBabelPlugin
} = require("customize-cra");
const frPlugin = require("webpack-plugin-fr-theme");
module.exports = override(
  addBabelPlugin(frPlugin),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true
  })
);
