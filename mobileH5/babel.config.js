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

/* 
   require("@babel/plugin-syntax-dynamic-import"),
          [require("@babel/plugin-proposal-decorators"), { "legacy": true }],
          [require("@babel/plugin-proposal-class-properties"), { "loose": false }], */
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "entry",
                "modules": false
            }
        ],
        "@babel/preset-react",
        
    ], // "@babel/preset-env"
    plugins: [
        "@babel/plugin-transform-async-to-generator",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import",
        ["@babel/plugin-proposal-decorators",{decoratorsBeforeExport:true}],
        ["import", { "libraryName": "antd-mobile", "style": "css" }],

    ], // same as "@babel/plugin-transform-arrow-functions"
};