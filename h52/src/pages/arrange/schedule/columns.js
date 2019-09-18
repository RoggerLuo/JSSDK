import React from 'react'
import {Model} from 'dvax'
import { Card, message } from 'antd'
const { Meta } = Card
import {convertToHM,convertToTime} from './dateUtils'
import {showModal} from './modal'
import {showModal as showModal2} from './changeModal'
import moment from 'moment'

const UpdateArrange = click => (<div style={{color:'blue'}} onClick={()=>click()}>更新排班</div>)
const Arrange = click => (<div style={{color:'blue'}} onClick={()=>click()}>排班</div>)
const Stop = click => (<div style={{color:'#d00000'}} onClick={()=>click()}>停课</div>)
const Resume = click => (<div style={{color:'green'}} onClick={()=>click()}>复课</div>)
const Change = click => (<div style={{color:'blue'}} onClick={()=>click()}>调课</div>)

function Item(props){
    function clickArrange(){
        showModal(props)
    }
    function clickChange(){
        showModal2(props)
    }
    function clickUpdateArrange(){

    }
    function clickStop(){
        const courseScheduleId = props.courseScheduleId
        Model.run('schedule',function*({fetch,get,change}){
            const res = yield fetch(`course-schedules/${courseScheduleId}/stop-course`,{method:'post'})
            if(res.hasErrors) return
            const obj = get().data.find(el=>el.courseScheduleId===courseScheduleId)
            const ind = get().data.indexOf(obj)
            yield change(`data[${ind}].scheduleState`,'STOP') 
            message.success('操作成功')           
        })
    }
    function clickResume(){
        const courseScheduleId = props.courseScheduleId
        Model.run('schedule',function*({fetch,get,change}){
            const res = yield fetch(`course-schedules/${courseScheduleId}/resume-course`,{method:'post'})
            if(res.hasErrors) return
            const obj = get().data.find(el=>el.courseScheduleId===courseScheduleId)
            const ind = get().data.indexOf(obj)
            yield change(`data[${ind}].scheduleState`,'SCHEDULED') 
            message.success('操作成功')
        })
    }
    let borderTop = ''
    let actions = []

    switch(props.scheduleState){
        case 'SCHEDULING':
            actions = [Arrange(clickArrange)] // Stop(clickStop)
            borderTop = '5px solid #ccc'
            break

        case 'SCHEDULED':
            actions = [UpdateArrange(clickArrange), Stop(clickStop)]
            borderTop = '5px solid green'

            break
        case 'STOP':
            actions = [Resume(clickResume), Change(clickChange)]
            borderTop = '5px solid red'
            break
        case 'DISABLED':
            actions = [Arrange(clickArrange), Stop(clickStop)]
            borderTop = '5px solid black'
            return null
    }
    console.log(props)
    return (
        <Card
            bodyStyle={{padding:'15px'}}
            style={{ borderTop, width: '100%', marginTop: 16, textAlign:'left', borderRadius:'6px' }}
            actions={actions}
        >
            <Meta
                title={props.courseName}
                description={
                    (
                        <div>
                            <div style={{color:'black'}}>
                                {moment(props.scheduleTime).format('M月D日')}
                            </div>


                            <div style={{color:'black'}}>
                                {convertToHM(props.courseBeginTime)} &nbsp; - &nbsp;
                                {convertToHM(props.courseEndTime)}
                            </div>
                            <div style={{color:'black'}}>
                                {props.schoolName}
                            </div>

                            <div style={{color:'black'}}>
                                人数: {props.enrolls}
                            </div>
                            <div style={{color:'black'}}>
                                主教：{props.primaryTeacherName||'无'} 
                            </div>
                            <div style={{color:'black'}}>
                                助教：{props.secondTeacherName||'无'}
                            </div>

                            
                        </div>
                    )
                }
            />
        </Card>
    )
}

function loop(props,dayOfWeek){
    return props.data.filter(el=>el.dayOfWeek === dayOfWeek).map((el,ind)=>{
        return (
            <div key={ind}>
                <Item {...el} users={props.users}/>
            </div>
        )
    })          
}

export default props => [
    {
        title: '星期一',
        dataIndex: 'MON',
        width: 250,
        render(MON,record,index){
            return loop(props,'MON')
        }
    },
    {
        title: '星期二',
        dataIndex: 'TUE',
        width: 250,
        render(TUE,record,index){
            return loop(props,'TUE')
        }
    },
    {
        title: '星期三',
        dataIndex: 'WED',  
        width: 250,
        render(WEN,record,index){
            return loop(props,'WED')
        }
    },
    {
        title: '星期四',
        dataIndex: 'THU',
        width: 250,
        render(WEN,record,index){
            return loop(props,'THU')
        }
    },
    {
        title: '星期五',
        dataIndex: 'FRI',
        width: 250,
        render(WEN,record,index){
            return loop(props,'FRI')
        }
    },
    {
        title: '星期六',
        dataIndex: 'SAT',
        width: 250,
        render(WEN,record,index){
            return loop(props,'SAT')
        }
    },
    {
        title: '星期天',
        dataIndex: 'SUN',
        width: 250,
        render(WEN,record,index){
            return loop(props,'SUN')
        }
    }
]
