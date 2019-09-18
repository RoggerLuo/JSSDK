import React from "react"
import { Model } from 'dvax'
import {redirect,getQuery} from 'components/history'
import Form from './Form'
import moment from 'moment'
const initState = {
    start:moment('2018-1-1 09:00').unix()*1000,
    end:moment('2018-1-1 18:00').unix()*1000,
    
    bannedUsers:[],
    selectedSubject:[],
}
const namespace = 'banDetail'
Model.create({
    namespace,
    state: initState
})
function SubjectApp(props){
    return (
        <Form {...props}/>
    ) 
}

function openEdit(subjectId){
    Model.reduce(namespace,state=>initState) //清空
    redirect(`/home/subject/edit/${subjectId}`)
    Model.change(namespace,'isEdit',true) //区分编辑 新增状态
}
function openAdd(){
    Model.reduce(namespace,state=>initState) //清空
    redirect('/home/ban/add')
    Model.change(namespace,'isEdit',false) //区分编辑 新增状态
}
export default Model.connect(namespace)(SubjectApp)
export { openAdd, openEdit }