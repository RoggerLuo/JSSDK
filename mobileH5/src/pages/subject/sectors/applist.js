import React from 'react'
import { Model } from 'dvax'
import logos from './3.jpg'
import config from 'shared/config'
import {Switch} from 'antd-mobile'
import './index.css'
import { ListView,PullToRefresh ,Button} from 'antd-mobile';

class SectorComponent extends React.Component {
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
		Model.dispatch({ type: 'sectors/getSector' })
	}
	
	render() {
		return (

			<div  style={{background:'#ffffff',height:'100%',width:'100%',paddingTop:'10px',paddingBottom:"75px"}}>
			
				{
					this.props.sectorList.map(function (obj, index) {
						return (

							<div className='sectors' style={{height:'100px',borderBottom:'0px solid',marginBottom:'10px',width:'90%',marginLeft:'0px',background:'#ffffff',borderRadius: '6px',
  boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.11)',marginLeft:'5%'}} key={index} onClick={()=>{
								Model.change('postListModel','query.subjectId',obj._id)
								Model.change('PostsDetailsModel','administer','')
								window.mainView.router.load({
												    url: 'list.html',
												    query: {
												    	index
												    }
												  })
								
								// Model.dispatch({type:'postListModel/getpostList',subjectId:obj._id})
							}}>
								<div className='sector' style={{marginLeft:'5%',height:'100%',paddingTop:'0px',borderBottom:'0px solid',width:'90%'}}>
									<div className='logopic' style={{width:'60px',height:'60px',marginTop:'20px'}}>
										<img className='logos' style={{borderRadius:"10px"}} src={`${config.api}/medias/${obj.image}`}/>
									</div>
									<div className='sectorCon' style={{width:'60%',height:'60px',marginTop:'20px'}} >
										<div className='subjectname' style={{marginTop:'6px'}}>{obj.name}</div>
										<div className='subjectpopular' style={{marginTop:'11px'}}>人气值：{obj.popularity}</div>
									</div>
									<div className='manages' style={{width:'auto',height:'auto',marginTop:'20px'}}>
									{
										obj.isManager==false?<div></div>:
 										<button className='button subjectname' style={{border:"1px solid #333333",fontFamily:'PingFangSC',color:'#333333'}} key={index} onClick={()=>{
 											Model.change('PostsManage','query.subjectId',obj._id)
 											Model.change('manageModel','query.subjectId',obj._id)
 											Model.change('searchCheckPostModel','query.subjectId',obj._id)
 											Model.change('Users','query.subjectId',obj._id)
 											Model.change('UsersAdd','query.subjectId',obj._id)
												window.mainView.router.load({
												    url: 'manage.html',
												    query: {
												    	index,
												    }
												  })
											}} >管理
										</button>
									}
									</div>
								</div>
								<div style={{width:'100%',height:'1px',background:'#eeeeee'}}></div>
							</div>
						
						)
					})
				}
			</div>	
			
		)
	}
}
export default Model.connect('sectors')(SectorComponent)

// <div className='sector' key={index}>
// 								<div className='ul'>
// 									<div className='li' key={index}>
// 										
// 										
// 										<div className='ad' style={{width:'30%'}}>
// 										<button className='button' key={index} onClick={()=>{
// 											window.mainView.router.load({
// 											    url: 'manage.html',
// 											    // query: {
// 											    // 	...item,
// 											    // 	readOnly
// 											    // }
// 											  })
// 										}} >管理</button>
// 										</div>

// 									</div>

// 								</div>
// 							</div>