import React from "react"
import { Model } from 'dvax'
import {redirect} from 'components/history'
import {Modal,Button} from 'antd'
import Form_ from './Form'
import Gap from 'dvax/Gap'
import {convertToHM,convertToTime} from '../dateUtils'

import { Form, Select, message } from 'antd'
import moment  from "moment"
Model.create({
    namespace:'vacationModal',
    state:{
        teachers:[],
        assistants:[],
        data:[],
        times:[],
    	visible:false,
        getTimeid:[],
        currentClassInfo:{},
        startTime:moment(),
        endTime:moment(),
    }
})
function getStaff(classInfo){
    Model.run('vacationModal',function*({fetch,change,get}){    
        const res = yield fetch(`user-platformteacher/teacher`)
        const teachers = res.data//.filter(el=>el.roleName ==='主教')
        yield change('teachers',teachers)        
        // const assistants = res.data.filter(el=>el.roleName ==="助教")
        // yield change('assistants',assistants)
    })
}
function showModal(classInfo){
    getStaff(classInfo)
    Model.run('vacationModal',function*({fetch,get,change}){
        yield change('visible',true)
        yield change('currentClassInfo',classInfo)
    })
}
function Allocation({visible,...props}){
    const handleOk= ()=>{ 
        Model.run('vacationModal',function*({fetch,get}){
            const body={
                vacationEndTime:get().endTime.unix()+'000',
                vacationBeginTime:get().startTime.unix()+'000',
                platformTeacherId:get('vacationModal').teachers[get().selectedTeacherInd].platformTeacherId,
                remarks:get().remarks,
                vacationCycle:get().dayOfWeek
            }

            const res = yield fetch(`vacations`,{method:'post',body})
            if(res.hasErrors) return
            message.success('增加休假成功')
            Model.change('vacationModal','visible',false)
            Model.dispatch({type:'attendance/getData'})
        })
    }
    const handleCancel=()=>{
    	Model.change('vacationModal','visible',false)
    }
    return (
        <Modal
	        title="新增休假"
	        visible={visible}
	        onOk={handleOk}
            onCancel={handleCancel}
            width={'70%'}
            style={{ top: 20 }}
        >
        	
	        <div>
	        	<Form_/>
                {Gap(10)}
	        </div>
        </Modal>
    ) 
}

export default Model.connect('vacationModal')(Allocation)
export {showModal}

