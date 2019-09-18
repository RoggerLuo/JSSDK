let api
if(process.env.NODE_ENV==='production') {
    if(TEST_MODE) {
        api = '/'
    }else{ //生产
        api = '/bbs/'  // '/bbs/v1/' //'http://120.236.169.14:9080/430edu-api/v1'
    }
}else{
    api = '/bbs/'
    // api = 'https://workplus.io/430edu/v1/'
    // api = 'http://172.16.1.144:8000/v1'
    // api = 'http://172.16.1.25:8000/v1'
    // api = 'http://120.236.169.14:9080/tlore/v1'
    // api = 'http://47.99.79.11:8082/v1'
    // api = 'http://47.99.79.11:8082/v1'
}

export default { 
    api,
    // redirect_url: `https://console.workplus.io/release/index.html?id=atwork`,
    // share_icon_mediaId: `mediaId_unset`
} 
