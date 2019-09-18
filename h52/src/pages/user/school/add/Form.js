import React from 'react'
import { connect,Model } from 'dvax'
import { Checkbox,Form, Icon, Input, Row, Col, Button,Select,DatePicker } from 'antd'
import { Modal, message } from 'antd'
import columns from '../columns'
import Datechoose from '../../../../components/datepicker/datechoose'
Model.create({
    namespace:'userSchoolAdd',
    state:{

    }
})
const FormItem = Form.Item
// const { DatePicker } = antd;

function cancel(){}
const FormComp = ({ form,...props }) => {
    const { getFieldDecorator, validateFields, setFieldsValue, resetFields } = form
    const onSubmit = () => {
         validateFields((error,value)=>{ // 规则检查
            if(error==null){
            value = {...value}
            const dateint=value.birthday
            const dateints=new Date(dateint).getTime()
            value.birthday=dateints
                
            console.log(value)
            props.run(function*({fetch}){
                const res = yield fetch(`user-schoolteacher`,{method:'post',body:value})
                console.log(res)
                    
            })
        }
        })
    }
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    function onChange(date, dateString) {
        //this.setState({value:dataString.target.value})
      console.log(date, dateString);
    }


    return(
        <Form>
            <FormItem label={'姓名'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                {
                    getFieldDecorator(
                        'name',
                        {initialValue:props['name']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input />
                    )
                }
            </FormItem>
             <FormItem label={'性别'} wrapperCol={{span:3}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'gender',
                            {initialValue:props['gender']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                        )(
                            <Select>
                                <Select.Option value="男">男</Select.Option>
                                <Select.Option value="女">女</Select.Option>                             
                            </Select>
                        )
                    }
            </FormItem>
            <FormItem label={'账号'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                {
                    getFieldDecorator(
                        'username ',
                        {initialValue:props['username ']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input />
                    )
                }
            </FormItem>
            <FormItem label={'生日'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'birthday',
                            {initialValue:props['birthday']||''}
                        )(
                    
                            <Datechoose />
                        )
                    }  

            </FormItem>
            <FormItem label={'联系方式'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'phone',
                            {initialValue:props['phone']||'',validateTrigger:'onBlur',rules:[{pattern:/^[1][3,4,5,7,8][0-9]{9}$/,required:true,message:'请输入正确的手机号！',whitespace:true}]}
                        )(
                             <Input  />
                        )
                    }
            </FormItem>
            <FormItem label={'紧急联系人'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'emergencyContact',
                            {initialValue:props['emergencyContact']||''}
                        )(
                             <Input />
                        )
                    }
            </FormItem>
            <FormItem label={'联系人电话'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'emergencyContactPhone',
                            {initialValue:props['emergencyContactPhone']||'',validateTrigger:'onBlur',rules:[{pattern:/^[1][3,4,5,7,8][0-9]{9}$/,message:'请输入正确的手机号！'}]}
                        )(
                            <Input />
                        )
                    }
            </FormItem>
            <FormItem label={'职位'} wrapperCol={{span:3}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'position',
                            {initialValue:props['position']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                        )(
                            <Select>
                                <Select.Option value="学校老师">学校老师</Select.Option>
                                
                            </Select>
                        )
                    }
            </FormItem>
             <FormItem label={'所属学校'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'schoolName',
                            {initialValue:props['schoolName']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                        )(
                            <Input />
                        )
                    }
            </FormItem>
               <FormItem label={'现任班级'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'classes',
                            {initialValue:props['classes']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                        )(
                            <Input />
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
const antdComp =  Form.create()(FormComp)
export default Model.connect('userSchoolAdd')(antdComp)



// var date='2018-11-28'
// undefined
// new Date(date).getTime()
// 1543363200000