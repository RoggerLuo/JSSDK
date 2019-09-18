import React from 'react'
import { Form, Select,Input, Row, Col, Button } from 'antd'
const FormItem = Form.Item
import {redirect} from 'components/history'
import {Model} from 'dvax'
function cancel(){
    redirect('/home/college/class')
}
const FormComp = ({ form, submit,...props }) => {
    const { getFieldDecorator, validateFields } = form
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
            <FormItem label={'班级名称'} wrapperCol={{span:6}} labelCol={{ span: 2 }}>
                {
                    getFieldDecorator(
                        'schoolClassesName',
                        {initialValue:props['schoolClassesName']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input />
                    )
                }
            </FormItem>
            <FormItem label={'排序号'} wrapperCol={{span:4}} labelCol={{ span: 2 }}>
                {
                    getFieldDecorator(
                        'orderNumber',
                        {initialValue:props['orderNumber']||'',rules:[
                            {required:true,message:'必填'},
                            {pattern:/^[0-9]+$/,message:'只能输入数字'}
                        ]}
                    )(
                        <Input />
                    )
                }
            </FormItem>
            <FormItem label={'所属年级'} wrapperCol={{span:4}} labelCol={{ span: 2 }}>
                {
                    getFieldDecorator(
                        'schoolGradeId',
                        {initialValue:props['schoolGradeId']||'',rules:[{required:true,message:'必填'}]}
                    )(
                        <Select>
                            {props.grades && props.grades.map((el,ind)=>{
                                return (
                                    <Select.Option key={ind} value={el.schoolGradeId}>{el.schoolGradeName}</Select.Option>
                                )
                            })||null}
                        </Select>    
                    )
                }
            </FormItem>
            <FormItem label={'所属学校'} wrapperCol={{span:4}} labelCol={{ span: 2 }}>
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
