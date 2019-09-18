import React from "react"
import { Model } from 'dvax'
import {Modal,Button} from 'antd'
import Form_ from './Form'
import Gap from 'dvax/Gap'
import { Form, Select, message } from 'antd'
const deliver = {validateFields(){}}
Model.create({
    namespace:'allocation',
    state:{
        data:[],
        times:[],
    	visible:false,
        getTimeid:[],
        currentClassInfo:{}
    }
})
function showModal(classroomAssignmentId,classInfo){
    Model.run('allocation',function*({fetch,get,change}){
        const res = yield fetch(`classroom-assignments/${classroomAssignmentId}`)
        res.data.sort((a,b)=>{
            return a.classroomTime - b.classroomTime
        })
        yield change('times',res.data)
        const initArrary = [{classId:'',timelist:res.data,pointer:1,startTime:false,endTime:false}]
        yield change('data',initArrary)  
        yield change('currentClassInfo',classInfo)
        yield change('visible',true)
        yield change('currentId',classroomAssignmentId)
    })
}
function Allocation({visible,currentId,times,getTimeid,getClassid,...props}){
    const handleOk= ()=>{ 
        const arr = []
        Model.get('allocation').data.forEach((el,ind)=>{
            if(!el.classId) {
                message.warning('有课室未选择')
            }
            el.timelist.forEach(obj=>{
                const inTheMiddle = el.startTime && el.endTime && (obj.classroomTime>el.startTime.classroomTime && obj.classroomTime<el.endTime.classroomTime)
                if(
                    el.startTime && (obj.classroomTime === el.startTime.classroomTime) ||
                    el.endTime && (obj.classroomTime === el.endTime.classroomTime) ||
                    inTheMiddle
                ) {
                    const __obj__ = {...obj}
                    __obj__.classroomInfoId = el.classId
                    delete __obj__.classroomAddress
                    arr.push(__obj__)
                }
            })
        })        
        Model.run('allocation',function*({fetch}){
            const res = yield fetch(`classroom-assignments`,{method:'post',body:arr})
            if(res.hasErrors) return
            message.success('课室分配成功')
            Model.change('allocation','visible',false)
            Model.dispatch({type:'arrangeClassroom/getArrange'})
        })
    }
    const handleCancel=()=>{
    	Model.change('allocation','visible',false)
    }
    return (
        <Modal
	        title="课室分配"
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
                        const beginTime=new Date(obj.courseBeginTime).format("hh:mm");
                        const endTime=new Date(obj.courseEndTime).format("hh:mm")
                        return 	(
                            <div>
                                <p style={{fontSize:'22px'}}>{obj.courseName}</p>
                                <p>每周一:{beginTime}-{endTime}</p>
                                <p>人数:{obj.maxLimit}</p>
                                <p>课次:{obj.courseTotal}</p>
                            </div>
                        )
                    })()
            	}     	
        	</div>
	        <div>
	        	<Form_/>
                {Gap(10)}
	        	<Button type={'primary'} onClick={()=>{
                    Model.run('allocation',function*({get,fetch,reduce}){
                        yield reduce(state=>{
                            const data = state.data.slice()
                            data.push({timelist:JSON.parse(JSON.stringify(state.times)),classId:'',pointer:1,startTime:false,endTime:false})
                            return {...state,data}
                        })
                    })
                }}>添加课室</Button>
	        </div>
        </Modal>
    ) 
}

export default Model.connect('allocation')(Allocation)
export {showModal}

