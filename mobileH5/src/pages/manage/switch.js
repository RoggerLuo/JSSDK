import React from 'react'
import { Model } from 'dvax'
import logo from './11.jpg'
// import s from './switch.css'
import { Switch } from 'antd-mobile';
// Model.create({
//     namespace:'switchModel',
//     state:{
    	
//     }
// })
 function Switchs(props){ 
    return (
    	
	       	<Switch
	       		style={{marginTop:'25px'}}
	       		color='#ffe200'
	       		size='small'
	            checked={props.checked1}
	            onClick={(checked) =>{
	              		if(props.checked1==false){
	              			Model.dispatch({type:'manageModel/openAudit'})
	              			Model.dispatch({type:'sectors/getSector'})
	              		}
	              		if(props.checked1==true)
	              		{
	              			Model.dispatch({type:'manageModel/closeAudit'})
	              			Model.dispatch({type:'sectors/getSector'})
	              		}
	              		
	              	}
	          	}
	      	/> 
      	
    );

}
export default Model.connect('manageModel')(Switchs)
