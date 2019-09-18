import React from 'react'
import { Model } from 'dvax'
import logo from '../subject/sectors/11.jpg'
import pic from './2.jpg'
// import Search from './searchPost.js'
import './homePage.css'
import config from 'shared/config'
import homehuifu from './huifu.png'
import homezan from './zan.png'
import homecai from './cai.png'
import homehuifuAfter from './huifuAfter.png'
import homezanAfter from './zanAfter.png'
import homecaiAfter from './caiAfter.png'
import collect from './collect.png'
import collectAfter from './collectAfter.png'

function PostComponent({rowID,rowid,rowData,...props}){
	return(
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
												<div key={ind} className='logo' style={{height:'auto',marginLeft:'50px',paddingLeft:'15px'}} onClick={()=>{
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
				{/*<div className='conPic'><img src={pic} className='logo' /></div>*/}
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
		 					<span className='re' style={{float:'left',height:"25px",lineHeight:'25px'}}>回复{rowData.replyNumber}
		 					</span>
		 				</div>
		 				<div className='detailsPostSpan box' style={{width:'auto',fontSize:'12px'}} onClick={()=>{
		 					
		 					Model.change('HomePageModel','query.postId',rowData._id)
		 					if(rowData.favoriteStatus==true){
		 						Model.dispatch({type:'HomePageModel/cancelCollect'})
		 						const rData=props.posts
							    Model.run('HomePageModel',function*({fetch,reduce,change,get}){
						          	const res = yield fetch(`post?startIndex=${rowID}&pageSize=1`)
						            	const posts = res.data
						            	console.log(posts)
						            	const post=posts[0]._id
						            	const Dates=rData.map((rdata,index)=>{
						            		//debugger
						            		if(rdata._id==post){
						            			rdata.favoriteStatus=false
						            		}
						            		return rdata
						            	})
						            	props.posts=Dates
						            	props.resetState()
						        })
		 					}
		 					else {
		 						Model.dispatch({type:'HomePageModel/Collect'})
		 						const rData=props.posts
							    Model.run('HomePageModel',function*({fetch,reduce,change,get}){
						          	const res = yield fetch(`post?startIndex=${rowID}&pageSize=1`)
						            	const posts = res.data
						            	console.log(posts)
						            	const post=posts[0]._id
						            	const Dates=rData.map((rdata,index)=>{
						            		//debugger
						            		if(rdata._id==post){
						            			rdata.favoriteStatus=true
						            		}
						            		return rdata
						            	})
						            	props.posts=Dates
						            	props.resetState()
						        })
		 					}
		 				}} >
		 					{
		 						rowData.favoriteStatus==true?
		 						<div style={{float:'right'}}>
				 					<img src={collectAfter} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
				 					<span className='re' style={{float:'left',height:'25px',lineHeight:"25px",color:'#ffd100',marginRight:'10px'}} >
				 						收藏
				 					</span>
		 						</div>:
		 						<div style={{float:'right'}}>
				 					<img src={collect} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
				 					<span className='re' style={{float:'left',height:'25px',lineHeight:"25px",marginRight:'10px'}}>
				 						收藏
				 					</span>
		 						</div>
		 					}
		 					
		 				</div>
		 				<div className='detailsPostSpan box' style={{marginLeft:'10%',width:'auto',fontSize:'12px'}}  onClick={()=>{
		 					if(rowData.thumbStatus==false){
		 						Model.change('HomePageModel','query.postId',rowData._id)
		 						Model.dispatch({type:'HomePageModel/makeThumb'})
		 						const rData=props.posts
							    Model.run('HomePageModel',function*({fetch,reduce,change,get}){
						          	const res = yield fetch(`post?startIndex=${rowID}&pageSize=1`)
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
						            	props.posts=Dates
						            	props.resetState()
						        })
		 						
		 					}
		 					else
		 					{
		 						Model.change('HomePageModel','query.postId',rowData._id)
		 						Model.dispatch({type:'HomePageModel/cancelThumb'})
		 						const rData=props.posts
							    Model.run('HomePageModel',function*({fetch,reduce,change,get}){
						          	const res = yield fetch(`post?startIndex=${rowID}&pageSize=1`)
						            	const posts = res.data
						            	console.log(posts)
						            	const post=posts[0]._id
						            	const Dates=rData.map((rdata,index)=>{
						            		//debugger
						            		if(rdata._id==post){
						            			rdata.thumbStatus=false
						            			rdata.thumbNumber=rdata.thumbNumber-1
						            		}
						            		return rdata
						            	})
						            	props.posts=Dates
						            	props.resetState()
						        })
		 						
		 					}	
		 				}}>
		 				
		 				{
		 					rowData.thumbStatus==true?<div style={{float:'right',marginTop:"-1px"}}><img src={homezanAfter} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
		 					<span className='re' style={{float:'right',color:'#ffd100',height:'26px',lineHeight:'26px'}}>
		 						赞{rowData.thumbNumber}
		 					</span></div>:<div style={{float:'right',marginTop:"-1px"}}><img src={homezan} style={{float:'left',width:'23px',height:'23px',paddingTop:'0px'}} />
		 					<span className='re' style={{float:'right',height:'26px',lineHeight:'26px'}}>
		 						赞{rowData.thumbNumber}
		 					</span></div>
		 				}
		 				</div>
					</div>
				
					
 				</div>
				<div style={{width:'100%',height:'1px',background:'#eeeeee'}}></div>
			</div>	
			
		);
}

export default Model.connect(['HomePageModel','PostsDetailsModel'])(PostComponent)



