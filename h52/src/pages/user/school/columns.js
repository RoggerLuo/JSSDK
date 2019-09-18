import React from 'react'
// import {openAddCourse,openEditCourse} from './detail'
import {Model} from 'dvax'


export default [
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
     //     

    }
  },
  {
    title: '账号',
    dataIndex: 'username',  
    width: 100,
    render:(record,index)=>{
          
      //return ()
    }
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    width: 100,
    render:(birthday,record)=>{
      return  new Date(record.birthday).format("yyyy-MM-dd");           
    }
  },
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
    dataIndex: 'position',
    width: 100,
  },
  {
    title: '所属学校',
    dataIndex: 'schoolName',
    width: 100,
  },
  {
    title: '现任班级',
    dataIndex: 'classes',
    width: 100,
  },
  {
    title: '操作',
    dataIndex: 'options',
    width: 100,
   render: (options,record,index) => {
    return(
            <div>          
              <span onClick={()=>Model.dispatch({type:'userSchool/deleteSchool',schoolTeacherId:record.schoolTeacherId})} style={{color:'#576ff8',cursor:'pointer'}}>删除</span>           
            </div>
            )
     }
  }
]