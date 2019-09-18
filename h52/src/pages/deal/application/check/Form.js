import React from 'react'
import {Model} from 'dvax'
import { Form, Select, message,Input,Row,Col,DatePicker } from 'antd'
const Option = Select.Option
// const getClassid=(value,option)=>{
//     Model.change('allocation','getClassid',value)
// }        	
import moment from 'moment'
const FormComp = ({currentapplicationInfo,checkList,...props }) => {
    console.log(checkList)
    const refundFees=(value)=>{
        Model.change('checkModal','currentapplicationInfo.refundFee',event.target.value)
    }
    return (
         <div>
            <Row>
               <Col style={{color:'#000',fontSize:'24px',marginTop:'-1em'}}>{currentapplicationInfo.produceName}</Col>

            </Row>
            <Row style={{marginTop:'0.5em'}}>
                <Col span={13}>{checkList.schoolArea}/{checkList.schoolName}</Col>
                <Col span={5}>学校教务:{checkList.teacherName}</Col>
                <Col span={5}>电话:{checkList.teacherPhone}</Col>
            </Row>
            <Row style={{marginTop:'1.5em'}}>
                <Col>孩子姓名:{checkList.studentName}</Col>
                <Col>退款人:{checkList.payerName}</Col>
                <Col>退款人电话:&nbsp;{checkList.payerPhone}</Col>
                <Col>申请时间:{moment(checkList.createTime).format('YYYY-M-D')}</Col>
                <Col>退款原因:</Col>
            </Row>
            <Row>
                <Col offset={12} style={{marginTop:'-3em',color:'#000',fontSize:'24px'}}>订单金额:{checkList.totalFee}</Col>
                <Col offset={12} style={{color:'#000',fontSize:'20px'}}>已上课次/总课次:{checkList.consumedCourseTotal}</Col>
            </Row>
            <Row style={{marginTop:'3em'}}>
                <Col span={4} offset={4} style={{color:'#000',fontSize:'18px'}}>请输入退款金额:</Col>
                <Col span={8}>
                    <Input defaultValue={checkList.totalFee} onChange={refundFees} />
                </Col>
                <Col span={4}style={{color:'#000',fontSize:'18px'}}>元</Col> 
            </Row>
        </div>
    )
}
export default Model.connect(['dealApplication','checkModal'])(FormComp)
