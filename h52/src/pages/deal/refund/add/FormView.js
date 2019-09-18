import React from 'react'
import { Form, Radio, Switch,Checkbox,DatePicker, Select,Input, Row, Col, Button } from 'antd'
import {Model} from 'dvax'
const FormItem = Form.Item
import {redirect} from 'components/history'
import moment from 'moment'
import {withRouter} from 'react-router-dom'
function cancel(){
    redirect('/home/deal/refund')
}
class Loader extends React.Component {
    componentDidMount(){
        if(!this.props.match.params.refundOrderId) return        
        const refundOrderId = this.props.match.params.refundOrderId
        Model.run('dealRefund2',function*({fetch,reduce,change}){
            const res = yield fetch(`refund-orders/${refundOrderId}/detail`)
            res.refundTime = new Date(res.refundTime).format("yyyy-MM-dd hh:mm:ss")           
            const refundList = res
            console.log('refundList',refundList)
            yield reduce(state=>({...refundList}))
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
            <FormItem label={'退款单号'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {props['refundOrderNumber']}
            </FormItem>
            <FormItem label={'退款方式'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {props['refundMode']}
            </FormItem>
            <FormItem label={'关联订单号'} wrapperCol={{span:10}} labelCol={{ span: 3 }}>
                {props['orderNumber']}

            </FormItem>
            <FormItem label={'收款人'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                {props['payerName']}
            </FormItem>
            <FormItem label={'退款金额'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                {props['refundFee']}
            </FormItem>
            <FormItem label={'退款时间'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                
                 {props['refundTime']}

               
                
            </FormItem>
            <FormItem label={'商品名称'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                {props['produceName']}
            </FormItem>
           
            <FormItem label={'退款状态'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                {props['refundState']}

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
export default Model.connect('dealRefund2')(Model.connect('dealRefund')(antdComp))

 // <Input value={moment(props['refundTime'])||moment()}/>