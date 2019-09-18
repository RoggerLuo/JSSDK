import React from 'react'
import {Model} from 'dvax'
import {notification,Popconfirm} from 'antd'
import {openView} from './add'
export default 
  [
  {
    title: '退款单号',
    dataIndex: 'refundOrderNumber',
    width: 100,
  },
  {
    title: '退款方式',
    dataIndex: 'refundMode',
    width: 100,
    
  },
  {
    title: '关联订单号',
    dataIndex: 'orderNumber',  
    width: 100,
  },
  {
    title: '收款人',
    dataIndex: 'payerName',
    width: 100,
  },
  {
    title: '退款金额',
    dataIndex: 'refundFee',
    width: 100,
  },
  {
    title: '退款时间',
    dataIndex: 'refundTime',
    width: 100,
    render(refundTime,record){
      if(refundTime==null)
        return <div></div>
      else
        return  new Date(record.refundTime).format("yyyy-MM-dd hh:mm:ss");
    }
  },
  {
    title:'商品名称',
    dataIndex:'produceName',
    width:100,
  },
  // {
  //   title: '退款数量',
  //   dataIndex: 'position',
  //   width: 100,
  // },
  {
    title: '退款状态',
    dataIndex: 'refundState',
    width: 100,
    render:(refundState,record,index)=>{
     if(refundState=="REFUNDING")
        return <div>{"退款中"}</div>
      if(refundState=="REFUND_FAIL")
        return <div>{"退款失败"}</div>
      if(refundState!="REFUNDING"&&refundState!="REFUND_FAIL"){
        return <div>{"已退款"}</div>
      }

    }
  },
 
  {
    title: '操作',
    dataIndex: 'options',
    width: 100,
    render: (options,record,index) => { 
       if(record.refundState=='REFUND_FAIL'){
        return <div>
                <span onClick={()=>openView(record)}  style={{color:'#1890FF',cursor:'pointer'}}>
                    详情
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <span  style={{color:'#1890FF',cursor:'pointer'}} onClick={()=>{
                      
                  Model.dispatch({type:'dealRefund/reRefund',refundOrderId:record.refundOrderId})
                 }}>
                    手动重试
                </span>       
              </div>
        }
        else {
          return <div>
                <span onClick={()=>openView(record)}  style={{color:'#1890FF',cursor:'pointer'}}>
                    详情
                </span>
              </div>
        }
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