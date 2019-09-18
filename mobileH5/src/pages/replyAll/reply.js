import React from 'react'
import { Model } from 'dvax'
import logo from '../subject/sectors/11.jpg'
import pic from '../post/2.jpg'
import config from 'shared/config'
import zan from './zan.png'
import cai from './cai.png'
import '../postDetails/postDetails.css'
import './reply.css'
import Footer from './footer'
import moment from 'moment'
import {getTimes} from '../homePage/homePage.js'
import IosInput from './footer/iosInput.js'
import {Modal} from 'antd-mobile'
import release from './footer/release'
import toast from 'dvax/toast'
import '../homePage/homePage.css'
import { ListView,PullToRefresh ,Button} from 'antd-mobile';
const prompt = Modal.prompt;
class ReplyAll extends React.Component{
	// constructor(props) {
	//     super(props);
	//     const dataSource = new ListView.DataSource({  //这个dataSource有cloneWithRows方法
	//       rowHasChanged: (row1, row2) => row1 !== row2,
	//     });

	//     this.pageNo = 0 //定义分页信息
	//     this.state = {
	//       dataSource,
	//       refreshing: true,
	//       isLoading: true,
	//       hasMore: true
	//     };
 //  	}

	componentDidMount() {
		Model.dispatch({type:'CommentsModel/getFloorComments'})
		// const self = this
	 //    Model.run('CommentsModel',function*({fetch,reduce,change,get}){
	 //    	const query = {
  //               ...get().query
  //           }
  //           const commentId=query.commentsId
  //           const postId=query.postId
  //           const res= yield fetch(`comment/${postId}/${commentId}?startIndex=0&pageSize=10`)
  //           if(!res) return
  //           const posts = res.data	
  //           yield change('replyComment',posts)           
  //           	self.setState({
		// 	      dataSource: self.state.dataSource.cloneWithRows(posts),
		// 	      refreshing: false,
		// 	      isLoading: false,
		// 	    });
  //       })

	}
// onEndReached = (event) => {
// 		const replyComment=this.props.replyComment
// 		const len=replyComment.length
// 	    if (this.state.isLoading && !this.state.hasMore) {
// 	      return;
// 	    }   //如果this.state.hasMore为false，说明没数据了，直接返回
// 	    console.log('reach end', event);
// 	    this.setState({ isLoading: true });
// 	    const self=this
	   
// 		    Model.run('CommentsModel',function*({fetch,reduce,change,get}){
// 		    	const query = {
//                 ...get().query
// 	            }
// 	            const commentId=query.commentsId
// 	            const postId=query.postId
	            
// 	            const startIndex=len
	          
// 	          	const res = yield fetch(`comment/${postId}/${commentId}?startIndex=${startIndex}&pageSize=10`)
// 	            	const posts = res.data
// 	            	self.replyComment = [...replyComment,...posts]
// 	            	yield change('replyComment',self.replyComment)
// 	            	self.setState({
// 			      	dataSource: self.state.dataSource.cloneWithRows(self.replyComment),
// 			      	isLoading: false,
// 			    });
// 	        })
       
// 	  };
	render(){
			var browser = {
		        versions: function() {
		            var u = navigator.userAgent;
		            return {//移动终端浏览器版本信息 
		                trident: u.indexOf('Trident') > -1, //IE内核
		                presto: u.indexOf('Presto') > -1, //opera内核
		                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
		                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
		                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
		                iPad: u.indexOf('iPad') > -1, //是否iPad
		                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		            };
		        }(),
		        language: (navigator.browserLanguage || navigator.language).toLowerCase()
		        }
			const List=this.props.replylists
			const commentInfo= this.props.commentInfos.commentInfo
			const authorInfo=this.props.commentInfos.authorInfo
		



			/*const row = (rowData, sectionID, rowID) =>{
				
				return(
					<div key={rowID}>
						<div  onClick={()=>{										
							Model.change('CommentsModel','query.userId',rowData.authorInfo.userId)
							if(browser.versions.iPhone){
								const reName='回复'+rowData.authorInfo.nickname+':'
								Model.change('CommentsModel','placeholderValue',reName)
								prompt('', '',
							      [
							        {
							          text: '取消',
							          onPress: value => new Promise((resolve) => {
							            Model.change('CommentsModel','placeholderValue','写评论...')
							            setTimeout(() => {
							              resolve();
							              //console.log(`value:${value}`);
							            }, 500);
							          }),
							        },
							        {
							          text: '发布',
							          onPress: value => new Promise((resolve, reject) => {
							            Model.change('CommentsModel','inputText',value)
							            Model.run('CommentsModel',function*({change,get,fetch,reduce,put}){
									      	const comment = get().inputText
									        const query = {
									                ...get().query
									            }
									        const postId=query.postId
									        const commentsId=query.commentsId
									        const userId=query.userId
									        const replyedName = get().replyedName
									       
									        if (!comment || comment === '') {
									            toast('不能提交空内容', 2000, 'bad')
									            return
									        }
									        if(replyedName==''){
									           const res = yield fetch(`comment/${postId}/${commentsId}`,{method:'post',body:{content:comment,userId:userId}}) 
									        }
									         else{
									             const res = yield fetch(`comment/${postId}/${commentsId}`,{method:'post',body:{content:comment,userId:userId}}) 
									         }

									        toast('回复成功', 1000, 'good')
									        yield change('inputText', '')
									        yield change('placeholderValue','写评论...')
									         yield change('query.userId','')
									        
									        yield put({type:'getFloorComments'})
									    })
							            
							            setTimeout(() => {
							              resolve();
							            }, 500);
							          }),
							        },
							      ], 'default', null, [reName])
							}
							else{
								if(this.props.administer==''){
								global.commentInput.current.focus()
								const reName='回复'+rowData.authorInfo.nickname+':'
								Model.change('CommentsModel','placeholderValue',reName)
								}
							}
					}}>
						<div className="detailsUser replyuser" style={{height:'45px',display:'flex',width:'90%',marginLeft:'5%',marginTop:"10px"}}>
							<div className='userpic' style={{height:'32px',width:'32px'}}>
								<img src={`${config.api}/medias/${rowData.authorInfo.avatar}`} className='detailsLogo' />
							</div>
							<div className='detailsUsername' style={{width:'auto'}}>
								<div className="detailsname messcon" style={{color:"#333333"}}>{rowData.authorInfo.nickname}</div>
								<div className='detailsTime HostTime' style={{fontSize:'12px'}}>
									{getTimes(rowData.createTime)}
								</div>
							</div>
						</div>
						<div className='layerBorder' style={{height:'auto',width:'90%',borderBottom:'0px',marginLeft:"5%"}}>
						{
							rowData.replyUserInfo==null?
							<div className='messcon' style={{paddingLeft:'47px',marginLeft:'0px',color:'#333333'}}>
								{rowData.content}
								{
									this.props.administer==true?
									<span className='layertitle' style={{marginLeft:'20px'}} onClick={()=>{
										Model.change('CommentsModel','query.commentsId',rowData.commentId)
										Model.change('PostsDetailsModel','query.deleteReplyId',rowData._id)
										Model.dispatch({type:'PostsDetailsModel/deleteComment'})
										Model.dispatch({type:'CommentsModel/getFloorComments'})
									}}>删除</span>:
									<div></div>
								}
								
							</div>:
							<div className=' messcon' style={{paddingLeft:'47px',marginLeft:'0px',color:'#333333'}}>
								回复{rowData.replyUserInfo.nickname}:{rowData.content}
								{
									this.props.administer==true?
									<span className='layertitle' style={{marginLeft:'20px'}} onClick={()=>{
										Model.change('CommentsModel','query.commentsId',rowData.commentId)
										Model.change('PostsDetailsModel','query.deleteReplyId',rowData._id)
										Model.dispatch({type:'PostsDetailsModel/deleteComment'})
										Model.dispatch({type:'CommentsModel/getFloorComments'})
									}}>删除</span>:
									<div></div>
								}
								
							</div>
						}
							
							
						</div>
							
						<div className='layerBorder' style={{height:'1px',marginTop:'10px',background:'#cfcfcfcf',marginBottom:'5px'}}>
						</div>

								
						</div>
					</div>
					)
			}*/

		return (

			<div style={{background:'#ffffff',width:'100%',paddingTop:'44px'}} >
				<div className='detailsWrap' style={{width:'100%',marginLeft:'0px'}}>
					<div className="detailsfooter" style={{width:'100%',marginLeft:'0px'}}>
						<div className="detailsUser replyuser" style={{height:'60px',display:'flex',width:'90%',marginLeft:'5%'}} >
							<div className='userpic' style={{width:'46px',height:'46px'}}>
								<img src={`${config.api}/medias/${authorInfo.avatar}`} className='detailsLogo' />
							</div>
							<div className='detailsUsername' style={{width:'auto'}}>
								<div className="detailsname Name" style={{height:'50%'}}>{authorInfo.nickname}</div>
								<div className='detailsTime HostTime'>
									{getTimes(commentInfo.createTime)}
								</div>
							</div>
						</div>
						<div className='layers' style={{height:'auto',width:'90%',borderBottom:'0px',marginLeft:'5%'}}>
							<div className='layer' style={{paddingLeft:'15px',fontSize:'14px',marginLeft:'50px'}}>
								{commentInfo.content}
								{
									// this.props.administer==true?
									// <span className='layertitle' style={{marginLeft:'20px'}}>删除</span>:
									// <div></div>
								}
								
							</div>
							
						</div>
						<div className='layerBorder' style={{height:'1px',marginTop:'10px',background:'#cfcfcfcf',marginBottom:'5px'}}>
						</div>

						<div className='replyTotal' style={{width:'90%',marginLeft:'5%',height:'auto',fontSize:'16px',color:'#999999',marginBottom:'0px',marginTop:"0px"}}>{commentInfo.replyNumber}回复</div>
						<div className='layerBorder ' style={{height:'1px',marginTop:'5px',background:'#cfcfcfcf',marginBottom:'10px'}}></div>
						{
							List.map((replies,index)=>{
								
								//replies.createTime=moment(replies.createTime).format("YYYY-MM-DD HH:mm:ss")
								return <div key={index} onClick={()=>{										
										Model.change('CommentsModel','query.userId',replies.authorInfo.userId)
										if(browser.versions.iPhone){
											const reName='回复'+replies.authorInfo.nickname+':'
											Model.change('CommentsModel','placeholderValue',reName)
											prompt('', '',
										      [
										        {
										          text: '取消',
										          onPress: value => new Promise((resolve) => {
										            Model.change('CommentsModel','placeholderValue','写评论...')
										            setTimeout(() => {
										              resolve();
										              //console.log(`value:${value}`);
										            }, 500);
										          }),
										        },
										        {
										          text: '发布',
										          onPress: value => new Promise((resolve, reject) => {
										            Model.change('CommentsModel','inputText',value)
										            Model.run('CommentsModel',function*({change,get,fetch,reduce,put}){
												      	const comment = get().inputText
												        const query = {
												                ...get().query
												            }
												        const postId=query.postId
												        const commentsId=query.commentsId
												        const userId=query.userId
												        const replyedName = get().replyedName
												       
												        if (!comment || comment === '') {
												            toast('不能提交空内容', 2000, 'bad')
												            return
												        }
												        if(replyedName==''){
												           const res = yield fetch(`comment/${postId}/${commentsId}`,{method:'post',body:{content:comment,userId:userId}}) 
												        }
												         else{
												             const res = yield fetch(`comment/${postId}/${commentsId}`,{method:'post',body:{content:comment,userId:userId}}) 
												         }

												        toast('回复成功', 1000, 'good')
												        yield change('inputText', '')
												        yield change('placeholderValue','写评论...')
												        yield put({type:'getFloorComments'})
												    })
										            
										            setTimeout(() => {
										              resolve();
										            }, 500);
										          }),
										        },
										      ], 'default', null, [reName])
										}
										else{
											if(this.props.administer==''){
											global.commentInput.current.focus()
											const reName='回复'+replies.authorInfo.nickname+':'
											Model.change('CommentsModel','placeholderValue',reName)
											}
										}
								}}>
									<div className="detailsUser replyuser" style={{height:'45px',display:'flex',width:'90%',marginLeft:'5%',marginTop:"10px"}}>
										<div className='userpic' style={{height:'32px',width:'32px'}}>
											<img src={`${config.api}/medias/${replies.authorInfo.avatar}`} className='detailsLogo' />
										</div>
										<div className='detailsUsername' style={{width:'auto'}}>
											<div className="detailsname messcon" style={{color:"#333333"}}>{replies.authorInfo.nickname}</div>
											<div className='detailsTime HostTime' style={{fontSize:'12px'}}>
												{getTimes(replies.createTime)}
											</div>
										</div>
									</div>
									<div className='layerBorder' style={{height:'auto',width:'90%',borderBottom:'0px',marginLeft:"5%"}}>
									{
										replies.replyUserInfo==null?
										<div className='messcon' style={{paddingLeft:'47px',marginLeft:'0px',color:'#333333'}}>
											{replies.content}
											{
												this.props.administer==true?
												<span className='layertitle' style={{marginLeft:'20px'}} onClick={()=>{
													Model.change('CommentsModel','query.commentsId',replies.commentId)
													Model.change('CommentsModel','query.deleteReplyId',replies._id)
													Model.dispatch({type:'CommentsModel/deleteComment'})
												}}>删除</span>:
												<div></div>
											}
											
										</div>:
										<div className=' messcon' style={{paddingLeft:'47px',marginLeft:'0px',color:'#333333'}}>
											回复{replies.replyUserInfo.nickname}:{replies.content}
											{
												this.props.administer==true?
												<span className='layertitle' style={{marginLeft:'20px'}} onClick={()=>{
													Model.change('CommentsModel','query.commentsId',replies.commentId)
													Model.change('CommentsModel','query.deleteReplyId',replies._id)
													Model.dispatch({type:'CommentsModel/deleteComment'})
												}}>删除</span>:
												<div></div>
											}
											
										</div>
									}
										
										
									</div>
										
										<div className='layerBorder' style={{height:'1px',marginTop:'10px',background:'#cfcfcfcf',marginBottom:'5px'}}>
										</div>

										
								</div>
							})
						}
						
						<div className='layerBorder' style={{height:'60px',marginTop:'10px',marginBottom:'25px'}}>
						</div>
						
					</div>
				</div>
				{/*<ListView
				          	ref={el => this.lv = el}
				          	dataSource={this.state.dataSource}
				          	renderFooter={    //renderFooter就是下拉时候的loading效果
				            () => (
				                  	<div style={{ padding: 30, textAlign: 'center',marginBottom:100 }}>
				                    {this.state.isLoading ? 'Loading...' : '没有更多'}
				                  	</div>
				                )
				          	}
				          	renderRow={row}
				          	pullToRefresh={<PullToRefresh  
				            refreshing={this.state.refreshing}
				            onRefresh={()=>{
				            	const self = this
							    Model.run('CommentsModel',function*({fetch,reduce,change,get}){
							    	const query = {
						                ...get().query
						            }
						            const commentId=query.commentsId
						            const postId=query.postId
						            const res= yield fetch(`comment/${postId}/${commentId}?startIndex=0&pageSize=10`)
						            if(!res) return
						            const posts = res.data	
						            yield change('replyComment',posts)           
						            	self.setState({
									      dataSource: self.state.dataSource.cloneWithRows(posts),
									      refreshing: false,
									      isLoading: false,
									    });
						        })
				            }}

				          	/>}
				          	onEndReached={this.onEndReached}
				          	pageSize={10} 
				          	style={{marginTop:'-11px'}}
				          	   //每次下拉之后显示的数据条数
				  />*/}
			
			</div>
		)
		}
}
export default Model.connect(['CommentsModel','messageModel','PostsDetailsModel'])(ReplyAll)