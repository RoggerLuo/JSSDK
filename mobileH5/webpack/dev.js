const basic = require('./basic')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const projectRoot = path.resolve(__dirname, '../')
const CopyWebpackPlugin = require('copy-webpack-plugin');
function dev(basic, projectName) {
    basic.entry.app = `${projectRoot}/src/index.js`
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
                options: { modules: false }
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
            options: { modules: false }
             // translates CSS into CommonJS
        }, {
            loader: 'less-loader' // compiles Less to CSS
        }]
    })
    basic.plugins = [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${projectRoot}/src/index.html`,
            inject: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new CopyWebpackPlugin([
        //     { 
        //         from: `${projectRoot}/src/templates/`, // f7的模版需要文件夹后不要写*，4.0可能被deprecated了
        //         to: './'
        //     },
        //     {
        //         from: `${projectRoot}/src/assets/`, 
        //         to: './assets/'
        //     }
        // ])
    ]
    basic.optimization = {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    name: 'reactDom',
                    test: /react-dom/, 
                },
                // vendor2: {
                //     chunks: 'all',
                //     name: 'f7',
                //     test: /framework7/, 
                // }
            }
        }
    }
    basic.devServer = {
        contentBase: './dist', 
        inline: true,
        hot: true,
        host: "0.0.0.0",
        port: 8080,
    }
    basic.devServer.proxy = {
        '/': {
            // target: 'http://120.236.169.14:9080/430edu-api/v1',
            // target: 'http://172.16.1.25:8000/v1',
            target: 'http://172.16.1.104:8091',
        }
    }
    return basic
}
const wrap = function(projectName){
    return dev(basic,projectName)   
}
module.exports = wrap
