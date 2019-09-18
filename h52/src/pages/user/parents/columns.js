import React from 'react'
import {Model} from 'dvax'
import {notification,Popconfirm} from 'antd'
import {onPageChange,openEdit} from './add'
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
    title:'创建时间',
    dataIndex:'createTime',
    width:100,
    render(createTime,record){
        return  new Date(record.createTime).format("yyyy-MM-dd hh:mm:ss");
    }
  },
  {
    title: '职位',
    dataIndex: 'roleName',
    width: 100,
  },
 
  {
    title: '操作',
    dataIndex: 'options',
    width: 100,
    render: (options,record,index) => { 
      if(record.lock=="UNLOCK")
        return  <div>
                <span onClick={()=>Model.dispatch({type:'userParents/lockParents',householderId:record.householderId})} style={{color:'#1890FF',cursor:'pointer'}}>
              未冻结
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span onClick={()=>openEdit(record)} style={{color:'#1890FF',cursor:'pointer'}}>
              编辑
                </span>            
                </div>
     if(record.lock=="LOCK")
        return <div>
                <span onClick={()=>Model.dispatch({type:'userParents/unlockParents',householderId:record.householderId})} style={{color:'#f00',cursor:'pointer'}}>
                已冻结
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span onClick={()=>openEdit(record)} style={{color:'#1890FF',cursor:'pointer'}}>
                编辑
                </span>            
                </div>
    }
  }
]

// // ()=>this.style.color="red"     
//           return(
//             <div>
//                <span onClick={()=>{
//                 if(record.lock=="UNLOCK")
//                 Model.dispatch({type:'userParents/lockParents',householderId:record.householderId})
//               else
//                 Model.dispatch({type:'userParents/unlockParents',householderId:record.householderId})
//              }} 
//                 style={{color:'#576ff8',cursor:'pointer'}}>
//                 冻结
//                 </span>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//               <span onClick={()=>Model.dispatch({type:'userParents/deleteParents',householderId:record.householderId})} style={{color:'#576ff8',cursor:'pointer'}}>删除</span>            
//             </div>
//             )