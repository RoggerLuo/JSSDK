import React from 'react'
import { Model } from 'dvax'
import logo from '../subject/sectors/11.jpg'
// import pic from './2.jpg'
import Searchcheckpost from './searchPost.js'
// import './homePage.css'
import config from 'shared/config'
import homehuifu from './huifu.png'
import homezan from './zan.png'
import PostComponent from '../homePage/postComponent.js'
import moment from 'moment'

Model.create({
    namespace:'searchCheckPostModel',
    state:{
    	searchList:[],
    	lists:[],
    	query:{
    		searchValue:'',
    		subjectId:''
    	},
    	values:''
    	
    },
    effects:{
    	*SearchHistory({change,fetch,get}){
    		const res=yield fetch(`search`)
    		yield change('searchList',res)
    	},
    	*getSearch({change,fetch,get}){
    		const query={
    			...get().query
    		}
    		const content = query.searchValue
    		const subjectId=query.subjectId
    		const res = yield fetch(`search?subjectId=${subjectId}`,{method:'post',body:{text:content}})
    		yield change('lists',res.data)

    	},
    }
})


class SearchCheckPost extends React.Component{
	componentDidMount() {
		Model.change('searchCheckPostModel','query.searchValue','')
		Model.change('searchCheckPostModel','lists',[])
		Model.dispatch({type:'searchCheckPostModel/SearchHistory'})
		//

	}
	render(){
		
		const searchList=this.props.lists
		console.log('props',this.props)
		const props=this.props
		  return (
			<div style={{background:'#ffffff',width:'100%',paddingBottom:"75px"}}>
				<div className={{width:'100%'}}>
					<Searchcheckpost {...props} />
				</div>
				{
					searchList.length=='0'?
					<div style={{color:'#cccccc',width:'90%',height:'auto',borderBottom:'1px solid #f1f0f2',display:'flex',marginTop:'10px',marginLeft:'5%',flexWrap: 'wrap'}}>
						{
							this.props.searchList.map((objs,ind)=>{
								return <div key={ind} style={{marginLeft:'20px',marginBottom:'10px'}} onClick={()=>{
									Model.change('searchCheckPostModel','query.searchValue',objs.text)
									Model.dispatch({type:'searchCheckPostModel/getSearch'})
								}}>
									{objs.text}
								</div>
							})
						}
					</div>:<div></div>
				}
				{
			 		searchList.map((obj,index)=>{
			 			obj.createTime=moment(obj.createTime).format("YYYY-MM-DD HH:mm:ss")
			 			return(
							<div className='post' key={index} style={{height:'auto',marginBottom:"10px"}} >
								<div className='title' style={{width:'90%',marginLeft:'5%',height:'60px'}}>
									<div className='pic' style={{marginLeft:'0px',width:'46px',height:'46px'}}>
										<img src={`${config.api}/medias/${obj.authorInfo.avatar}`} className='logo picLogo' />
									</div>
									<div className='tip' style={{width:'auto'}}>
										<div className='Name' style={{marginTop:'0px'}}>{obj.authorInfo.nickname}</div>
										{
											this.props.sectorList.map((sect,index)=>{
												if(sect._id==this.props.query.subjectId){
													return 	<div key={index} style={{marginTop:'9px',display:'flex'}}>
																<div className='Time'>{sect.name}</div>
																<div className='Time' style={{marginLeft:'24px'}}>{obj.createTime}</div>
															</div>
												}
											})
										}
										
									</div>
								</div>
								<div className="con" style={{height:"auto",width:'90%',marginLeft:'5%'}} onClick={()=>{
									Model.change('PostsDetailsModel','query.detailsId',obj._id)
									window.mainView.router.load({
												    url: 'postDetails.html',
												    query: {
												    	// index,
												    	
												    }
												  })
										}}><div className='titlename' style={{marginLeft:'50px',paddingLeft:'11px'}}>{obj.title}</div>
								</div>
								{
				 					obj.images.map((med,ind)=>{
										 if(med.length==='0')
										 	return <div key={ind}></div>
										else if(med.length!='0'){
											if(ind==0){
												return 	<div key={ind} className='conPic' style={{overflow:'hidden',width:'90%',marginLeft:'5%'}}>
															<div key={ind} className='logo' style={{height:'auto',marginLeft:'50px',paddingLeft:'11px'}} onClick={()=>{
																Model.change('PostsDetailsModel','query.detailsId',obj._id)
																window.mainView.router.load({
																    url: 'postDetails.html',
																    query: {
																    	// index,
																    	
																    }
																  })
																	}} >
																<img  src={`${config.api}/medias/${med}`} style={{width:'100%',height:'100%'}} />
															</div>
														</div>
											}
											else return <div key={ind}></div>
										}	
									})
				 				}
								
								<div className='dtos' style={{width:'90%',marginLeft:'5%',borderBottom:'0px solid'}}>
									<div style={{marginLeft:'50px',paddingLeft:'11px',width:'100%'}} className='boxs'>
						 				<div className='detailsPostSpan box' style={{width:'auto'}}>
						 					{
													obj.topStatus==false?
						 							<span className='re' style={{float:'left',marginTop:'5px'}} onClick={()=>{
														Model.change('PostsManage','query.postId',obj._id)
														Model.dispatch({type:'PostsManage/setTop'})
													}}>
						 							设为置顶</span>:<span className='re' style={{float:'left',marginTop:'5px',color:'#ffd100'}} onClick={()=>{
														Model.change('PostsManage','query.postId',obj._id)
														Model.dispatch({type:'PostsManage/deleteTop'})
													}}>已置顶</span> 
											}
						 				</div>
						 				<div className='detailsPostSpan box' style={{width:'auto'}} >
						 					{
						 						obj.recommendStatus==false?
						 						<div style={{float:'right'}} onClick={()=>{
												Model.change('PostsManage','query.postId',obj._id)
												Model.dispatch({type:'PostsManage/setExcellent'})
												}}>
								 					<span className='re' style={{float:'left',marginTop:'5px'}} >
								 						设为精华
								 					</span>
						 						</div>:
						 						<div style={{float:'right'}} onClick={()=>{
												Model.change('PostsManage','query.postId',obj._id)
												Model.dispatch({type:'PostsManage/deleteExcellent'})
												}}>
								 					<span className='re' style={{float:'left',marginTop:'5px',color:'#ffd100'}}>
								 						已为精华
								 					</span>
						 						</div>
						 					}
						 				</div>
						 				<div className='detailsPostSpan box' style={{marginLeft:'10%',width:'auto'}}>
						 				
						 				<div style={{float:'right'}}>
						 					<span className='re' style={{float:'right',marginTop:'5px'}} onClick={()=>{
												Model.change('PostsManage','query.postId',obj._id)
												Model.dispatch({type:'PostsManage/deletePosts'})
											}}>删除
						 					</span>
						 				</div>
						 				
						 				</div>
									</div>
			 					</div>
			 					<div style={{width:'100%',height:'1px',background:'#eeeeee'}}></div>
							</div>
						)
				})
				}
			</div>

		)
		}
}

 export default Model.connect(['searchCheckPostModel','sectors'])(SearchCheckPost) 
				