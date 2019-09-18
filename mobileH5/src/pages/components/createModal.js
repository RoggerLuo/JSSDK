import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React from 'react'
import { Model } from 'dvax'
import cancel from './cancelSend.png'
import text from './wenzi.png'
import photo from './paizhao.png'
import album from './xiangce.png'
import './components.css'

Model.create({
    namespace:'AddModals',
    state:{
      visible:false,
      // mediaId:'',
      mediaIds:[]
    }
})

function AddModal(props) {

const takePhoto = function(){
    return new Promise(function(resolve,reject){   
         cordova.exec(
            function(result) {
                
                resolve(result.mediaId)
            },
            function(error) {
                //alert("调用失败");
            },
            "WorkPlus_Image",
            "takePicture",// "takePhoto", 
            [{'editable': false}]
        )
    });
}

const takepicture=function(){
   Model.change('sendpostModel','textSelect','1')
    Model.change('sendpostModel','picsAdd','1')
   // Model.change('AddModals','mediaIds',[]) //拍照时把之前的图片清楚
    Model.run('AddModals',function*({change}){
      const mediaIds = yield takePhoto()
      //alert(mediaIds) 
      props.mediaIds.push(mediaIds)
      // Model.change('AddModals','mediaIds',mediaIds)
     // alert(props.mediaIds)
      Model.change('sendpostModel','body.images',props.mediaIds)
     
      window.mainView.router.load({
                      url: 'sendPost.html',
                      query: {
                        
                      }
                    })
        Model.change('AddModals','visible',false)
    })
   
  }
const chooseImages=()=>{

  let params = [{'multiple': true}];
        return new Promise(function (success, fail) {
            cordova.exec(function (result) {
              //alert(JSON.stringify(result))
            const mediaIds=result.map(function(obj,index){
                 return obj.mediaId
               })
                    success(mediaIds);

                },
                function (err) {
                    fail(err);
                },
                'WorkPlus_Image',
                'chooseImages',
                  params);
        });

 }
const selectImage=function(){
    Model.change('sendpostModel','textSelect','1')
    Model.change('sendpostModel','picsAdd','2')
   // Model.change('AddModals','mediaIds',[])
    Model.run('AddModals',function*({change}){
      const mediaIds = yield chooseImages()
      //alert(mediaIds)
      Model.change('AddModals','mediaIds',mediaIds)
       Model.change('sendpostModel','body.images',mediaIds)
      window.mainView.router.load({
                      url: 'sendPost.html',
                      query: {
                        
                      }
                    })
        Model.change('AddModals','visible',false)
    })
   
  }
  const onClose=()=>{
    Model.change('AddModals','visible',false)
  }
    return (
        <Modal
          popup
          visible={props.visible} 
          animationType="slide-up"
          style={{borderRadius:'20px'}}
          onClose={onClose} 
                 >
          <List 
              // renderHeader={() => <div>委托买入</div>} 
              className="popup-list">
              <div style={{width:'100%',height:'150px',display:'flex',marginBottom:'30px',justifyContent:'space-evenly'}} className='Box'>
                <div style={{marginTop:'85px'}} className='flex1'>
                  <img style={{width:'50px',height:'50px'}} src={text} onClick={()=>{
                    Model.change('sendpostModel','textSelect','0')
                    Model.change('AddModals','mediaIds',[])
                    window.mainView.router.load({
                    url: 'sendPost.html',
                    })
                    Model.change('AddModals','visible',false)
                    
                  }} />
                  <div className='sendText'>文字</div>                                                                               
                </div>
                <div style={{marginTop:'85px'}} className='flex1'>
                  <img style={{width:'50px',height:'50px'}} src={photo} onClick={takepicture} />
                  <div className='sendText'>相机</div>
                </div>
                <div style={{marginTop:'85px'}} className='flex1'>
                  <img style={{width:'50px',height:'50px'}} src={album} onClick={selectImage} />
                  <div className='sendText'>相册</div>
                </div>
              </div>
                
            <List.Item>
                <div style={{width:'100%',textAlign:'center',marginBottom:"35px"}}>
                  <img 
                    src={cancel}  
                    style={{width:'50px',height:'50px',transform:'rotate(45deg)'}}
                    type="primary" 
                    onClick={()=>{
                        Model.change('AddModals','visible',false)
                      }} 
                    /></div>
            </List.Item>
          </List>
        </Modal>
      
    );
  // }
}


export default Model.connect('AddModals')(AddModal)



//  cordova.exec(function(result) {
//             alert(JSON.stringify(result, null, 4));
//         },
//         function(error) {
//             alert("调用失败");
//         },
//         "WorkPlus_Image",
//         "selectImage", 
//         []);