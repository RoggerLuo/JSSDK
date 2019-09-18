import React from 'react'
import styled from 'styled-components'
import Input from './Input'
import release from './release'
import {Model} from 'dvax'
import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
const prompt = Modal.prompt;

function IosInput (props) {
	
	return(
			<Button style={{width:'100%'}} onClick={() => 
			prompt('', '',
		      [
		        {
		          text: '取消',
		          onPress: value => new Promise((resolve) => {
		            //Toast.info('onPress promise resolve', 1);
		            setTimeout(() => {
		              resolve();
		              //console.log(`value:${value}`);
		            }, 500);
		          }),
		        },
		        {
		          text: '发布',
		          onPress: value => new Promise((resolve, reject) => {
		            Model.change('PostsDetailsModel','inputText',value)
		           
		            release(props.run)
		            
		            setTimeout(() => {
		              resolve();
		            }, 500);
		          }),
		        },
		      ], 'default', null, [props.placeholderValue])
		}
		    >写评论</Button>	

		)
}
    
export default  Model.connect('PostsDetailsModel')(IosInput)
