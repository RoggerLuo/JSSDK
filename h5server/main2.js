var express = require('express');
var crypto = require('crypto');  //引入加密模块
var config = require('./config');//引入配置文件
var http = require('http');
 
var app = express();
 
app.get('/wx', function (req, res) {
 
    //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
    var signature = req.query.signature,//微信加密签名
        timestamp = req.query.timestamp,//时间戳
        nonce = req.query.nonce,//随机数
        echostr = req.query.echostr;//随机字符串
 
    //2.将token、timestamp、nonce三个参数进行字典序排序
   
    var array = [config.token, timestamp, nonce];
    array.sort();
 
    //3.将三个参数字符串拼接成一个字符串进行sha1加密
    var tempStr = array.join('');
    const hashCode = crypto.createHash('sha1'); //创建加密类型 
    var resultCode = hashCode.update(tempStr, 'utf8').digest('hex'); //对传入的字符串进行加密
    console.log(signature)
    //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (resultCode === signature) {
        res.send(echostr);
    } else {
        res.send('mismatch');
    }
});
 
 
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});



/**
 * 获取openid
 * @param  { string } code [调用获取openid的接口需要code参数]
 */
function getOpenId(code) {
    const appid = config.appid;
    const secret = config.secret;

    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;

    request(url, function(error, response, body) {

        if (!error && response.statusCode == 200) {
           const openid =  body.openid;
           getAccessToken(openid);   //获取openid成功后调用getAccessToken
        }

    });
}


/**
 * 获取access_token
 *  @param  { string } openid [发送模板消息的接口需要用到openid参数]
 */
function getAccessToken(openid) {
    const appid = config.appid;
    const secret = config.secret;
    const grant_type = config.grant_type;

    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=${grant_type}&appid=${appid}&secret=${secret}`;

    request(url, function(error, response, body) {

        if (!error && response.statusCode == 200) {

            const access_token= JSON.parse(body).access_token;
            sendTemplateMsg(openid, access_token); //获取access_token成功后调用发送模板消息的方法

        } else {
            throw 'update access_token error';
        }
    });


}



// const getJsApiData = require('./getJsApiData.js')

// app.get('/auth', function (req, res) {
//     var clientUrl = 'http://' + req.hostname + req.url;
//     getJsApiData(clientUrl).then(data => {
//       res.render('base.html', {signature: data[0], timestamp: data[1], nonceStr: data[2], appId: config.appId});
//     });
//   });

