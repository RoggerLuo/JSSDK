import React from 'react'
import { Form, Select,Input, DatePicker,Switch,Row, Col, Button } from 'antd'
const FormItem = Form.Item
import {redirect} from 'components/history'
import {Model} from 'dvax'
import moment from 'moment'
function cancel(){
    redirect('/home/college/year')
}
const FormComp = ({ form, submit,...props }) => {
    const { getFieldDecorator, validateFields, setFieldsValue, resetFields } = form
    const onSubmit = () => {
        validateFields((error,value)=>{ // 规则检查
            if(error===null) {
                value = {...value}
                submit(value)    
            }
        })
    }
    return(
        <Form>
            <FormItem label={'学年名称'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'schoolYear',
                        {initialValue:props['schoolYear']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input />
                    )
                }
            </FormItem>
            <FormItem label={'开始时间'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'beginTime',
                        {initialValue:props['beginTime']||moment(),rules:[{required:true,message:'必填'}]}
                    )(
                        <DatePicker />
                    )
                }
            </FormItem>
            <FormItem label={'结束时间'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'endTime',
                        {initialValue:props['endTime']||moment(),rules:[{required:true,message:'必填'}]}
                    )(
                        <DatePicker />
                    )
                }
            </FormItem>
            
            <FormItem label={'所属学校'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'schoolInfoId',
                        {initialValue:props['schoolInfoId']||'',rules:[{required:true,message:'必填'}]}
                    )(
                        <Select>
                            {props.schools && props.schools.map((el,ind)=>{
                                return (
                                    <Select.Option key={ind} value={el.schoolInfoId}>{el.schoolName}</Select.Option>
                                )
                            })||null}
                        </Select>    
                    )
                }
            </FormItem>
            <FormItem label={'当前报名学年'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'enabled',
                        {initialValue:props['enabled']||false}
                    )(
                        <Switch 
                            checked={props['enabled']||false}
                            onChange={checked=>Model.change('yearDetail','enabled',checked)}
                        />
                    )
                }
            </FormItem>
            <FormItem>
                <Row>
                    <Col span={2} offset={1}>
                        <Button onClick={onSubmit} loading={false} type="primary" size="large" style={{width:'100px'}}> 保存 </Button>             
                    </Col>
                    <Col span={4} offset={2}>
                        <Button size="large" onClick={cancel} style={{width:'100px'}}>取消</Button>             
                    </Col>
                </Row>
            </FormItem>  
        </Form>
    )
}
const antdComp = Form.create()(FormComp)
export default Model.connect('commonData')(antdComp)
