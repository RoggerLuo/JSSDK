import React from 'react'
import { Model } from 'dvax'
import logos from '../subject/sectors/3.jpg'
// import './sector.css'
import {Switch} from 'antd-mobile'
import '../subject/sectors/index.css'
import {Button} from 'antd-mobile'
import config from 'shared/config'
function CreateSector(props){
	
const subjectInfo=props.subjectInfos.subjectInfo
	return(
			<div style={{width:'100%',marginTop:"20px"}}>
			<div className='sectors' style={{borderBottom:'0px solid',height:'75px',display:'flex'}}>
				<div className='sectorwrap' style={{paddingTop:'0px',height:'100%',width:'100%',marginLeft:'0px'}}>
					<div className='logopic' style={{width:'60px',height:'60px'}}>
						<img className='logos' style={{borderRadius:'10px'}} src={`${config.api}/medias/${subjectInfo.image}`}/>
					</div>
					<div style={{marginLeft:'10px'}}>
						<div style={{width:'auto',height:'30px',display:'flex'}} >
							<div className='subjectname' >{subjectInfo.name}</div>
							
						
						</div>
						<div style={{display:'flex',marginTop:'11px'}} >
							<div className='subjectpopular'>人气值：{subjectInfo.popularity}</div>
							<div className='subjectpopular' style={{marginLeft:'50px'}}>帖子：{subjectInfo.postCount}</div>
						</div>
					</div>
				</div>
				<div  >
					<button className='button subjectname' style={{color:'#333333',border:"1px solid #333333",fontFamily:'PingFangSC'}} onClick={()=>{
						if(subjectInfo.followedStatus==false){
							Model.dispatch({type:'postListModel/makeFollow'})
							Model.dispatch({type:'postListModel/getpostList'})
						}
						else Model.dispatch({type:'postListModel/cancelFollow'})
							Model.dispatch({type:'postListModel/getpostList'})
						
					}} >
					{
						subjectInfo.followedStatus==true?<div>已关注</div>:<div>关注</div>
					}
					
					</button>
				</div>
			</div>
			<div style={{width:'100%',height:'1px',background:'#eeeeee',marginTop:'5px'}}  ></div>
			</div>
		);
}

export default CreateSector




{/*<Button 
								className='button'
								style={{marginBottom:'auto',fontSize:'13px'}}>
								{props.attention}
							</Button>
							<Button 
								className='button' 
								style={{marginBottom:'auto',fontSize:'13px'}}>
								{props.check}
							</Button>*/}