import React from 'react'
import {Model} from 'dvax'
import { Form, Select, message,Input,Row,Col } from 'antd'
import debounce from 'dvax/debounce'
const getClassid=(value,option)=>{
    Model.change('allocation','getClassid',value)
}        	

/* createTime: 1543043418246
platformTeacherId: "a5138f03caf441ee882d740a72ad3a03"
teacherName: "张晓峰"
teacherPhone: "13302293397"

teacherScheduleRecord:
    courseBeginTime: 1545272485
    courseEndTime: 1547346085
    platformTeacherId: "a5138f03caf441ee882d740a72ad3a03"
    schduleTime: 1545618163000
    schoolName: "11111nnnnnnnn张张张张张张张张张张张张张张张张张张张张
 */

import { Card } from 'antd'
import moment from 'moment'

function getTeacher(value){
    Model.run('scheduleModal',function*({fetch,change,get}){
        const classInfo = get().currentClassInfo
        const query = {
            courseInfoId:classInfo.courseInfoId,
            scheduleTime:classInfo.scheduleTime,
            isPrimaryTeacher:true,
            keyword:value
        }
        const res = yield fetch(`course-schedules/teacher`,{query})
        const teachers = res.data
        yield change('teachers',teachers)
        yield change('selectedTeacherInd',null)

    })
}
function getAsistant(value){
    Model.run('scheduleModal',function*({fetch,change,get}){
        const classInfo = get().currentClassInfo
        const query = {
            courseInfoId:classInfo.courseInfoId,
            scheduleTime:classInfo.scheduleTime,
            isPrimaryTeacher:true,
            keyword:value
        }
        query.isPrimaryTeacher=false
        const res2 = yield fetch(`course-schedules/teacher`,{query})
        const assistants = res2.data
        yield change('assistants',assistants)
        yield change('selectedAssistantInd',null)            
    })
}
const getTeacher_ = debounce(getTeacher)
const getAsistant_ = debounce(getAsistant)
const FormComp = ({currentId,...props }) => {
    return (
        <div>
            <div style={{width:1,height:25}}></div>
            <Row >
                <Col span={1} style={{lineHeight: '30px'}}>主教 </Col>
                <Col span={7}>
                    <Input 
                        placeholder={'请输入老师姓名拼音首字母检索'}
                        onChange={e=>{
                            getTeacher_(e.target.value)
                        }}
                        defaultValue={''}
                    />
                </Col>
            </Row>
            <Row style={{overflow:'auto',whiteSpace:'nowrap'}}>
                {
                    props.teachers.map((el,ind)=>{
                        if(ind === props.selectedTeacherInd) {
                            return (
                                <Card key={ind} bodyStyle={{padding:'7px 10px'}} style={{ minHeight: '132px',width: 220,marginRight:'15px',marginTop:'20px',display:'inline-block' ,backgroundColor:'#0165ff',color:'white' }}>
                                    <div style={{display:"flex"}}>
                                        <h2 style={{color:'white' }}>{el.teacherName}</h2>
                                        <div style={{lineHeight:'35px'}}>{el.teacherPhone}</div>
                                    </div>
                                    {(()=>{
                                        if(el.teacherScheduleRecord) {
                                            const rec = el.teacherScheduleRecord
                                            return (
                                                <div>
                                                    <p>最近排班:</p>
                                                    <div>
                                                        {moment(rec.schduleTime).format('M月D日')} &nbsp;  
                                                        {moment(rec.courseBeginTime).format('HH:MM')} - 
                                                        {moment(rec.courseEndTime).format('HH:MM')}
                                                    </div>
                                                    <div style={{overflow: 'hidden',textOverflow: 'ellipsis'}}>{rec.schoolName}</div>
                                                </div>
                                            )
                                        }else{
                                            return (
                                                <div>
                                                    <p>最近无排班:</p>
                                                    <div>
                                                        &nbsp;  
                                                    </div>
                                                    <div style={{overflow: 'hidden',textOverflow: 'ellipsis'}}>&nbsp;</div>
                                                </div>
                                            )
                                        }
                                    })()}
                                </Card>
                            )
                        }
                        return (
                            <Card onClick={()=>{
                                    if(el.hasVacation) return

                                    Model.change('scheduleModal','selectedTeacherInd',ind)
                                
                                }} key={ind} bodyStyle={{padding:'7px 10px'}} style={{ minHeight: '132px',width: 220,marginRight:'15px',marginTop:'20px',display:'inline-block' }}>
                                <div style={{display:"flex"}}>
                                    <h2>{el.teacherName}</h2>
                                    <div style={{lineHeight:'35px'}}>{el.teacherPhone}</div>
                                </div>
                                {(()=>{

                                    if(el.hasVacation) {
                                        
                                        return (
                                            <div>
                                                <p>请假:</p>
                                                <div>
                                                    {el.vacationRemarks}
                                                </div>
                                                <div style={{overflow: 'hidden',textOverflow: 'ellipsis'}}>&nbsp;</div>
                                            </div>
                                        )

                                    }
                                        

                                        if(el.teacherScheduleRecord) {
                                            const rec = el.teacherScheduleRecord
                                            return (
                                                <div>
                                                    <p>最近排班:</p>
                                                    <div>
                                                        {moment(rec.schduleTime).format('M月D日')} &nbsp;  
                                                        {moment(rec.courseBeginTime).format('HH:MM')} - 
                                                        {moment(rec.courseEndTime).format('HH:MM')}
                                                    </div>
                                                    <div style={{overflow: 'hidden',textOverflow: 'ellipsis'}}>{rec.schoolName}</div>
                                                </div>
                                            )
                                        }else{
                                            return (
                                                <div>
                                                    <p>最近无排班:</p>
                                                    <div>
                                                        &nbsp;  
                                                    </div>
                                                    <div style={{overflow: 'hidden',textOverflow: 'ellipsis'}}>&nbsp;</div>
                                                </div>
                                            )
                                        }
                                    })()}
                            </Card>
                        )
                    })
                }
            </Row>

            <div style={{width:1,height:25}}></div>


            <Row >
                <Col span={1} style={{lineHeight: '30px'}}>助教 </Col>
                <Col span={7}>
                    <Input 
                        placeholder={'请输入老师姓名拼音首字母检索'}
                        onChange={e=>{
                            console.log(e.target.value)
                            getAsistant_(e.target.value)
                        }}
                        defaultValue={''}
                    />
                </Col>
            </Row>
            <Row style={{overflow:'auto',whiteSpace:'nowrap'}}>
                {
                    props.assistants.map((el,ind)=>{
                        if(ind === props.selectedAssistantInd) {
                            return (
                                <Card key={ind} bodyStyle={{padding:'7px 10px'}} style={{ minHeight: '132px',width: 220,marginRight:'15px',marginTop:'20px',display:'inline-block' ,backgroundColor:'#0165ff',color:'white' }}>
                                    <div style={{display:"flex"}}>
                                        <h2 style={{color:'white' }}>{el.teacherName}</h2>
                                        <div style={{lineHeight:'35px'}}>{el.teacherPhone}</div>
                                    </div>
                                    {(()=>{
                                        if(el.teacherScheduleRecord && el.teacherScheduleRecord[0]) {
                                            const rec = el.teacherScheduleRecord[0]                                        
                                            return (
                                                <div>
                                                    <p>最近排班:</p>
                                                    <div>
                                                        {moment(rec.schduleTime).format('M月D日')} &nbsp;  
                                                        {moment(rec.courseBeginTime).format('HH:MM')} - 
                                                        {moment(rec.courseEndTime).format('HH:MM')}
                                                    </div>
                                                    <div>{rec.schoolName}</div>
                                                </div>
                                            )
                                        }else{
                                            return (
                                                <div>
                                                    <p>最近无排班:</p>
                                                    <div>
                                                        &nbsp;  
                                                    </div>
                                                    <div style={{overflow: 'hidden',textOverflow: 'ellipsis'}}>&nbsp;</div>
                                                </div>
                                            )
                                        }
                                    })()}
                                </Card>
                            )

                        }

                        return (
                            <Card onClick={()=>Model.change('scheduleModal','selectedAssistantInd',ind)} key={ind} bodyStyle={{padding:'7px 10px'}} style={{ minHeight: '132px',width: 220,marginRight:'15px',marginTop:'20px',display:'inline-block' }}>
                                <div style={{display:"flex"}}>
                                    <h2>{el.teacherName}</h2>
                                    <div style={{lineHeight:'35px'}}>{el.teacherPhone}</div>
                                </div>
                                {(()=>{
                                        if(el.teacherScheduleRecord && el.teacherScheduleRecord[0]) {
                                            const rec = el.teacherScheduleRecord[0]                                        
                                            return (
                                                <div>
                                                    <p>最近排班:</p>
                                                    <div>
                                                        {moment(rec.schduleTime).format('M月D日')} &nbsp;  
                                                        {moment(rec.courseBeginTime).format('HH:MM')} - 
                                                        {moment(rec.courseEndTime).format('HH:MM')}
                                                    </div>
                                                    <div>{rec.schoolName}</div>
                                                </div>
                                            )
                                        }else{
                                            return (
                                                <div>
                                                    <p>最近无排班:</p>
                                                    <div>
                                                        &nbsp;  
                                                    </div>
                                                    <div style={{overflow: 'hidden',textOverflow: 'ellipsis'}}>&nbsp;</div>
                                                </div>
                                            )
                                        }
                                    })()}
                            </Card>
                        )
                    })
                }
            </Row>
        </div>
    )
}
export default Model.connect('scheduleModal')(FormComp)
