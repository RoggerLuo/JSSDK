import React from 'react'
import { Model } from 'dvax'
import logo from '../subject/sectors/11.jpg'
import './bannedusers.less'
import moment from 'moment'
import config from 'shared/config'

class BannedUsers extends React.Component{

	componentDidMount() {
		Model.dispatch({type:'Users/getUsers'})
	}
	render(){
		console.log('this.props',this.props)
		return (

			<div style={{background:'#ffffff',width:'100%'}}>
				{
					this.props.banndeUsersList.map(function(obj,index){
						obj.start=moment(obj.start).format("YYYY-MM-DD HH:mm:ss")
						obj.end=moment(obj.end).format("YYYY-MM-DD HH:mm:ss")
						return(
							<div key={index} style={{width:"100%"}}>
							<div className='sector' style={{width:'90%',marginLeft:'5%',height:'100px',borderBottom:'0px solid'}} key={index}>
										<div style={{width:'46px',height:'46px'}} >
											<img src={`${config.api}/medias/${obj.avatar}`} className='logo' style={{borderRadius:'50%'}} />
										</div>
										<div style={{marginLeft:'10px',width:'60%'}}>
											
												<div className='Name'>{obj.nickname}</div>
												<div className='Time' style={{marginTop:'9px'}}>禁言时间：</div>
												<div className='Time' style={{marginTop:'5px'}} >开始:{obj.start}</div>
												<div className='Time' style={{marginTop:'5px'}}>结束:{obj.end}</div>
											
										</div>
										<div>
											<button style={{width:'70px',background:'#ffe400',height:'30px',border:'1px',color:'#ffffff',fontSize:'14px',borderRadius:'7px'}} 
											onClick={()=>{
												Model.change('Users','query.userId',obj.userId)
												Model.dispatch({type:'Users/deleteBan'})
											}}>解除禁言</button>
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
export default Model.connect('Users')(BannedUsers)
	


