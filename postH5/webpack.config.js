const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    devServer: {
        compress:true, //是否压缩
        // port:8080, //端口号
        contentBase: path.resolve(__dirname, "dist"),
        host:'0.0.0.0', //外部服务器可以访问
        disableHostCheck: true,
        inline: true,
        hot: true,
        open:true, //是否运行时打开浏览器
        // proxy: {
        //     '/': {
        //         target: 'http://172.16.1.25:9090/',
        //         changeOrigin: true
        //     }
        // }    
    },
    mode:'development',
    devtool: "source-map",
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.min.js",
        path: __dirname + "/dist"
    },
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/utils/'),
            components: path.resolve(__dirname, 'src/components/')
        }
    },
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    optimization : {
        splitChunks: {
            cacheGroups: {
                vendor:{
                    test: /node_modules\/react-dom/, // 把react-dom抽出来，比较大
                    chunks:"all",
                    name:"vendor"
                },
            }
        }
    }
}