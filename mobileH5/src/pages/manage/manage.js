import React from 'react'
import { Model } from 'dvax'
import logo from './11.jpg'
import './sect.less'
import Times from './timepicker.js'
import Switchs from './switch.js'
import AccessSwitchs from './AccessSwitch.js'
import moment from 'moment'
// import routeTo from './shared'
class Manage extends React.Component {
	componentDidMount() {
		Model.dispatch({ type: 'sectors/getSector' })
		this.props.sectorList.map((obj)=>{
 				if(obj._id==this.props.query.subjectId){
 				 	Model.change('manageModel','checked1',obj.audit)
					Model.change('manageModel','checked2',obj.accessTimeLimit)
					
					const endTime=new Date(Date.parse((moment(obj.endTime).format("YYYY-MM-DD HH:mm:ss")).replace(/-/g, "/")))   //转换为标准时间Thu Mar 19 2015 12:00:00 GMT+0800 (中国标准时间)
					const startTime=new Date(Date.parse((moment(obj.startTime).format("YYYY-MM-DD HH:mm:ss")).replace(/-/g, "/"))) 
					Model.change('manageModel','time1',startTime)
					Model.change('manageModel','time2',endTime)

 				}
 			return obj
 		})
	}
	// checkedStatus(){
 		
 // 	}
	render() {
		const props =this.props
		return (

			<div style={{background:'#ffffff',width:'100%',height:'auto',paddingTop: '44px'}}>
				<div style={{width:'100%'}}>
					<div className='top' style={{height:'35px',marginTop:'5px'}}>
						<p className='right' style={{fontSize:'14px',height:'100%'}}>开启审帖功能</p>
						<div className='left' style={{marginTop:"-19px"}} >
					 		<Switchs {...props}  />
						</div>
					</div>
					<div className='top' style={{marginTop:'5px',height:'35px'}} >
						<p className='right' style={{fontSize:'14px'}}>开启版块访问限制</p>
						<div className='left' style={{marginTop:"-19px"}} >
					 		<AccessSwitchs {...props}  />
						</div>
					</div>
					{
						this.props.checked2==true?
						<div className='top' style={{marginTop:'20px'}} >
							<p className='ben' style={{fontSize:'14px',width:'auto',height:'60px',lineHeight:'60px'}}>禁用时间段</p>
							<div className='time' style={{marginLeft:'20px'}}  >
								<Times {...props} />
							</div>
						</div>:<div></div>
					}
					<div className="list-block">
					  <ul>
					    <li onClick={()=>{
							window.mainView.router.load({
											    url: 'Bannedusers.html',
											    // query: {
											    // 	...item,
											    // 	readOnly
											    // }
											  })
						}}>
					      <a href="#" className="item-link item-content">
					        <div className="item-inner">
					          <div className="item-title" style={{fontSize:'14px'}}>用户禁言</div>
					        </div>
					      </a>
					    </li>
					    <li onClick={()=>{
								window.mainView.router.load({
											    url: 'PostManage.html',
											    // query: {
											    // 	...item,
											    // 	readOnly
											    // }
											  })
							}}>
					      <a href="#" className="item-link item-content">
					        <div className="item-inner">
					          <div className="item-title" style={{fontSize:'14px'}}>帖子管理</div>
					        </div>
					      </a>
					    </li>
					    {
					    	this.props.checked1==true?
					    		<li onClick={()=>{
									window.mainView.router.load({
												    url: 'checkpost.html',
												    // query: {
												    // 	...item,
												    // 	readOnly
												    // }
												  })
								}}>
							      <a href="#" className="item-link item-content">
							        <div className="item-inner">
							          <div className="item-title" style={{fontSize:'14px'}}>帖子审核</div>
							        </div>
							      </a>
							    </li>:<li></li>
					    }
					    
					  </ul>
					</div>




				</div>
			</div>
		)
	}
}
export default Model.connect(['manageModel','sectors'])(Manage)
	


