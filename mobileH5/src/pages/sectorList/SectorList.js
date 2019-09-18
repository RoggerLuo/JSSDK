import React from 'react'
import { Model } from 'dvax'
import logo from '../subject/sectors/11.jpg'
import toast from 'dvax/toast'
import CreateSector from '../components/createSector'
import './sectorlist.css'
import homehuifu from './huifu.png'
import homezan from './zan.png'
import homecai from './cai.png'
import zanAfter from './zanAfter.png'
import zan from './zan.png'
import pic from './2.jpg'
import config from 'shared/config'
import moment from 'moment'
import collect from './collect.png'
import collectAfter from './collectAfter.png'
import PostComponent from '../homePage/postComponent.js'
import { ListView,PullToRefresh ,Button} from 'antd-mobile';
import {getTimes} from '../homePage/homePage.js'
Model.create({
	namespace:'postListModel',
	state:{
		lists:[],
		topList:[],
		postDate:[],
		subjectInfos:{
			subjectInfo:[],
		},
		sectorsTab:'0',
		query:{
			subjectId:'',
			postId:'',
		},
		attention:"关注",
		check:"签到",
		pagination:{
            startIndex:0,
            pageSize:10,
        },
        subDtos:'',
 		
		
	},
	effects:{
        *getpostList({change,fetch,get}){
        	const query = {
                ...get().query
            }
            const subjectId=query.subjectId
            const res= yield fetch(`post/?subjectId=${subjectId}`)
             if(!res) return
             res.data.map((datas,index)=>{
              return  datas.createTime=moment(datas.createTime).format("YYYY-MM-DD HH:mm:ss")
             })
            yield change('lists',res.data)
           yield change('subjectInfos.subjectInfo',res.subjectInfo)
        },
        *getRecommendPost({change,fetch,get}){
        	const query = {
                ...get().query
            }
            const subjectId=query.subjectId
            const res=yield fetch(`post/?subjectId=${subjectId}&recommend=true`)
            if(!res) return
            	console.log('recommends',res)
            	res.data.map((datas,index)=>{
              return  datas.createTime=moment(datas.createTime).format("YYYY-MM-DD HH:mm:ss")
             })
            yield change('lists',res.data)
          	yield change('subjectInfos.subjectInfo',res.subjectInfo)
        },
        *makeFollow({change,fetch,get,put}){
        	const query = {
                ...get().query
            }
            const subjectId=query.subjectId
            const res=yield fetch(`subject-follow/${subjectId}`,{method:'post'})
            if(!res) return
            	toast('关注成功',1500,'good')

        },
        *cancelFollow({change,fetch,get,put}){
        	const query = {
                ...get().query
            }
            const subjectId=query.subjectId
            const res=yield fetch(`subject-follow/${subjectId}`,{method:'delete'})
            if(!res) return
        	toast('已取消关注',1500,"good")
            	
        },
        *Collect({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const postId=query.postId
            const res= yield fetch(`favorite/${postId}`,{method:'post'})
            yield put({type:'getpostList'})
        },
        *cancelCollect({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const postId= query.postId
            const res =yield fetch(`favorite/${postId}`,{method:'delete'})
            yield put({type:'getpostList'})
        },
        *getTopList({change,fetch,get,put}){
        	const query = {
                ...get().query
            }
            const subjectId=query.subjectId
            const res=yield fetch(`post-top?subjectId=${subjectId}`)
            if(!res) return
            	yield change('topList',res)

        }
	}
})
 
                

class SectorList extends React.Component{
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
		Model.change('HomePageModel','dtoes','1')
		Model.dispatch({type:'postListModel/getTopList'})
		const self = this
	    Model.run('postListModel',function*({fetch,reduce,change,get}){
	    	const query = {
                ...get().query
            }
            const subjectId=query.subjectId
            const res= yield fetch(`post/?subjectId=${subjectId}&startIndex=0&pageSize=10`)
             const posts = res.data
             yield change('postDate',posts)
             yield change('subjectInfos.subjectInfo',res.subjectInfo)
            	self.setState({
			      dataSource: self.state.dataSource.cloneWithRows(posts),
			      refreshing: false,
			      isLoading: false,
			    });
        })

	}
	resetState = () => {
        const posts = Model.get('HomePageModel').postDate
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(posts),
	        refreshing: false,
	        isLoading: false,
	    });
	}
	onEndReached = async (event) => {
        const rData=this.props.postDate
        const len=rData.length
	    if (this.state.isLoading && !this.state.hasMore) {
	      return;
	    }   //如果this.state.hasMore为false，说明没数据了，直接返回
	   
	    this.setState({ isLoading: true });
	    const self=this
	    if(this.props.sectorsTab=='0'){
		    Model.run('postListModel',function*({fetch,reduce,change,get}){
		    	const query = {
                ...get().query
            	}
	            const subjectId=query.subjectId 
	            const startIndex=len
	          	const res = yield fetch(`post/?subjectId=${subjectId}&startIndex=${startIndex}&pageSize=10`)
	          	 const posts = res.data
                self.rData = [...rData,...posts]
                yield change('postDate',self.rData)
	            	self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(self.rData),
                    isLoading: false,
			    });
	        })
	        }
	        if(this.props.sectorsTab=='1'){
	        	Model.run('postListModel',function*({fetch,reduce,change,get}){
		    	const query = {
                ...get().query
            	}
	            const subjectId=query.subjectId 
	            const startIndex=len
	          	const res = yield fetch(`post/?subjectId=${subjectId}&recommend=true&startIndex=${startIndex}&pageSize=10`)
	          	 const posts = res.data
                //console.log('rData',posts)
                self.rData = [...rData,...posts]
                yield change('postDate',self.rData)
	            	self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(self.rData),
                    isLoading: false,
			    });
	        })
	        }
        }


	render(){
		const List=this.props.lists
		const topList=this.props.topList
		 const props =this.props
		const row = (rowData, sectionID, rowID) => {	
		return(
				<div key={rowID}>
	 				<div className='title'  style={{height:'60px',width:'90%',marginLeft:'5%'}} onClick={()=>{
	 					Model.change('PostsDetailsModel','query.detailsId',rowData._id)
						Model.change('postListModel','query.subjectId',rowData.subjectId)
						Model.change('PostsDetailsModel','administer','')
						window.mainView.router.load({
									    url: 'postDetails.html',
									    query: {
									    	// index,
									    	
									    }
									  })
	 					}}>
		 				<div className='pic sectorlistPic' style={{width:'46px',height:'46px',marginLeft:'0px'}}>
		 					<img src={`${config.api}/medias/${rowData.authorInfo.avatar}`} className='logo sectorlistLogo' />
		 				</div>
		 				<div className='tip'>
			 				<div className='Name' style={{marginTop:'0px'}}>{rowData.authorInfo.nickname}</div>
			 				<div className='Time' style={{marginTop:'9px'}} >
			 				{getTimes(rowData.createTime)}
			 				</div>
		 				</div>
	 				</div>
	 				<div>
	 					<div className="con" style={{height:'auto',width:'90%',marginLeft:'5%',fontWeight:'bold',marginBottom:'10px'}} onClick={()=>{
							Model.change('PostsDetailsModel','query.detailsId',rowData._id)
							Model.change('postListModel','query.subjectId',rowData.subjectId)
							Model.change('PostsDetailsModel','administer','')
							window.mainView.router.load({
										    url: 'postDetails.html',
										    query: {
										    	// index,
										    	
										    }
										  })
								}}><div style={{marginLeft:'50px',paddingLeft:'15px'}} className='titlename'>{rowData.title}</div>
								</div>
								{
				 					rowData.images.map((med,ind)=>{
										 if(med.length==='0')
										 	return <div key={ind}></div>
										else if(med.length!='0'){
											if(ind==0){
												return 	<div key={ind} className='conPic' style={{overflow:'hidden',width:'90%',marginLeft:'5%'}}>
															<div key={ind} className='logo' style={{height:'auto',marginLeft:'50px',paddingLeft:'15px',width:'auto'}} onClick={()=>{
																Model.change('PostsDetailsModel','query.detailsId',rowData._id)
																Model.change('postListModel','query.subjectId',rowData.subjectId)
																Model.change('PostsDetailsModel','administer','')
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
				 			<div className='dtos' style={{width:'90%',marginLeft:'5%',borderBottom:'0px solid',height:'35px'}}>
							<div style={{marginLeft:'50px',width:'100%',paddingLeft:'15px'}} className='boxs'>
				 				<div className='detailsPostSpan box' style={{width:'auto',fontSize:'12px'}} onClick={()=>{
				 					Model.change('PostsDetailsModel','query.detailsId',rowData._id)
									Model.change('postListModel','query.subjectId',rowData.subjectId)
									Model.change('PostsDetailsModel','administer','')
									window.mainView.router.load({
												    url: 'postDetails.html',
												    query: {
												    	// index,
												    	
												    }
												  })
				 					}}>
				 					<img src={homehuifu} style={{float:'left',width:'25px',height:'25px',paddingTop:'0px',marginLeft:'-5px'}} />
				 					<span className='re' style={{float:'left',height:'25px',lineHeight:'25px'}}>回复{rowData.replyNumber}
				 					</span>
				 				</div>
				 				<div className='detailsPostSpan box' style={{width:'auto',fontSize:'12px'}} onClick={()=>{
				 					
				 					Model.change('HomePageModel','query.postId',rowData._id)
				 					if(rowData.favoriteStatus==true){
				 						Model.dispatch({type:'HomePageModel/cancelCollect'})
				 						const rData=props.postDate
				 						
									    Model.run('postListModel',function*({fetch,reduce,change,get}){
								          const query = {
							                ...get().query
							            }
							            const subjectId=query.subjectId
							            const res= yield fetch(`post/?subjectId=${subjectId}&startIndex=${rowID}&pageSize=1`)	
								            	const posts = res.data
								            	
								            	const post=posts[0]._id
								            	const Dates=rData.map((rdata,index)=>{
								            		//debugger
								            		if(rdata._id==post){
								            			rdata.favoriteStatus=false
								            		}
								            		return rdata
								            	})
								            	yield change('postDate',Dates)
												// this.setState({
												// 	dataSource: this.state.dataSource.cloneWithRows(Dates),
											 //        refreshing: false,
											 //        isLoading: false,
											 //    });
								        })
				 					}
				 					else {
				 						Model.dispatch({type:'HomePageModel/Collect'})
				 						const rData=props.postDate
									    Model.run('postListModel',function*({fetch,reduce,change,get}){
									    	const query = {
							                ...get().query
							            	}
							            	const subjectId=query.subjectId
								          	const res = yield fetch(`post/?subjectId=${subjectId}&startIndex=${rowID}&pageSize=1`)
								            	const posts = res.data
								            	
								            	const post=posts[0]._id
								            	const Dates=rData.map((rdata,index)=>{
								            		//debugger
								            		if(rdata._id==post){
								            			rdata.favoriteStatus=true
								            		}
								            		return rdata
								            	})
								            	yield change('postDate',Dates)
								        })
				 					}
				 				}} >
				 					{
				 						rowData.favoriteStatus==true?
				 						<div style={{float:'right'}}>
						 					<img src={collectAfter} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
						 					<span className='re' style={{float:'left',height:'25px',lineHeight:'25px',color:'#ffd100',marginRight:'10px'}} >
						 						收藏
						 					</span>
				 						</div>:
				 						<div style={{float:'right'}}>
						 					<img src={collect} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
						 					<span className='re' style={{float:'left',height:'25px',lineHeight:'25px',marginRight:'10px'}}>
						 						收藏
						 					</span>
				 						</div>
				 					}
				 					
				 				</div>
				 				<div className='detailsPostSpan box' style={{marginLeft:'10%',width:'auto',fontSize:'12px'}}  onClick={()=>{
				 					if(rowData.thumbStatus==false){
				 						Model.change('HomePageModel','query.postId',rowData._id)
				 						Model.dispatch({type:'HomePageModel/makeThumb'})
				 						const rData=props.postDate
				 						const self =this
									    Model.run('postListModel',function*({fetch,reduce,change,get}){
									    	const query = {
							                ...get().query
								            }
								            const subjectId=query.subjectId
								          	const res = yield fetch(`post/?subjectId=${subjectId}&startIndex=${rowID}&pageSize=1`)
								            	const posts = res.data
								            	const post=posts[0]._id
								            	const Dates=rData.map((rdata,index)=>{
								            		//debugger
								            		if(rdata._id==post){
								            			rdata.thumbStatus=true
								            			rdata.thumbNumber=rdata.thumbNumber+1
								            		}
								            		return rdata
								            	})
								            	yield change('postDate',Dates)
								        		const Posts = Model.get('HomePageModel').postDate
								    	});
				 						
				 					}
				 					else
				 					{
				 						Model.change('HomePageModel','query.postId',rowData._id)
				 						Model.dispatch({type:'HomePageModel/cancelThumb'})
				 						const rData=props.postDate
				 						const self=this
									    Model.run('postListModel',function*({fetch,reduce,change,get}){
									          	const query = {
								                ...get().query
									            }
									            const subjectId=query.subjectId
									          	const res = yield fetch(`post/?subjectId=${subjectId}&startIndex=${rowID}&pageSize=1`)
								            	const posts = res.data
								            	
								            	const post=posts[0]._id
								            	const Dates=rData.map((rdata,index)=>{
								            		//debugger
								            		if(rdata._id==post){
								            			rdata.thumbStatus=false
								            			rdata.thumbNumber=rdata.thumbNumber-1
								            		}
								            		return rdata
								            	})
								            	yield change('postDate',Dates)
				 						
								        })
				 						 }	
				 				}}>
				 				
				 				{
				 					rowData.thumbStatus==true?<div style={{float:'right',marginTop:"-1px"}}><img src={zanAfter} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
				 					<span className='re' style={{float:'right',height:'26px',lineHeight:'26px',color:'#ffd100'}}>
				 						赞{rowData.thumbNumber}
				 					</span></div>:<div style={{float:'right',marginTop:"-1px"}}><img src={zan} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
				 					<span className='re' style={{float:'right',height:'26px',lineHeight:'26px'}}>
				 						赞{rowData.thumbNumber}
				 					</span></div>
				 				}
				 				</div>
							</div>
		 				</div>
						<div style={{width:'100%',height:'1px',background:'#eeeeee'}}></div>
	 				</div>
				</div>
				)
		}
		return (
			<div style={{background:'#ffffff',width:'100%',paddingBottom:"75px",paddingTop:'44px',height:'100%',overflow:'hidden'}} className="page-content infinite-scroll">
				<CreateSector {...props} />
					{/*<div className='detailsReply' style={{width:'90%',marginLeft:'5%',marginBottom:'10px',height:'25px'}} >
						{
							this.props.sectorsTab=='0'?<div className='all ReplyAll' style={{color:'#333333',borderBottom:'3px solid #333333',fontSize:'16px',width:'auto'}}>全部</div>:<div className='all' style={{fontSize:'16px',width:'auto',color:'#999999'}}
 							 	onClick={()=>{
								Model.change('postListModel','sectorsTab','0')
								const self = this
							    Model.run('postListModel',function*({fetch,reduce,change,get}){
							    	const query = {
						                ...get().query
						            }
						            const subjectId=query.subjectId
						            const res= yield fetch(`post/?subjectId=${subjectId}&startIndex=0&pageSize=10`)
						             const posts = res.data
						             console.log('length',posts.length)
						             yield change('postDate',posts)
						             yield change('subjectInfos.subjectInfo',res.subjectInfo)
						            	self.setState({
									      dataSource: self.state.dataSource.cloneWithRows(posts),
									      refreshing: false,
									      isLoading: false,
									    });
						        })
							}}>全部</div>
						}
						{
							this.props.sectorsTab=='1'?<div className=' elite ReplyAll' style={{color:'#333333',borderBottom:'3px solid #333333',fontSize:'16px',width:'auto',marginLeft:'30px'}}>精华</div>:<div className=' elite' style={{fontSize:'16px',width:'auto',marginLeft:'30px',color:'#999999'}} 
							onClick={()=>{
								Model.change('postListModel','sectorsTab','1')
								//Model.dispatch({type:'postListModel/getRecommendPost'})
								const self = this
							    Model.run('postListModel',function*({fetch,reduce,change,get}){
							    	const query = {
						                ...get().query
						            }
						            const subjectId=query.subjectId
						            const res= yield fetch(`post/?subjectId=${subjectId}&recommend=true&startIndex=0&pageSize=10`)
						             const posts = res.data
						             console.log('length',posts.length)
						             yield change('postDate',posts)
						             yield change('subjectInfos.subjectInfo',res.subjectInfo)
						            	self.setState({
									      dataSource: self.state.dataSource.cloneWithRows(posts),
									      refreshing: false,
									      isLoading: false,
									    });
						        })
							}}>精华</div>
						}
					</div>
					<div style={{width:'100%',height:'1px',background:'#eeeeee',marginTop:'5px'}}  ></div>
					<div className='Stick' style={{width:'90%',marginLeft:'5%',borderBottom:'0px solid'}}>
						{
							topList.map((tops,index)=>{
								if(tops.topStatus==true)
									return <div key={index} className='detailsReply peak' onClick={()=>{
										Model.change('PostsDetailsModel','query.detailsId',tops._id)
						 					window.mainView.router.load({
						 						url: 'postDetails.html',
						 						query: {
														 index,
														    	
														    }
														})
									}}>
												<div className='detailsReplyAll' style={{color:'#ffe300',fontSize:'16px',width:'auto',marginRight:'30px'}}>置顶</div>
												<div className='detailsReplyAll elite stickPost' style={{width:'auto',whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden',fontSize:'16px',fontWeight:'bold',marginLeft:'0px'}}>{tops.title}</div>
											</div>
							})
						}	
					</div>
					<div style={{width:'100%',height:'1px',background:'#eeeeee'}}  ></div>*/}
					<ListView
					renderHeader={() =>
						<div>
							<div className='detailsReply' style={{width:'90%',marginLeft:'5%',marginBottom:'10px',height:'25px'}} >
									{
										this.props.sectorsTab=='0'?<div className='all ReplyAll' style={{color:'#333333',borderBottom:'3px solid #333333',fontSize:'16px',width:'auto'}}>全部</div>:<div className='all' style={{fontSize:'16px',width:'auto',color:'#999999'}}
			 							 	onClick={()=>{
											Model.change('postListModel','sectorsTab','0')
											const self = this
										    Model.run('postListModel',function*({fetch,reduce,change,get}){
										    	const query = {
									                ...get().query
									            }
									            const subjectId=query.subjectId
									            const res= yield fetch(`post/?subjectId=${subjectId}&startIndex=0&pageSize=10`)
									             const posts = res.data
									             console.log('length',posts.length)
									             yield change('postDate',posts)
									             yield change('subjectInfos.subjectInfo',res.subjectInfo)
									            	self.setState({
												      dataSource: self.state.dataSource.cloneWithRows(posts),
												      refreshing: false,
												      isLoading: false,
												    });
									        })
										}}>全部</div>
									}
									{
										this.props.sectorsTab=='1'?<div className=' elite ReplyAll' style={{color:'#333333',borderBottom:'3px solid #333333',fontSize:'16px',width:'auto',marginLeft:'30px'}}>精华</div>:<div className=' elite' style={{fontSize:'16px',width:'auto',marginLeft:'30px',color:'#999999'}} 
										onClick={()=>{
											Model.change('postListModel','sectorsTab','1')
											//Model.dispatch({type:'postListModel/getRecommendPost'})
											const self = this
										    Model.run('postListModel',function*({fetch,reduce,change,get}){
										    	const query = {
									                ...get().query
									            }
									            const subjectId=query.subjectId
									            const res= yield fetch(`post/?subjectId=${subjectId}&recommend=true&startIndex=0&pageSize=10`)
									             const posts = res.data
									             console.log('length',posts.length)
									             yield change('postDate',posts)
									             yield change('subjectInfos.subjectInfo',res.subjectInfo)
									            	self.setState({
												      dataSource: self.state.dataSource.cloneWithRows(posts),
												      refreshing: false,
												      isLoading: false,
												    });
									        })
										}}>精华</div>
									}
							</div>
							<div className='Stick' style={{width:'90%',marginLeft:'5%',borderBottom:'0px solid'}}>
							{
								topList.map((tops,index)=>{
									if(tops.topStatus==true)
										return <div key={index} className='detailsReply peak' onClick={()=>{
											Model.change('PostsDetailsModel','query.detailsId',tops._id)
							 					window.mainView.router.load({
							 						url: 'postDetails.html',
							 						query: {
															 index,
															    	
															    }
															})
										}}>
													<div className='detailsReplyAll' style={{color:'#ffe300',fontSize:'16px',width:'auto',marginRight:'30px'}}>置顶</div>
													<div className='detailsReplyAll elite stickPost' style={{width:'auto',whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden',fontSize:'16px',fontWeight:'bold',marginLeft:'0px'}}>{tops.title}</div>
												</div>
								})
							}	
							</div>
							<div style={{width:'100%',height:'1px',background:'#eeeeee',marginTop:'5px'}}  ></div>				
						</div>	
					}
		          	ref={el => this.lv = el}
		          	dataSource={this.state.dataSource}
		          	renderFooter={    //renderFooter就是下拉时候的loading效果
		            () => (
		                  	<div style={{ padding: 30, textAlign: 'center',marginBottom:75 }}>
		                    {this.state.isLoading ? 'Loading...' : '没有更多'}
		                  	</div>
		                )
		          	}
		          	renderRow={row}
		          	onEndReached={this.onEndReached}
		          	pageSize={10}    //每次下拉之后显示的数据条数
		        />
			</div>
		)
		}
}
export default Model.connect(['HomePageModel','postListModel','PostsDetailsModel'])(SectorList)
	

// <div style={{width:'100px',height:'100px',background:'red'}}>2222222</div>
