import React from "react"
import { Model } from 'dvax'
import {redirect} from 'components/history'
import Form from './Form'
import {message} from 'antd'
Model.create({
    namespace:'roomInfoDetail',
    state:{}
})
function CourseCategoryAdd(props){
    function submit(value){
        props.run(function*({fetch}){
            let res
            if(props.isEdit){
                res = yield fetch(`classroom-info/update`,{method:'post',body:value})
            }else{
                res = yield fetch(`classroom-info`,{method:'post',body:value})
            }
            if(res.hasErrors) return
            message.success('添加成功')
            redirect('/home/arrange/roomInfo')
        })
    }
    return (
        <Form {...props} submit={submit}/>
    ) 
}
function openEditCategory(obj){
    Model.reduce('roomInfoDetail',state=>({...obj,isEdit:true}))
    redirect('/home/arrange/roomInfo/edit/'+obj.classroomInfoId)
}
function openAddCategory(){
    Model.reduce('roomInfoDetail',state=>({}))
    redirect('/home/arrange/roomInfo/add')
}
export default Model.connect('roomInfoDetail')(CourseCategoryAdd)
export { openAddCategory, openEditCategory }