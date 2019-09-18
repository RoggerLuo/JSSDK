import React from 'react'
import {Model} from 'dvax'
import {notification,Popconfirm,message} from 'antd'
import {openView} from './add'
import {redirect} from 'components/history'
export default 
  [
  {
    title: '订单号',
    dataIndex: 'orderNumber',
    width: 100,
  },
  {
    title: '支付方式',
    dataIndex: 'payMode',
    width: 100,
    
  },
  {
    title: '交易流水号',
    dataIndex: 'paySerialNumber',  
    width: 100,
  },
  {
    title: '付款人',
    dataIndex: 'payerName',
    width: 100,
  },
  {
    title: '付款金额',
    dataIndex: 'totalFee',
    width: 100,
  },
  {
    title: '支付时间',
    dataIndex: 'payTime',
    width: 100,
    render(payTime,record){
      if(payTime==null)
        return <div></div>
      else
      return  new Date(record.payTime).format("yyyy-MM-dd hh:mm:ss");
    }
  },
  {
    title:'商品名称',
    dataIndex:'produceName',
    width:100,
  },
  // {
  //   title: '商品数量',
  //   dataIndex: 'position',
  //   width: 100,
  // },
  {
    title: '订单状态',
    dataIndex: 'payState',
    width: 100,
    render:(payState,record,index)=>{
      if(record.payState=="PRE_PAYMENT")
        return <div>{"未交易"}</div>
      if(record.payState=="PAYING")
        return <div>{'正在交易'}</div>
      if(record.payState=="PAID"){
        return <div>{"交易成功"}</div>
      }
      if(record.payState=="REFUND"){
        return <div>{"已退款"}</div>
      }
      if(record.payState=="CANCEL_ORDER"){
        return <div>{"取消订单"}</div>
      }
      if(record.payState=="EXPIRED_ORDER"){
        return <div>{"订单过期"}</div>
      }
    }
  },

  {
    title: '操作',
    dataIndex: 'options',
    width: 100,
    render: (options,record,index) => { 
        return <div>
            <span onClick={()=>openView(record)} style={{color:'#1890FF',cursor:'pointer'}}> {'详情'}</span>
        </div>       
      }
  }
]

/* 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                       <span style={{color:'#1890FF',cursor:'pointer'}} onClick={()=>{
                            if(record.payState=="PAID"){
                                Model.dispatch({type:'dealOrder/refund',orderNumber:record.orderNumber})

                                }
                            else{
                            message.success('该订单无法退款')
                            }
                            
                            }}>
                        {"退款"}
                      </span>
 */