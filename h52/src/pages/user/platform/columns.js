import React from 'react'
import {Model} from 'dvax'
import {changeColor} from './add'

import {notification,Popconfirm} from 'antd'
import {openEdit} from './add/update'

export default 
  [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 50,
    render:(gender,record)=>{
          
      if(gender=="MALE")
        return <span>{"男"}</span>
      if(gender=="FEMALE")
        return <span>{"女"}</span>
    }
    
  },
  {
    title: '账号',
    dataIndex: 'username',  
    width: 100,
  },
  // {
  //   title: '生日',
  //   dataIndex: 'birthday',
  //   width: 100,
  //   render:(birthday,record)=>{
  //     return  new Date(record.birthday).format("yyyy-MM-dd");           
  //   }
  // },
  {
    title: '联系方式',
    dataIndex: 'phone',
    width: 100,
  },
  {
    title: '紧急联系人',
    dataIndex: 'emergencyContact',
    width: 100,
  },
  {
    title: '联系人电话',
    dataIndex: 'emergencyContactPhone',
    width: 100,
  },
  {
    title: '职位',
    dataIndex: 'roleName',
    width: 100,
  },
  {
    title: '所属分区',
    dataIndex: 'attachInfoRecords',
    width: 100,
    render: (attachInfoRecords,record,ind)=>{
      if(attachInfoRecords==null)
        return <div>{""}</div>
      else
        return attachInfoRecords.map((obj,index)=>{
          return <div key={obj.attachInfoId}>{obj.attachInfoName}</div>
    })    
    }
  },

  {
    title: '操作',
    dataIndex: 'options',
    width: 100,
    render: (options,record,index) => { 
      if(record.lock=="UNLOCK")
          return  <div>
                      <span onClick={()=>Model.dispatch({type:'userPlatform/lockPlatform',platformTeacherId:record.platformTeacherId})
                        } style={{color:'#1890FF',cursor:'pointer'}}>
                          未冻结
                      </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <span onClick={()=>openEdit(record)}
                         style={{color:'#1890FF',cursor:'pointer'}}>
                        编辑</span>           
                  </div>
    if(record.lock=="LOCK")
          return  <div>
                      <span onClick={()=>Model.dispatch({type:'userPlatform/unlockPlatform',platformTeacherId:record.platformTeacherId})
                        } style={{color:'#f00',cursor:'pointer'}}>
                        已冻结</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span onClick={()=>openEdit(record)}
                         style={{color:'#1890FF',cursor:'pointer'}}>
                        编辑</span>
                  </div>
          
    }
  }
]
