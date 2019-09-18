import React from "react"
import { Model } from 'dvax'
import {redirect} from 'components/history'
import Form from './Form'
import {message} from 'antd'
import moment from 'moment'
Model.create({
    namespace:'yearDetail',
    state:{}
})
function CourseCategoryAdd(props){
    function submit(value){
        value.beginTime = moment(value.beginTime).unix() + '000'
        value.endTime = moment(value.endTime).unix() + '000'
        props.run(function*({fetch,get}){
            let res
            if(props.isEdit){
                value.schoolYearId = get().schoolYearId
                res = yield fetch(`school-years/update`,{method:'post',body:value})
            }else{
                res = yield fetch(`school-years`,{method:'post',body:value})
            }
            if(res.hasErrors) return
            message.success('添加成功')
            redirect('/home/college/year')
        })
    }
    return (
        <Form {...props} submit={submit}/>
    ) 
}
function openEditCategory(obj){
    Model.reduce('yearDetail',()=>{
        const state = {...obj}
        state.isEdit = true
        state.beginTime =  moment(obj.beginTime)
        state.endTime = moment(obj.endTime)
        return state
    })
    redirect('/home/college/year/edit') 
}
function openAddCategory(){
    Model.reduce('yearDetail',state=>({}))
    redirect('/home/college/year/add')
}
export default Model.connect('yearDetail')(CourseCategoryAdd)
export { openAddCategory, openEditCategory }