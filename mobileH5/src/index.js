// import 'whatwg-fetch'
// import "regenerator-runtime/runtime"
// import 'es6-promise/auto'

import React from 'react'
import ReactDOM from 'react-dom'
// import wx from 'weixin-jsapi'
import Example from "./App";
import 'assets/styles/global.css'
ReactDOM.render(
    <Example />,
    document.getElementById("root")
);

async function wechat_auth ()  {
    const res = await fetch("http://106.54.113.111:8091/getsign")
        .then(function(response) {
            return response.json();
        })
    console.log(res)
    wx.config({
        debug: true, // 开启调试模式
        appId: "wxc0f44270eeb7045a", // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.noncestr, // 必填，生成签名的随机串
        signature: res.signature,// 必填，签名，见附录1
        jsApiList: [
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getLocalImgData'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
}

wechat_auth()

wx.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    
});
