const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const projectRoot = path.resolve(__dirname, '../')

module.exports = {
    entry: {
        app: `${projectRoot}/src/index.js`,
    },
    output: {
        path: `${projectRoot}/dist`,
        chunkFilename: '[name].bundle.js',
        filename: 'bundle.[hash].js',
        // publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.html'],
        alias: {
            'components': `${projectRoot}/src/components`,
            'shared': `${projectRoot}/src/shared`,
            'src': `${projectRoot}/src`,
            'templates': `${projectRoot}/src/templates`,
            'assets': `${projectRoot}/src/assets`,
        }
    },
    module: {
        rules: [
            {
                test(input){
                    if(input.indexOf('dvax') !== -1) {
                        return true
                    }
                    if(input.indexOf('antd-mobile') !== -1) {
                        return true
                    }

                    if(input.indexOf('node_modules') !== -1) {
                        return false                        
                    }
                    return true
                },
                loader: 'babel-loader',
                // options: {
                //     "presets": [
                //             "env", 
                //             "stage-3",
                //             "react"
                //         ],
                //         "plugins": [
                //             "transform-regenerator",
                //             "transform-class-properties",
                //             ["import", { "libraryName": "antd-mobile", "style": "css" }] 
                //         ]
                // }
            },
            // {
            //     test(input){
            //         if(input.indexOf('antd') !== -1) {
            //             return true
            //         }
            //         return false
            //     },
            //     loader: 'babel-loader',
            //     options: {
            //         "plugins": [
            //             ["import", { "libraryName": "antd-mobile", "style": "css" }] 
            //         ]
            //     }
            // },

            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    },
    context: path.join(__dirname, '')
}
