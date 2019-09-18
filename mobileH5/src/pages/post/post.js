import React from 'react'
import { Model } from 'dvax'
import logo from '../subject/sectors/11.jpg'
import pic from './2.jpg'
import Search from './searchPost.js'
import './post.css'
import config from 'shared/config'
import moment from 'moment'
import PostManageSection from './postSection.js'
import { ListView,PullToRefresh ,Button} from 'antd-mobile';
import {getTimes} from '../homePage/homePage.js'
class PostManage extends React.Component{
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
		//Model.dispatch({type:'PostsManage/getPosts'})
		Model.dispatch({ type: 'sectors/getSector' })
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
            	self.setState({
			      dataSource: self.state.dataSource.cloneWithRows(posts),
			      refreshing: false,
			      isLoading: false,
			    });
        })

	}
	TosetState = () => {
		
        const managepost= Model.get('PostsManage').postmanage
      
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(managepost),
	        refreshing: false,
	        isLoading: false,
	    });
	}
	onEndReached = async (event) => {
        const rData=this.props.postmanage
        const len=rData.length
	    if (this.state.isLoading && !this.state.hasMore) {
	      return;
	    }   //如果this.state.hasMore为false，说明没数据了，直接返回
	    
	    this.setState({ isLoading: true });
	    const self=this
	   
		    Model.run('PostsManage',function*({fetch,reduce,change,get}){
		    	const query = {
                ...get().query
            	}
	            const subjectId=query.subjectId 
	            const startIndex=len
	          	const res = yield fetch(`post/?subjectId=${subjectId}&startIndex=${startIndex}&pageSize=10`)
	          	 const posts = res.data
                //console.log('rData',posts)
                self.rData = [...rData,...posts]
                yield change('postmanage',self.rData)
	            	self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(self.rData),
                    isLoading: false,
			    });
	        })
	}


	render(){
		
		const row = (rowData, sectionID, rowID) => {
			return(
				<div key={rowID}>

							<div className='post' style={{height:'auto',marginBottom:'10px'}} >
								<div className='title' style={{width:'90%',marginLeft:'5%',height:'60px'}} onClick={()=>{
									Model.change('PostsDetailsModel','query.detailsId',rowData._id)
									Model.change('postListModel','query.subjectId',rowData.subjectId)
									Model.change('PostsDetailsModel','administer',true)
									window.mainView.router.load({
												    url: 'postDetails.html',
												    query: {
												    	// index,
												    	
												    }
												  })
								}}>
									<div className='pic' style={{marginLeft:'0px',width:'46px',height:'46px'}}>
										<img src={`${config.api}/medias/${rowData.authorInfo.avatar}`} className='logo picLogo' />
									</div>
									<div className='tip' style={{width:'auto'}}>
										<div className='Name' style={{marginTop:'0px'}}>{rowData.authorInfo.nickname}</div>
										{
											this.props.sectorList.map((sect,index)=>{
												if(sect._id==this.props.query.subjectId){
													return <div key={index} style={{display:'flex',marginTop:'9px'}}>
																<div className='Time'>{sect.name}</div>
																<div className='Time' style={{marginLeft:'24px'}}>{getTimes(rowData.createTime)}</div>
															</div>
													
												}
											})
										}
										
									</div>
								</div>
								<div className="con" style={{height:"auto",width:'90%',marginLeft:'5%'}} onClick={()=>{
									Model.change('PostsDetailsModel','query.detailsId',rowData._id)
									Model.change('PostsDetailsModel','administer',true)
									window.mainView.router.load({
												    url: 'postDetails.html',
												    query: {
												    	// index,
												    	
												    }
												  })
										}}><div className='titlename' style={{marginLeft:'50px',paddingLeft:'11px'}}>{rowData.title}</div>
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
																Model.change('PostsDetailsModel','administer',true)
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
				 				<PostManageSection TosetState={this.TosetState} key={rowID} rowData={rowData} />
			 					<div style={{width:'100%',height:'1px',background:'#eeeeee'}}></div>
							</div>
					
				</div>
				)
		}

		return (

			<div style={{background:'#ffffff',width:'100%',paddingTop:'44px',overflow:'hidden',height:'100%'}} className="page-content infinite-scroll">

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
		          	/>}
		          	onEndReached={this.onEndReached}
		          	pageSize={10}    //每次下拉之后显示的数据条数
		        />
			</div>
		)
		}
}
export default Model.connect(['PostsManage','sectors'])(PostManage)
	
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
