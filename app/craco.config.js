const nodeExternals = require("webpack-node-externals");

module.exports = {
  webpack: {
    configure: {
      target: "electron-renderer",
      externals: [
        nodeExternals({
          allowlist: [/webpack(\/.*)?/, "electron-devtools-installer"],
        }),
      ],
      resolve: {
        fallback: {
          "fs": false, // 'fs' module is typically not needed in a renderer process
          "path": require.resolve("path-browserify"), // Polyfill for 'path'
          "util": require.resolve("util"), // Polyfill for 'util'
        },
      },
    },
  },
};
