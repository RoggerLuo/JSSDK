import React from 'react'
import { Model } from 'dvax'
import logo from '../subject/sectors/11.jpg'
import pic from '../post/2.jpg'
import huifu from './huifu.png'
import zan from './zan.png'
import zanAfter from './zanAfter.png'
import cai from './cai.png'
import './postdetails.css'
import config from 'shared/config'
import TabComment from '../components/tabsModal.js'
import Footer from './commentFooter'
import moment from 'moment'
import collect from './collect.png'
import collectAfter from './collectAfter.png'
import {getTimes} from '../homePage/homePage.js'
import { ListView,PullToRefresh ,Button} from 'antd-mobile';


class PostDetails extends React.Component{
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
		Model.dispatch({type:'PostsDetailsModel/getPostsDetails',callback(detail){
			const dom = document.getElementsByClassName('post-detail-title') 
			detail.title
			
			dom[0].innerText =detail.title

		}})
		// Model.change()
		Model.dispatch({type:'sectors/getSector'})
		Model.dispatch({type:'postListModel/getpostList'})
		//Model.dispatch({type:'PostsDetailsModel/getComment'})
		const self = this
		if(this.props.tabs=='0'){
	    Model.run('PostsDetailsModel',function*({fetch,reduce,change,get}){
	    	 const query = {
                ...get().query
            }
            const postId=query.detailsId
            const res =yield fetch(`comment/${postId}?startIndex=0&pageSize=10`)
            const posts = res
            if(!res) return
            yield change('commentList',res)
            	self.setState({
			      dataSource: self.state.dataSource.cloneWithRows(posts),
			      refreshing: false,
			      isLoading: false,
			    });
        })
        }
        if(this.props.tabs=='1'){
        	Model.run('PostsDetailsModel',function*({fetch,reduce,change,get}){
	    	 const query = {
                ...get().query
            }
            const postId=query.detailsId
            const userId=query.hostUserid
            const res=yield fetch (`comment/${postId}?userId=${userId}&startIndex=0&pageSize=10`)
            const posts = res
            if(!res) return
            yield change('commentList',res)
            	self.setState({
			      dataSource: self.state.dataSource.cloneWithRows(posts),
			      refreshing: false,
			      isLoading: false,
			    });
        })
        }
		
	}
resetState=()=>{
	const posts = Model.get('PostsDetailsModel').commentList
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(posts),
	        refreshing: false,
	        isLoading: false,
	    });
}
onEndReached =async (event) => {
		const commentList=this.props.commentList
		const len=commentList.length
	    if (this.state.isLoading && !this.state.hasMore) {
	      return;
	    }   //如果this.state.hasMore为false，说明没数据了，直接返回
	    console.log('reach end', event);
	    this.setState({ isLoading: true });
	   // debugger
	    const self=this	 
	    if(this.props.tabs=='0'){ 
		     Model.run('PostsDetailsModel',function*({fetch,reduce,change,get}){
	    	 const query = {
                ...get().query
            }
            const postId=query.detailsId
            const startIndex=len
            //debugger
            const res =yield fetch(`comment/${postId}?startIndex=${startIndex}&pageSize=10`)
	            	const posts = res
	            	self.commentList = [...commentList,...posts]

	            	yield change('commentList',self.commentList)
	            	self.setState({
			      	dataSource: self.state.dataSource.cloneWithRows(self.commentList),
			      	isLoading: false,
			    });
	        })
	     } 
		     if(this.props.tabs=='1'){
	     	 	Model.run('PostsDetailsModel',function*({fetch,reduce,change,get}){
	    	 	const query = {
	                ...get().query
	            }
	            const postId=query.detailsId
	            const userId=query.hostUserid
	             const startIndex=len
	            const res=yield fetch (`comment/${postId}?userId=${userId}&startIndex=${startIndex}&pageSize=10`)
            	const posts = res
            	self.commentList = [...commentList,...posts]
            	yield change('commentList',self.commentList)
	            	self.setState({
			      	dataSource: self.state.dataSource.cloneWithRows(self.commentList),
			      	isLoading: false,
		    		});
		        })
		     }
       
	  };


previewImage(mediaIds,position) {
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

	render(){
		const Details=this.props.detailsList
		const sector=this.props.sectorList
		const row = (rowData, sectionID, rowID) =>{
		
		 return(
				<div key={rowID}>
					<div style={{width:'100%'}}>
					<div  className="detailsfooter" style={{width:'90%',marginLeft:'5%',marginTop:'10px'}}>
						<div className='detailsUser' style={{height:'40px'}}>
						<div style={{display:'flex',float:'left'}}>
							<div className='userpic' style={{width:'32px',height:'32px'}}>
								<img src={`${config.api}/medias/${rowData.authorInfo.avatar}`} className='detailsLogo' />
							</div>
							<div className='detailsUsername' style={{width:'auto'}}>
								<div className="HostName" style={{color:"#333333"}} >{rowData.authorInfo.nickname}</div>
								<div className='HostTime' style={{display:'flex'}} >
									<div>第{++rowID}楼</div>
									<div style={{marginLeft:'24px'}}>{getTimes(rowData.createTime)}</div>
									
								</div>
							</div>
							</div>
							<div className='caizan' style={{height:'25px',width:'auto',float:'right'}} onClick={()=>{
								Model.change('PostsDetailsModel','query.replyId',rowData._id)
								if(rowData.thumbStatus==true){
									Model.dispatch({type:'PostsDetailsModel/cancalReplyThumb'})
								}
								else {
									
									Model.dispatch({type:'PostsDetailsModel/replyThumb'})
								}
							}}>
									{
										rowData.thumbStatus==true?<div className="tozan" style={{height:'100%',display:'flex',paddingTop:'auto',border:'none'}}>

										<div style={{width:'20px',height:'20px'}}>
											<img src={zanAfter} style={{width:'100%',height:'100%'}} />
										</div>
										<div style={{marginTop:'4px',color:'#ffd100',fontSize:'7px'}}>{rowData.thumbCount}</div>
										</div>:<div className="tozan" style={{height:'100%',display:'flex',paddingTop:'auto',border:'none'}}>

										<div style={{width:'20px',height:'20px'}}>
											<img src={zan} style={{width:'100%',height:'100%'}} />
										</div>
										<div style={{marginTop:'4px',fontSize:'12px'}}>{rowData.thumbCount}</div>
										</div>
									}
								
							</div>

						</div>
						<div style={{height:'auto',width:'100%'}} onClick={()=>{
							Model.change('CommentsModel','query.commentsId',rowData._id)
							Model.change('CommentsModel','query.postId',rowData.postId)
							if(this.props.administer==''){
							window.mainView.router.load({
								url: 'replyall.html',
								query:{
									// index,
								}				    
							})
							}
						}}>
							<div className='comments' style={{marginLeft:'17%',marginBottom:'10px'}}>
								<div className='Comments' style={{color:'#333333'}}>
									{rowData.content}
									&nbsp;&nbsp;
									{
										this.props.administer==true?
										<span style={{color:'#ff0000'}} onClick={()=>{
											Model.change('PostsDetailsModel','query.deleteReplyId',rowData._id)
											Model.dispatch({type:'PostsDetailsModel/deleteComment'})
											const self = this
										    Model.run('PostsDetailsModel',function*({fetch,reduce,change,get}){
										    	 const query = {
									                ...get().query
									            }
									            const postId=query.detailsId
									            const res =yield fetch(`comment/${postId}?startIndex=0&pageSize=10`)
									            const posts = res
									            if(!res) return
									            yield change('commentList',res)
									            	self.setState({
												      dataSource: self.state.dataSource.cloneWithRows(posts),
												      refreshing: false,
												      isLoading: false,
												    });
									        })
										}}>删除</span>:
										<div></div>
									}
									
								</div>
							</div>
							<div className='commentsRe' style={{marginLeft:'22%',fontSize:'14px',marginBottom:'10px'}}>
							{
								rowData.replies.map((reply,inds)=>{
									if(inds=='0'||inds=='1')
										return <div key={inds}>
											{
											reply.replyUserInfo==null?
											<div  className='Comments' style={{marginBottom:"10px"}}><span className='HostName' style={{color:'#333333'}}>{reply.authorInfo.nickname}:</span>
													{reply.content}
													{
														this.props.administer==true?
														<span style={{color:'#ff0000',marginLeft:'10px'}} onClick={()=>{
															Model.change('PostsDetailsModel','query.deleteReplyId',reply._id)
															Model.dispatch({type:'PostsDetailsModel/deleteComment'})
															const self = this
														    Model.run('PostsDetailsModel',function*({fetch,reduce,change,get}){
														    	 const query = {
													                ...get().query
													            }
													            const postId=query.detailsId
													            const res =yield fetch(`comment/${postId}?startIndex=0&pageSize=10`)
													            const posts = res
													            if(!res) return
													            yield change('commentList',res)
													            	self.setState({
																      dataSource: self.state.dataSource.cloneWithRows(posts),
																      refreshing: false,
																      isLoading: false,
																    });
													        })
														}}>删除</span>:
														<div></div>
													}
											</div>:
											<div className='Comments' style={{marginBottom:"10px"}}><span className='HostName' style={{color:'#333333'}}>{reply.authorInfo.nickname}回复{reply.replyUserInfo.nickname}:</span>
													{reply.content}
													{
														this.props.administer==true?
														<span style={{color:'#ff0000',marginLeft:'10px'}} onClick={()=>{
															Model.change('PostsDetailsModel','query.deleteReplyId',reply._id)
															Model.dispatch({type:'PostsDetailsModel/deleteComment'})
															const self = this
														    Model.run('PostsDetailsModel',function*({fetch,reduce,change,get}){
														    	 const query = {
													                ...get().query
													            }
													            const postId=query.detailsId
													            const res =yield fetch(`comment/${postId}?startIndex=0&pageSize=10`)
													            const posts = res
													            if(!res) return
													            yield change('commentList',res)
													            	self.setState({
																      dataSource: self.state.dataSource.cloneWithRows(posts),
																      refreshing: false,
																      isLoading: false,
																    });
													        })
														}}>删除</span>:
														<div></div>
													}
											</div>
										}
									</div>			
												
								})
							}
							</div>
							{
									rowData.replyNumber>'2'?
									<div className='commentsRe' style={{marginBottom:'10px',marginLeft:'22%'}}>
												<div className='HostTime' onClick={()=>{
													window.mainView.router.load({
																    url: 'replyall.html',
																    
																  })
												}}>
													查看全部{rowData.replyNumber}条评论
												</div>
											</div>:<div></div>
									
							}
							
						</div>
					</div>
					<div style={{width:'100%',height:'1px',background:'#eeeeee',marginTop:'0px'}}  ></div>
					</div>
		
				</div>
				)
		}
		return (
			<div style={{background:'#ffffff',width:'100%',overflow:'auto',paddingTop:'60px',overflow:'hidden'}} className="page-content infinite-scroll" >
				{/*<div className='detailsWrap'>				
					<div className='detailsUser' style={{height:'60px'}}> 
						<div style={{display:'flex'}}>
							<div className='detailsPic' style={{width:'46px',height:'46px'}}>
								<img src={`${config.api}/medias/${Details.authorInfo.avatar}`} className='detailsLogo' />
							</div>
							<div className='detailsUsername' style={{width:'auto'}}>
								<div className="Detailsname">{Details.authorInfo.nickname}</div>
								<div style={{display:'flex',marginTop:'9px'}}>
									{
										sector.map((objs,inde)=>{
											if(objs._id==Details.subjectId)
												return <div key={inde} className='DetailsTime' >{objs.name}</div>
										})
									}
									
									<div className='DetailsTime' style={{marginLeft:'24px'}} >{getTimes(Details.createTime)}</div>
								</div>
								
							</div>
						</div>
						<div className='DetailsRead' style={{float:'right',marginTop:"-44px"}}>
							{Details.readNumber}阅读
						</div>
					</div>
					<div className='DetailsCon' style={{marginBottom:'10px'}}>
						<span>{Details.content}</span>
					</div>		
						{
							Details.images.map((med,ind)=>{
								 if(med.length==='0')
								 	return <div key={ind}></div>
								else return <div key={ind} className='detailsConPic' style={{marginTop:'auto',height:'auto'}}>
												<img  src={`${config.api}/medias/${med}`} className='pics' onClick={()=>{this.previewImage([med],'0')}} />
											</div>	
							})
						}					
					<div>
						<div className='dtos' style={{width:'100%',marginLeft:'0px',borderBottom:'0px solid',height:'35px'}}>
							<div style={{width:'100%'}} className='boxs'>
				 				<div className='detailsPostSpan box' style={{width:'auto',fontSize:'12px'}}>
				 					<img src={huifu} style={{float:'left',width:'25px',height:'25px',paddingTop:'0px',marginLeft:'-5px'}} />
				 					<span style={{float:'left',height:'25px',lineHeight:'25px',color:'#333333'}}>回复{Details.replyNumber}
				 					</span>
				 				</div>
				 				<div className='detailsPostSpan box' style={{width:'auto',fontSize:'12px'}} onClick={()=>{
				 					Model.change('HomePageModel','query.postId',Details._id)
				 					if(Details.favoriteStatus==true){
				 						Model.dispatch({type:'HomePageModel/cancelCollect'})
				 					}
				 					else {
				 						Model.dispatch({type:'HomePageModel/Collect'})
				 					}
				 				}} >
				 					{
				 						Details.favoriteStatus==true?
				 						<div style={{float:'right'}}>
						 					<img src={collectAfter} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
						 					<span style={{float:'left',height:'25px',lineHeight:'25px',color:'#ffd100',marginRight:'20px'}} >
						 						收藏
						 					</span>
				 						</div>:
				 						<div style={{float:'right'}}>
						 					<img src={collect} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
						 					<span style={{float:'left',height:'25px',lineHeight:'25px',color:'#333333',marginRight:'20px'}}>
						 						收藏
						 					</span>
				 						</div>
				 					}
				 					
				 				</div>
				 				<div className='detailsPostSpan box' style={{marginLeft:'10%',width:'auto',fontSize:'12px'}} onClick={()=>{
					 					if(Details.thumbStatus==false){
				 						Model.change('HomePageModel','query.postId',Details._id)
				 						Model.dispatch({type:'HomePageModel/makeThumb'})
				 					}
				 					else
				 					{
				 						Model.change('HomePageModel','query.postId',Details._id)
				 						Model.dispatch({type:'HomePageModel/cancelThumb'})
				 					}
				 					Model.dispatch({type:'HomePageModel/gethomePage'})
				 				}}>
				 				
				 				{
				 					Details.thumbStatus==true?<div style={{float:'right',marginTop:"-1px"}}><img src={zanAfter} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}}  />
				 					<span style={{float:'right',height:'26px',lineHeight:'26px',color:'#ffd100'}}>
				 						赞{Details.thumbNumber}
				 					</span></div>:<div style={{float:'right',marginTop:"-1px"}}><img src={zan} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
				 					<span style={{float:'right',height:'26px',lineHeight:'26px',color:'#333333'}}>
				 						赞{Details.thumbNumber}
				 					</span></div>
				 				}
				 				</div>
							</div>
	 					</div>
					</div>	
				</div>
				<div style={{width:'100%',height:'1px',background:'#eeeeee'}}  ></div>
				<div className='detailsReply' style={{width:'90%',marginLeft:'5%',fontSize:'14px',textAlign:'center',height:'25px'}}>
					{
					this.props.tabs=='0'?<div className='detailsReplyAll' style={{color:'#333333',borderBottom:'3px solid #333333',width:'auto',fontFamily:'PingFangSC'}}>
					全部回复</div>:<div className='detailsReplyAll' style={{width:'auto',color:'#999999',fontFamily:'PingFangSC'}} onClick={()=>{
						Model.change('PostsDetailsModel','tabs','0')
						Model.dispatch({type:'PostsDetailsModel/getComment'})
					}}>全部回复</div>
					}
					{
					this.props.tabs=='1'?<div className='detailsReplyAll' style={{marginLeft:'40px',color:'#333333',borderBottom:'3px solid #333333',width:'auto',fontFamily:'PingFangSC'}}>
					只看楼主</div>:<div className='detailsReplyAll' style={{marginLeft:'40px',width:'auto',color:'#999999',fontFamily:'PingFangSC'}} onClick={()=>{
						Model.change('PostsDetailsModel','tabs','1')
						Model.change('PostsDetailsModel','.query.hostUserid',Details.authorInfo.userId)
						Model.dispatch({type:'PostsDetailsModel/getHostComment'})
					}}
					>只看楼主</div>
					}					
				</div>
				<div style={{width:'100%',height:'1px',background:'#eeeeee',marginTop:'3px'}}  ></div>*/}
					{/*
						this.props.commentList.map((comments,index)=>{
								//comments.createTime=moment(comments.createTime).format("YYYY-MM-DD HH:mm:ss")
							return	<div key={index} style={{width:'100%'}}>
									<div  className="detailsfooter" style={{width:'90%',marginLeft:'5%',marginTop:'10px'}}>
										<div className='detailsUser' style={{height:'40px'}}>
										<div style={{display:'flex',float:'left'}}>
											<div className='userpic' style={{width:'32px',height:'32px'}}>
												<img src={`${config.api}/medias/${comments.authorInfo.avatar}`} className='detailsLogo' />
											</div>
											<div className='detailsUsername' style={{width:'auto'}}>
												<div className="HostName" style={{color:"#333333"}} >{comments.authorInfo.nickname}</div>
												<div className='HostTime' style={{display:'flex'}} >
													<div>第{index+1}楼</div>
													<div style={{marginLeft:'24px'}}>{getTimes(comments.createTime)}</div>
													
												</div>
											</div>
											</div>
											<div className='caizan' style={{height:'25px',width:'auto',float:'right'}} onClick={()=>{
												Model.change('PostsDetailsModel','query.replyId',comments._id)
												if(comments.thumbStatus==true){
													Model.dispatch({type:'PostsDetailsModel/cancalReplyThumb'})
												}
												else {
													
													Model.dispatch({type:'PostsDetailsModel/replyThumb'})
												}
											}}>
													{
														comments.thumbStatus==true?<div className="tozan" style={{height:'100%',display:'flex',paddingTop:'auto',border:'none'}}>

														<div style={{width:'20px',height:'20px'}}>
															<img src={zanAfter} style={{width:'100%',height:'100%'}} />
														</div>
														<div style={{marginTop:'4px',color:'#ffd100',fontSize:'7px'}}>{comments.thumbCount}</div>
														</div>:<div className="tozan" style={{height:'100%',display:'flex',paddingTop:'auto',border:'none'}}>

														<div style={{width:'20px',height:'20px'}}>
															<img src={zan} style={{width:'100%',height:'100%'}} />
														</div>
														<div style={{marginTop:'4px',fontSize:'12px'}}>{comments.thumbCount}</div>
														</div>
													}
												
											</div>

										</div>
										<div style={{height:'auto',width:'100%'}} onClick={()=>{
											Model.change('CommentsModel','query.commentsId',comments._id)
											Model.change('CommentsModel','query.postId',comments.postId)
											if(this.props.administer==''){
											window.mainView.router.load({
												url: 'replyall.html',
												query:{
													index,
												}				    
											})
											}
										}}>
											<div className='comments' style={{marginLeft:'47px',marginBottom:'10px'}}>
												<div className='Comments' style={{color:'#333333'}}>
													{comments.content}
													&nbsp;&nbsp;
													{
														this.props.administer==true?
														<span style={{color:'#ff0000'}} onClick={()=>{
															Model.change('PostsDetailsModel','query.deleteReplyId',comments._id)
															Model.dispatch({type:'PostsDetailsModel/deleteComment'})
														}}>删除</span>:
														<div></div>
													}
													
												</div>
											</div>
											<div className='commentsRe' style={{marginLeft:'70px',fontSize:'14px',marginBottom:'10px'}}>
											{
												comments.replies.map((reply,inds)=>{
													if(inds=='0'||inds=='1')
														return <div key={inds}>
															{
															reply.replyUserInfo==null?
															<div  className='Comments' style={{marginBottom:"10px"}}><span className='HostName' style={{color:'#333333'}}>{reply.authorInfo.nickname}:</span>
																	{reply.content}
																	{
																		this.props.administer==true?
																		<span style={{color:'#ff0000',marginLeft:'10px'}} onClick={()=>{
																			Model.change('PostsDetailsModel','query.deleteReplyId',reply._id)
																			Model.dispatch({type:'PostsDetailsModel/deleteComment'})
																		}}>删除</span>:
																		<div></div>
																	}
															</div>:
															<div className='Comments' style={{marginBottom:"10px"}}><span className='HostName' style={{color:'#333333'}}>{reply.authorInfo.nickname}回复{reply.replyUserInfo.nickname}:</span>
																	{reply.content}
																	{
																		this.props.administer==true?
																		<span style={{color:'#ff0000',marginLeft:'10px'}} onClick={()=>{
																			Model.change('PostsDetailsModel','query.deleteReplyId',reply._id)
																			Model.dispatch({type:'PostsDetailsModel/deleteComment'})
																		}}>删除</span>:
																		<div></div>
																	}
															</div>
														}
													</div>			
																
												})
											}
											</div>
											{
													comments.replyNumber>'2'?
													<div className='commentsRe' style={{marginBottom:'10px',marginLeft:'70px'}}>
																<div className='HostTime' onClick={()=>{
																	window.mainView.router.load({
																				    url: 'replyall.html',
																				    
																				  })
																}}>
																	查看全部{comments.replyNumber}条评论
																</div>
															</div>:<div></div>
													
											}
											
										</div>
									</div>
									<div style={{width:'100%',height:'1px',background:'#eeeeee',marginTop:'0px'}}  ></div>
									</div>
						})	*/
					}
					<ListView
						renderHeader={() =>
							<div>
								<div className='detailsWrap'>				
									<div className='detailsUser' style={{height:'60px'}}> 
										<div style={{display:'flex'}}>
											<div className='detailsPic' style={{width:'46px',height:'46px'}}>
												<img src={`${config.api}/medias/${Details.authorInfo.avatar}`} className='detailsLogo' />
											</div>
											<div className='detailsUsername' style={{width:'auto'}}>
												<div className="Detailsname">{Details.authorInfo.nickname}</div>
												<div style={{display:'flex',marginTop:'9px'}}>
													{
														sector.map((objs,inde)=>{
															if(objs._id==Details.subjectId)
																return <div key={inde} className='DetailsTime' >{objs.name}</div>
														})
													}
													
													<div className='DetailsTime' style={{marginLeft:'24px'}} >{getTimes(Details.createTime)}</div>
												</div>
												
											</div>
										</div>
										<div className='DetailsRead' style={{float:'right',marginTop:"-44px"}}>
											{Details.readNumber}阅读
										</div>
									</div>
									<div className='DetailsCon' style={{marginBottom:'10px'}}>
										<span>{Details.content}</span>
									</div>		
										{
											Details.images.map((med,ind)=>{
												 if(med.length==='0')
												 	return <div key={ind}></div>
												else return <div key={ind} className='detailsConPic' style={{marginTop:'auto',height:'auto'}}>
																<img  src={`${config.api}/medias/${med}`} className='pics' onClick={()=>{this.previewImage([med],'0')}} />
															</div>	
											})
										}					
									<div>
										<div className='dtos' style={{width:'100%',marginLeft:'0px',borderBottom:'0px solid',height:'35px'}}>
											<div style={{width:'100%'}} className='boxs'>
								 				<div className='detailsPostSpan box' style={{width:'auto',fontSize:'12px'}}>
								 					<img src={huifu} style={{float:'left',width:'25px',height:'25px',paddingTop:'0px',marginLeft:'-5px'}} />
								 					<span style={{float:'left',height:'25px',lineHeight:'25px',color:'#333333'}}>回复{Details.replyNumber}
								 					</span>
								 				</div>
								 				<div className='detailsPostSpan box' style={{width:'auto',fontSize:'12px'}} onClick={()=>{
								 					Model.change('HomePageModel','query.postId',Details._id)
								 					if(Details.favoriteStatus==true){
								 						Model.dispatch({type:'HomePageModel/cancelCollect'})
								 					}
								 					else {
								 						Model.dispatch({type:'HomePageModel/Collect'})
								 					}
								 				}} >
								 					{
								 						Details.favoriteStatus==true?
								 						<div style={{float:'right'}}>
										 					<img src={collectAfter} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
										 					<span style={{float:'left',height:'25px',lineHeight:'25px',color:'#ffd100',marginRight:'20px'}} >
										 						收藏
										 					</span>
								 						</div>:
								 						<div style={{float:'right'}}>
										 					<img src={collect} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
										 					<span style={{float:'left',height:'25px',lineHeight:'25px',color:'#333333',marginRight:'20px'}}>
										 						收藏
										 					</span>
								 						</div>
								 					}
								 					
								 				</div>
								 				<div className='detailsPostSpan box' style={{marginLeft:'10%',width:'auto',fontSize:'12px'}} onClick={()=>{
									 					if(Details.thumbStatus==false){
								 						Model.change('HomePageModel','query.postId',Details._id)
								 						Model.dispatch({type:'HomePageModel/makeThumb'})
								 					}
								 					else
								 					{
								 						Model.change('HomePageModel','query.postId',Details._id)
								 						Model.dispatch({type:'HomePageModel/cancelThumb'})
								 					}
								 					Model.dispatch({type:'HomePageModel/gethomePage'})
								 				}}>
								 				
								 				{
								 					Details.thumbStatus==true?<div style={{float:'right',marginTop:"-1px"}}><img src={zanAfter} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}}  />
								 					<span style={{float:'right',height:'26px',lineHeight:'26px',color:'#ffd100'}}>
								 						赞{Details.thumbNumber}
								 					</span></div>:<div style={{float:'right',marginTop:"-1px"}}><img src={zan} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
								 					<span style={{float:'right',height:'26px',lineHeight:'26px',color:'#333333'}}>
								 						赞{Details.thumbNumber}
								 					</span></div>
								 				}
								 				</div>
											</div>
					 					</div>
									</div>	
								</div>
								<div style={{width:'100%',height:'1px',background:'#eeeeee'}}  ></div>
								<div className='detailsReply' style={{width:'90%',marginLeft:'5%',fontSize:'14px',textAlign:'center',height:'25px',paddingTop:'0px'}}>
									{
									this.props.tabs=='0'?<div className='detailsReplyAll' style={{color:'#333333',borderBottom:'3px solid #333333',width:'auto',fontFamily:'PingFangSC'}}>
									全部回复</div>:<div className='detailsReplyAll' style={{width:'auto',color:'#999999',fontFamily:'PingFangSC'}} onClick={()=>{
										Model.change('PostsDetailsModel','tabs','0')
										//Model.dispatch({type:'PostsDetailsModel/getComment'})
										const self = this
									    Model.run('PostsDetailsModel',function*({fetch,reduce,change,get}){
									    	 const query = {
								                ...get().query
								            }
								            const postId=query.detailsId
								            const res =yield fetch(`comment/${postId}?startIndex=0&pageSize=10`)
								            const posts = res
								            if(!res) return
								            yield change('commentList',res)
								            	self.setState({
											      dataSource: self.state.dataSource.cloneWithRows(posts),
											      refreshing: false,
											      isLoading: false,
											    });
								        })
									}}>全部回复</div>
									}
									{
									this.props.tabs=='1'?<div className='detailsReplyAll' style={{marginLeft:'40px',color:'#333333',borderBottom:'3px solid #333333',width:'auto',fontFamily:'PingFangSC'}}>
									只看楼主</div>:<div className='detailsReplyAll' style={{marginLeft:'40px',width:'auto',color:'#999999',fontFamily:'PingFangSC'}} onClick={()=>{
										Model.change('PostsDetailsModel','tabs','1')
										Model.change('PostsDetailsModel','.query.hostUserid',Details.authorInfo.userId)
										//Model.dispatch({type:'PostsDetailsModel/getHostComment'})
										const self = this
									    Model.run('PostsDetailsModel',function*({fetch,reduce,change,get}){
									    	 const query = {
								                ...get().query
								            }
								            const postId=query.detailsId
								            const userId=query.hostUserid
								            const res=yield fetch (`comment/${postId}?userId=${userId}&startIndex=0&pageSize=10`)
								            const posts = res
								            if(!res) return
								            yield change('commentList',res)
								            	self.setState({
											      dataSource: self.state.dataSource.cloneWithRows(posts),
											      refreshing: false,
											      isLoading: false,
											    });
								        })
									}}
									>只看楼主</div>
									}					
								</div>
								<div style={{width:'100%',height:'1px',background:'#eeeeee',marginTop:'3px'}}  ></div>
							</div>
							}
				          	ref={el => this.lv = el}
				          	dataSource={this.state.dataSource}
				          	renderFooter={    //renderFooter就是下拉时候的loading效果
				            () => (
				                  	<div style={{ padding: 30, textAlign: 'center'}}>
				                    {this.state.isLoading ? 'Loading...' : ''}
				                  	</div>
				                )
				          	}
				          	renderRow={row}
				          	onEndReached={this.onEndReached}
				          	pageSize={10} 
				          	style={{marginTop:'-11px'}}
				  			/>
					<div style={{width:'100%',height:'100px'}}></div>
			</div>
		)
	}
}
export default Model.connect(['HomePageModel','PostsDetailsModel','sectors','postListModel','CommentsModel','messageModel'])(PostDetails)
	


