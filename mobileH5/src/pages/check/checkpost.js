import React from 'react'
import { Model } from 'dvax'
import logo from '../subject/sectors/11.jpg'
import pic from './2.jpg'
import { ListView,PullToRefresh ,Button} from 'antd-mobile';
import config from 'shared/config'
import moment from 'moment'
import {getTimes} from '../homePage/homePage.js'
class CheckPost extends React.Component{
	constructor(props) {
	    super(props);
	    const dataSource = new ListView.DataSource({  //这个dataSource有cloneWithRows方法
	      rowHasChanged: (row1, row2) => row1 !== row2,
	    });

	    // this.pageNo = 0 //定义分页信息
	    this.state = {
	      dataSource,
	      refreshing: true,
	      isLoading: true,
	      hasMore: true
	    };
  	}

async	componentDidMount() {
		Model.dispatch({ type: 'sectors/getSector' })
		const self = this
	    Model.run('manageModel',function*({fetch,reduce,change,get}){
	    	const query={
    			...get().query
    		}
    		const subjectId =query.subjectId
    		const res= yield fetch(`subject-setting/audit/${subjectId}?startIndex=0&pageSize=10`)
    		const posts=res.data
                yield change('CheckingData',posts)
                yield change('checkingLists',posts)

            	self.setState({
			      dataSource: self.state.dataSource.cloneWithRows(posts),
			      refreshing: false,
			      isLoading: false,
			    });
        })
	}
	resetState = () => {
        const posts = Model.get('manageModel').CheckingData
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(posts),
	        refreshing: false,
	        isLoading: false,
	    });
	}
	onEndReached = (event) => {
		const CheckingData=this.props.CheckingData
		const len=CheckingData.length
	    if (this.state.isLoading && !this.state.hasMore) {
	      return;
	    }   //如果this.state.hasMore为false，说明没数据了，直接返回
	    console.log('reach end', event);
	    this.setState({ isLoading: true });
	    const self=this
	    Model.run('manageModel',function*({fetch,reduce,change,get}){
	    	const query={
    			...get().query
    		}
    		const subjectId =query.subjectId
    		const startIndex=len
    		const res= yield fetch(`subject-setting/audit/${subjectId}?startIndex=${startIndex}&pageSize=10`)
        	const posts = res.data
        	self.CheckingData = [...CheckingData,...posts]
        	yield change('CheckingData',self.CheckingData)
        	self.setState({
			      dataSource: self.state.dataSource.cloneWithRows(self.CheckingData),
			      isLoading: false,
		    });
        })
	  };

	render(){
		console.log('checklist',this.props)
		const row = (rowData, sectionID, rowID) => {
			return(
				<div key={rowID}>				
					<div className='post' style={{height:'auto',marginBottom:'10px'}} >
						<div style={{width:'90%',marginLeft:'5%'}} onClick={()=>{
							Model.change('PostsDetailsModel','query.detailsId',rowData._id)
							Model.change('postListModel','query.subjectId',rowData.subjectId)
							window.mainView.router.load({
										    url: 'postDetails.html',
										    query: {
										    	// index,
										    	
										    }
										  })
						}}>
							<div className='title' style={{height:'60px'}}>
								<div className='pic' style={{width:'46px',height:'46px',marginLeft:'0px'}}>
									<img src={`${config.api}/medias/${rowData.authorInfo.avatar}`} className='logo picLogo' />
								</div>
								<div className='tip' style={{width:'auto'}}>
									<div className='Name' style={{marginTop:'0px'}}>{rowData.authorInfo.nickname}</div>
									{
										this.props.sectorList.map((sect,index)=>{
											if(sect._id==this.props.query.subjectId){
												return 	<div key={index} style={{marginTop:'9px',display:'flex'}}>
															<div className='Time'>{sect.name}</div>
															<div className='Time' style={{marginLeft:'24px'}}>{getTimes(rowData.createTime)}</div>
														</div> 
											}
										})
									}
									
								</div>
							</div>
						</div>
						<div className="con" style={{height:"auto",width:'90%',marginLeft:'5%'}} onClick={()=>{
							Model.change('PostsDetailsModel','query.detailsId',rowData._id)
							window.mainView.router.load({
										    url: 'postDetails.html',
										    query: {
										    	// index,
										    	
										    }
										  })
								}}>
								<div className="titlename" style={{marginLeft:'50px',paddingLeft:'11px'}}>{rowData.title}</div>
						</div>
						{
		 					rowData.images.map((med,ind)=>{
								 if(med.length==='0')
								 	return <div key={ind}></div>
								else if(med.length!='0'){
									if(ind==0){
										return 	<div key={ind} className='conPic' style={{overflow:'hidden',width:'90%',marginLeft:'5%'}}>
													<div key={ind} className='logo' style={{height:'auto',marginLeft:'50px',paddingLeft:'11px'}} onClick={()=>{
														Model.change('PostsDetailsModel','query.detailsId',rowData._id)
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
						<div  style={{borderBottom:'0px solid',height:'25px',width:'90%',marginLeft:'5%',marginTop:'10px'}}>
							<div style={{width:'auto'}}>
								<div className='re' style={{marginLeft:'50px',paddingLeft:'11px',float:'left'}} onClick={()=>{
									Model.change('manageModel','query.postId',rowData._id)
									Model.dispatch({type:'manageModel/passAudit'})
									
									const self = this
								    Model.run('manageModel',function*({fetch,reduce,change,get}){
								    	const query={
							    			...get().query
							    		}
							    		const subjectId =query.subjectId
							    		const res= yield fetch(`subject-setting/audit/${subjectId}?startIndex=0&pageSize=10`)
							    		const posts=res.data
							                yield change('CheckingData',posts)
							                yield change('checkingLists',posts)

							            	self.setState({
										      dataSource: self.state.dataSource.cloneWithRows(posts),
										      refreshing: false,
										      isLoading: false,
										    });
										  Model.dispatch({type:'messageModel/getNotread'})
							        })	
									
									// const CheckingData=this.props.CheckingData
								 //   	CheckingData.map((NewCheckingData,inds)=>{
								 //   		if(CheckingData._id!=rowData._id)								   		
								 //   			return NewCheckingData

								 //   	})
							  //  		console.log('NewCheckingData',CheckingData)
								 //   	Model.change('manageModel','CheckingData',CheckingData)
							  //    //        	this.setState({
									// 	  //     dataSource: this.state.dataSource.cloneWithRows(CheckingData),
									// 	  //     refreshing: false,
									// 	  //     isLoading: false,
								 //    // });
								 //    this.resetState()
							        



									}}>通过审核
								</div>
							</div>
							<div style={{width:'auto'}}>
								{
									<div className='re' style={{marginLeft:'50px',paddingLeft:'15px',float:'right'}} onClick={()=>{
										Model.change('manageModel','query.postId',rowData._id)
										Model.dispatch({type:'manageModel/unPassAudit'})
										const self = this
									    Model.run('manageModel',function*({fetch,reduce,change,get}){
									    	const query={
								    			...get().query
								    		}
								    		const subjectId =query.subjectId
								    		const res= yield fetch(`subject-setting/audit/${subjectId}?startIndex=0&pageSize=10`)
								    		const posts=res.data
								                yield change('CheckingData',posts)
								                yield change('checkingLists',posts)

								            	self.setState({
											      dataSource: self.state.dataSource.cloneWithRows(posts),
											      refreshing: false,
											      isLoading: false,
											    });
											   Model.dispatch({type:'messageModel/getNotread'})
								        })	


										// const CheckingData=this.props.CheckingData
									 //   	CheckingData.map((NewCheckingData,inds)=>{
									 //   		if(CheckingData._id!=rowData._id)								   		
									 //   			return NewCheckingData

									 //   	})
								  //  		console.log('NewCheckingData',CheckingData)
									 //   	Model.change('manageModel','CheckingData',CheckingData)
								     //        	this.setState({
											  //     dataSource: this.state.dataSource.cloneWithRows(CheckingData),
											  //     refreshing: false,
											  //     isLoading: false,
									    // });
									     //this.resetState()
									}}>审核不通过</div>
								}
							</div>
						</div>
						<div style={{width:'100%',height:'1px',background:'#eeeeee'}}></div>
					</div>
						
				</div>
				)
		}

		return (

			<div style={{background:'#ffffff',width:'100%',paddingTop:'44px',paddingBottom:'70px',overflow:'hidden'}} className="page-content infinite-scroll">
					
				
			 	
				
				<ListView
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
		            onRefresh={()=>{
		            	const self = this
						    Model.run('manageModel',function*({fetch,reduce,change,get}){
						    	const query={
					    			...get().query
					    		}
					    		const subjectId =query.subjectId
					    		const res= yield fetch(`subject-setting/audit/${subjectId}?startIndex=0&pageSize=10`)
					    		const posts=res.data
					                yield change('CheckingData',posts)
					                yield change('checkingLists',posts)

					            	self.setState({
								      dataSource: self.state.dataSource.cloneWithRows(posts),
								      refreshing: false,
								      isLoading: false,
								    });
					        })	
		            }}
		          	/>}
		          	onEndReached={this.onEndReached}
		          	pageSize={10}    //每次下拉之后显示的数据条数
		        />
			</div>
		)
		}
}
export default Model.connect(['sectors','manageModel'])(CheckPost)
	
/*
 if(record.lock=="UNLOCK")
        return  <div>
                <span onClick={()=>Model.dispatch({type:'userParents/lockParents',householderId:record.householderId})} style={{color:'#1890FF',cursor:'pointer'}}>
              未冻结
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span onClick={()=>openEdit(record)} style={{color:'#1890FF',cursor:'pointer'}}>
              编辑
                </span>            
                </div>*/
//{
			 		/*this.props.checkingLists.map((obj,index)=>{
			 			obj.createTime=moment(obj.createTime).format("YYYY-MM-DD HH:mm:ss")
			 			
			 			return(
							<div className='post' key={index} style={{height:'auto',marginBottom:'10px'}} >
								<div style={{width:'90%',marginLeft:'5%'}} onClick={()=>{
									Model.change('PostsDetailsModel','query.detailsId',obj._id)
									Model.change('postListModel','query.subjectId',obj.subjectId)
									window.mainView.router.load({
												    url: 'postDetails.html',
												    query: {
												    	// index,
												    	
												    }
												  })
								}}>
									<div className='title' style={{height:'60px'}}>
										<div className='pic' style={{width:'46px',height:'46px',marginLeft:'0px'}}>
											<img src={`${config.api}/medias/${obj.authorInfo.avatar}`} className='logo picLogo' />
										</div>
										<div className='tip' style={{width:'auto'}}>
											<div className='Name' style={{marginTop:'0px'}}>{obj.authorInfo.nickname}</div>
											{
												this.props.sectorList.map((sect,index)=>{
													if(sect._id==this.props.query.subjectId){
														return 	<div key={index} style={{marginTop:'9px',display:'flex'}}>
																	<div className='Time'>{sect.name}</div>
																	<div className='Time' style={{marginLeft:'24px'}}>{getTimes(obj.createTime)}</div>
																</div> 
													}
												})
											}
											
										</div>
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
										}}><div className="titlename" style={{marginLeft:'50px',paddingLeft:'11px'}}>{obj.title}</div>
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
								<div  style={{borderBottom:'0px solid',height:'25px',width:'90%',marginLeft:'5%',marginTop:'10px'}}>
									<div style={{width:'auto'}}>
										<div className='re' style={{marginLeft:'50px',paddingLeft:'11px',float:'left'}} onClick={()=>{
											Model.change('manageModel','query.postId',obj._id)
											Model.dispatch({type:'manageModel/passAudit'})
											}}>通过审核
										</div>
									</div>
									<div style={{width:'auto'}}>
										{
											<div className='re' style={{marginLeft:'50px',paddingLeft:'15px',float:'right'}} onClick={()=>{
												Model.change('manageModel','query.postId',obj._id)
												Model.dispatch({type:'manageModel/unPassAudit'})
											}}>审核不通过</div>
										}
									</div>
									{/*<span className='dto' onClick={()=>{
										Model.change('PostsManage','query.postId',obj._id)
										Model.dispatch({type:'PostsManage/deletePosts'})
									}}>删除</span>*/
								/*</div>
								<div style={{width:'100%',height:'1px',background:'#eeeeee'}}></div>
							</div>
						)
					})*/
			//	}*/