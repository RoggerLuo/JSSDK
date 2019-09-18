import React from 'react'
import {Model} from 'dvax'
import {notification,Popconfirm,Button} from 'antd'
import {openView} from './add'
import {showModal} from './check'
export default 
  [
  {
    title: '课程名称',
    dataIndex: 'produceName',
    width: 100,
  },
  {
    title: '支付金额',
    dataIndex: 'totalFee',
    width: 100,
    
  },
  {
    title: '所属分区',
    dataIndex: 'schoolArea',  
    width: 100,
  },
  {
    title: '所属学校',
    dataIndex: 'schoolName',
    width: 100,
  },
  {
    title: '退款人',
    dataIndex: 'payerName',
    width: 100,
  },
  {
    title: '联系方式',
    dataIndex: 'payerPhone',
    width: 100,
    // render(refundTime,record){
    //   return  new Date(record.refundTime).format("yyyy-MM-dd hh:mm:ss");
    // }
  },
  {
    title:'孩子姓名',
    dataIndex:'studentName',
    width:100,
  },
  {
    title: '退款时间',
    dataIndex: 'refundTime',
    width: 100,
    render:(refundTime,record,index)=>{
      if(refundTime==null)
        return <div></div>
      else
        return new Date(record.refundTime).format("yyyy-MM-dd hh:mm:ss");
    }
  },
  {
    title: '退款金额',
    dataIndex: 'refundFee',
    width: 100,
  },
  {
    title:'申请状态',
    dataIndex:'applyState',
    width:100,
    render:(applyState,record,index)=>{
      if(applyState=="APPLY_PASS")
        return <div>{"审批通过"}</div>
      if(applyState=="APPLYING")
        return <div>{"申请中"}</div>
    }
  },
  {
    title: '操作',
    dataIndex: 'options',
    width: 100,
    render: (options,record,index) => { 
           
        return <div>
                <span onClick={()=>openView(record)}  style={{color:'#1890FF',cursor:'pointer'}}>
                    详情
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <span onClick={()=>showModal(record)}   style={{color:'#1890FF',cursor:'pointer'}}>
                    审核
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