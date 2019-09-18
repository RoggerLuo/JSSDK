import React from 'react'
import { Model } from 'dvax'
import logo from '../subject/sectors/11.jpg'
import PostComponent from '../homePage/postComponent.js'
import CreateSector from '../components/createSector'
import config from 'shared/config'
import './message.css'
import toast from 'dvax/toast'
import moment from 'moment'
import {getTimes} from '../homePage/homePage.js'
import { ListView,PullToRefresh ,Button} from 'antd-mobile';
Model.create({
	namespace:'messageModel',
	state:{
		lists:[],
		messageDate:[],
		messagelists:[],
		query:{
			messageId:''
		},
		messNumbers:'',
		readstatus:'',
		pagination:{
            startIndex:0,
            pageSize:10,
        }
	},
	effects:{
		*getMessage({change,fetch,get,put}){
			const res =yield fetch(`message`)
			if(!res) return
			yield change('messagelists',res.data)
			
		},
		*getNotread({change,fetch,get}){
			const res = yield fetch(`message/unread-count`)
			if(!res) return
			yield change('messNumbers',res)

		},
		*makeRead({change,fetch,get,put}){
			const query={
				...get().query
			}
			const messageId=query.messageId
			const res = yield fetch(`message/mark-read/${messageId}`)
			//yield put({type:'getMessage'})
			yield put({type:'getNotread'})
		},
		*makeReadAll({change,fetch,get,put}){
			const res =yield fetch(`message/mark-read-all`)
			if(!res) return
			 // yield put({type:'getNotread'})
			
			yield put({type:'getNotread'})
		}
	}
})
class Message extends React.Component{
	constructor(props) {
	    super(props);
	    const dataSource = new ListView.DataSource({  //这个dataSource有cloneWithRows方法
	      rowHasChanged: (row1, row2) => row1 !== row2,
	    });

	    this.pageNo = 0 //定义分页信息
	    this.state = {
	      dataSource,
	      refreshing: true,
	      isLoading: true,
	      hasMore: true
	    };
  	}

	componentDidMount() {
		//Model.dispatch({type:'messageModel/getMessage'})
		//Model.dispatch({type:'HomePageModel/gethomePage'})
		Model.dispatch({type:'messageModel/getNotread'})
		//Model.dispatch({type:'HomePageModel/gethomePage'})

		const self = this
	    Model.run('messageModel',function*({fetch,reduce,change}){
          	const res = yield fetch(`message?startIndex=0&pageSize=10`)
            	const posts = res.data            	
            	yield change('pagination.startIndex',posts.length)
            	yield change('messageDate',posts)
            	self.setState({
			      dataSource: self.state.dataSource.cloneWithRows(posts),
			      refreshing: false,
			      isLoading: false,
			    });
        })
	}
	onEndReached = async (event) => {
		
        const rData=this.props.messageDate
        const len=rData.length
	    if (this.state.isLoading && !this.state.hasMore) {
	      return;
	    }   //如果this.state.hasMore为false，说明没数据了，直接返回
	    this.setState({ isLoading: true });
	    const self=this
		    Model.run('messageModel',function*({fetch,reduce,change,get}){
		    	const query={
	                ...get().pagination
	            }
	            const startIndex=len
	            const pageSize=query.pageSize
	          	const res = yield fetch(`message?startIndex=${startIndex}&pageSize=10`)
                const posts = res.data
                self.rData = [...rData,...posts]
                yield change('messageDate',self.rData)
	            	//console.log('...this.rData',self.rData)
	            	self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(self.rData),
                    isLoading: false,
			    });
	        })
        }
    
	render(){
		const props=this.props.lists
		const row = (rowData, sectionID, rowID) => {
		//rowData.createTime=moment(rowData.createTime).format("YYYY-MM-DD HH:mm:ss")
		return(
	 		<div key={rowID} style={{marginTop:'10px'}}>
	 			{
					rowData.type=='comment'?
	 					<div  style={{marginBottom:'10px'}}>
							<div  className='sectors' style={{height:'80px',borderBottom:'0px solid'}}>
								<div style={{width:'100%',height:'100%'}}>
									<div style={{float:"left"}}>
										<div style={{display:'flex'}}>
											<div className='messavatar'>
												<img className='logos messagelogo' src={`${config.api}/medias/${rowData.senderInfo.avatar}`}/>
											</div>
											<div className='sectorCon' style={{width:'auto'}} >
												<div className='sectorname' style={{display:'flex'}}>
													<div className="textrules messcon" style={{width:'auto'}}>{rowData.senderInfo.nickname}</div>
												</div>
												{
													rowData.commentInfo!=null?
													<div className='sectorpopular textrules readcon' style={{width:'100px'}} onClick={()=>{
															Model.change('PostsDetailsModel','query.detailsId',rowData.postId)
															Model.change('messageModel','query.messageId',rowData._id)
															Model.change('PostsDetailsModel','administer','')
															Model.dispatch({type:'messageModel/makeRead'})
															const self = this
														    Model.run('messageModel',function*({fetch,reduce,change}){
													          	const res = yield fetch(`message?startIndex=0&pageSize=10`)
													            	const posts = res.data            	
													            	yield change('pagination.startIndex',posts.length)
													            	yield change('messageDate',posts)
													            	self.setState({
																      dataSource: self.state.dataSource.cloneWithRows(posts),
																      refreshing: false,
																      isLoading: false,
																    });
													        })
															window.mainView.router.load({
															    url: 'postDetails.html',
															    query: {
															    	
															    }
															  })
															
															//Model.dispatch({type:'messageModel/getNotread'})
														}}>留言:{rowData.commentInfo.content}
												</div>:<div className='readcon'>该留言不存在</div>
												}
											</div>
										</div>
										{
											rowData.read==true?
											<div  style={{display:'flex',marginTop:'6px'}}>
												<div className='isread readtag'  >已读</div>
												<div className='readtag' style={{marginLeft:'11px',padding:'2px',fontSize:'12px'}}>{getTimes(rowData.createTime)}</div>
												
											</div>:
											<div className='noread' style={{display:'flex',marginTop:'6px'}}>
												<div className='unread' >未读</div>
												<div className='readtag' style={{marginLeft:'11px',padding:'2px',fontSize:'12px'}}>{getTimes(rowData.createTime)}</div>
												
											</div>	
										}
										{
											/*this.props.posts.map((post,ind)=>{
												if(post._id==rowData.postId)
											return <div style={{marginTop:"6px"}} key={ind}>
														<div style={{whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}} className='readcon' onClick={()=>{
															Model.change('PostsDetailsModel','query.detailsId',rowData.postId)
															Model.change('messageModel','query.messageId',rowData._id)
															Model.change('PostsDetailsModel','administer','')
															Model.dispatch({type:'messageModel/makeRead'})
															window.mainView.router.load({
															    url: 'postDetails.html',
															    query: {
															    	
															    }
															  })
															
															//Model.dispatch({type:'messageModel/getNotread'})
														}}>原帖为:{post.title}</div>
													</div>
											})*/
										}
										</div>
										{
						 					rowData.postInfo&&rowData.postInfo.images.map((med,ind)=>{
												 if(med.length==='0')
												 	return <div key={ind} style={{float:"right"}}></div>
												else if(med.length!='0'){
													if(ind==0){
														return 	<div key={ind} style={{float:"right",width:'60px',height:'60px'}} >
																	<div style={{width:'100%',height:'100%'}} >
																		<img style={{width:'100%',height:'100%',borderRadius:'10px'}}  src={`${config.api}/medias/${med}`}  />
																	</div>
																</div>
													}
													else return <div style={{float:'right'}} key={ind}></div>
												}	
											})||null
						 				}	
										</div>
										
									</div>
									<div style={{width:'100%',height:'1px',background:'#eeeeee',marginTop:'2px'}}  ></div>
								</div>:<div></div>
			 				//})
			 			}
			 			{
		 					rowData.type=='reply'?
		 					 <div  style={{marginBottom:'10px'}}>
								<div  className='sectors' style={{height:'80px',borderBottom:'0px solid'}} >
									<div style={{width:'100%',height:'100%'}}>
										<div style={{float:"left"}}>
											<div style={{display:'flex'}}>
												<div className='messavatar'>
													<img className='logos messagelogo' src={`${config.api}/medias/${rowData.senderInfo.avatar}`}/>
												</div>
												<div className='sectorCon' style={{width:'auto'}} >
													<div className='sectorname' style={{width:'auto'}}>
														<div className="textrules messcon">{rowData.senderInfo.nickname}</div>											
													</div>
													{
														rowData.commentInfo!=null?
														<div className='sectorpopular textrules readcon' style={{marginBottom:"5px",width:"100px"}} onClick={()=>{
															Model.change('PostsDetailsModel','query.detailsId',rowData.postId)
															Model.change('messageModel','query.messageId',rowData._id)
															Model.change('PostsDetailsModel','administer','')
															Model.dispatch({type:'messageModel/makeRead'})
															const self = this
														    Model.run('messageModel',function*({fetch,reduce,change}){
													          	const res = yield fetch(`message?startIndex=0&pageSize=10`)
													            	const posts = res.data            	
													            	yield change('pagination.startIndex',posts.length)
													            	yield change('messageDate',posts)
													            	self.setState({
																      dataSource: self.state.dataSource.cloneWithRows(posts),
																      refreshing: false,
																      isLoading: false,
																    });
													        })
															window.mainView.router.load({
															    url: 'postDetails.html',
															    query: {
															    	
															    }
															  })
															
															//Model.dispatch({type:'messageModel/getNotread'})
														}}>回复留言:{rowData.commentInfo.content}
														</div>:<div className='readcon' style={{marginBottom:"5px",width:'auto'}}>该回复不存在</div>
													}
												</div>
												</div>
												{
													rowData.read==true?
													<div  style={{display:'flex',marginTop:'6px'}}>
														<div className='isread readtag'  >已读</div>
														<div className='readtag' style={{marginLeft:'11px',padding:'2px',fontSize:'12px'}}>{getTimes(rowData.createTime)}</div>	
													</div>:
													<div className='noread' style={{display:'flex',marginTop:'6px'}}>
														<div className='unread' >未读</div>
														<div className='readtag' style={{marginLeft:'11px',padding:'2px',fontSize:'12px'}}>{getTimes(rowData.createTime)}</div>
													</div>
												}
											</div>
											{/*
												this.props.posts.map((post,ind)=>{
													if(post._id==rowData.postId)
												return <div style={{marginTop:"6px"}} key={ind}>
															<div style={{whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}} className='readcon' onClick={()=>{
																Model.change('PostsDetailsModel','query.detailsId',rowData.postId)
																Model.change('messageModel','query.messageId',rowData._id)
																Model.change('PostsDetailsModel','administer','')
																Model.dispatch({type:'messageModel/makeRead'})
																window.mainView.router.load({
																    url: 'postDetails.html',
																    query: {
																    	
																    }
																  })
																
																//Model.dispatch({type:'messageModel/getNotread'})
															}}>原帖为:{post.title}</div>
														</div>
												})*/
											}
											{
							 					rowData.postInfo&&rowData.postInfo.images.map((med,ind)=>{
													if(med.length==='0')
													 	return <div style={{float:'right'}} key={ind}></div>
													else if(med.length!='0'){
														if(ind==0){
															return 	<div key={ind} style={{float:'right',width:'60px',height:'60px'}}  >
																<div style={{width:'100%',height:'100%'}} >
																	<img style={{width:'100%',height:"100%",borderRadius:"10px"}}  src={`${config.api}/medias/${med}`}  />
																</div>
															</div>
															}
															else return <div style={{float:'right'}} key={ind}></div>
														}	
													})||null
							 				}
											</div>
										</div>
										<div style={{width:'100%',height:'1px',background:'#eeeeee',marginTop:'2px'}}  ></div>
									</div>:<div></div>		 
						}
			 			{
		 					rowData.type=='thumb'?
	 							<div  style={{marginBottom:'10px'}}>
					 				<div  className='sectors' style={{height:'80px',borderBottom:'0px solid'}} onClick={()=>{
										Model.change('PostsDetailsModel','query.detailsId',rowData.postId)
										Model.change('messageModel','query.messageId',rowData._id)
										Model.change('PostsDetailsModel','administer','')
										Model.dispatch({type:'messageModel/makeRead'})
										const self = this
									    Model.run('messageModel',function*({fetch,reduce,change}){
								          	const res = yield fetch(`message?startIndex=0&pageSize=10`)
								            	const posts = res.data            	
								            	yield change('pagination.startIndex',posts.length)
								            	yield change('messageDate',posts)
								            	self.setState({
											      dataSource: self.state.dataSource.cloneWithRows(posts),
											      refreshing: false,
											      isLoading: false,
											    });
								        })
										window.mainView.router.load({
										    url: 'postDetails.html',
										    query: {
										    	
										    }
										  })
										
										//Model.dispatch({type:'messageModel/getNotread'})
										}}>
									<div style={{float:"left"}}>
									<div style={{display:'flex'}}>
										<div className='messavatar'>
											<img className='logos messagelogo' src={`${config.api}/medias/${rowData.senderInfo.avatar}`}/>
										</div>
										<div className='sectorCon' style={{width:'auto'}} >
											<div className='sectorname' style={{display:'flex'}}>
												<div className="textrules messcon">{rowData.senderInfo.nickname}</div>
												
											</div>
											{

												rowData.postInfo===null?<div className='readcon'>该消息不存在</div>:
													<div  className='sectorpopular textrules readcon' style={{width:'100px'}}>
															<div style={{whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}}>
																赞了你的帖子:{rowData.postInfo.title}
															</div>
													</div>			
												
											}
										
										</div>
										</div>
										<div style={{marginTop:"6px"}} >
													<div style={{whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden',color:'#666666'}}>
														{
															rowData.read==true?
															<div  style={{display:'flex',marginTop:'6px'}}>
																<div className='isread readtag'  >已读</div>
																<div className='readtag' style={{marginLeft:'11px',padding:'2px',fontSize:'12px'}}>{getTimes(rowData.createTime)}</div>	
															</div>:
															<div className='noread' style={{display:'flex',marginTop:'6px'}}>
																<div className='unread' >未读</div>
																<div className='readtag' style={{marginLeft:'11px',padding:'2px',fontSize:'12px'}}>{getTimes(rowData.createTime)}</div>
															</div>
														}
													</div>
										</div>
										</div>
										{
							 					rowData.postInfo&&rowData.postInfo.images.map((med,ind)=>{
													if(med.length==='0')
													 	return <div key={ind} style={{float:'right'}}></div>
													else if(med.length!='0'){
														if(ind==0){
															return 	<div key={ind} style={{float:'right',width:'60px',height:'60px'}}  >
																<div style={{width:'100%',height:'100%'}} >
																	<img style={{width:'100%',height:"100%",borderRadius:"10px"}}  src={`${config.api}/medias/${med}`}  />
																</div>
															</div>
															}
															else return <div key={ind} style={{float:'right'}}></div>
														}	
													}) ||null
								 				}

								</div>
								<div style={{width:'100%',height:'1px',background:'#eeeeee',marginTop:'2px'}}  ></div>
							</div>:<div></div>
				 			
			 			}
			 			{
			 				
		 					rowData.type=='auditFail'?
		 						 <div  style={{marginBottom:'10px'}}>
			 						<div className='sectors' style={{height:'100px',borderBottom:'0px solid'}} >
					 					
					 					<div>
											<div className='sectorCon' style={{width:'auto',marginLeft:'0px'}}  >
											<div  style={{display:'flex'}}>
					 								<div className="textrules messcon" >系统消息</div>
					 								
												</div>
				 							<div className='sectorpopular textrules readcon' style={{width:'100px'}} onClick={()=>{
													// Model.change('messageModel','query.messageId',rowData._id)
													// Model.dispatch({type:'messageModel/makeRead'})
													// toast('帖子未通过审核',1000,'ok')
													// Model.dispatch({type:'messageModel/getNotread'})
													Model.change('PostsDetailsModel','query.detailsId',rowData.postId)
													Model.change('messageModel','query.messageId',rowData._id)
													Model.change('PostsDetailsModel','administer','')
													Model.dispatch({type:'messageModel/makeRead'})
													const self = this
												    Model.run('messageModel',function*({fetch,reduce,change}){
											          	const res = yield fetch(`message?startIndex=0&pageSize=10`)
											            	const posts = res.data            	
											            	yield change('pagination.startIndex',posts.length)
											            	yield change('messageDate',posts)
											            	self.setState({
														      dataSource: self.state.dataSource.cloneWithRows(posts),
														      refreshing: false,
														      isLoading: false,
														    });
											        })
													window.mainView.router.load({
													    url: 'postDetails.html',
													    query: {
													    	
													    }
													  })
													
													//Model.dispatch({type:'messageModel/getNotread'})
												}}>您所发布的帖子:{rowData.postTitle}</div>
											</div>
										</div>
										 <div style={{marginTop:"6px"}}>
											<div style={{whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}} className='readcon' >
												未通过审核
											</div>
											</div>
										{
											rowData.read==true?
												<div style={{display:'flex',marginTop:'6px'}}>
													<div className='isread readtag'  >已读</div>
													<div className='readtag' style={{marginLeft:'11px',padding:'2px',fontSize:'12px'}}>{getTimes(rowData.createTime)}</div>	
												</div>:
												<div className='noread' style={{display:'flex',marginTop:'6px'}}>
													<div className='unread' >未读</div>
													<div className='readtag' style={{marginLeft:'11px',padding:'2px',fontSize:'12px'}}>{getTimes(rowData.createTime)}</div>
												</div>
										}
										
									</div>

									<div style={{width:'100%',height:'1px',background:'#eeeeee',marginTop:'2px'}}  ></div>
									</div>:<div></div>
			 			}
				       	{
			 				
		 					rowData.type=='auditPass'?
		 						 <div  style={{marginBottom:'10px'}}>
			 						<div className='sectors' style={{height:'100px',borderBottom:'0px solid'}} >
			 						<div style={{float:"left"}}>
					 					<div>
											<div className='sectorCon' style={{width:'auto',marginLeft:'0px'}}  >
												<div >
						 							<div className="textrules messcon" >系统消息</div>	
												</div>
				 								<div className='sectorpopular textrules readcon' style={{width:"100px"}} onClick={()=>{
													// Model.change('messageModel','query.messageId',rowData._id)
													// Model.dispatch({type:'messageModel/makeRead'})
													// toast('帖子未通过审核',1000,'ok')
													// Model.dispatch({type:'messageModel/getNotread'})
													Model.change('PostsDetailsModel','query.detailsId',rowData.postId)
													Model.change('messageModel','query.messageId',rowData._id)
													Model.change('PostsDetailsModel','administer','')
													Model.dispatch({type:'messageModel/makeRead'})
													const self = this
												    Model.run('messageModel',function*({fetch,reduce,change}){
											          	const res = yield fetch(`message?startIndex=0&pageSize=10`)
											            	const posts = res.data            	
											            	yield change('pagination.startIndex',posts.length)
											            	yield change('messageDate',posts)
											            	self.setState({
														      dataSource: self.state.dataSource.cloneWithRows(posts),
														      refreshing: false,
														      isLoading: false,
														    });
											        })
													window.mainView.router.load({
													    url: 'postDetails.html',
													    query: {
													    	
													    }
													  })
													// Model.dispatch({type:'messageModel/makeRead'})
													// Model.dispatch({type:'messageModel/getNotread'})
												}}>您所发布的帖子:{rowData.postInfo.title}
												</div>
											</div>
										</div>
										<div style={{marginTop:"6px"}}>
											<div style={{whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}} className='readcon' >
												已通过审核
											</div>
										</div>
										{
											rowData.read==true?
												<div  style={{display:'flex',marginTop:'6px'}}>
													<div className='isread readtag'  >已读</div>
													<div className='readtag' style={{marginLeft:'11px',padding:'2px',fontSize:'12px'}}>{getTimes(rowData.createTime)}</div>	
												</div>:
												<div className='noread' style={{display:'flex',marginTop:'6px'}}>
													<div className='unread'  >未读</div>
													<div className='readtag' style={{marginLeft:'11px',padding:'2px',fontSize:'12px'}}>{getTimes(rowData.createTime)}</div>
												</div>
										}
										</div>
										{
						 					rowData.postInfo && rowData.postInfo.images.map((med,ind)=>{
												if(med.length==='0')
												 	return <div style={{float:'right'}} key={ind}></div>
												else if(med.length!='0'){
													if(ind==0){
														return 	<div key={ind} style={{float:'right',width:'60px',height:'60px'}}  >
															<div style={{width:'100%',height:'100%'}}>
																<img style={{width:'100%',height:"100%",borderRadius:"10px"}}  src={`${config.api}/medias/${med}`}  />
															</div>
														</div>
														}
														else return <div style={{float:'right'}} key={ind}></div>
													}	
												}) || null
							 				}

									</div>
									<div style={{width:'100%',height:'1px',background:'#eeeeee',marginTop:'2px'}}  ></div>
									</div>:<div></div>
			 			}
			        </div>
			      //) 
			  
			)	
		}
		return (
			<div style={{background:'#ffffff',width:'100%',paddingBottom:"75px",overflow:'hidden',paddingTop:'10px'}} className="page-content infinite-scroll">
				<div  style={{marginBottom:'10px',width:'auto',marginLeft:"5%"}} onClick={()=>{
					Model.dispatch({type:'messageModel/makeReadAll'})
					Model.change('messageModel','messNumbers','0') 
					const self = this
				    Model.run('messageModel',function*({fetch,reduce,change,put}){
			          	const res = yield fetch(`message?startIndex=0&pageSize=10`)
			            	const posts = res.data            	   
			            	yield change('pagination.startIndex',posts.length)
			            	yield change('messageDate',posts)
			            	self.setState({
						      dataSource: self.state.dataSource.cloneWithRows(posts),
						      refreshing: false,
						      isLoading: false,
						    });
						   
			        })

			       
				}}>
					<button style={{padding:'7px',color:'#ffffff',backgroundColor:'#ffe100',border:'0px solid',borderRadius:'10px',fontSize:"14px"}}>
						全部标记为已读
					</button>
				</div>
				<ListView
					style={{borderTop:'1px solid #eeeeee'}}
		          	ref={el => this.lv = el}
		          	dataSource={this.state.dataSource}
		          	renderFooter={    //renderFooter就是下拉时候的loading效果
		            () => (
		                  	<div style={{ padding: 30, textAlign: 'center' }}>
		                    {this.state.isLoading ? 'Loading...' : '没有更多'}
		                  	</div>
		                )
		          	}
		          	renderRow={row}
		          	pullToRefresh={<PullToRefresh
		            refreshing={this.state.refreshing}
		          	/>}
		          	onEndReached={this.onEndReached}
		          	pageSize={10}    //每次下拉之后显示的数据条数
		        />
			</div>
		)
		}
}
export default Model.connect(['messageModel','PostsDetailsModel','postListModel','HomePageModel'])(Message)
