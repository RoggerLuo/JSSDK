var AipBodyAnalysisClient = require("baidu-aip-sdk").bodyanalysis;

// 设置APPID/AK/SK
var APP_ID = "17276706";
var API_KEY = "W4EIrxFrEHzIdqL1zCZkZcCg";
var SECRET_KEY = "zs4tvaU7MPBN5XQl48sz6LNaaGjHIgxm";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipBodyAnalysisClient(APP_ID, API_KEY, SECRET_KEY);


var fs = require('fs');

// 调用人像分割
// client.bodySeg(image).then(function(result) {
//     console.log(JSON.stringify(result));
// }).catch(function(err) {
//     // 如果发生网络错误
//     console.log(err);
// });

const bodySeg = (mediaId) => {
    return new Promise(resolve => {
        var image = fs.readFileSync(`images/${mediaId}.png`).toString("base64");
        // 如果有可选参数
        var options = {};
        options["type"] = "foreground";
        // 带参数调用人像分割
        client.bodySeg(image, options).then(function(result) {
            var base64Data = result.foreground.replace(/^data:image\/\w+;base64,/, "");
            var dataBuffer = new Buffer(base64Data, 'base64');
            fs.writeFile(`images/seg_${mediaId}.png`, dataBuffer, function(err) {
                if(err){ 
                    console.log(err)
                }else{
                    console.log('保存成功')
                    resolve('ok')
                }
            });
        }).catch(function(err) {
            console.log(err); // 如果发生网络错误
        });
    })
}

module.exports = bodySeg