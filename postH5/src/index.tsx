import * as React from "react";
import * as ReactDOM from "react-dom";
import wx from 'weixin-jsapi'
import { Hello } from "./App";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);

fetch("http://106.54.113.111:8091/getSign")
.then(function(response) {
    return response.json();
})
.then(function (res) {
    console.log(res)
    wx.config({
        debug: true, // 开启调试模式
        appId: "wxc0f44270eeb7045a", // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.noncestr, // 必填，生成签名的随机串
        signature: res.signature,// 必填，签名，见附录1
        jsApiList: ['chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
})
