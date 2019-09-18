import React from "react"
import { Model } from 'dvax'
import {Modal,Button} from 'antd'
import Form_ from './Form'
import Gap from 'dvax/Gap'
import {convertToHM,convertToTime} from '../dateUtils'
import { Form, Select, message } from 'antd'
import moment  from "moment"
Model.create({
    namespace:'scheduleModal',
    state:{
        data:[],
        times:[],
    	visible:false,
        getTimeid:[],
        currentClassInfo:{},
        teachers:[],
        assistants:[]
    }
})
function getStaff(classInfo){
    Model.run('scheduleModal',function*({fetch,change}){
        const query = {
            courseInfoId:classInfo.courseInfoId,
            scheduleTime:classInfo.scheduleTime,
            isPrimaryTeacher:true
        }
        const res = yield fetch(`course-schedules/teacher`,{query})
        const teachers = res.data
        yield change('teachers',teachers)

        query.isPrimaryTeacher=false
        const res2 = yield fetch(`course-schedules/teacher`,{query})
        const assistants = res2.data
        yield change('assistants',assistants)
    })
}
function showModal(classInfo){
    getStaff(classInfo)
    Model.run('scheduleModal',function*({fetch,get,change}){
        yield change('visible',true)
        yield change('currentClassInfo',classInfo)
    })
}
function Allocation({visible,...props}){
    const handleOk= ()=>{ 
        Model.run('scheduleModal',function*({fetch,get,change,put}){
            const body={
                courseScheduleId:get().currentClassInfo.courseScheduleId,
                primaryTeacherId:get().teachers[get().selectedTeacherInd].platformTeacherId,
                secondTeacherId:get().assistants[get().selectedAssistantInd].platformTeacherId
            }
            const res = yield fetch(`course-schedules`,{method:'post',body})
            if(res.hasErrors) return
            message.success('排班成功')
            yield change('visible',false)
            yield change('selectedTeacherInd',null)
            yield change('selectedAssistantInd',null)  
            Model.dispatch({type:'schedule/getData'}) 
        })
    }
    const handleCancel=()=>{
        Model.run('scheduleModal',function*({fetch,get,change}){
            yield change('selectedTeacherInd',null)
            yield change('selectedAssistantInd',null)            
            Model.change('scheduleModal','visible',false)    
        })
    }
    return (
        <Modal
	        title="排班管理"
	        visible={visible}
	        onOk={handleOk}
            onCancel={handleCancel}
            width={'70%'}
            style={{ top: 20 }}
        >
        	<div>
				{
                    (()=>{
                        const obj = props.currentClassInfo
                        const beginTime = convertToHM(obj.courseBeginTime)
                        const endTime = convertToHM(obj.courseEndTime)
                        return 	(
                            <div>
                                <div style={{fontSize:'22px'}}>{obj.courseName}</div>
                                <div>{moment(obj.scheduleTime).format('YYYY-MM-DD')} {beginTime} - {endTime}</div>
                                <div>人数:{obj.enrolls}</div>
                                <div>课次:{obj.schoolName}</div>
                            </div>
                        )
                    })()
            	}     	
        	</div>
	        <div>
	        	<Form_/>
                {Gap(10)}
	        </div>
        </Modal>
    ) 
}

export default Model.connect('scheduleModal')(Allocation)
export {showModal}

