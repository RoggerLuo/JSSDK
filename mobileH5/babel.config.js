// {
//     "presets": [
//         "@babel/preset-env",
//         "stage-3",
//         "react"
//     ],
//     "plugins": [
//         "transform-regenerator",
//         "transform-class-properties",
//         "@babel/plugin-transform-async-to-generator",
//         ["import", { "libraryName": "antd-mobile", "style": "css" }] 
//     ]
// }

module.exports = {
    presets: [
        // "@babel/preset-env",

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
        
    ], // "@babel/preset-env"
    plugins: [
        //  "@babel/plugin-transform-modules-commonjs"
    //     "@babel/plugin-transform-runtime",
    //     "@babel/plugin-transform-async-to-generator",
    //     "@babel/plugin-proposal-class-properties",
    //     "@babel/plugin-syntax-dynamic-import",
    //     ["@babel/plugin-proposal-decorators",{decoratorsBeforeExport:true}],
    //     ["import", { "libraryName": "antd-mobile", "style": "css" }],

    ], // same as "@babel/plugin-transform-arrow-functions"
};