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

Model.create({
  namespace: 'collegeStudents2',
  state: {
    // color:"#576ff8"
  }
})

function onPageChange(pageInfo){
    const currentPage = pageInfo.current
}
function openEdit({schoolStudentId,schoolInfoId}){
    redirect(`/home/college/students/edit/${schoolStudentId}`)
    Model.change('collegeStudents2','isEdit',true)
    Model.change('collegeStudents2','schoolStudentId',schoolStudentId)
    Model.change('collegeStudents2','schoolInfoId',schoolInfoId)
}



function CollegeStudents(props){
  console.log(props)
    function submit(value){
        console.log(value)
        const schoolStudentId=props.schoolStudentId
        const schoolInfoId=props.schoolInfoId
        const body = {schoolStudentId,schoolInfoId,...value}
        debugger
        body.birthday = moment(value.birthday).unix()*1000
        
        // body.enrollmentYear = moment(value.enrollmentYear).unix()
        props.run(function*({fetch,get}){
            //body.detail = get().detail
            let res
           
             res = yield fetch(`school-students/update`,{method:'post',body})
            if(res.hasErrors) return
            message.success('编辑成功')
            redirect('/home/college/students')
            Model.dispatch({type:'collegeStudents/getCollege'})
        })
    }
    return (
        <Form {...props} submit={submit}/>
    ) 
}

// export default Model.connect('collegeSchoolarea2')(CollegeSchoolarea)
// export {onPageChange,openEdit}
export default Model.connect('collegeStudents2')(CollegeStudents)
export{onPageChange,openEdit}