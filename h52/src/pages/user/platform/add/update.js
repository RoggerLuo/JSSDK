import React from "react"
import { Model,connect } from 'dvax'
import Datepicker from 'components/datepicker';
import Search from 'components/search';
import Select from 'components/select';
import { Table,message } from 'antd'
import tStyles from 'assets/style/table.less'
import { formatDate, getDateTime } from 'utils/tools'
import Constants from "utils/constants";
import { clear, getItem } from 'utils/localStorage';
import styled from 'styled-components';
import Form from './Form';
import {redirect} from 'components/history'


Model.create({
  namespace: 'userPlatform2',
  state: {
    // color:"#576ff8"
  }
})

function onPageChange(pageInfo){
    const currentPage = pageInfo.current
}
function openEdit({platformTeacherId }){
    redirect(`/home/user/platform/edit/${platformTeacherId}`)
    Model.change('userPlatform2','isEdit',true)
    Model.change('userPlatform2','platformTeacherId',platformTeacherId)
}

function userPlatform(props){
  console.log(props)
    function submit(value){
        console.log(value)
        const platformTeacherId=props.platformTeacherId 
        const body = {platformTeacherId,...value}
        props.run(function*({fetch,get}){
            let res           
            res = yield fetch(`user-platformteacher/update`,{method:'post',body:body}) 
            if(res.hasErrors) return
            message.success('编辑成功')
            redirect('/home/user/platform')
        })
    }
    return (
        <Form {...props} submit={submit}/>
    ) 
}

export default Model.connect('userPlatform2')(userPlatform)
export{onPageChange,openEdit}