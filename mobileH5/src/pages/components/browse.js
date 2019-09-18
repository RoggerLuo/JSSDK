import React from 'react'
import { Model } from 'dvax'
import pic from './2.jpg'
import Search from './searchPost.js'
import './homePage.css'
import homehuifu from './huifu.png'
import homezan from './zan.png'
import homecai from './cai.png'
class Browse extends React.Component{
	render(){
		return (

			<div className='conPic'><img src={pic} className='logo' /></div>
				<div className='dtos'>
					<span className='detailsPostSpan' style={{marginLeft:'10%'}}><img src={homehuifu} />回复</span>
					<span className='detailsPostSpan'><img src={homezan} />赞</span>
					<span className='detailsPostSpan'><img src={homecai} />踩</span>
			</div>
		)
		}
}
export default Browse
	


