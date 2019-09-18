import React from 'react'
import { Model } from 'dvax'
import config from 'shared/config'

function PostManageSection({rowID,rowData,...props}){
	return(
			<div className='dtos' style={{width:'90%',marginLeft:'5%',borderBottom:'0px solid'}} >
			<div style={{marginLeft:'50px',paddingLeft:'11px',width:'100%',display:'flex',justifyContent:'space-between'}} className='boxs'>
				<div className='detailsPostSpan box' style={{width:'auto'}}>
					{
						rowData.topStatus!==true?
							<div className='re' style={{marginTop:'5px'}} onClick={()=>{
							Model.change('PostsManage','query.postId',rowData._id)
							Model.dispatch({type:'PostsManage/setTop'})
							const rData=props.postmanage
	 						const self=this
						    Model.run('PostsManage',function*({fetch,reduce,change,get}){
						          	const query = {
					                ...get().query
						            }
						            const subjectId=query.subjectId
						          	const res = yield fetch(`post/?subjectId=${subjectId}&startIndex=${rowID}&pageSize=1`)
					            	const posts = res.data
					            	console.log(posts)
					            	const post=posts[0]._id
					            	const Dates=rData.map((rdata,index)=>{
					            		//debugger
					            		if(rdata._id==post){
					            			rdata.topStatus=true
					            		}
					            		return rdata
					            	})
					            	Model.change('PostsManage','postmanage',Dates)
					            	props.TosetState()
	 						
					        })


						}}>
							设为置顶</div>:<div className='re' style={{marginTop:'5px',color:'#ffd100'}} onClick={()=>{
							Model.change('PostsManage','query.postId',rowData._id)
							Model.dispatch({type:'PostsManage/deleteTop'})
							const rData=props.postmanage
	 						const self=this
						    Model.run('PostsManage',function*({fetch,reduce,change,get}){
						          	const query = {
					                ...get().query
						            }
						            const subjectId=query.subjectId
						          	const res = yield fetch(`post/?subjectId=${subjectId}&startIndex=${rowID}&pageSize=1`)
					            	const posts = res.data
					            	console.log(posts)
					            	const post=posts[0]._id
					            	const Dates=rData.map((rdata,index)=>{
					            		//debugger
					            		if(rdata._id==post){
					            			rdata.topStatus=false
					            		}
					            		return rdata
					            	})
					            	Model.change('PostsManage','postmanage',Dates)
					            	//props.postmanage=Dates
					            	props.TosetState()
	 						
					        })
						}}>已置顶</div> 
				}
				</div>
				<div className='detailsPostSpan box' style={{width:'auto'}} >
					{
						rowData.recommendStatus===false?
					<div className='re' style={{marginTop:'5px'}} onClick={()=>{
							
							Model.change('PostsManage','query.postId',rowData._id)
							//Model.dispatch({type:'PostsManage/setExcellent'})
							const rData=props.postmanage
	 						
						    Model.run('PostsManage',function*({fetch,reduce,change,get,put}){
						          	const query = {
					                ...get().query
						            }
						            const subjectId=query.subjectId
						            yield put({type:'setExcellent'})
						          	const res = yield fetch(`post/?subjectId=${subjectId}&startIndex=${rowID}&pageSize=1`)
					            	const posts = res.data
					            	console.log(posts)
					            	const post=posts[0]._id
					            	const Dates=rData.map((rdata,index)=>{
					            		//debugger
					            		if(rdata._id==post){
					            			rdata.recommendStatus=true
					            		}
					            		return rdata
					            	})
					            	
					            	console.log('Dates',Dates)
					            	Model.change('PostsManage','postmanage',Dates)
					            	props.TosetState()
	 						
					        })
					
					}}>
	 						设为精华
	 					
	 				</div>:
	 				<div className='re' style={{marginTop:'5px',color:'#ffd100'}} onClick={()=>{
	 					Model.change('PostsManage','query.postId',rowData._id)
						//Model.dispatch({type:'PostsManage/deleteExcellent'})
						const rData=props.postmanage
					    Model.run('PostsManage',function*({fetch,reduce,change,get,put}){
					    		
					          	const query = {
				                ...get().query
					            }
					            const subjectId=query.subjectId
					            yield put({type:'deleteExcellent'})
					          	const res = yield fetch(`post/?subjectId=${subjectId}&startIndex=${rowID}&pageSize=1`)
				            	const posts = res.data
				            	console.log(posts)
				            	const post=posts[0]._id
				            	const Dates=rData.map((rdata,index)=>{
				            		//debugger
				            		if(rdata._id==post){
				            			rdata.recommendStatus=false
				            		}
				            		return rdata
				            	})
				            	
				            	console.log('Dates',Dates)
				            	Model.change('PostsManage','postmanage',Dates)
				            	
				            	props.TosetState()
				        })

	 				}}>
	 					
	 						已为精华
	 					
	 				</div>
					
	 				}	
						
				</div>
				<div className='detailsPostSpan box' style={{marginLeft:'10%',width:'auto'}}>
				
				<div style={{float:'right'}}>
					<div className='re' style={{marginTop:'5px'}} onClick={()=>{
					Model.change('PostsManage','query.postId',rowData._id)
					Model.dispatch({type:'PostsManage/deletePosts'})
					const self = this
				    Model.run('PostsManage',function*({fetch,reduce,change,get}){
				    	const query = {
			                ...get().query
			            }
			            const subjectId=query.subjectId
			            const res= yield fetch(`post/?subjectId=${subjectId}&startIndex=0&pageSize=10`)
			             const posts = res.data
			             console.log('length',posts.length)
			             yield change('postmanage',posts)
			             yield change('subjectInfos.subjectInfo',res.subjectInfo)
			             props.TosetState()
			       //      	self.setState({
						    //   dataSource: self.state.dataSource.cloneWithRows(posts),
						    //   refreshing: false,
						    //   isLoading: false,
						    // });
			        })
				}}>删除
					</div>
				</div>
				
				</div>
		</div>
		</div>
		)
}
export default Model.connect('PostsManage')(PostManageSection)