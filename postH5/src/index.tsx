import * as React from "react";
import * as ReactDOM from "react-dom";
import wx from 'weixin-jsapi'
import Example from "./App";

ReactDOM.render(
    <Example />,
    document.getElementById("example")
);

async function wechat_auth ()  {
    const res = await fetch("http://106.54.113.111:8091/getSign")
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
        jsApiList: ['chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
}

wechat_auth()



wx.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res :any) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
});
