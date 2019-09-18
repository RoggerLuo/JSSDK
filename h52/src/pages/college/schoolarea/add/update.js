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
  namespace: 'collegeSchoolarea2',
  state: {
    // color:"#576ff8"
  }
})

function onPageChange(pageInfo){
    const currentPage = pageInfo.current
}
function openEdit({schoolAreaId}){
    redirect(`/home/college/schoolarea/edit/${schoolAreaId}`)
    Model.change('collegeSchoolarea2','isEdit',true)
    Model.change('collegeSchoolarea2','schoolAreaId',schoolAreaId)
}



function CollegeSchoolarea(props){
  console.log(props)
    function submit(value){
        console.log(value)
        const schoolAreaId=props.schoolAreaId
        const body = {schoolAreaId,...value}
        props.run(function*({fetch,get}){
            //body.detail = get().detail
            let res
           
             res = yield fetch(`school-areas/update`,{method:'post',body}) 

          
            if(res.hasErrors) return
            message.success('编辑成功')
            redirect('/home/college/schoolarea')
        })
    }
    return (
        <Form {...props} submit={submit}/>
    ) 
}

// export default Model.connect('collegeSchoolarea2')(CollegeSchoolarea)
// export {onPageChange,openEdit}
export default Model.connect('collegeSchoolarea2')(CollegeSchoolarea)
export{onPageChange,openEdit}