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
import {redirect,getQuery} from 'components/history'
const AddButton = styled.div`
  color: white;
  padding: 8px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 36px;
  background: #576ff8;
  cursor: pointer;
  width: 116px;
  height: 36px;
  margin-left:20px;
`
Model.create({
  namespace: 'collegeSchoolarea1',
  state: {
  }
})

/* 标准化pagination每个table都能使用 */
function preparePagination({totalCount,pageSize,pageNum}){
    if(totalCount > pageSize) {
        return { 
            pageSize: pageSize,
            defaultCurrent: pageNum,
            total: totalCount,
            showQuickJumper: true 
        } 
    }else{
        return false        
    }
}
function onPageChange(pageInfo){
    const currentPage = pageInfo.current
}
function CollegeSchoolarea(props){
function submit(value){
        console.log(value)
        const body = {...value}
        props.run(function*({fetch}){
              const res = yield fetch(`school-areas`,{method:'post',body:value})           
            if(res.hasErrors) return
            message.success('添加成功')
            redirect('/home/college/schoolarea')
        })
    }
    return (
        <Form submit={submit} />
    )  
}

//export default Model.connect('collegeSchoolarea')(CollegeSchoolarea)
const CollegeSchoolareas=Model.connect('collegeSchoolarea')(CollegeSchoolarea)
export default Model.connect('collegeSchoolarea1')(CollegeSchoolareas)