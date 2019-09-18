import React from 'react'
import { Model } from 'dvax'
import logo from '../subject/sectors/11.jpg'
import PostComponent from '../homePage/postComponent.js'
import {TextareaItem,Modal, Button,Toast,ListView,PullToRefresh} from 'antd-mobile'
import styled from 'styled-components'
import config from 'shared/config'
import moment from 'moment'
import zan from '../sectorList/zan.png'
import zanAfter from '../sectorList/zanAfter.png'
import huifu from '../sectorList/huifu.png'
import huifuAfter from '../sectorList/huifuAfter.png'
import collect from '../sectorList/collect.png'
import collectAfter from '../sectorList/collectAfter.png'
import applist from '../subject/sectors/applist.js'
import bg from './BG.png'
import toast from 'dvax/toast'
import {getTimes} from '../homePage/homePage.js'
const alert = Modal.alert;
const WrapDiv = styled.div`
    width:100%;  
`
const bgGround = {
     backgroundSize:'100%',
     backgroundImage: 'url(' +bg + ')'
   };

const DivTitle=styled.div`
	width:100%;
	background:#ffffff;
	height:auto;
	
`
const ImgDiv=styled.div`
	width:80px;
	height:80px;
	display:inline-block;
`
const Imgs=styled.img`
	width:100%;
	height:100%;
	border-radius:100%
`
const DatumDiv=styled.div`
	padding-bottom:25px;
    height:20px;
    display:inline-block;
    font-family: PingFangSC;
	font-size: 14px;
	font-weight: 600;
	font-style: normal;
	font-stretch: normal;
	line-height: normal;
	letter-spacing: normal;
	color: #333333;
`
const Namediv=styled.div`
	width:50%;
	height:50%;
	margin-top: 18px;
    font-size: 20px;
`
const Datediv=styled.div`
	width:50%;
	height:50%;
`
const PostAtten=styled.div`
	width: 100%;
    height: 70px;
    border-bottom: 1px solid #b39c9c45;
    display: flex;
    font-size: 16px;
`
const AttenDiv=styled.div`
	width: 50%;
    height: 100%;
    text-align: center;
`
const PostDiv=styled.div`
	width: 50%;
    height: 100%;
    text-align: center;
`
const SelectDiv=styled.div`
    width: 100%;
    height: 37px;
   
`
const FDiv=styled.div`
	height: 1px;
  	opacity: 0.5;
  	background-color: #eaeaea;
 	margin-bottom: 15px;
`

class Personal extends React.Component{
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
		//Model.dispatch({ type:'mineModel/getMysendpost'})
		Model.dispatch({type:'mineModel/getMycount'})
		Model.dispatch({type:'sectors/getSector'})
		const self = this
	    Model.run('mineModel',function*({fetch,reduce,change,get}){
	    	const res=yield fetch(`my/post?startIndex=0&pageSize=10`)
            //const res= yield fetch(`post/?subjectId=${subjectId}&`)
            const posts = res
            yield change('myPostDate',posts)
            	self.setState({
			      dataSource: self.state.dataSource.cloneWithRows(posts),
			      refreshing: false,
			      isLoading: false,
			    });
        })
	}
	onEndReached = async (event) => {		
        
	    if (this.state.isLoading && !this.state.hasMore) {
	      return;
	    }   //如果this.state.hasMore为false，说明没数据了，直接返回
	    console.log('reach end', event);
	    this.setState({ isLoading: true });
    	const self=this
    	if(this.props.mytabs=='0'){
    		const myPostDate=this.props.myPostDate
    		const len=myPostDate.length
		    Model.run('mineModel',function*({fetch,reduce,change,get}){
	            const startIndex=len
	          	const res = yield fetch(`my/post?startIndex=${startIndex}&pageSize=10`)
	          	const posts = res
                self.myPostDate = [...myPostDate,...posts]
                yield change('myPostDate',self.myPostDate)
	            	self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(self.myPostDate),
                    isLoading: false,
			    });
	        })
	     }
	     if(this.props.mytabs=='1'){
	     	const myPostDate=this.props.myPostDate
    		const len=myPostDate.length
	     	Model.run('mineModel',function*({fetch,reduce,change,get}){
	            const startIndex=len
	          	const res = yield fetch(`my/follow?startIndex=${startIndex}&pageSize=10`)
	          	const posts = res
                self.myPostDate = [...myPostDate,...posts]
                yield change('myPostDate',self.myPostDate)
	            	self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(self.myPostDate),
                    isLoading: false,
			    });
	        })
	     }
	     if(this.props.mytabs=='2'){
	     	const myPostDate=this.props.myPostDate
    		const len=myPostDate.length
	     	Model.run('mineModel',function*({fetch,reduce,change,get}){
	            const startIndex=len
	          	const res = yield fetch(`my/favorite?startIndex=${startIndex}&pageSize=10`)
	          	const posts = res
                self.myPostDate = [...myPostDate,...posts]
                yield change('myPostDate',self.myPostDate)
	            	self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(self.myPostDate),
                    isLoading: false,
			    });
	        })
	     }
        }	
	render(){
		const user=this.props.session
		const counts=this.props.countLists
		const cancelfollows=this.props.cancelfollows		
		const row=(rowData, sectionID, rowID) => {
			
			const  Nameimage=rowData.authorInfo
			console.log('rowData',rowData)
			
		return(
				<div key={rowID}>					
					{	
						this.props.mytabs=='0'?
			 				<div  style={{height:'auto',borderBottom:'1px solid #f6f6f6',paddingBottom:'30px',marginBottom:'10px'}}>
			 					<div style={{width:'90%',marginLeft:'5%'}}>
			 						{
			 							this.props.sectorList.map((subjects,inds)=>{
			 								if(subjects._id==rowData.subjectId)
			 									return <div key={inds} className='sendSubject' style={{width:'auto',float:'left'}}>来自{subjects.name}</div>
			 							})
			 						}
			 						<div className='sendSubject' style={{float:'left',width:'auto',marginLeft:'20px'}}>{getTimes(rowData.createTime)}</div>
			 						<div style={{float:'right'}}>
			 							<Button style={{width:'40px',height:'25px'}}
										      onClick={() =>{
										        alert('删除','是否删除该帖子',[
										          { text: '确定', onPress: () =>
										           {
										           	Model.change('PostsManage','query.postId',rowData._id)
										           	Model.dispatch({type:'PostsManage/deletePosts'})
										           	const self = this
												    Model.run('mineModel',function*({fetch,reduce,change,get}){
												    	const res=yield fetch(`my/post?startIndex=0&pageSize=10`)
											            //const res= yield fetch(`post/?subjectId=${subjectId}&`)
											            const posts = res
											            yield change('myPostDate',posts)
											            	self.setState({
														      dataSource: self.state.dataSource.cloneWithRows(posts),
														      refreshing: false,
														      isLoading: false,
														    });
											        })
										           }
										       },
										          { text: '取消', onPress: () => console.log('cancel') },
										        ])
										    }
										      }
									    >
	     									<div style={{fontSize:'12px',marginTop:'-10px',height:'25px',color:'#999999'}}>删除</div>
	 										</Button>
			 						</div>
								</div>
								<div>
									<div className="con" style={{height:'auto',width:'90%',marginLeft:'5%',fontWeight:'bold',marginBottom:'10px',marginTop:'10px'}} onClick={()=>{
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
										<div className='titlename'>
											{rowData.title}
										</div>
									</div>
									{
					 					rowData.images.map((med,ind)=>{
											 if(med.length==='0')
											 	return <div key={ind}></div>
											else if(med.length!='0'){
												if(ind==0){
													return 	<div key={ind} className='conPic' style={{overflow:'hidden',width:'90%',marginLeft:'5%'}}>
																<div key={ind} className='logo' style={{height:'auto',width:'100%'}} onClick={()=>{
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
								</div>
								{
									rowData.auditStatus==false?<div style={{width:'90%',marginLeft:'5%',marginTop:'10px'}}><div className='sendSubject' style={{float:'right'}}>帖子审核不通过</div></div>:
									<div>
										{
											rowData.auditStatus==true?<div></div>:
											<div style={{width:'90%',marginLeft:'5%',marginTop:'10px'}}><div className='sendSubject' style={{float:'right'}}>帖子正在审核中</div></div>

										}
									</div>
									
								}
							</div>:
							<div>
								{
									this.props.mytabs=='1'?
									<div>
										<div className='sectors' style={{height:'85px',borderBottom:'0px solid',marginBottom:'10px',width:'100%',marginLeft:'0px'}} key={rowID} onClick={()=>{
												Model.change('postListModel','query.subjectId',rowData._id)
												// if(cancelfollows==false){
												window.mainView.router.load({
																    url: 'list.html',
																    query: {
																    	index
																    }
																  })
												// }
												// Model.dispatch({type:'postListModel/getpostList',subjectId:obj._id})
											}}>
												<div className='sector' style={{marginLeft:'5%',height:'100%',paddingTop:'0px',borderBottom:'0px solid',width:'90%'}}>
													<div className='logopic' style={{width:'60px',height:'60px',marginTop:'20px'}}>
														<img className='logos' style={{borderRadius:"10px"}} src={`${config.api}/medias/${rowData.image}`}/>
													</div>
													<div className='sectorCon' style={{width:'auto',height:'60px',marginTop:'20px'}} >
														<div className='subjectname' style={{marginTop:"6px"}} >{rowData.name}</div>
														<div className='subjectpopular'  style={{marginTop:'11px'}}>人气值：{rowData.popularity}</div>
													</div>
													
												</div>
										</div>
										<div className='manages' style={{width:'auto',height:'25px',marginTop:'-65px',float:'right',marginRight:"5%"}}>
													<button className='button' style={{color:'#ffe300',border:"1px solid #ffe300",fontSize:'12px'}} key={rowID} onClick={()=>{
														Model.change('postListModel','query.subjectId',rowData._id)
														Model.dispatch({type:'postListModel/cancelFollow'})
														const self = this
													    Model.run('mineModel',function*({fetch,reduce,change,get}){
													    	const res=yield fetch(`my/follow?startIndex=0&pageSize=10`)
												            //const res= yield fetch(`post/?subjectId=${subjectId}&`)
												            const posts = res
												            yield change('myPostDate',posts)
												            	self.setState({
															      dataSource: self.state.dataSource.cloneWithRows(posts),
															      refreshing: false,
															      isLoading: false,
															    });
												        })

													}} >取消关注
												</button>
										</div>
										<div style={{width:'100%',height:'1px',background:'#eeeeee'}}></div>
											
										
												
									</div>:
									<div>
										{
											this.props.mytabs=='2'?
											<div  style={{height:'auto',marginBottom:'10px'}}>							
								 				<div style={{width:'100%'}}>
									 				<div style={{width:'90%',height:'50px',marginLeft:'5%'}}>
									 					<div style={{display:'flex',float:"left"}}>
										 				 	<div className='pic' style={{width:'46px',height:'46px',marginLeft:'0px'}}>
										 				 	{
										 				 		rowData.authorInfo!=null?
										 				 		<div>
										 				 		<img src={`${config.api}/medias/${rowData.authorInfo.avatar}`} className='logo' style={{borderRadius:'50%'}} />
										 				 		</div>:<div></div>
										 				 	}
										 				 	</div>
										 				 	<div style={{marginTop:'10px'}}>{rowData.authorInfo.nickname}</div>
										 				</div>
										 				<div style={{float:'right',width:'auto'}}>
										 					<button style={{width:'auto',height:'25px',border:'1px solid #ffe200',background:'#ffffff',color:'#ffe200',borderRadius:'5px',fontSize:'12px'}} onClick={()=>{
										 						Model.change('HomePageModel','query.postId',rowData._id)
										 						Model.dispatch({type:'HomePageModel/cancelCollect'})
										 						//Model.dispatch({type:'mineModel/getMycollect'})
										 						const self = this
															    Model.run('mineModel',function*({fetch,reduce,change,get}){
															    	const res=yield fetch(`my/favorite?startIndex=0&pageSize=10`)
														            //const res= yield fetch(`post/?subjectId=${subjectId}&`)
														            const posts = res
														            yield change('myPostDate',posts)
														            	self.setState({
																	      dataSource: self.state.dataSource.cloneWithRows(posts),
																	      refreshing: false,
																	      isLoading: false,
																	    });
														        })
										 					}}>取消收藏</button>
										 				</div>
									 				 	
										 			</div>
									 			<div style={{width:'90%',marginLeft:'5%',marginTop:'15px',display:'flex',height:'auto'}} onClick={()=>{
									 				Model.change('PostsDetailsModel','query.detailsId',rowData._id)
													Model.change('postListModel','query.subjectId',rowData.subjectId)
									 				window.mainView.router.load({
													    url: 'postDetails.html',
													    query: {
													    	// index,
													    	
													    }
													  })
									 			}}>
									 				{
									 					rowData.images.map((med,ind)=>{
														 if(med.length==='0')
														 	return <div key={ind}></div>
														else if(med.length!='0'){
															if(ind==0){
																return <div key={ind}   style={{display:'flex'}}>	
																			<div key={ind} className='conPic' style={{width:'60px',height:'60px',marginLeft:'0%',marginRight:'20px'}}>
																				<div className='logo' style={{height:'100%'}} >
																					<img  src={`${config.api}/medias/${med}`} style={{width:'100%',height:'100%'}} />
																				</div>
																			</div>
																			
																		</div>
															}
															else return <div key={ind}></div>
															}	
														})

									 				}
									 				<div>{rowData.title}</div>
									 			</div>
									 			<div style={{marginLeft:'5%',marginTop:'10px',height:'25px',width:'90%',fontSize:'12px'}}>{rowData.subjectInfo.name}&nbsp;&nbsp;&nbsp;&nbsp;{getTimes(rowData.createTime)}</div>	
									 			<div style={{width:'100%',height:'1px',background:'#eeeeee'}}></div>
								 				</div>
											</div>:<div></div>
										}
									</div>
								}
							</div>
								
					}
					
					
					
				</div>
				)
		}

		return (
			<div style={{background:'#ffffff',width:'100%',paddingBottom:'80px',paddingTop: '0px'}} className="page-content infinite-scroll" >
				
				 	{/*<DivTitle style={bgGround} >
					 	<div style={{width:"100%",textAlign:'center',paddingTop:'57px'}}>
					 		<ImgDiv>
					 			<Imgs src={`${config.api}/medias/${user.avatar}`} />
					 		</ImgDiv>
					 	</div>
					 	<div style={{width:'100%',textAlign:'center',marginTop:'10px'}}>
					 		<DatumDiv>{user.nickname}</DatumDiv>
					 	</div>
				 	</DivTitle>
				 	<div style={{width:'100%',height:'10px',background:'#f6f6f6'}}></div>
				 	<SelectDiv >
			 			<div className='detailsReply ' style={{display:'flex',width:'90%',textAlign:'center',height:'25px',paddingTop:'10px',marginTop:'0px',marginLeft:'5%'}}>
			 			{
						this.props.mytabs=='0'?
							<div className='mysendpost' style={{width:'auto',flex:'1',textAlign:'left'}}>
								<span style={{borderBottom:'2px solid #333333',width:"auto",height:'100%',paddingBottom:"8px"}}>发布的帖子({counts.postCount})</span>
							</div>:
							<div className='  mysendpostAfter' style={{width:'auto',flex:'1',textAlign:"left"}} onClick={()=>{
							Model.change('mineModel','mytabs','0')
							Model.dispatch({type:'mineModel/getMysendpost'})
							}}>
								<span style={{width:'auto',height:'100%'}}>发布的帖子({counts.postCount})</span>
							</div>
						}
						{
						this.props.mytabs=='1'?
							<div className='mysendpost' style={{width:'auto',flex:'1'}}>
								<span style={{borderBottom:'2px solid #333333',width:"auto",height:'100%',paddingBottom:"8px"}}>关注的板块({counts.followCount})</span>
							</div>:
							<div className='  mysendpostAfter' style={{width:'auto',flex:'1'}} onClick={()=>{
								Model.change('mineModel','mytabs','1')
								Model.dispatch({type:'mineModel/getMysubject'})
							}}>
								<span style={{width:'auto',height:'100%'}}>关注的板块({counts.followCount})</span>
							</div>
						}
						{
						this.props.mytabs=='2'?
						<div className='mysendpost' style={{width:'auto',flex:'1',textAlign:'right'}}>
							<span style={{borderBottom:'2px solid #333333',width:"auto",height:'100%',paddingBottom:"8px"}}>我的收藏({counts.favoriteCount})</span>
						</div>:
						<div className='  mysendpostAfter' style={{width:'auto',flex:'1',textAlign:'right'}} onClick={()=>{
							Model.change('mineModel','mytabs','2')
							Model.dispatch({type:'mineModel/getMycollect'})
						}}
						>
							<span style={{width:"auto",height:'100%'}}>我的收藏({counts.favoriteCount})</span>
						</div>
						}		
					</div>
					</SelectDiv>
					<FDiv></FDiv>*/}
					
						
						
						<ListView
							renderHeader={()=>
								
								<WrapDiv >
									<DivTitle style={bgGround} >
									 	<div style={{width:"100%",textAlign:'center',paddingTop:'57px'}}>
									 		<ImgDiv>
									 			<Imgs src={`${config.api}/medias/${user.avatar}`} />
									 		</ImgDiv>
									 	</div>
									 	<div style={{width:'100%',textAlign:'center',marginTop:'10px'}}>
									 		<DatumDiv>{user.nickname}</DatumDiv>
									 	</div>
								 	</DivTitle>
								 	<div style={{width:'100%',height:'10px',background:'#f6f6f6'}}></div>
								 	<SelectDiv >
							 			<div className='detailsReply ' style={{display:'flex',width:'90%',textAlign:'center',height:'25px',paddingTop:'10px',marginTop:'0px',marginLeft:'5%'}}>
							 			{
										this.props.mytabs=='0'?
											<div className='mysendpost' style={{width:'auto',flex:'1',textAlign:'left'}}>
												<span style={{borderBottom:'2px solid #333333',width:"auto",height:'100%',paddingBottom:"8px"}}>发布的帖子({counts.postCount})</span>
											</div>:
											<div className='  mysendpostAfter' style={{width:'auto',flex:'1',textAlign:"left"}} onClick={()=>{
											const self = this
											
											self.setState({
												      dataSource: self.state.dataSource.cloneWithRows([]),
												      refreshing: false,
												      isLoading: false,
												    });	

											Model.change('mineModel','mytabs','0')
											//Model.dispatch({type:'mineModel/getMysendpost'})
											//Model.change('mineModel','myPostDate',[])
										    Model.run('mineModel',function*({fetch,reduce,change,get}){
										    	const res=yield fetch(`my/post?startIndex=0&pageSize=10`)
									            yield change('myPostDate',res)
									         
									            	const newPostData = Model.get('mineModel').myPostDate
										            	self.setState({
													      dataSource: self.state.dataSource.cloneWithRows(newPostData),
													      refreshing: false,
													      isLoading: false,
												    });
									        	})
											}}>
												<span style={{width:'auto',height:'100%'}}>发布的帖子({counts.postCount})</span>
											</div>
										}
										{
										this.props.mytabs=='1'?
											<div className='mysendpost' style={{width:'auto',flex:'1'}}>
												<span style={{borderBottom:'2px solid #333333',width:"auto",height:'100%',paddingBottom:"8px"}}>关注的板块({counts.followCount})</span>
											</div>:
											<div className='  mysendpostAfter' style={{width:'auto',flex:'1'}} onClick={()=>{
												const self = this
												
												self.setState({
												      dataSource: self.state.dataSource.cloneWithRows([]),
												      refreshing: false,
												      isLoading: false,
												    });
												Model.change('mineModel','mytabs','1')
												//Model.dispatch({type:'mineModel/getMysubject'})
												Model.run('mineModel',function*({fetch,reduce,change,get}){
										    	const res=yield fetch(`my/follow?startIndex=0&pageSize=10`)
									            yield change('myPostDate',res)
									              const newPostData = Model.get('mineModel').myPostDate
									            	self.setState({
												      dataSource: self.state.dataSource.cloneWithRows(newPostData),
												      refreshing: false,
												      isLoading: false,
												    });
									        	})

											}}>
												<span style={{width:'auto',height:'100%'}}>关注的板块({counts.followCount})</span>
											</div>
										}
										{
										this.props.mytabs=='2'?
										<div className='mysendpost' style={{width:'auto',flex:'1',textAlign:'right'}}>
											<span style={{borderBottom:'2px solid #333333',width:"auto",height:'100%',paddingBottom:"8px"}}>我的收藏({counts.favoriteCount})</span>
										</div>:
										<div className='  mysendpostAfter' style={{width:'auto',flex:'1',textAlign:'right'}} onClick={()=>{
											const self=this
											
											self.setState({
												      dataSource: self.state.dataSource.cloneWithRows([]),
												      refreshing: false,
												      isLoading: false,
												    });
											Model.change('mineModel','mytabs','2')
											Model.run('mineModel',function*({fetch,reduce,change,get}){
										    	const res=yield fetch(`my/favorite?startIndex=0&pageSize=10`)
									            yield change('myPostDate',res)
									             const newPostData = Model.get('mineModel').myPostDate
									            	self.setState({
												      dataSource: self.state.dataSource.cloneWithRows(newPostData),
												      refreshing: false,
												      isLoading: false,
												    });
									        })
										}}
										>
											<span style={{width:"auto",height:'100%'}}>我的收藏({counts.favoriteCount})</span>
										</div>
										}		
									</div>
									</SelectDiv>
									<FDiv></FDiv>
									</WrapDiv>
								
							}
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
				          	onEndReached={this.onEndReached}
				          	pageSize={10}    //每次下拉之后显示的数据条数
				        />
						
					
				
			
				
		</div>
		)
		 }
}
export default Model.connect(['mineModel','postListModel','PostsDetailsModel','HomePageModel','PostsManage','sectors'])(Personal) 

// {
// 				this.props.mytabs=='0'?
// 				<div>
// 				{this.props.sendlists.map((obj,index)=>{
// 			 			return(
// 			 				<div  key={index} style={{height:'auto',borderBottom:'1px solid #f6f6f6',paddingBottom:'30px',marginBottom:'10px'}}>
// 			 					<div style={{width:'90%',marginLeft:'5%'}}>
// 			 						{
// 			 							this.props.sectorList.map((subjects,inds)=>{
// 			 								if(subjects._id==obj.subjectId)
// 			 									return <div key={inds} className='sendSubject' style={{width:'auto',float:'left'}}>来自{subjects.name}</div>
// 			 							})
// 			 						}
// 			 						<div className='sendSubject' style={{float:'left',width:'auto',marginLeft:'20px'}}>{getTimes(obj.createTime)}</div>
// 			 						<div style={{float:'right'}}>
// 			 							<Button style={{width:'40px',height:'25px'}}
// 									        onClick={() =>alert('删除', '是否删除该帖子', [
// 											          	{ text:'确定', onPress:() =>{
// 												           	Model.change('PostsManage','query.postId',obj._id)
// 												           	Model.dispatch({type:'PostsManage/deletePosts'})
// 											           		}
// 											       		},
// 										          		{ text: '取消', onPress: () => console.log('cancel') },
// 										        		])
// 										      	}>
// 	 										<div style={{fontSize:'12px',marginTop:'-10px',height:'25px',color:'#999999'}}>删除</div>
// 										</Button>
// 			 						</div>
// 								</div>
// 								<div>
// 								<div className="con" style={{height:'auto',width:'90%',marginLeft:'5%',fontWeight:'bold',marginBottom:'10px',marginTop:'10px'}} onClick={()=>{
// 										Model.change('PostsDetailsModel','query.detailsId',obj._id)
// 										Model.change('postListModel','query.subjectId',obj.subjectId)
// 										Model.change('PostsDetailsModel','administer','')
// 										window.mainView.router.load({
// 													    url: 'postDetails.html',
// 													    query: {
// 													    	// index,
													    	
// 													    }
// 													  })
// 											}}>
// 									<div className='titlename'>
// 										{obj.title}
// 									</div>
// 								</div>
// 								{
// 				 					obj.images.map((med,ind)=>{
// 										 if(med.length==='0')
// 										 	return <div key={ind}></div>
// 										else if(med.length!='0'){
// 											if(ind==0){
// 												return 	<div key={ind} className='conPic' style={{overflow:'hidden',width:'90%',marginLeft:'5%'}}>
// 															<div key={ind} className='logo' style={{height:'auto',width:'100%'}} onClick={()=>{
// 																Model.change('PostsDetailsModel','query.detailsId',obj._id)
// 																Model.change('postListModel','query.subjectId',obj.subjectId)
// 																Model.change('PostsDetailsModel','administer','')
// 																window.mainView.router.load({
// 																			    url: 'postDetails.html',
// 																			    query: {
// 																			    	// index,
																			    	
// 																			    }
// 																			  })
// 																	}} >
// 																<img  src={`${config.api}/medias/${med}`} style={{width:'100%',height:'100%'}} />
// 															</div>
// 														</div>
// 											}
// 											else return <div key={ind}></div>
// 										}	
// 									})
// 				 				}	
// 								</div>
// 								{
// 									obj.auditStatus==false?<div style={{width:'90%',marginLeft:'5%',marginTop:'10px'}}><div className='sendSubject' style={{float:'right'}}>帖子审核不通过</div></div>:
// 									<div>
// 										{
// 											obj.auditStatus==true?<div></div>:
// 											<div style={{width:'90%',marginLeft:'5%',marginTop:'10px'}}><div className='sendSubject' style={{float:'right'}}>帖子正在审核中</div></div>

// 										}
// 									</div>
									
// 								}		
// 						{/*<div style={{height:'1px',width:'100%',backgroundColor:'#f6f6f6',marginTop:'20px'}}></div>*/}
// 					</div>
// 					)
// 				})
// 				}
// 				</div>:this.props.mytabs=='1'?<div>
// 			{
// 				this.props.myLists.map(function (obj, index) {
// 				return (
// 					<div key={index}>
// 					<div className='sectors' style={{height:'85px',borderBottom:'0px solid',marginBottom:'10px',width:'100%',marginLeft:'0px'}} key={index} onClick={()=>{
// 						Model.change('postListModel','query.subjectId',obj._id)
// 						// if(cancelfollows==false){
// 						window.mainView.router.load({
// 										    url: 'list.html',
// 										    query: {
// 										    	index
// 										    }
// 										  })
// 						// }
// 						// Model.dispatch({type:'postListModel/getpostList',subjectId:obj._id})
// 					}}>
// 						<div className='sector' style={{marginLeft:'5%',height:'100%',paddingTop:'0px',borderBottom:'0px solid',width:'auto'}}>
// 							<div className='logopic' style={{width:'60px',height:'60px',marginTop:'20px'}}>
// 								<img className='logos' style={{borderRadius:"10px"}} src={`${config.api}/medias/${obj.image}`}/>
// 							</div>
// 							<div className='sectorCon' style={{width:'auto',height:'60px',marginTop:'20px'}} >
// 								<div className='subjectname' style={{marginTop:"6px"}} >{obj.name}</div>
// 								<div className='subjectpopular'  style={{marginTop:'11px'}}>人气值：{obj.popularity}</div>
// 							</div>
							
// 						</div>
// 						</div>
// 						<div className='manages' style={{width:'auto',height:'25px',marginTop:'-65px',float:'right',marginRight:"5%"}}>
// 									<button className='button' style={{color:'#ffe300',border:"1px solid #ffe300",fontSize:'12px'}} key={index} onClick={()=>{
// 										Model.change('postListModel','query.subjectId',obj._id)
// 									Model.dispatch({type:'postListModel/cancelFollow'})

// 									}} >取消关注
// 								</button>
// 						</div>
// 						<div style={{width:'100%',height:'1px',background:'#eeeeee'}}></div>
// 					</div>
				
// 				)
// 			})
// 			}
// 			</div>:this.props.mytabs=='2'?<div>
// 				{
// 						this.props.mycollect.map((obj,index)=>{	
// 						//obj.createTime=moment(obj.createTime).format("YYYY-MM-DD HH:mm:ss")				
// 			 			return(
// 			 				<div key={index} style={{width:'100%',marginBottom:'15px'}}>
// 			 				<div style={{width:'90%',height:'50px',marginLeft:'5%'}}>
// 			 					<div style={{display:'flex',float:"left"}}>
// 				 				 	<div className='pic' style={{width:'46px',height:'46px',marginLeft:'0px'}}>
// 				 				 		<img src={`${config.api}/medias/${obj.authorInfo.avatar}`} className='logo' style={{borderRadius:'50%'}} />
// 				 				 	</div>
// 				 				 	<div style={{marginTop:'10px'}}>{obj.authorInfo.nickname}</div>
// 				 				</div>
// 				 				<div style={{float:'right',width:'auto'}}>
// 				 					<button style={{width:'auto',height:'25px',border:'1px solid #ffe200',background:'#ffffff',color:'#ffe200',borderRadius:'5px',fontSize:'12px'}} onClick={()=>{
// 				 						Model.change('HomePageModel','query.postId',obj._id)
// 				 						Model.dispatch({type:'HomePageModel/cancelCollect'})
// 				 						Model.dispatch({type:'mineModel/getMycollect'})
// 				 					}}>取消收藏</button>
// 				 				</div>
			 				 	
// 				 			</div>
// 				 			<div style={{width:'90%',marginLeft:'5%',marginTop:'15px',display:'flex',height:'auto'}} onClick={()=>{
// 				 				Model.change('PostsDetailsModel','query.detailsId',obj._id)
// 								Model.change('postListModel','query.subjectId',obj.subjectId)
// 				 				window.mainView.router.load({
// 								    url: 'postDetails.html',
// 								    query: {
// 								    	// index,
								    	
// 								    }
// 								  })
// 				 			}}>
// 				 				{
// 				 					obj.images.map((med,ind)=>{
// 									 if(med.length==='0')
// 									 	return <div key={ind}></div>
// 									else if(med.length!='0'){
// 										if(ind==0){
// 											return <div key={ind}   style={{display:'flex'}}>	
// 														<div key={ind} className='conPic' style={{width:'60px',height:'60px',marginLeft:'0%',marginRight:'20px'}}>
// 															<div className='logo' style={{height:'100%'}} >
// 																<img  src={`${config.api}/medias/${med}`} style={{width:'100%',height:'100%'}} />
// 															</div>
// 														</div>
														
// 													</div>
// 										}
// 										else return <div key={ind}></div>
// 										}	
// 									})

// 				 				}
// 				 				<div>{obj.title}</div>
// 				 			</div>
// 				 			<div style={{marginLeft:'5%',marginTop:'10px',height:'25px',width:'90%',fontSize:'12px'}}>{obj.subjectInfo.name}&nbsp;&nbsp;&nbsp;&nbsp;{getTimes(obj.createTime)}</div>	
// 				 			<div style={{width:'100%',height:'1px',background:'#eeeeee'}}></div>
// 			 				</div>
// 			 				)
// 			 		})
// 				}
// 				</div>:<div></div>
// 			}