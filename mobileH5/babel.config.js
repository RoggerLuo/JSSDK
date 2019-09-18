module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": "> 5%",
                    // "esmodules": true
                },
                // "useBuiltIns": "entry",
            }
        ],
        "@babel/preset-react",
    ],
    plugins: [
        ["import", { "libraryName": "antd-mobile", "style": "css" }],
        ["@babel/plugin-proposal-decorators",{
            // decoratorsBeforeExport:true,
            legacy: true,
            loose: true
        }],
        "@babel/plugin-proposal-class-properties",
    ],
};

    //  "@babel/plugin-transform-modules-commonjs"
    //     "@babel/plugin-transform-runtime",
    //     "@babel/plugin-transform-async-to-generator",
    //     
    //     "@babel/plugin-syntax-dynamic-import",
    //     ,
