import React from 'react'
// import wx from 'weixin-jsapi'
import { List, Picker, Button, WhiteSpace, WingBlank } from 'antd-mobile'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import isIphone from './isIphone'
const appState = observable({ /* model定义 */
    timer: 0,
    data:[
        {name:'a'},
        {name:'b'},
        {name:'c'},
    ],
    pickerValue:1,
    imgSrc:''
})
const words = [
    {value:1,label:'词语1'},
    {value:2,label:'词语2'},
    {value:3,label:'词语3'},
]
function selectPhoto(){
    return new Promise(resolve => {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                resolve(res.localIds)
                // var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            }
        })
    })    
}
function getLocalImg(localID){
    return new Promise(resolve => {
        wx.getLocalImgData({
            localId: localID, // 图片的localID
            success: function (res) {
                var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                resolve(localData)
            }
        })
    })
}
function uploadToWechat(localID){
    return new Promise(resolve => {
        wx.uploadImage({
            localId: localID, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                resolve(serverId)
            }
        })
        //   备注：上传图片有效期3天，可用微信多媒体接口下载图片到自己的服务器，此处获得的 serverId 即 media_id。
    })
}
  
  
async function upload(){
    const localIds = await selectPhoto()
    let src
    if(isIphone()) { // ios8以后iphone需要特殊处理
        src = await getLocalImg(localIds[0])
    }else{
        src = localIds[0]
    }
    appState.imgSrc = src
    const serverId = await uploadToWechat(localIds[0])

    const res = await fetch(`http://106.54.113.111:8091/getImg?id=${serverId}`)
    .then(function(response) {
        return response.json();
    })
    console.log(res)
    alert(res)
}

@observer
class ButtonExample extends React.Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <div style={{height:'0%'}}></div>
                <WingBlank>
                <WhiteSpace />
                <WhiteSpace />
                <Button type="primary" onClick={upload}>上传照片</Button><WhiteSpace />
                <WhiteSpace />
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <Picker
                        title="选择词语"
                        extra="请选择"
                        data={words}
                        value={appState.pickerValue}
                        onChange={v => appState.pickerValue = v }
                        onOk={v => appState.pickerValue = v }
                    >
                        <List.Item arrow="horizontal">选择词语</List.Item>
                    </Picker>
                </List>
                <WhiteSpace />
                <WhiteSpace />

                <img src={appState.imgSrc} style={{maxWidth: '100%'}}/>
                </WingBlank>
            </div>
        )
    }
}
export default ButtonExample

