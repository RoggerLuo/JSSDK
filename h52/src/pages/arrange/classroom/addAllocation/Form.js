import React from 'react'
import {Model} from 'dvax'
import Gap from 'dvax/Gap'
import { Form, Select, message } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

import del from './del.png'
const getClassid=(value,option)=>{
    Model.change('allocation','getClassid',value)
}        	

function calTotalNum(){
    let num = 0
    Model.get('allocation').data.forEach(el=>{
        el.timelist.forEach(obj=>{
            const inTheMiddle = el.startTime && el.endTime && (obj.classroomTime>el.startTime.classroomTime && obj.classroomTime<el.endTime.classroomTime)
            if(
                el.startTime && (obj.classroomTime === el.startTime.classroomTime) ||
                el.endTime && (obj.classroomTime === el.endTime.classroomTime) ||
                inTheMiddle
            ) {
                num += 1
            }
        })
    })
    return num
}
const onClick = (el,obj,ind)=>{
    if(el.pointer === 1){
        Model.change('allocation',`data[${ind}].startTime`,obj)
        Model.change('allocation',`data[${ind}].endTime`,false)
        Model.change('allocation',`data[${ind}].pointer`,2)
    }
    if(el.pointer === 2){
        if(obj.classroomTime < el.startTime.classroomTime) {
            message.warning('结束时间要大于开始时间')
            Model.change('allocation',`data[${ind}].startTime`,false)
            Model.change('allocation',`data[${ind}].pointer`,1)
            return
        }
        Model.change('allocation',`data[${ind}].endTime`,obj)
        Model.change('allocation',`data[${ind}].pointer`,1)
    }
    const num = calTotalNum()
    console.log('num',num)
    if(num>Model.get('allocation').currentClassInfo.courseTotal) {
        message.warning('选择的日期数需要小于总课次')
        Model.change('allocation',`data[${ind}].endTime`,false)
        Model.change('allocation',`data[${ind}].startTime`,false)
        Model.change('allocation',`data[${ind}].pointer`,1)
    }
}

const FormComp = ({form,times,currentId,...props }) => {
    return props.data.map((el,ind)=>{
            return (
                <div key={ind}>
                    {Gap(15)}
                    <div>
                        {'课室 :' }
                        &nbsp;&nbsp;
                        <Select
                            onSelect={getClassid}
                            style={{ width: 300 }}
                            onDropdownVisibleChange={(open)=>Model.dispatch({type:'roomInfo/getRoom'})}
                        >
                            {
                                props.list.map((obj,index)=>{
                                    return <Option onClick={
                                        ()=>Model.change('allocation',`data[${ind}].classId`,obj.classroomInfoId)
                                    } value={obj.classroomInfoId} key={index} >{obj.classroomAddress}</Option>
                                })
                            }              
                        </Select> 
                        {ind===0?null:(<img src={del} width="23" style={{margin:'20px',cursor:'pointer'}} onClick={()=>{
                            props.reduce(state=>{
                                const data = state.data.slice()
                                data.splice(ind,1)
                                return {...state,data}
                            })
                        }}/>)}
                    </div>
                    {Gap(10)}
                    <div style={{float:'left',listStyle:'none',width:'100%',marginBottom: '25px'}}>
                        {
                            el.timelist.map((obj,index) =>{  
                                const newTimes= new Date(obj.classroomTime).format("M月d日")
                                const inTheMiddle = el.startTime && el.endTime && (obj.classroomTime>el.startTime.classroomTime && obj.classroomTime<el.endTime.classroomTime)
                                if(
                                    el.startTime && (obj.classroomTime === el.startTime.classroomTime) ||
                                    el.endTime && (obj.classroomTime === el.endTime.classroomTime) ||
                                    inTheMiddle
                                ) {
                                    return (
                                        <div key={index} value={obj.classroomAssignmentAttachmentId} 
                                            style={{backgroundColor:"#0067ff",color:'white',borderRadius:'3px',width:'100px',cursor:'pointer',border:' 1px solid #CCC',textAlign:'center',float:'left',marginLeft:'5px',marginTop:'5px'}}
                                            onClick={()=>onClick(el,obj,ind)}
                                            >
                                            {newTimes}
                                        </div> 
                                    )                                    
                                }
                                return (
                                    <div key={index} value={obj.classroomAssignmentAttachmentId} 
                                        style={{borderRadius:'3px',width:'100px',cursor:'pointer',border:' 1px solid #CCC',textAlign:'center',float:'left',marginLeft:'5px',marginTop:'5px'}}
                                        onClick={()=>onClick(el,obj,ind)}
                                    >
                                        {newTimes}
                                    </div> 
                                )
                            })
                        }
                    </div> 
                </div>
            )
        }
    )
                            
}
export default Model.connect(['roomInfo','allocation'])(FormComp)
