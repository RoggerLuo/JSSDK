import React from 'react'
import { connect,Model } from 'dvax'
import { Checkbox,Form, Icon, Input, Row, Col, Button,Select,DatePicker } from 'antd'
import { Modal, message } from 'antd'
import columns from '../columns'
import Roles from '../role'
import Datechoose from 'components/datepicker/datechoose'
import {redirect} from 'components/history'
import ControlledEditor from './Editor'
Model.create({
    namespace:'userPlatformAdd2',
    state:{}
})
const FormItem = Form.Item
// const { DatePicker } = antd;
const Option = Select.Option;
function cancel(){
    redirect('/home/user/platform')
    // Model.dispatch({type:'userPlatform/getUser'})
}
const FormComp = ({ form,roles,list,tagsList,listarea,submit,...props }) => {
    const { getFieldDecorator, validateFields, setFieldsValue, resetFields,validateFieldsAndScroll } = form
    const onSubmit = () => {
          validateFieldsAndScroll((error,value)=>{ // 规则检查
            if(error==null){
            value = {...value}
            console.log(value)
           submit(value)
        }
        })
        
    }
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    function onChange(date, dateString) {
        //this.setState({value:dataString.target.value})
      console.log(date, dateString);
    }
    const getroles=(value,option)=>{
        console.log(option.props.children)
        
        Model.change('userPlatformAdd','roleName',option.props.children)    
    }
    // const clickClean=()=>{

    // }
    return(
        <Form>
            <FormItem label={'姓名'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                {
                    getFieldDecorator(
                        'name',
                        {initialValue:props['name']||'',rules:[{required:true,message:'姓名至少为两个字',whitespace:false,min:2}]}
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
                                <Select.Option value="MALE">男</Select.Option>
                                <Select.Option value="FEMALE">女</Select.Option>                             
                            </Select>
                        )
                    }
            </FormItem>
            <FormItem label={'手机号码'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'phone',
                            {initialValue:props['phone']||'',validateTrigger:'onBlur',rules:[{pattern:/^[1][3,4,5,7,8][0-9]{9}$/,required:true,message:'请输入正确的手机号！',whitespace:true}]}
                        )(
                             <Input  />
                        )
                    }
            </FormItem>
            <FormItem label={'职务'} wrapperCol={{span:3}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'roleId',
                            {initialValue:props['roleId']||'',rules:[{required:true,message:'必填'}]}
                        )(
                       
                            <Select 
                               onSelect={getroles}

                                //onSelect={getroles(obj.roleId,obj.roleName)}
                                placeholder='请选择职位'
                                style={{ width: 150 }}
                                onDropdownVisibleChange={(open)=>Model.dispatch({type:'roleSelect/getRole'})}
                            >
                              {
                                roles.map((obj,index) =>{  
                                                               
                                    return  <Option key={index} value={obj.roleId} //onClick={clickClean} 
                                        >{obj.roleName}</Option>                               
                                 
                            })
                              }
                            </Select>
                        )
                    }                 
            </FormItem>
            <FormItem label={'关联课程标签'} wrapperCol={{span:3}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'courseLabelIds',
                            {initialValue:props['courseLabelIds']||[]}
                        )(
                       
                            <Select 
                               // onSelect={clickClean}

                                //onSelect={getroles(obj.roleId,obj.roleName)}
                                //placeholder='请选择职位'
                                mode="multiple"
                                style={{ width: 150 }}
                                onDropdownVisibleChange={(open)=>
                                    {   if(props.roleName=="主教"||props.roleName=="助教")
                                            Model.dispatch({type:'courseTag/getCourseTag'})
                                    }
                                }
                            >
                              {
                                tagsList.map((obj,index) =>{  
                                    if(props.roleName=="主教"||props.roleName=="助教"){                          
                                    return  <Option key={index} value={obj.courseLabelId} 
                                        >{obj.courseLabel}</Option>  
                                        }
                                    else return  null
                            })
                              }
                            </Select>
                        )
                    }                 
            </FormItem>



            <FormItem label={'所属分区或学校'} wrapperCol={{span:3}} labelCol={{ span: 2 }}>
                  {   
                    
                    getFieldDecorator(
                        'attachIds',
                        {initialValue:props['attachIds']||[]}
                    )(    
                        <Select
                          mode="multiple"
                         style={{ width: 150 }}
                         onDropdownVisibleChange={(open)=>{
                            if(props.roleName=="学校教务"){
                                    Model.dispatch({type:'collegeSchoolinfo/getCollege'})
                                }
                            else if(props.roleName=="主教"||props.roleName=="助教"||props.roleName=="区域教务")
                            {
                                Model.dispatch({type:'collegeSchoolarea/getCollege'})
                            }
                            }}                          
                        >
                             { 
                                list.map((el,index)=>{
                                      
                                if(props.roleName=="家长"||props.roleName=="学校教务")  {                                    
                                     return <Option value={el.schoolInfoId} key={index} >{el.schoolName}</Option>
                                    }
                                 }) 
                              
                            }
                            { 
                                listarea.map((el,index)=>{
                                if(props.roleName=="主教"||props.roleName=="助教"||props.roleName=="区域教务"){
                                return <Option value={el.schoolAreaId} key={index} >{el.area}</Option>}
                               })

                            }              
                    </Select>                                                            
                    )
                    
                }

            </FormItem>
            <FormItem label={'紧急联系人'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'emergencyContact',
                            {initialValue:props['emergencyContact']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                        )(
                             <Input />
                        )
                    }
            </FormItem>
            <FormItem label={'联系人电话'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'emergencyContactPhone',
                            {initialValue:props['emergencyContactPhone']||'',validateTrigger:'onBlur',rules:[{pattern:/^[1][3,4,5,7,8][0-9]{9}$/,required:true,message:'请输入正确的手机号！',whitespace:true,pattern:/^[1][3,4,5,7,8][0-9]{9}$/}]}
                        )(
                            <Input />
                        )
                    }
            </FormItem>
            <FormItem  style={{display:'none'}}>
                <ControlledEditor />
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
// const antdComp =  Form.create()(FormComp)
// export default Model.connect('userPlatformAdd')(antdComp)
const AntdComp =  Form.create()(FormComp)
const GeoComp = Model.connect('roleSelect')(AntdComp)
const AntdComped =Model.connect('collegeSchoolinfo')(GeoComp)
const AntdCompeds =Model.connect('collegeSchoolarea')(AntdComped)
const AntdCom=Model.connect('courseTag')(AntdCompeds)
// export default Model.connect('userPlatformAdd')(AntdCom)
export default AntdCom


// var date='2018-11-28'
// undefined
// new Date(date).getTime()
// 1543363200000
// 
// 
//  <FormItem label={'账号'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
            //     {
            //         getFieldDecorator(
            //             'username ',
            //             {initialValue:props['username ']||'',rules:[{required:true,message:'必填',whitespace:true}]}
            //         )(
            //             <Input />
            //         )
            //     }
            // </FormItem>
            // 
            // 
            //    <FormItem label={'评分'} wrapperCol={{span:2}} labelCol={{ span: 2 }}>
            //         {
            //             getFieldDecorator(
            //                 'score',
            //                 {initialValue:props['score']||'',rules:[{required:true,message:'必填',whitespace:true}]}
            //             )(
            //                 <Input />
            //             )
            //         }
            // </FormItem>
            // 
            // 
            // 
            //            
            // <FormItem label={'生日'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
            //         {
            //             getFieldDecorator(
            //                 'birthday',
            //                 {initialValue:props['birthday']||''}
            //             )(
                    
            //                 <Datechoose />
            //             )
            //         }  

            // </FormItem>