import React from 'react'
import {Model} from 'dvax'
import {redirect} from 'components/history'
import {notification,Popconfirm } from 'antd'
import {onPageChange,openEdit} from './add'
import moment from 'moment'
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
    title: '生日',
    dataIndex: 'birthday',  
    width: 100,
    render:(birthday,record)=>{
      if(birthday==null)
      return <div></div>

      else


        // const birthday=new Date().getTime(birthday)*1000
        return new Date(birthday).format("yyyy-MM-dd")
      
     
        
      // {
      //   debugger
      //   const birthday=moment(record.birthday).format('YYYY-MM-DD') 
      //   return <div>{birthday}</div>
      // }
      
           
    }
  },
  {
    title: '所属学校',
    dataIndex: 'schoolName',
    width: 100,
  },
  {
    title: '入学年份',
    dataIndex: 'enrollmentYear',
    width: 100,
    render:(enrollmentYear,record)=>{
      // const time=Number(enrollmentYear)
      const enterTime=moment(record.enterTime).format('YYYY-MM-DD') 
      return  <div>
      {enterTime}
      </div>           
    }
  },
  {
    title: '监护人',
    dataIndex: 'guardian',
    width: 100,
  },
  {
    title: '监护人电话',
    dataIndex: 'guardianPhone',
    width: 100,
  },
  {
    title: '紧急联系人',
    dataIndex: 'emergencyContact',
    width: 100,
  },
  {
    title: '紧急联系人电话',
    dataIndex: 'emergencyContactPhone',
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
                   Model.dispatch({type:'collegeStudents/deleteStudents',schoolStudentId:record.schoolStudentId})
                    
                  }
                  }>
                  <a href="#">删除</a>
                </Popconfirm>        
            </div>
    );
          
    }
  }
]
 