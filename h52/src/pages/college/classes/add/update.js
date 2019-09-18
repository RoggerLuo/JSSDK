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
  namespace: 'collegeClasses2',
  state: {
    // color:"#576ff8"
  }
})

function onPageChange(pageInfo){
    const currentPage = pageInfo.current
}
function openEdit({schoolClassesId}){
    redirect(`/home/college/classes/edit/${schoolClassesId}`)
    Model.change('collegeClasses2','isEdit',true)
    Model.change('collegeClasses2','schoolClassesId',schoolClassesId)
}



function CollegeSchoolarea(props){
  console.log(props)
    function submit(value){
        console.log(value)
        const schoolClassesId=props.schoolClassesId
        const body = {schoolClassesId,...value}
        props.run(function*({fetch,get}){
            //body.detail = get().detail
            let res
           
             res = yield fetch(`school-classes/update`,{method:'post',body}) 

          
            if(res.hasErrors) return
            message.success('编辑成功')
            redirect('/home/college/classes')
        })
    }
    return (
        <Form {...props} submit={submit}/>
    ) 
}

// export default Model.connect('collegeSchoolarea2')(CollegeSchoolarea)
// export {onPageChange,openEdit}
export default Model.connect('collegeClasses2')(CollegeSchoolarea)
export{onPageChange,openEdit}