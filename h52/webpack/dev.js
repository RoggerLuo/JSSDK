const basic = require('./basic')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const projectRoot = path.resolve(__dirname, '../')
function dev(basic) {
    basic.mode = 'development'
    basic.output.filename = 'bundle.js'
    basic.module.rules.push({ //antd样式处理
        test:/\.css$/,
        exclude: /src/,
        use:[
          { loader: "style-loader",},
          {
              loader: "css-loader",
          }
        ]
    })
    basic.module.rules.push({
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: { modules: true }
            },
            'postcss-loader'
        ]
    })
    basic.module.rules.push({
        test: /\.(less)$/,
        exclude: /node_modules/,
        use: [{
            loader: 'style-loader' // creates style nodes from JS strings
        }, {
            loader: 'css-loader',
            options: { modules: true }
             // translates CSS into CommonJS
        }, {
            loader: 'less-loader' // compiles Less to CSS
        }]
    })
    basic.plugins = [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${projectRoot}/index.html`,
            inject: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
    basic.devServer = {
        disableHostCheck: true,
        contentBase: './dist', 
        inline: true,
        hot: true,
        host: "0.0.0.0"
    }
    basic.devServer.proxy = {
        '/': {
            target: 'http://172.16.1.104:8091/',
            changeOrigin: true
        }
    }
    return basic
}

module.exports = dev(basic)
