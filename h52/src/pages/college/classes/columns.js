import React from 'react'
import {Model} from 'dvax'
import {redirect} from 'components/history'
import {notification,Popconfirm } from 'antd'
import {onPageChange,openEdit} from './add/update'


export default 
  [
  {
    title: '班级名称',
    dataIndex: 'schoolClassesName',
    width: 100,
  },
  {
    title: '排序号',
    dataIndex: 'orderNumber',
    width: 50,
    
  },
  {
    title: '所属年级',
    dataIndex: 'schoolGradeName',  
    width: 100,
  },
  {
    title: '班主任',
    dataIndex: 'classesTeacherName',
    width: 100,
  },
  {
    title:'班主任电话',
    dataIndex:'classesTeacherPhone',
    width:100,
  },
  {
    title: '所属学校',
    dataIndex: 'schoolName',
    width: 100,
  },
  {
    title: '操作',
    dataIndex: 'options',
    width: 100,
    render: (options,record,index) => { 
          return ( 
            <div>
                <span onClick={()=>openEdit(record)} style={{color:'#1890FF',cursor:'pointer'}}>
                    编辑
                </span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Popconfirm title="是否确定删除?" onConfirm={() => {
                  Model.dispatch({type:'collegeClasses/deleteClasses',schoolClassesId:record.schoolClassesId})
                }
                }>
                    <a href="#">删除</a>
                </Popconfirm>            
            </div>
    );
          
    }
  }
]



 