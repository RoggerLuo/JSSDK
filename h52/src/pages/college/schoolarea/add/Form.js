import React from 'react'
import { connect,Model } from 'dvax'
import { Checkbox,Form, Icon, Input, Row, Col, Button,Select,DatePicker } from 'antd'
import { Modal, message } from 'antd'
import columns from '../columns'
import {MapSelectProvince,MapSelectCity} from '../map'
import {redirect} from 'components/history'
import ControlledEditor from './Editor'
//import Datechoose from '../../../../components/datepicker/datechoose'
Model.create({
    namespace:'collegeSchoolareaAdd',
    state:{
        cities:[]
    },
})
const FormItem = Form.Item
// const { DatePicker } = antd;
const Option = Select.Option;
function cancel(){
    redirect('/home/college/schoolarea')
}

const FormComp = ({ form,cities,provinces,submit,...props }) => {
        //console.log(cities)
    const { getFieldDecorator, validateFields, setFieldsValue, resetFields,validateFieldsAndScroll } = form
    const onSubmit = () => {
         validateFieldsAndScroll((error,value)=>{ // 规则检查
            if(error==null){
            value = {...value}
            console.log(value)
           submit(value)
        }
        })
        // redirect('/home/college/schoolarea')
        // Model.dispatch({type:'collegeSchoolarea/getCollege'})
    }
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    function onChange(date, dateString) {
        //this.setState({value:dataString.target.value})
      console.log(date, dateString);
    }


    return(
        <Form>
            <FormItem label={'分区名称'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                {
                    getFieldDecorator(
                        'schoolArea',
                        {initialValue:props['schoolArea']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input />
                    )
                }
            </FormItem>
           
             
             
             <FormItem label={'所属省'} wrapperCol={{span:10}} labelCol={{ span: 2 }}>
                     {
                        getFieldDecorator(
                            'provinceId',
                            {initialValue:props['provinceId']||props['province']}
                        )(  
                            <Select

                             style={{ width: 150 }}

                             onDropdownVisibleChange={(open)=>Model.dispatch({type:'mapSelect/getProvinces'})}
                           >
                                 {
                                    provinces.map((pro,index)=>{
                                          
                                        return <Option value={pro.provinceId} key={index} onClick={()=>Model.dispatch({type:'mapSelect/getCities',provinceCode:pro.provinceCode})}>{pro.province}</Option>
                                    })
                                }              
                            </Select>
      
                                                        
                        )
                    }
            </FormItem>
            <FormItem label={'所属市'} wrapperCol={{span:10}} labelCol={{ span: 2 }}>
                     {
                        getFieldDecorator(
                            'cityId',
                            {initialValue:props['cityId']||props['city']}
                        )(  
                                <Select
                                      style={{ width: 150 }}
                                    >
                                      {
                                        cities.map((obj,index) =>{
                                        return  <Option key={index} value={obj.cityId}>{obj.city}</Option>
                                    })
                                      }
                                </Select>
                                                        
                        )
                    }
            </FormItem>        
             <FormItem label={'排序号'} wrapperCol={{span:3}} labelCol={{ span: 2 }}>
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
            <FormItem label={'负责人'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                {
                    getFieldDecorator(
                        'manager',
                        {initialValue:props['manager']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input />
                    )
                }
            </FormItem>
            <FormItem label={'负责人电话'} wrapperCol={{span:5}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'managerPhone',                          
                            {initialValue:props['managerPhone']||'',validateTrigger:'onBlur',rules:[{pattern:/^[1][3,4,5,7,8][0-9]{9}$/,required:true,message:'请输入正确的手机号！',whitespace:true,pattern:/^[1][3,4,5,7,8][0-9]{9}$/}]}
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
            <FormItem  style={{display:'none'}}>
            <ControlledEditor />
            </FormItem>
        </Form>
    )
}
const AntdComp =  Form.create()(FormComp)
const GeoComp = Model.connect('mapSelect')(AntdComp)
export default Model.connect('collegeSchoolareaAdd')(GeoComp)



