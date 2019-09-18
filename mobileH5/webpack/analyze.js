const webpack = require('webpack')
const config = require('./build-config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
config.plugins.push(new BundleAnalyzerPlugin())
module.exports = config
