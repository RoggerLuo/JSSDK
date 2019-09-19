const basic = require('./basic')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const projectRoot = path.resolve(__dirname, '../')
const CopyWebpackPlugin = require('copy-webpack-plugin')
function product(basic){
    basic.entry.app = `${projectRoot}/src/index.js`
    basic.mode = 'production'
    basic.output.filename = 'bundle.[hash].js'
    basic.module.rules.push({
        test: /\.(less)$/,
        exclude: /node_modules/,
        use: [
            {loader: 'style-loader'}, 
            {loader: 'css-loader',options: { modules: false }}, 
            {loader: 'less-loader'}
        ]
    })
    // basic.module.rules.push({
    //     test: /\.css$/,
    //     exclude: /src/,
    //     use: ExtractTextPlugin.extract({
    //         fallback: 'style-loader',
    //         use: [
    //             {loader: 'css-loader'},
    //             'postcss-loader'
    //         ]
    //     })
    // })
    basic.module.rules.push({
        test: /\.css$/,
        // exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: { modules: false }
                },
                'postcss-loader'
            ]
        })
    })
    // basic.module.rules.push({
    //     test: /\.css$/,
    //     exclude: /src/,
    //     use: ExtractTextPlugin.extract({
    //         fallback: 'style-loader',
    //         use: [
    //             {loader: 'css-loader'},
    //             'postcss-loader'
    //         ]
    //     })
    // })
    // basic.module.rules.push({
    //     test: /\.css$/,
    //     exclude: /node_modules/,
    //     use: ExtractTextPlugin.extract({
    //         fallback: 'style-loader',
    //         use: [
    //             {
    //                 loader: 'css-loader'
    //             },
    //             'postcss-loader'
    //         ]
    //     })
    // })
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
    basic.plugins = [
        new webpack.DefinePlugin({
          'TEST_MODE': JSON.stringify(false)
        }),
        new CleanWebpackPlugin(), //,{ root: projectRoot }
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${projectRoot}/src/index.html`,
            inject: true
        }),
        new ExtractTextPlugin('style.[chunkhash].css', { allChunks: true }),
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
    return basic
}

const configuration = product(basic)
module.exports = configuration
