import React from 'react'
import { Form,Input, Row, Col, Button, Checkbox,Message } from 'antd'
import {Model} from 'dvax'
import {redirect} from 'components/history'
import Uploader from './Uploader'
import AddStaffModel,{showModal} from 'components/addStaffModal'
import { TimePicker } from 'antd'
import {Staff,StaffSpan} from 'components/addStaffModal/FormComponents'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
import {api} from 'src'

const FormItem = Form.Item
function cancel(){ 
    redirect('/home/subject')
}
const format = 'HH:mm'

// 加载用的状态组件
class Init extends React.Component { 
    componentDidMount(){

        const subjectId = this.props.match.params.subjectId
        if(!subjectId) return //区分新增和编辑状态

        Model.run('subjectDetail',function*({fetch}){
            const res = yield fetch(`subject/${subjectId}`)
            const data = res.results
            // 上传照片的处理代码
            const images = [{
                uid: data.image,
                name: data.image+'.png',
                status:'done',
                response:{data:{media:{mediaId: data.image}}},
                thumbUrl:`${api}/medias/${data.image}` // 图片资源链接
            }]
            data.images = images
            Model.reduce('subjectDetail',state=>data) 
        })
    }
    render() {
        return <div></div>
    }
}


const FormComp = ({ form,...props }) => {
    const { getFieldDecorator,validateFieldsAndScroll, validateFields, setFieldsValue, resetFields } = form
    const onSubmitEmployee = (data) => {
        if(data.length === 0) return
        const managers = Model.get('subjectDetail').managers
        Model.change('subjectDetail','managers',[...managers,...data]) // mongo直接存json [{avatar,name,user_id}]
        setFieldsValue({managers:'Input代替managers字段参与做校验'}) //Input代替managers字段参与做校验
    }
    const onSubmit=()=>{ //提交表单 规则检查
        validateFieldsAndScroll((error,value)=>{ 
            if(error===null) {
                const data = Model.get('subjectDetail')
                // 一些 需要提交时校验的项
                if(data.endTime < data.startTime) {
                    Message.warning('结束时间应该大于开始时间')
                    return
                }
                // 区分编辑和非编辑，根据url是否带参数
                const subjectId = props.match.params.subjectId //来自withRouter
                if(!subjectId) { // 没有就不是编辑
                    Model.run('',function*({fetch}){
                        const res = yield fetch(`subject`,{method:'post',body:data})
                        if(res.status==='error') return

                        Message.success('新建板块成功') // 用户看见的message
                        Model.dispatch({type:'subject/get'}) // 刷新数据列表
                        cancel() // 跳转
                    })
                }else{
                    Model.run('',function*({fetch}){
                        const res = yield fetch(`subject/${subjectId}`,{method:'post',body:data})
                        if(res.status==='error') return
                        Message.success('编辑板块成功')
                        Model.dispatch({type:'subject/get'})
                        cancel()
                    })    
                }
        
            }
        })
    }
    return(
        /* 结合使用FormItem getFieldDecorator和自定义react组件 */
        <Form>
            <Init {...props}/>
            <AddStaffModel/>
            <FormItem label={'名称'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'name',
                        {
                            validateTrigger:'onBlur',
                            initialValue:props['name']||'',rules:[{max:200,required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input 
                        placeholder={'请输入板块名称'}
                        onChange={e=>{
                            Model.change('subjectDetail','name',e.target.value)
                        }}
                    />
                    )
                }
            </FormItem>
            <FormItem label={'图标'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'image',
                        {
                            validateTrigger:'onBlur',
                            initialValue:props['image']||'',rules:[{max:200,required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input style={{display:'none'}}/>
                    )
                }
                <Uploader 
                    updateFileList={images=>{
                        Model.change('subjectDetail','images',images)

                        if(images[0] && images[0].response && images[0].response.status==='ok') {
                            Model.change('subjectDetail','image',images[0].response.results)
                        }
                        setFieldsValue({image:'Input代替Uploader参与做校验'})
                    }}
                    fileList={props['images']}
                />

            </FormItem>
            <FormItem label={'版主'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'managers',
                        {
                            validateTrigger:'onBlur',
                            initialValue:props['managers'].join(''),rules:[{max:200,required:true,message:'必填'}]}
                    )(
                        <Input style={{display:'none'}}/>
                    )
                }
                <span onClick={()=>showModal(onSubmitEmployee)} style={{color:'#1890ff',cursor:'pointer'}}>请选择</span>
                <div style={{position:'relative',left:'0px'}}>
                    {props.managers.map((em,ind)=>{
                        return <StaffSpan key={ind} {...em} onClick={user_id=>{
                            Model.reduce('subjectDetail',state=>{
                                const obj = state.managers.find(el=>el.user_id===user_id)
                                const index = state.managers.indexOf(obj)
                                const managers= [...state.managers]
                                managers.splice(index,1)
                                return {...state,managers}
                            })
                        }}/>
                    })}
                </div>

            </FormItem>
            <FormItem label={'是否显示版主信息'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                <Checkbox 
                    checked={props['managersVisible']}
                    onChange={e=>Model.change('subjectDetail','managersVisible',e.target.checked)}
                >
                </Checkbox>

            </FormItem>

            <FormItem label={'是否审帖'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                <Checkbox 
                        checked={props['audit']}
                        onChange={e=>Model.change('subjectDetail','audit',e.target.checked)}
                    >
                </Checkbox>

            </FormItem>
            <FormItem label={'是否限制开放时间'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                <Checkbox 
                        checked={props['accessTimeLimit']}
                        onChange={e=>Model.change('subjectDetail','accessTimeLimit',e.target.checked)}
                    >
                </Checkbox>

            </FormItem>

            <FormItem label={'限制禁用时间段'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                <TimePicker format={format} value={moment(props.startTime)} onChange={(moment)=>{
                        Model.change('subjectDetail','startTime',moment.unix()*1000)
                    }}/> 至&nbsp;
                    <TimePicker format={format} value={moment(props.endTime)} onChange={moment=>{
                        Model.change('subjectDetail','endTime',moment.unix()*1000)
                    }}/>

            </FormItem>

            <FormItem label={'排序号'} wrapperCol={{span:6}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'orderIndex',
                        {initialValue:props['orderIndex']||'',rules:[
                            {required:true,message:'必填'},
                            {pattern:/^[0-9]+$/,message:'只能输入数字'}
                        ]}
                    )(
                        <Input 
                            placeholder={'请输入数字'}
                            onChange={e=>{
                                Model.change('subjectDetail','orderIndex',e.target.value)
                            }}
                        />
                    )
                }
            </FormItem>

            <Row style={{marginBottom:'15px'}}>
                <Col span={2} offset={1}>
                    <Button onClick={onSubmit} loading={false} type="primary" size="large" style={{width:'100px'}}> 保存 </Button>             
                </Col>
                <Col span={4} offset={2}>
                    <Button size="large" onClick={cancel} style={{width:'100px'}}>取消</Button>             
                </Col>
            </Row>
        </Form>
    )
}
const antdComp = Form.create()(withRouter(FormComp))
export default Model.connect(['addStaffModal','subjectDetail'])(antdComp)

/* 
            <Row style={{marginBottom:'15px'}}>
                <Col offset={1} span={1}>
                    名称：
                </Col>
                <Col offset={0} span={6}>
                </Col>
            </Row>
                        <Row style={{marginBottom:'15px'}}>
                <Col offset={1} span={1}>
                    图标：
                </Col>
                <Col offset={0} span={6}>
                    <Uploader 
                        updateFileList={images=>{
                            Model.change('subjectDetail','image',images[0])
                        }}
                        fileList={props['image']||[]}
                    />
                </Col>
            </Row>

 */