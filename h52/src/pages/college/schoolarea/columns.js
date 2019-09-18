import React from 'react'
import {Model} from 'dvax'
import {redirect} from 'components/history'
import {notification,Popconfirm } from 'antd'
import {onPageChange,openEdit} from './add/update'


export default 
  [
  {
    title: '分区名称',
    dataIndex: 'schoolArea',
    width: 100,
  },
  {
    title: '排序号',
    dataIndex: 'orderNumber',
    width: 50,
    
  },
  {
    title: '负责人',
    dataIndex: 'manager',  
    width: 100,
  },
  {
    title: '负责人电话',
    dataIndex: 'managerPhone',
    width: 100,
  },
  {
    title: '所属省市',
    dataIndex: 'dataIndex',
    width: 100,
    render:(dataIndex,record)=>{
          
      return <div>{record.province}{record.city}</div>
    }
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
                  Model.dispatch({type:'collegeSchoolarea/deleteSchoolarea',schoolAreaId:record.schoolAreaId})
                }
                }>
                    <a href="#">删除</a>
                </Popconfirm>            
            </div>
    );
          
    }
  }
]



   // <span onClick={()=>{
                //     Model.dispatch({type:'collegeSchoolarea/deleteSchoolarea',schoolAreaId:record.schoolAreaId})
                //     notification.open({
                //     message: '已经成功删除',
                //     });
                // }
                // }
                //  style={{color:'#1890FF',cursor:'pointer'}}>删除
                //  </span>
 