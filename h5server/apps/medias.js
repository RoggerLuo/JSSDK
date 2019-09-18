const co = require('co')
const HandleRes = require('../utils/handle_res')
const Validate = require('../utils/validate')
const https = require('https')
const http = require('http');
const Atwork_Tool = require('../utils/atwork_tool'); //包atwork/lib/store里的checkParam的originalFilename名字需要改一下
const ctx = require('../config.js').ctx
const config = require('../config.js')
const uploadMediaServer = inputFile => {
	console.log(' ********* 上传媒体库 ********* ')
	return Atwork_Tool.getAtworkInstance(ctx)
        .then(atworkInstance => atworkInstance.uploadFile(inputFile))
        .then(backMessage => backMessage.result)
}
function upload(req, res) {
    console.log('********upload********')
    const client = HandleRes.getResFn(res)
    const inputFile = req.files.file
    if(inputFile === undefined) {
        client.fail('catch unknow error,undefined file')
    }
    co(function*(){
        const mediaId = yield uploadMediaServer(inputFile,req)
        client.success(mediaId)
    }).catch(client.fail)
}
function mediaDownloadForward(req, res) {
    if(config.workplus.apiServer.internal.indexOf('https') !== -1) { // 判断是否是https
        var sreq = https.get(
            config.workplus.apiServer.internal + '/medias/' + req.params.mediaId,
            function(sres){
                // res.header('content-disposition', 'attachment; filename="'+fileName+'"')
                sres.pipe(res)
                sres.on('end', function(){console.log('done')})
            }
        )
        sreq.end('ok') // 一定要先执行end, 返回任意值    
    }else{
        var httpReq = http.get(
            config.workplus.apiServer.internal + '/medias/' + req.params.mediaId,
            function(sres){
                // res.header('content-disposition', 'attachment; filename="'+fileName+'"')
                sres.pipe(res)
                sres.on('end', function(){console.log('done')})
            }
        )
        httpReq.end('ok') // 一定要先执行end, 返回任意值
    }
}
function getRouter(){
    const express = require('express')
    const router = express.Router()
    var multipart = require('connect-multiparty');
    var multipartMiddleware = multipart()
    router.post('/',multipartMiddleware,upload)
    router.get('/:mediaId', mediaDownloadForward)
    return router    
}
module.exports = getRouter()

