import React from "react"
import { Model } from 'dvax'
import {Modal,Button} from 'antd'
import Form_ from './Form'
import Gap from 'dvax/Gap'
import { message } from 'antd'
import './model'
let callback = () => {}
const $ = Model.assign('addWordModal')
export function showModal(cb=()=>{}){
    $.run(function*({fetch,get,change}){
        yield change('visible',true)
        yield change('text','')
        callback = cb
    })
}
function Allocation({visible,...props}){
    function handleOk(){
        callback(Model.get('addWordModal').text)
        handleCancel()
    }
    function handleCancel(){
        Model.reduce('addWordModal',state=>({
            text:'',
        }))
    }
    return (
        <Modal
	        title="添加敏感词"
	        visible={visible}
	        onOk={handleOk}
            onCancel={handleCancel}
            width={'30%'}
            bodyStyle={{minHeight:'250px'}}
        >
	        <div>
	        	{visible?<Form_/>:null} {/* 写成这样，防止留下脏数据 */}
                {Gap(10)}
	        </div>
        </Modal>
    ) 
}
export default Model.connect('addWordModal')(Allocation)

