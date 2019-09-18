import React from 'react'
import { Model } from 'dvax'
import logo from '../subject/sectors/11.jpg'
import PostComponent from '../homePage/postComponent.js'
import CreateSector from '../components/createSector'
import {TextareaItem,InputItem} from 'antd-mobile'
import add from './add.png'
import biaoti from './biaoti.png'
import tupian from './tupian.png'
import biaoqing from './biaoqing.png'
import config from 'shared/config'
import picAdd from './tianjia.png'
import SelectSector from '../components/selectSector.js'
import toast from 'dvax/toast'
import shanchu from './delete.png'


function SendPost(props){
function HJXsendButton(){
	const value=props.body
	Model.dispatch({type:'sendpostModel/submit',values:value})
	Model.dispatch({type:'HomePageModel/gethomePage'})
	Model.change('AddModals','mediaIds',[])
	Model.change('sendpostModel','textSelect','')
}
global.HJXsendButton=HJXsendButton
const takePhoto = function(){
    return new Promise(function(resolve,reject){   
         cordova.exec(
            function(result) {
                
                resolve(result.mediaId)
            },
            function(error) {
                alert("调用失败");
            },
            "WorkPlus_Image",
            "takePicture",// "takePhoto", 
            [{'editable': false}]
        )
    });
}

const takepicture=function(){
    Model.run('AddModals',function*({change}){
      const mediaIds = yield takePhoto()
      //alert(mediaIds) 
      props.mediaIds.push(mediaIds)
      //alert(props.mediaIds)
      Model.change('sendpostModel','body.images',mediaIds)
  })
}
const chooseImages=()=>{
	let params = [{'multiple': true}];
	return new Promise(function (success, fail) {
	    cordova.exec(function (result) {
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
	
	Model.run('AddModals',function*({change}){
	    const mediaIds = yield chooseImages()
	    // alert(mediaIds)

	    const ArrymediaId=props.mediaIds.concat(mediaIds)
	    // alert(props.mediaIds)
	Model.change('AddModals','mediaIds',ArrymediaId)
	Model.change('sendpostModel','body.images',ArrymediaId)
	})
	}
	

const previewImage=function(mediaIds,position) {
        let params = [{
            mediaIds: mediaIds,
            position: position
        }];
        return new Promise(function (success, fail) {
         	cordova.exec(function(result) {
                    success();
                    
                },
                function(error) {
                    fail(error);
                },
                "WorkPlus_Image",
                "showImages",
                params
            );
        });
    }

const mediaIds=props.body.images

		return (
			<div style={{background:'#ffffff',width:'100%',paddingTop:'44px'}}>
			{
				props.textSelect=='1'?   
				<div style={{width:'90%',height:'auto',marginLeft:'5%',marginTop:'30px',display:'flex',marginBottom:'30px'}}>
					{
						props.body.images.map((med,ind)=>{
							//alert(med)
							if(med.length==='0')
								return <div></div>
							else return(
								<div key={ind} style={{marginLeft:'10px'}}>
									<div style={{width:'60px',height:'60px'}}>
										<div style={{width:"20px",height:'20px',float:'right',marginRight:'-10px',marginTop:'-20px',background:'#ffffff',position:"relative",top:'10px',borderRadius:'10px'}}>
												<img style={{width:'100%',height:'100%'}} src={shanchu} onClick={()=>{
													const arr=props.body.images
													const a=arr.splice(ind,1)
													
													Model.change('sendpostModel','body.images',arr)
													
												}} />
										</div>
										<img  src={`${config.api}/medias/${med}`} style={{width:'100%',height:'100%'}} onClick={()=>{previewImage([med],'0')}} />
									</div>
								</div>
								)
						})
					}
					<div style={{marginLeft:'10px'}}>
						<div style={{width:'60px',height:'60px',backgroundColor:'#f6f6f6',display:'table-cell',verticalAlign:'middle',textAlign:'center',display:'table-cell'}} onClick={()=>{
							if(props.picsAdd=='1'){
								return takepicture()
							}
							 if(props.picsAdd=='2'){
								return selectImage()
							}
						}}>
							<img  src={picAdd} style={{width:'30px',height:'30px',display:'inline-block',verticalAlign:'middle'}} />
						</div>	
					</div>	
				</div>:<div></div>
			}	
				<div style={{marginTop:'10px',width:'90%',height:'50px',marginLeft:'5%',borderTop:'1px solid #f6f6f6',borderBottom:'1px solid #f6f6f6',marginBottom:'15px'}}>
					<InputItem
			            clear
			            style={{fontSize:'14px',fontWeight:'300',color:"#333333",paddingTop:'5px'}}
			            placeholder="请输入标题"
			            onChange={(value)=>{

			            	Model.change('sendpostModel','body.title',value)

			            }}
			          >
			        </InputItem>
				</div>
				<div style={{width:'90%',marginLeft:'5%',borderBottom:'1px solid #f6f6f6',marginTop:'10px'}}>
			           <TextareaItem
			            rows={5}
			            style={{fontSize:'14px',fontWeight:'300',color:'#333333',marginTop:'-12px'}}
			            placeholder="请输入内容"
			            onChange={(value)=>{
			            	Model.change('sendpostModel','body.content',value)
			            }}
			          />
				</div>
				<div style={{width:'90%',marginLeft:'5%',marginBottom:'10px'}}>
					<SelectSector {...props} />
				</div>
				
			</div>
		)
		 
}
export default Model.connect(['sectors','AddModals','sendpostModel','HomePageModel'])(SendPost)



