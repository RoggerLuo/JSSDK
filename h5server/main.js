const express = require('express'); //web服务框架模块
const request = require('request'); //http请求模块
const fs = require('fs'); //文件系统模块
const path = require('path'); //文件路径模块
const sha1 = require('node-sha1'); //加密模块
const urlencode= require('urlencode'); //URL编译模块
var cache = require('memory-cache')
const bodySeg = require('./bodySeg')
const hostName = '0.0.0.0'; //ip或域名
const port = 8091; //端口
const app = express()
/**
 * [开启跨域便于接口访问]
 */
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
    res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
    res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

/**
 * [设置验证微信接口配置参数]
 */
const config = {
    token: 'test', //对应测试号接口配置信息里填的token
    appid: 'wxc0f44270eeb7045a', //对应测试号信息里的appID
    secret: '61e9f745e5e8a58f81d1515713fdc555', //对应测试号信息里的appsecret
    grant_type: 'client_credential' //默认
};


/**
 * [验证微信接口配置信息，]
 */
app.get('/', function(req, res) {
    const token = config.token; //获取配置的token
    const signature = req.query.signature; //获取微信发送请求参数signature
    const nonce = req.query.nonce; //获取微信发送请求参数nonce
    const timestamp = req.query.timestamp; //获取微信发送请求参数timestamp

    const str = [token, timestamp, nonce].sort().join(''); //排序token、timestamp、nonce后转换为组合字符串
    const sha = sha1(str); //加密组合字符串

    //如果加密组合结果等于微信的请求参数signature，验证通过
    if (sha === signature) {
        const echostr = req.query.echostr; //获取微信请求参数echostr
        res.send(echostr + ''); //正常返回请求参数echostr
    } else {
        res.send('验证失败');
    }
});


app.get('/getsign', async function  (req, res)  {
    
    /* 需要修改url */
    // var url = "http://0.0.0.0:8080/"
    // var url = "http://0.0.0.0:8080/"
    var url = 'http://192.168.1.114:8080/'

    console.log(url)
    var noncestr = "123456",
        timestamp = Math.floor(Date.now() / 1000), //精确到秒
        jsapi_ticket;

    if (cache.get('ticket')) {
        jsapi_ticket = cache.get('ticket');
        // console.log('1' + 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url);
        obj = {
            noncestr: noncestr,
            timestamp: timestamp,
            url: url,
            jsapi_ticket: jsapi_ticket,
            signature: sha1('jsapi_ticket=' + jsapi_ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url)
        };
        res.send(obj)
    } else {
        let access_token = await getToken()        

        let ticketMap = await applyTickets(access_token)
        cache.put('ticket', ticketMap.ticket, (1000 * 60 * 60 * 24));  //加入缓存
        // console.log('jsapi_ticket=' + ticketMap.ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url);
        obj = {
            noncestr: noncestr,
            timestamp: timestamp,
            url: url,
            jsapi_ticket: ticketMap.ticket,
            signature: sha1('jsapi_ticket=' + ticketMap.ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url)
        }
        res.send(obj)
    }
});


app.get('/getImg', async function  (req, res)  {
    const id = req.query.id; //获取微信发送请求参数signature
    const access_token = await getToken()        
    console.log('access_token是',access_token)
    console.log('id是',id)
    var src = `https://api.weixin.qq.com/cgi-bin/media/get?access_token=${access_token}&media_id=${id}`
    
    var writeStream = fs.createWriteStream(`images/${id}.png`);
    var readStream = request(src)
    readStream.pipe(writeStream);
    readStream.on('end', function() {
        console.log('文件下载成功');
    });
    readStream.on('error', function() {
        console.log("错误信息:" + err)
    })
    writeStream.on("finish", function() {
        console.log("文件写入成功");
        writeStream.end();

        bodySeg(id).then(function(val){
            res.send({result:'ok'})
        })
    });
})

app.listen(port, hostName, function() {
    console.log(`服务器运行在http://${hostName}:${port}`);
});


function applyToken(){
    return new Promise(resolve => {
        request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.secret}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var tokenMap = JSON.parse(body);
                resolve(tokenMap)
            }
        })
    })
}
function applyTickets(access_token){
    return new Promise(resolve => {
        request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi', function (error, resp, json) {
            if (!error && resp.statusCode == 200) {
                var ticketMap = JSON.parse(json);
                resolve(ticketMap)

            }
        })
    })
}

async function getToken(){
    let access_token

    if (cache.get('access_token')) {
        access_token = cache.get('access_token')
        console.log('get from cache',access_token)

    }else{
        tokenMap = await applyToken()
        cache.put('access_token', tokenMap.access_token, (1000 * 60 * 59 * 2 ));  //加入缓存
        access_token = tokenMap.access_token
        console.log('get from online application',access_token)
    }
    return access_token
}

