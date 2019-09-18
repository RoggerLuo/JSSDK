import React from 'react'
import {Model} from 'dvax'
import { Form, Select, message,Input,Row,Col ,DatePicker,Radio} from 'antd'
const FormItem = Form.Item
import debounce from 'dvax/debounce'
import moment from 'moment'
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

import { Card } from 'antd'
function getTeacher(value){
    Model.run('vacationModal',function*({fetch,change,get}){    
        const res = yield fetch(`user-platformteacher/teacher`,{query:{keyword:value}})
        const teachers = res.data//.filter(el=>el.roleName ==='主教')
        yield change('teachers',teachers)        
    })
}
const getTeacher_ = debounce(getTeacher)

const FormComp = ({ form, submit,...props }) => {
    const { getFieldDecorator,validateFieldsAndScroll, validateFields, setFieldsValue, resetFields } = form
    return(
        <Form>
            <Row style={{overflow:'auto',whiteSpace:'nowrap'}}>
            <Col offset={0} span={10}>

            <Input 
                placeholder={'请输入老师姓名拼音首字母检索'}
                onChange={e=>{
                    console.log(e.target.value)
                    getTeacher_(e.target.value)
                }}
            />
            </Col>
            </Row>

            <Row style={{overflow:'auto',whiteSpace:'nowrap'}}>
            <Col offset={0} span={17}>
                {
                    props.teachers.map((el,ind)=>{
                        if(ind === props.selectedTeacherInd) {
                            return (
                                <Card key={ind} bodyStyle={{padding:'7px 10px'}} style={{ minHeight: '132px',width: 220,marginRight:'15px',marginTop:'20px',display:'inline-block' ,backgroundColor:'#0165ff',color:'white' }}>
                                    <div style={{}}>
                                        <div>
                                            <h2 style={{color:'white' }}>{el.name}</h2>
                                        </div>
                                        <div style={{lineHeight:'20px'}}>{el.phone}</div>
                                        <div style={{lineHeight:'20px'}}>{el.roleName}</div>

                                    </div>
                                    {(()=>{
                                        if(el.teacherScheduleRecord && el.teacherScheduleRecord[0]) {
                                            const rec = el.teacherScheduleRecord[0]
                                            return null
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
                                            return null

                                            return <div>最近无排班</div>
                                        }
                                    })()}
                                </Card>
                            )
                        }
                        return (
                            <Card onClick={()=>Model.change('vacationModal','selectedTeacherInd',ind)} key={ind} bodyStyle={{padding:'7px 10px'}} style={{ minHeight: '132px',width: 220,marginRight:'15px',marginTop:'20px',display:'inline-block' }}>
                                <div style={{}}>
                                    <div>
                                        <h2>{el.name}</h2>
                                    </div>
                                    <div style={{lineHeight:'20px'}}>{el.phone}</div>
                                    <div style={{lineHeight:'20px'}}>{el.roleName}</div>
                                </div>
                                {(()=>{
                                        if(el.teacherScheduleRecord && el.teacherScheduleRecord[0]) {
                                            const rec = el.teacherScheduleRecord[0]                                        
                                            return null

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

                                            return null

                                            return <div>最近无排班</div>
                                        }
                                    })()}
                            </Card>
                        )

                        if(ind === props.selectedTeacherInd) {
                            return (
                                <Card key={ind} bodyStyle={{padding:'7px 10px'}} style={{ width: 220,marginRight:'15px',display:'inline-block' ,backgroundColor:'#0165ff',color:'white' }}>
                                    <div style={{display:"flex"}}>
                                        <h2 style={{color:'white' }}>{el.name}</h2>
                                        <div style={{lineHeight:'35px'}}>{el.phone}</div>
                                    </div>
                                    <p>最近排班:</p>
                                    <div>9月18日  16:45-18:00 </div>
                                    <div>xx小学</div>
                                </Card>
                            )
                        }
                        return (
                            <Card onClick={()=>Model.change('vacationModal','selectedTeacherInd',ind)} key={ind} bodyStyle={{padding:'7px 10px'}} style={{ width: 220,marginRight:'15px',marginTop:'20px',display:'inline-block' }}>
                                <div style={{display:"flex"}}>
                                    <h2>{el.name}</h2>
                                    <div style={{lineHeight:'35px'}}>{el.phone}</div>
                                </div>
                                <p>最近排班:</p>
                                <div>9月18日  16:45-18:00 </div>
                                <div>xx小学</div>
                            </Card>
                        )
                    })
                }
                </Col>
            </Row>
            <div style={{width:'1px',height:'20px'}}></div>
            <FormItem label={'请假开始时间'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'courseBeginDate',
                        {initialValue:props['courseBeginDate']||moment(),rules:[{required:true,message:'必填'}]}
                    )(
                        <DatePicker onChange={value=>Model.change('vacationModal','startTime',value) }/>
                    )
                }
            </FormItem>
            <FormItem label={'请假结束时间'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'schoolEndTime',
                        {initialValue:props['schoolEndTime']||moment(),rules:[{required:true,message:'必填'}]}
                    )(
                        <DatePicker onChange={value=>Model.change('vacationModal','endTime',value) }/>
                    )
                }
            </FormItem>
            <FormItem label={'备注'} wrapperCol={{span:12}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'remarks',
                        {initialValue:props['remarks']||'',rules:[
                        ]}
                    )(
                        <Input.TextArea autosize={{minRows: 3, maxRows: 6}} onChange={(e)=>Model.change('vacationModal','remarks',e.target.value)}/>
                    )
                }
            </FormItem>
        </Form>
    )
}
const antdComp = Form.create()(FormComp)
export default Model.connect(['attendance','vacationModal'])(antdComp)

/* 
<Row>
                <Col offset={3} span={17}>
                    <FormItem label={''} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                        {
                            getFieldDecorator(
                                'eduStage',
                                {initialValue:props['eduStage']||'PRIMARY_SCHOOL'}
                            )(
                                <RadioGroup>
                                    <Radio value={'PRIMARY_SCHOOL'}> 周期内每天 </Radio>
                                    <Radio value={'PRIMARY_SCHOOL2'}> 周期内每个星期 </Radio>
                                </RadioGroup>
                            )
                        }
                        {
                            getFieldDecorator(
                                'dayOfWeek',
                                {initialValue:props['dayOfWeek']||[],rules:[{required:true,message:'必填'}]}
                            )(
                                <Select mode='multiple' onChange={value=>{
                                    console.log(value)
                                    Model.change('vacationModal','dayOfWeek',value)
                                }}>
                                    {[0,1,2,3,4,5,6].map((el,ind)=>{
                                        const textMap = ['一','二','三','四','五','六','天']
                                        const valueMap = [ 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN' ]
                                        return (
                                            <Select.Option key={ind} value={valueMap[el]}>{'星期'+ textMap[el]}</Select.Option>
                                        )
                                    })||null}
                                </Select>
                            )
                        }
                    </FormItem>


                </Col>
            </Row> */