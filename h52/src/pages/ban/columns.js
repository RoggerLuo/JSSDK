import React from 'react'
import {Model} from 'dvax'
import { openEdit } from './detail'
import {Switch} from 'antd'
import {Staff,StaffSpan} from 'components/addStaffModal/FormComponents'
import {Popconfirm} from 'antd'

export default props => [
    {
        title: '用户',
        dataIndex: 'userInfo',
        width: 100,
        render(value,record,index){
            return <StaffSpan {...value} hideDelete={true}/>
        }
    },
    {
        title: '禁言板块',
        dataIndex: 'subjectId',
        width: 100,
        render(value){
            const sub = props.subjects.find(el=>el._id===value)
            if(!sub) return ''
            return sub.name
        }
    },

    {
        title: '禁言时间',
        dataIndex: 'start',
        width: 100,
        render(value,record){
            return new Date(value).format("yyyy-MM-dd hh:mm")   + ' - '+ new Date(record.end).format("yyyy-MM-dd hh:mm")
        }
    },

    {
        title: '原因',
        dataIndex: 'reason',
        width: 50,
    },
    {
        title: '操作',
        dataIndex: 'options',
        width: 100,        
        render: (options, record, index) => {
            return (<div> 

                <Popconfirm title="是否确定删除?" onConfirm={() => {
                    Model.run('ban',function*({fetch,put}){
                        yield fetch(`user-ban/${record.subjectId}/${record.userId}`,{method:'delete'})
                        yield put({type:'get'})
                    })                        
                }}>
                      <a href="#" style={{color:'#576ff8',cursor:'pointer'}}>删除</a>
                </Popconfirm>        

            </div>)
        }
    }
]