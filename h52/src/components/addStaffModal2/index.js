import React from "react"
import { Model } from 'dvax'
import {Modal,Button} from 'antd'
import Form_ from './Form'
import Gap from 'dvax/Gap'
import { message } from 'antd'
import './model'
let callback = () => {}
export function showModal(cb=()=>{}){
    Model.run('addStaffModal',function*({fetch,get,change}){
        yield change('visible',true)
        callback = cb
    })
}
function Allocation({visible,...props}){
    function handleOk(){
        callback(Model.get('addStaffModal').selected_employees)
        handleCancel()
    }
    function handleCancel(){
        Model.reduce('addStaffModal',state=>({
            treeData:[],
            employees:[],        
            data:[],
            selected_employees:[]
        }))
    }
    return (
        <Modal
	        title="选择人员"
	        visible={visible}
	        onOk={handleOk}
            onCancel={handleCancel}
            width={'60%'}
            bodyStyle={{minHeight:'450px'}}
        >
	        <div>
	        	{visible?<Form_/>:null} {/* 写成这样，防止留下脏数据 */}
                {Gap(10)}
	        </div>
        </Modal>
    ) 
}
export default Model.connect('addStaffModal')(Allocation)

