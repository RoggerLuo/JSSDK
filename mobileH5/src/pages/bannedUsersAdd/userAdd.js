import React from 'react'
import { Model } from 'dvax'
import './bannedusersadd.css'
import Times from './banUsersTime.js'
import Search from './searchUsers.js'
import UsersSelect from '../components/usersSelect.js'
//const BannedUsersAdd =(props)=>{
function AddBannedUsersButton(){
		Model.dispatch({type:'UsersAdd/addBannedUsers'})
		window.mainView.router.load({
        url: 'Bannedusers.html',
        })
	}
global.AddBannedUsersButton=AddBannedUsersButton

class BannedUsersAdd extends React.Component {

	componentDidMount() {
		Model.change('UsersAdd','username','')

	}
	render(){
		const props=this.props
		return (
			<div style={{background:'#ffffff',width:'100%'}}>
				<div style={{marginTop:'20px',marginBottom:'10px'}}>
					<UsersSelect />
				</div>
				{
					this.props.username===''?<div></div>:
					<div style={{width:'100%',height:'30px',marginBottom:'10px',display:'flex'}}>
						<div style={{marginLeft:'5%'}}>已选择用户为:</div>
						<div style={{marginLeft:'10px'}}>{this.props.username}</div>
					</div>
				}
				
				
				<div className='select' style={{fontSize:'14px'}}>
					<div className="username" style={{textAlign:'left',marginLeft:'5%',width:"auto",fontSize:"14px"}}>时间段:</div>
					<div className='selectTime' style={{width:"80%"}}>
						<Times {...props} />
					</div>
				</div>	
				

			</div>
		)
		}
}
export default Model.connect(['Users','UsersAdd'])(BannedUsersAdd)
	

