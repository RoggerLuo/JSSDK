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
import moment from 'moment'
import {convertToHM,convertToTime} from './dateUtils'
Model.create({
  namespace: 'userParents2',
  state: {
    // color:"#576ff8"
  }
})

function onPageChange(pageInfo){
    const currentPage = pageInfo.current
}
function openEdit({householderId}){
        
    redirect(`/home/user/parents/edit/${householderId}`)
    Model.change('userParents2','isEdit',true)
    Model.change('userParents2','householderId',householderId)
}



function UserParents(props){
  console.log(props)
    function submit(value){
        console.log(value)
        const householderId=props.householderId
        const body = {householderId,...value}
        body.createTime = moment(value.createTime).unix()
            
        props.run(function*({fetch,get}){
            //body.detail = get().detail
        body.detail = get().detail
            let res
            
             res = yield fetch(`user-householder/update`,{method:'post',body:body})
            if(res.hasErrors) return
            message.success('编辑成功')
            redirect('/home/user/parents')
            Model.dispatch({type:'userParents/getUser'})
        })
    }
    return (
        <Form {...props} submit={submit}/>
    ) 
}

// export default Model.connect('collegeSchoolarea2')(CollegeSchoolarea)
// export {onPageChange,openEdit}
export default Model.connect('userParents2')(UserParents)
export{onPageChange,openEdit}