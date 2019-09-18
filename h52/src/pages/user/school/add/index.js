import React from "react"
import { Model,connect } from 'dvax'
import Datepicker from 'components/datepicker';
import Search from 'components/search';
import Select from 'components/select';
import { Table } from 'antd'
import tStyles from 'assets/style/table.less'
import { formatDate, getDateTime } from 'utils/tools'
import Constants from "utils/constants";
import { clear, getItem } from 'utils/localStorage';
import styled from 'styled-components';
import Form from './Form';
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
  namespace: 'userSchool2',
  state: {
    beginTime: '',
    endTime: '',
    keywords: '',
    categoryId: '',
    origin: '',
    auditState: '',
    paperState: '',
    
    list: [],

    isUploading: false,
    btnName: '上传文件',
    pagination:{
        pageNum: 1,
        pageSize: 10,
        totalCount: 20, // test value
    }
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

function UserSchool(props){
    return (
        <div>
    
            <Form />
                
        </div>
    ) 
}

export default Model.connect('userSchool')(UserSchool)
