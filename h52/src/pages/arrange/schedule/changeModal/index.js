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
    namespace:'scheduleChangeModal',
    state:{
        date:'',
        classId:'',
        data:[],
        times:[],
    	visible:false,
        getTimeid:[],
        currentClassInfo:{},
        teachers:[],
        assistants:[]
    }
})
function showModal(classInfo){
    Model.run('scheduleChangeModal',function*({fetch,get,change}){
        yield change('visible',true)
        yield change('currentClassInfo',classInfo)
        yield change('classId','')
        yield change('date','')
    })
}
import {showModal as showModal__} from '../modal'

function Allocation({visible,...props}){
    const handleOk= ()=>{ 
        Model.run('scheduleChangeModal',function*({fetch,get}){
            const body={
                courseScheduleId:get().currentClassInfo.courseScheduleId,
                classroomInfoId:get().classId,
                scheduleTime:get().date
            }
            const res = yield fetch(`course-schedules/renew-course`,{method:'post',body})
            if(res.hasErrors) return
            message.success('调课成功')
            Model.dispatch({type:'schedule/getData'})
            Model.change('scheduleChangeModal','visible',false)
        })
    }
    const save_and_arrange = () => {
        Model.run('scheduleChangeModal',function*({fetch,get}){
            const body={
                courseScheduleId:get().currentClassInfo.courseScheduleId,
                classroomInfoId:get().classId,
                scheduleTime:get().date
            }
            const res = yield fetch(`course-schedules/renew-course`,{method:'post',body})
            if(res.hasErrors) return
            message.success('调课成功')
            Model.dispatch({type:'schedule/getData'})
            Model.change('scheduleChangeModal','visible',false)
            showModal__(get('scheduleChangeModal').currentClassInfo)
        })       
    }

    const handleCancel=()=>{
    	Model.change('scheduleChangeModal','visible',false)
    }
    function Footer(){
        return (
            <div>
                <Button onClick={handleCancel}>取消</Button>
                <Button type={'primary'} onClick={handleOk}>保存</Button>
                <Button type={'primary'} onClick={save_and_arrange}>保存并排班</Button>

            </div>
        )
    }
    return (
        <Modal
	        title="排版管理"
	        visible={visible}
            width={'40%'}
            style={{ top: 20 }}
            footer={<Footer/>}
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

export default Model.connect('scheduleChangeModal')(Allocation)
export {showModal}

/* 
	        onOk={handleOk}
            onCancel={handleCancel}
 */