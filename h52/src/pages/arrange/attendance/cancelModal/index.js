import React from "react"
import { Model } from 'dvax'
import {Modal,Button} from 'antd'
import Form_ from './Form'
import Gap from 'dvax/Gap'
import {convertToHM,convertToTime} from '../dateUtils'
import { Form, Select, message } from 'antd'
import moment  from "moment"
Model.create({
    namespace:'vacationCancelModal',
    state:{
        date:'',
        classId:'',
        data:[],
        times:[],
    	visible:false,
        getTimeid:[],
        currentClassInfo:{},
        teachers:[],
        assistants:[],
        vacationTimeList:[]
    }
})
function showModal(classInfo){
    Model.run('vacationCancelModal',function*({fetch,get,change}){
        yield change('visible',true)
        yield change('currentClassInfo',classInfo)
    })
}

function Allocation({visible,...props}){
    const handleOk= ()=>{ 
        Model.run('vacationCancelModal',function*({fetch,get,change}){
            const body={
                vacationIds:get().cancelList
            }
            const res = yield fetch(`vacations/cancel-vacation`,{method:'post',body})
            if(res.hasErrors) return
            message.success('销假成功')
            Model.change('vacationCancelModal','cancelList',[])
            Model.change('vacationCancelModal','visible',false)
            Model.dispatch({type:'attendance/getData'})

        })
    }
   

    const handleCancel=()=>{
    	Model.change('vacationCancelModal','visible',false)
    }
    function Footer(){
        return (
            <div>
                <Button onClick={handleCancel}>取消</Button>
                <Button type={'primary'} onClick={handleOk}>保存</Button>
            </div>
        )
    }
    return (
        <Modal
	        title="销假"
	        visible={visible}
            width={'40%'}
            style={{ top: 20 }}
            footer={<Footer/>}
        >
	        <div>
	        	<Form_/>
                {Gap(10)}
	        </div>
        </Modal>
    ) 
}

export default Model.connect('vacationCancelModal')(Allocation)
export {showModal}

/* 
	        onOk={handleOk}
            onCancel={handleCancel}
 */