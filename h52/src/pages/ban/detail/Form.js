import React from 'react'
import { Form,Input, Row, Col, Button, Checkbox,Message,Select } from 'antd'
import {Model} from 'dvax'
import {redirect} from 'components/history'
import AddStaffModel,{showModal} from 'components/addStaffModal'
import {Staff,StaffSpan} from 'components/addStaffModal/FormComponents'
import { TimePicker } from 'antd'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
const FormItem = Form.Item
function cancel(){ 
    redirect('/home/ban')
}
const format = 'HH:mm'
const $ = Model.assign('banDetail')
// 加载用的状态组件
class Init extends React.Component { 
    componentDidMount(){
        Model.dispatch({type:'subject/get'})
    }
    render() {
        return <div></div>
    }
}

const FormComp = ({ form,...props }) => {
    const { getFieldDecorator,validateFieldsAndScroll, validateFields, setFieldsValue, resetFields } = form
    const onSubmitEmployee = (data) => {
        if(data.length === 0) return
        Model.change('banDetail','bannedUsers',data) // mongo直接存json [{avatar,name,user_id}]
        setFieldsValue({bannedUsers:'Input代替managers字段参与做校验'}) //Input代替managers字段参与做校验
    }
    const onSubmit=()=>{ //提交表单 规则检查
        validateFieldsAndScroll((error,value)=>{ 
            if(error===null) {
                const data = $.get()
                // 一些 需要提交时校验的项
                if(data.end < data.start) {
                    Message.warning('结束时间应该大于开始时间')
                    return
                }
                const {start,end} = data
                Model.run('',function*({fetch,put}){
                    const res = yield data.bannedUsers.map(user=>{
                        return fetch(`user-ban/${data.selectedSubject}/${user.user_id}`,{method:'post',body:{
                            reason:data.reason,start,end,username:user.username,
                            ...user
                            // avatar,nickname,mobile,name
                        }})
                    })
                    // if(res.status==='error') return
                    Message.success('添加禁言用户成功') // 用户看见的message
                    yield put({type:'get'}) // 刷新数据列表
                    cancel() // 跳转
                })        
            }
        })
    }
    return(
        /* 结合使用FormItem getFieldDecorator和自定义react组件 */
        <Form>
            <Init {...props}/>
            <AddStaffModel/>
            <FormItem label={'用户'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'bannedUsers',
                        {
                            validateTrigger:'onBlur',
                            initialValue:'',rules:[{max:200,required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input style={{display:'none'}}/>
                    )
                }
                <span onClick={()=>showModal(onSubmitEmployee)} style={{color:'#1890ff',cursor:'pointer'}}>请选择</span>
                <div style={{position:'relative',left:'0px'}}>
                    {props.bannedUsers.map((em,ind)=>{
                        return <StaffSpan  key={ind} {...em}  onClick={user_id=>{
                            props.reduce(state=>{
                                const obj = state.bannedUsers.find(el=>el.user_id===user_id)
                                const index = state.bannedUsers.indexOf(obj)
                                const bannedUsers= [...state.bannedUsers]
                                bannedUsers.splice(index,1)
                                return {...state,bannedUsers}
                            })    
                        }}/>
                    })}
                </div>
            </FormItem>

            <FormItem label={'板块'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'selectedSubject',
                        {
                            validateTrigger:'onBlur',
                            initialValue:'',rules:[{max:200,required:true,message:'必填',whitespace:true}]}
                    )(
                        <Select
                            onChange={(value)=>{        // onchange
                                $.change('selectedSubject',value||'')
                            }}
                            placeholder={'选择板块'}    //placeholder
                            style={{ width: '150px' }}
                            allowClear
                        >
                            {props.subjects             // data source
                                .map((el,ind)=>(
                                    <Select.Option 
                                        value={el._id}  // value key
                                    key={ind}>
                                        {el.name}       {/* text key */}
                                    </Select.Option>
                                )
                            )}
                        </Select>
                    )
                }
            </FormItem>
                
            <FormItem label={'限制禁用时间段'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                <TimePicker format={format} value={moment(props.start)} onChange={(moment)=>{
                        $.change('start',moment.unix()*1000)
                    }}/> 至&nbsp;
                    <TimePicker format={format} value={moment(props.end)} onChange={moment=>{
                        $.change('end',moment.unix()*1000)
                    }}/>
            </FormItem>


            <FormItem label={'原因'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'name',
                        {
                            validateTrigger:'onBlur',
                            initialValue:props['name']||'',rules:[{max:200,required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input 
                        placeholder={''}
                        onChange={e=>{
                            $.change('reason',e.target.value)
                        }}
                    />
                    )
                }
            </FormItem>
            <Row style={{marginBottom:'15px'}}>
                <Col span={2} offset={1}>
                    <Button onClick={onSubmit} loading={false} type="primary" size="large" style={{width:'100px'}}> 添加 </Button>             
                </Col>
                <Col span={4} offset={2}>
                    <Button size="large" onClick={cancel} style={{width:'100px'}}>取消</Button>             
                </Col>
            </Row>
        </Form>
    )
}
const antdComp = Form.create()(withRouter(FormComp))
export default Model.connect(['subject','banDetail'])(antdComp)
