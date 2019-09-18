import React from 'react'
import { Model } from 'dvax'
import logo from './11.jpg'
// import s from './switch.css'
import { Switch } from 'antd-mobile';
// Model.create({
//     namespace:'AccessSwitchsModel',
//     state:{
    	
//     }
// })
 function AccessSwitchs(props){ 
    return (	
	       	<Switch
	       		style={{marginTop:'25px'}}
	       		color='#ffe200'
	       		size='small'
	            checked={props.checked2}
	            onClick={(checked) =>{
	            	if(props.checked2==false){
	              			Model.dispatch({type:'manageModel/openAccess'})
	              			Model.dispatch({type:'sectors/getSector'})
	              		}
	              		if(props.checked2==true)
	              		{
	              			Model.dispatch({type:'manageModel/closeAccess'})
	              			Model.dispatch({type:'sectors/getSector'})
	              		}
	              	}
	          	}
	      	/> 
      	
    );

}
export default Model.connect('manageModel')(AccessSwitchs)
