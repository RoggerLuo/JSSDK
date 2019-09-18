import React from 'react'
import { Model } from 'dvax'
import logo from '../subject/sectors/11.jpg'
import pic from './2.jpg'
import Search from './searchPost.js'
import './homePage.css'
import config from 'shared/config'
import homehuifu from './huifu.png'
import homezan from './zan.png'
import homecai from './cai.png'
import PostComponent from './postComponent.js'
import SectorComponent from '../subject/sectors/applist'
import Message from '../message/Message.js'
import Personal from '../mine/Personal'
import moment from 'moment'

import ReactDOM from 'react-dom'
import { ListView,PullToRefresh ,Button} from 'antd-mobile';
function getTimes(sendtTime){
    var curTime = new Date();
    var timeDiff = curTime.getTime() - sendtTime;
    var min = 60 * 1000;
    var hour = min * 60;
    var day = hour * 24;
    var week = day * 7;
    var Week = Math.floor(timeDiff/week);
    var Day = Math.floor(timeDiff/day);
    var Hour = Math.floor(timeDiff/hour);
    var Min = Math.floor(timeDiff/min);
     if(Week > 0){
        return moment(sendtTime).format("YYYY-MM-DD HH:mm:ss");                    
    }
    else if(Day <7&&Day>0){
    	return Day + '天前';
    }
    else if(Hour < 24 && Hour > 0){
    	return Hour+'小时前';
    }
    else if(Min>0&&Min<60) {
    	return Min + '分钟前';
    }
    else{
    	return '刚刚'
    } 
}
class HomePage extends React.Component{
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

	async componentDidMount() {
		Model.change('HomePageModel','dtoes','0')
		// Model.dispatch({type:'sectors/getSector'})
		Model.dispatch({type:'messageModel/getNotread'}) //一进来获取未读消息
		
	    const self = this
	    Model.run('HomePageModel',function*({fetch,reduce,change}){
          	const res = yield fetch(`post?startIndex=0&pageSize=10`)
            	const posts = res.data
            	yield change('pagination.startIndex',posts.length)
                yield change('rData',posts)
                yield change('posts',posts)

            	self.setState({
			      dataSource: self.state.dataSource.cloneWithRows(posts),
			      refreshing: false,
			      isLoading: false,
			    });
        })
	}
	resetState = () => {
        const posts = Model.get('HomePageModel').posts
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(posts),
	        refreshing: false,
	        isLoading: false,
	    });
	}
	onEndReached = (event) => {
		const rData=this.props.rData
		const len=rData.length
	    if (this.state.isLoading && !this.state.hasMore) {
	      return;
	    }   //如果this.state.hasMore为false，说明没数据了，直接返回
	    console.log('reach end', event);
	    this.setState({ isLoading: true });
	    const self=this
	    if(this.props.tab==0){
		    Model.run('HomePageModel',function*({fetch,reduce,change,get}){
		    	const query={
	                ...get().pagination
	            }
	            
	            const startIndex=len
	            const pageSize=query.pageSize
	          	const res = yield fetch(`post?startIndex=${startIndex}&pageSize=10`)
	            	const posts = res.data
	            	self.rData = [...rData,...posts]
	            	yield change('rData',self.rData)
	            	self.setState({
			      	dataSource: self.state.dataSource.cloneWithRows(self.rData),
			      	isLoading: false,
			    });
	        })
        }
        if(this.props.tab==1){
        	 Model.run('HomePageModel',function*({fetch,reduce,change,get}){
		    	const query={
	                ...get().pagination
	            }
	            const startIndex=query.startIndex
	            const pageSize=query.pageSize
	          	const res = yield fetch(`post?startIndex=${startIndex}&pageSize=10&follow=true`)
	            	const posts = res.data
	            	self.rData = [...rData,...posts]
	            	self.setState({
			      	dataSource: self.state.dataSource.cloneWithRows(self.rData),
			      	isLoading: false,
			    });
	        })
        }
	  };
	render(){
		const navList=["首页","关注"]
		const selectedTabIndex=this.props.selected
		const props=this.props		
		if(selectedTabIndex==1) {
			return <SectorComponent/>
		}
		else if(selectedTabIndex==2){
			return <Message />
		}
		else if(selectedTabIndex==3){
			return <Personal/>
		}
		else{
			const row = (rowData, sectionID, rowID) => {			
		       return (
			        <div key={rowID}>
		 				<div className='post'  style={{height:'auto',marginBottom:'10px'}}>
							<div className='title' style={{height:"60px",width:'90%',marginLeft:'5%'}} onClick={()=>{
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
								<div className='pic' style={{width:'46px',height:'46px',marginLeft:'0px',paddingRight:'19px'}}>
									<img src={`${config.api}/medias/${rowData.authorInfo.avatar}`} className='logo' style={{borderRadius:'50%'}} />
								</div>
								<div className='tip' style={{width:'80%'}}>
									<div className='Name' >{rowData.authorInfo.nickname}</div>
									{

										this.props.sectorList.map((sector,ind)=>{
											if(rowData.subjectId==sector._id)
												return <div key={ind} style={{display:'flex',marginTop:'9px'}} >
														<div className='Time'>{sector.name}</div>
														<div className="Time" style={{width:'auto',marginLeft:'24px'}}>{getTimes(rowData.createTime)}</div>
														</div>
										})
									}
									
								</div>
							</div>
							<PostComponent key={rowID} rowData={rowData}  rowID={rowID} resetState={this.resetState} />
						</div>
						
			        </div>
			      );
	    };
	    return (
			<div style={{background:'#ffffff',width:'100%',paddingBottom:"75px",paddingTop:'20px',overflow:'hidden'}} className="page-content infinite-scroll">				
				<div  style={{display:'flex',height:'25px',marginBottom:'0px',justifyContent:'space-evenly'}} className='Box' >
					{
						this.props.tab==0?
						<div style={{width:'auto',height:'100%'}} className='flex1' >
							<div className='Home '>
								<span style={{borderBottom:'4px solid'}}>首页</span>
							</div>
						</div>:
						<div style={{width:'auto',height:'100%'}} className=' flex1'>
							<div style={{fontSize:'16px',fontWeight:'bolder',width:'auto',color:'#000000'}} className='Home' onClick={()=>{
							Model.change('HomePageModel','tab',0)
							const self = this
						    Model.run('HomePageModel',function*({fetch,reduce,change}){
					          	const res = yield fetch(`post?startIndex=0&pageSize=10`)
					            	const posts = res.data
					            	yield change('pagination.startIndex',posts.length)
					            	yield change('rData',posts)
					            	self.setState({
								      dataSource: self.state.dataSource.cloneWithRows(posts),
								      refreshing: false,
								      isLoading: false,
								    });
					        })
							}}>
							<span>首页</span>
							</div>
						</div>
					}
					{
						this.props.tab==1?<div style={{width:'auto',height:'100%'}} className='flex1'><div  className='Home'><span style={{borderBottom: '4px solid'}}>关注</span></div></div>:
						<div style={{width:'auto',height:'100%'}} className='flex1'><div className='Home' style={{width:'auto',color:'#000000'}}  onClick={()=>{
							Model.change('HomePageModel','tab',1)
							const self = this
							    Model.run('HomePageModel',function*({fetch,reduce,change}){
						          	const res = yield fetch(`post?startIndex=0&pageSize=10&follow=true`)
						            	const posts = res.data
						            	yield change('pagination.startIndex',posts.length)
						            	yield change('rData',posts)
						            	self.setState({
								      dataSource: self.state.dataSource.cloneWithRows(posts),
								      refreshing: false,
								      isLoading: false,
								    });
						        })
						}}><span>关注</span></div></div>
					}
				</div>
			
				<div style={{width:'100%',height:'1px',background:'#f6f6f6'}}></div>
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
		            	 if(this.props.tab==0){
		            	const self = this
					    Model.run('HomePageModel',function*({fetch,reduce,change}){
				          	const res = yield fetch(`post?startIndex=0&pageSize=10`)
				            	const posts = res.data
				            	// console.log('length',posts.length)
				            	yield change('pagination.startIndex',posts.length)
				            	yield change('rData',posts)
				            	self.setState({
							      dataSource: self.state.dataSource.cloneWithRows(posts),
							      refreshing: false,
							      isLoading: false,
							    });
				        })
					}
					if(this.props.tab==1){
				        const self = this
							    Model.run('HomePageModel',function*({fetch,reduce,change}){
						          	const res = yield fetch(`post?startIndex=0&pageSize=10&follow=true`)
						            	const posts = res.data
						            	yield change('pagination.startIndex',posts.length)
						            	yield change('rData',posts)
						            	self.setState({
								      dataSource: self.state.dataSource.cloneWithRows(posts),
								      refreshing: false,
								      isLoading: false,
								    });
						        })
					}
		            }}
		          	/>}
		          	onEndReached={this.onEndReached}
		          	pageSize={10}    //每次下拉之后显示的数据条数
		        />
				
			</div> 
		)
		}
		  
		}
}

export default Model.connect(['HomePageModel','sectors','messageModel'])(HomePage)
export {getTimes} 

