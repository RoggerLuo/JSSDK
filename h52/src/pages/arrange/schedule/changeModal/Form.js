import React from 'react'
import {Model} from 'dvax'
import { Form, Select, message,Input,Row,Col,DatePicker } from 'antd'
const Option = Select.Option
const getClassid=(value,option)=>{
    Model.change('allocation','getClassid',value)
}        	

const FormComp = ({currentId,...props }) => {
    return (
        <div>
            <div style={{width:1,height:25}}></div>
            <Row >
                <Col span={3} style={{lineHeight: '30px'}}>调课日期 </Col>
                <Col span={7}>
                    <DatePicker onChange={moment=>Model.change('scheduleChangeModal','date',moment.unix()+'000')}/>
                </Col>
            </Row>

            <div style={{width:1,height:25}}></div>

            <Row >
                <Col span={2} style={{lineHeight: '30px'}}>课室 </Col>
                <Col span={7}>
                    <Select
                        onSelect={getClassid}
                        style={{ width: 300 }}
                        onDropdownVisibleChange={(open)=>Model.dispatch({type:'roomInfo/getRoom'})}
                    >
                        {
                            props.list.map((obj,index)=>{
                                return <Option onClick={
                                    ()=>Model.change('scheduleChangeModal',`classId`,obj.classroomInfoId)
                                } value={obj.classroomInfoId} key={index} >{obj.classroomAddress}</Option>
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
export default Model.connect(['roomInfo','scheduleChangeModal'])(FormComp)
