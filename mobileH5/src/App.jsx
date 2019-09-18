import React from 'react'
import wx from 'weixin-jsapi'
import { List, Picker, Button, WhiteSpace, WingBlank } from 'antd-mobile'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
/* model定义 */
const appState = observable({
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
// function getLocalImg(localID){
//     return new Promise(resolve => {
//         wx.getLocalImgData({
//             localId: localID, // 图片的localID
//             success: function (res) {
//                 var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
//                 resolve(localData)

//             }
//         });
//     })
// }
async function upload(){
    const localIds = await selectPhoto()
    // const src = await getLocalImg(localIds[0])
    appState.imgSrc = localIds[0]

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
                        onChange={v => {
                            console.log(v)
                            appState.pickerValue = v 
                        }}
                        onOk={v => {
                            console.log(v)
                            appState.pickerValue = v 
                        }}
                    >
                        <List.Item arrow="horizontal">选择词语</List.Item>
                    </Picker>
                </List>
                <img src={appState.imgSrc}/>
                </WingBlank>
            </div>
        )
    }
}
export default ButtonExample