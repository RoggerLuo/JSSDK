import React from "react"
import { Model } from 'dvax'
import {redirect,getQuery} from 'components/history'
import Form from './Form'
import moment from 'moment'
const initState = {
    startTime:moment('2018-1-1 09:00').unix()*1000,
    endTime:moment('2018-1-1 18:00').unix()*1000,
    managers:[],
    selectedEmployees:[],
    images:[]
}
Model.create({
    namespace:'subjectDetail',
    state: initState
})
function SubjectApp(props){
    return (
        <Form {...props}/>
    ) 
}
function openEdit(subjectId){
    Model.reduce('subjectDetail',state=>initState) //清空
    redirect(`/home/subject/edit/${subjectId}`)
    Model.change('subjectDetail','isEdit',true) //区分编辑 新增状态
}
function openAdd(){
    Model.reduce('subjectDetail',state=>initState) //清空
    redirect('/home/subject/add')
    Model.change('subjectDetail','isEdit',false) //区分编辑 新增状态
}
export default Model.connect('subjectDetail')(SubjectApp)
export { openAdd, openEdit }