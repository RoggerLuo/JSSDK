import React from 'react'
import { Form, Input, Row, Col, Button } from 'antd'
import {Model} from 'dvax'
const FormItem = Form.Item
import {redirect} from 'components/history'
import {withRouter} from 'react-router-dom'

function cancel(){
    redirect('/home/deal/order')
}
class Loader extends React.Component {
    componentDidMount(){
        if(!this.props.match.params.orderId) return        
        const orderId = this.props.match.params.orderId
        Model.run('dealOrder2',function*({fetch,reduce,change}){
                
            const res = yield fetch(`orders/${orderId}/detail`)
             res.payTime = new Date(res.payTime).format("yyyy-MM-dd hh:mm:ss")
            const orderList = res

            yield reduce(state=>({...orderList}))
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
            <FormItem label={'订单号'} wrapperCol={{span:10}} labelCol={{ span: 3 }}>
                {props['orderNumber']}
            </FormItem>
            <FormItem label={'支付方式'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {props['payMode']}
            </FormItem>
            <FormItem label={'交易流水号'} wrapperCol={{span:10}} labelCol={{ span: 3 }}>
                {props['paySerialNumber']}
            </FormItem>
            <FormItem label={'付款人'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                {props['payerName']}
            </FormItem>
            <FormItem label={'付款金额'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                {props['totalFee']}
            </FormItem>
            <FormItem label={'支付时间'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                {props['payTime']}
            </FormItem>
            <FormItem label={'商品名称'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                {props['produceName']}
            </FormItem>
            
            <FormItem label={'订单状态'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                {props['payState']}

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
export default Model.connect('dealOrder2')(Model.connect('dealOrder')(antdComp))