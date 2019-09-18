import React from 'react'
import { Model } from 'dvax'
import { Checkbox,Form, Icon, Input, Row, Col, Button,Select,DatePicker,Switch } from 'antd'
import {redirect} from 'components/history'
import ControlledEditor from './Editor'
import Uploader from './Uploader'
const FormItem = Form.Item
const Option = Select.Option;
function cancel(){
        redirect('/home/college/schoolinfo')
}
const FormComp = ({ form,listarea,submit,...props }) => {
    const { getFieldDecorator, validateFields, setFieldsValue, resetFields,validateFieldsAndScroll } = form
    const onSubmit = () => {
        validateFieldsAndScroll((error,value)=>{ // 规则检查
            console.log(error)
            console.log(value)
            if(error===null) {
                value = {...value}
                submit(value)    
            }
        })
    }
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    function onChange(date, dateString) {
      console.log(date, dateString);
    }


    return(
        <Form>
            <FormItem label={'学校名称'} wrapperCol={{span:5}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'schoolName',
                        {initialValue:props['schoolName']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input />
                    )
                }
            </FormItem>        
            <FormItem label={'所属分区'} wrapperCol={{span:5}} labelCol={{ span: 3 }}>
                    {
                        getFieldDecorator(
                            'schoolAreaId',
                            {initialValue:props['schoolAreaId']||''}
                        )(
                              <Select
                             style={{ width: 150 }}
                             onDropdownVisibleChange={(open)=>Model.dispatch({type:'collegeSchoolarea/getCollege'})}
                           >
                                 {
                                    listarea.map((obj,index)=>{
                                          
                                        return <Option value={obj.schoolAreaId} key={index} >{obj.schoolArea}</Option>
                                    })
                                }              
                        </Select>                                                            
                        
                        )
                    }  
            </FormItem>
            <FormItem label={'负责人'} wrapperCol={{span:5}} labelCol={{ span: 3 }}>
                    {
                        getFieldDecorator(
                            'manager',
                            {initialValue:props['manager']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                        )(
                            <Input />
                        )
                    }
            </FormItem>
            <FormItem label={'负责人电话'} wrapperCol={{span:5}} labelCol={{ span: 3 }}>
                    {
                        getFieldDecorator(
                            'managerPhone',                          
                            {initialValue:props['managerPhone']||'',validateTrigger:'onBlur',rules:[{pattern:/^[1][3,4,5,7,8][0-9]{9}$/,required:true,message:'请输入正确的手机号！',whitespace:true,pattern:/^[1][3,4,5,7,8][0-9]{9}$/}]}
                        )(
                             <Input />
                        )
                    }
            </FormItem>
           
            <FormItem label={'学校联系人'} wrapperCol={{span:5}} labelCol={{ span: 3 }}>
                    {
                        getFieldDecorator(
                            'schoolContact',
                            {initialValue:props['schoolContact']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                        )(
                            <Input />
                        )
                    }
            </FormItem>
             <FormItem label={'学校联系人电话'} wrapperCol={{span:5}} labelCol={{ span: 3 }}>
                    {
                        getFieldDecorator(
                            'schoolContactPhone',                          
                            {initialValue:props['schoolContactPhone']||'',validateTrigger:'onBlur',rules:[{pattern:/^[1][3,4,5,7,8][0-9]{9}$/,required:true,message:'请输入正确的手机号！',whitespace:true,pattern:/^[1][3,4,5,7,8][0-9]{9}$/}]}
                        )(
                             <Input />
                        )
                    }
            </FormItem>
            <FormItem label={'学校地址'} wrapperCol={{span:5}} labelCol={{ span: 3 }}>
                    {
                        getFieldDecorator(
                            'schoolAddress',
                            {initialValue:props['schoolAddress']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                        )(
                          <textarea type="text" style={{width:'300px'}}/>
                        )
                    }
            </FormItem>
            <FormItem label={'排序号'} wrapperCol={{span:3}} labelCol={{ span: 3 }}>
                    {
                        getFieldDecorator(
                            'orderNumber',
                            {initialValue:props['orderNumber']||'',rules:[
                            {required:true,message:'必填'},
                            {pattern:/^[0-9]+$/,message:'只能输入数字'},
                            {max:4,message:'排序号不能超过9999'}
                        ]}
                        )(
                           <Input />
                        )
                    }
            </FormItem>
            <FormItem label={'学校Banner'} wrapperCol={{span:20}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'images',
                        {initialValue:props['images']||'',rules:[
                            {required:true,message:'请上传格式正确的图片'}
                        ]}
                    )(
                        <Input style={{display:'none'}}/>
                    )
                }
                <Uploader 
                    updateFileList={images=>{
                        Model.change('collegeSchoolinfo1','images',images)
                        setFieldsValue({images:'error!!images数据从model获取，从model获取，从model获取'}) 
                    }}
                    fileList={props['images']||[]}
                />
                {'Tips:图片支持JPG、JPEG和PNG格式，尺寸建议为(宽1125*高660)，大小不超过1M。'}
            </FormItem>

            <FormItem label={'是否上架'} wrapperCol={{span:3}} labelCol={{ span: 3 }}>
                    {
                        getFieldDecorator(
                            'putOn',
                            {initialValue:props['putOn']||false}
                        )(
                           <Switch /> 
                        )
                    }
            </FormItem>
            <FormItem  style={{display:'none'}}>
                <ControlledEditor/>
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
const antdComps = Model.connect(['collegeSchoolarea','collegeSchoolinfo1'])(antdComp)
export default antdComps


