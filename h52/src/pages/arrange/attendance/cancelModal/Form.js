import React from 'react'
import {Model} from 'dvax'
import { Form, Select, message,Input,Row,Col,DatePicker } from 'antd'
const Option = Select.Option
const getClassid=(value,option)=>{
    Model.change('allocation','getClassid',value)
}        	
import moment from 'moment'
const FormComp = ({currentId,...props }) => {
    return (
        <div>
            <div style={{width:1,height:25}}></div>
            <Row >
                <Col span={3} style={{lineHeight: '30px'}}>姓名 </Col>
                <Col span={10}>
                    {props.currentClassInfo.platformTeacherName} - {props.currentClassInfo.platformTeacherPosition} {props.currentClassInfo.platformTeacherPhone}
                </Col>
            </Row>

            <div style={{width:1,height:25}}></div>

            <Row >
                <Col span={3} style={{lineHeight: '30px'}}>请假时间 </Col>
                <Col span={7}>
                    <Select
                        onChange={value=>Model.change('vacationCancelModal','cancelList',value)}
                        mode="multiple"
                        style={{ width: 300 }}
                        onDropdownVisibleChange={(open)=>Model.run('vacationCancelModal',function*({fetch,change}){
                            const res = yield fetch(`vacations/${props.currentClassInfo.platformTeacherId}/vaction-time`) 
                            yield change('vacationTimeList',res.data)
                        })}
                    >
                        {
                            props.vacationTimeList.map((obj,index)=>{
                                return <Option value={obj.vacationId} key={index} >{moment(obj.vacationTime).format('M月D日')}</Option>
                            })
                        }              
                    </Select> 
                </Col>
            </Row>
            <Row style={{overflow:'auto',whiteSpace:'nowrap'}}>

            </Row>
        </div>
    )
}
export default Model.connect(['roomInfo','vacationCancelModal'])(FormComp)
