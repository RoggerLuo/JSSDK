import React from 'react'
import { Model } from 'dvax'
import HomePage from '../homePage'
import Footer from './footer.js'
import AddModal from '../components/createModal.js'
// import { HashRouter as Router } from 'react-router-dom'
// import Routes from '../../routes'
// import History, { redirect } from 'components/history'
// import Component from './sector'

function Component() {
	return (
		<div style={{background:'#ffffff',height:'100%'}}>
			<HomePage  />
			<AddModal />
		</div>
	);
}
export default Model.connect('subject')(Component)

// <h1 onClick={()=>{
// 			    	Model.run('',function*({fetch}){
// 			    		const res = yield fetch(`subject`)
// 			    		debugger
// 			    	})
// 			    }}>333</h1>
{/* <div>
			
	    	<SectorComponent />
	    </div> */}