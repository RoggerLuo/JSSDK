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
import Form from './FormView';
import {redirect} from 'components/history'
import moment from 'moment'
// import {convertToHM,convertToTime} from './dateUtils'
Model.create({
  namespace: 'dealRefund2',
  state: {
    // color:"#576ff8"
  }
})

function onPageChange(pageInfo){
    const currentPage = pageInfo.current
}
function openEdit({householderId}){
        
    // redirect(`/home/user/parents/edit/${householderId}`)
    // Model.change('userParents2','isEdit',true)
    // Model.change('userParents2','householderId',householderId)
}
function openView({refundOrderId}){
    redirect(`/home/deal/refund/view/${refundOrderId}`)
}


function DealRefund(props){
        
  console.log(props)
    return (
        <Form {...props} />
    ) 
}

// export default Model.connect('collegeSchoolarea2')(CollegeSchoolarea)
// export {onPageChange,openEdit}
export default Model.connect('dealRefund2')(DealRefund)
export{onPageChange,openEdit,openView}