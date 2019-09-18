import React from "react"
import { Model } from 'dvax'
import {redirect} from 'components/history'
import Form from './Form'
import {message} from 'antd'
Model.create({
    namespace:'classDetail',
    state:{}
})
function CourseCategoryAdd(props){
    function submit(value){

        props.run(function*({fetch,get}){
            let res
            if(props.isEdit){
                value.schoolClassesId = get().schoolClassesId
                res = yield fetch(`school-classes/update`,{method:'post',body:value})
            }else{
                res = yield fetch(`school-classes`,{method:'post',body:value})
            }
            if(res.hasErrors) return
            message.success('添加成功')
            redirect('/home/college/class')
        })
    }
    return (
        <Form {...props} submit={submit}/>
    ) 
}
function openEditCategory(obj){
    Model.reduce('classDetail',state=>({...obj,isEdit:true}))
    redirect('/home/college/class/edit')
}
function openAddCategory(){
    Model.reduce('classDetail',state=>({}))
    redirect('/home/college/class/add')
}
export default Model.connect('classDetail')(CourseCategoryAdd)
export { openAddCategory, openEditCategory }