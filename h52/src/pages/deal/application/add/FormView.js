import React from 'react'
import { Form, Row, Col, Button } from 'antd'
import {Model} from 'dvax'
const FormItem = Form.Item
import {redirect} from 'components/history'
import {withRouter} from 'react-router-dom'

function cancel(){
    redirect('/home/deal/application')
}
class Loader extends React.Component {
    componentDidMount(){
        if(!this.props.match.params.refundApplicationId) return        
        const refundApplicationId = this.props.match.params.refundApplicationId
        Model.run('dealApplication2',function*({fetch,reduce,change}){
            const res = yield fetch(`refund-applications/${refundApplicationId}/detail`)
            res.refundTime = new Date(res.refundTime).format("yyyy-MM-dd hh:mm:ss")
            const RefundAppliction= res
            console.log('RefundAppliction',RefundAppliction)
            yield reduce(state=>({...RefundAppliction}))

            yield change('isEdit',true)
        })
    } 
    render(){
        return null
    }
}
const LoaderConnected = withRouter(Loader)
const FormComp = ({ form, submit,...props }) => {
        
    const { getFieldDecorator,validateFieldsAndScroll, validateFields, setFieldsValue, resetFields } = form

    console.log(props)
    return(
        <Form>
            <LoaderConnected/>
            <FormItem label={'课程名称'} wrapperCol={{span:10}} labelCol={{ span: 3 }}>
                {props['produceName']}
            </FormItem>
            <FormItem label={'支付金额'} wrapperCol={{span:10}} labelCol={{ span: 3 }}>
                {props['totalFee']}
            </FormItem>
            <FormItem label={'所属分区'} wrapperCol={{span:10}} labelCol={{ span: 3 }}>
                {props['schoolArea']}

            </FormItem>
            <FormItem label={'所属学校'} wrapperCol={{span:10}} labelCol={{ span: 3 }}>
                {props['schoolName']}
            </FormItem>
            <FormItem label={'退款人'} wrapperCol={{span:10}} labelCol={{ span: 3 }}>
                {props['payerName']}
            </FormItem>
            <FormItem label={'联系方式'} wrapperCol={{span:10}} labelCol={{ span: 3 }}>
                {props['payerPhone']}
            </FormItem>
            <FormItem label={'孩子姓名'} wrapperCol={{span:10}} labelCol={{ span: 3 }}>
                {props['studentName']}
            </FormItem>
            <FormItem label={'退款时间'} wrapperCol={{span:10}} labelCol={{ span: 3 }}>
                {props['refundTime']}
            </FormItem>
            <FormItem label={'退款金额'} wrapperCol={{span:10}} labelCol={{ span: 3 }}>
                {props['refundFee']}

            </FormItem>
            <FormItem label={'申请状态'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                {props['applyState']}

            </FormItem>
            <FormItem>
                <Row>
                    <Col span={4} offset={2}>
                        <Button size="large" type="primary"  onClick={cancel} style={{width:'100px'}}>返回</Button>
                    </Col>
                </Row>
            </FormItem>  
        </Form>
    )
}
const antdComp = Form.create()(FormComp)
export default Model.connect('dealApplication2')(Model.connect('dealApplication')(antdComp))

// <DatePicker value={props['payerPhone']||moment()}/>