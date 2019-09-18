import React from 'react'
import {Model} from 'dvax'
import {onPageChange,openEdit} from './add/update'
import {Switch,notification,Popconfirm } from 'antd'
export default 
  [
  {
    title: '学校名称',
    dataIndex: 'schoolName',
    width: 100,
  },
  {
    title: '排序号',
    dataIndex: 'orderNumber',
    width: 50,
  },
  {
    title: '所属分区',
    dataIndex: 'schoolArea',  
    width: 100,
  },
  {
    title: '负责人',
    dataIndex: 'manager',
    width: 100,
    // render:(birthday,record)=>{
    //   return  new Date(record.birthday).format("yyyy-MM-dd");           
    // }
  },
  {
    title: '负责人电话',
    dataIndex: 'managerPhone',
    width: 100,
  },
  {
    title: '学校联系人',
    dataIndex: 'schoolContact',
    width: 100,
  },
  {
    title: '联系人电话',
    dataIndex: 'schoolContactPhone',
    width: 100,
  },
  {
    title: '详细地址',
    dataIndex: 'schoolAddress',
    width: 100,
  },
  {
    title: '上架',
    dataIndex: 'putOn',
    width: 100,
    render(putOn,record,index){
      return <div>
                <Switch size="small"  checked={record['putOn']||false} />
              </div>
    }
  },
  {
    title: '操作',
    dataIndex: 'options',
    width: 100,
    render: (options,record,index) => { 
         return  <div>
                <span onClick={()=>openEdit(record)} style={{color:'#1890FF',cursor:'pointer'}}>
                    编辑
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Popconfirm title="是否确定删除?" onConfirm={() => {
                    Model.dispatch({type:'collegeSchoolinfo/deleteSchoolinfo',schoolInfoId:record.schoolInfoId})
                    }
                }>
                    <a href="#">删除</a>
                </Popconfirm>
            </div>   
    }
  }
]
