import React from 'react'
import {Model} from 'dvax'
import { openEdit } from './detail'
import {Switch} from 'antd'
import {Staff,StaffSpan} from 'components/addStaffModal/FormComponents'

export default props => [
    {
        title: '版块名称',
        dataIndex: 'name',
        width: 100
    },
    {
        title: '版主',
        dataIndex: 'managers',
        width: 200,
        render(value,record,index){
            return value.map((el,ind)=>{
                return <StaffSpan key={ind} {...el}/>
            })
        }
    },
    
    {
        title: '排序号',
        dataIndex: 'orderIndex',
        width: 70,
    },
    {
        title: '是否上架',
        dataIndex: 'putOn',
        width: 50,
        render(value,record,index){
            return (
                <Switch 
                    size="small"
                    checked={record['onshelf']||false}
                    onChange={checked=>{
                        Model.run('subject',function*({get,fetch,change}){
                            yield change(`subjects[${index}].onshelf`,checked)
                            if(checked) {
                                yield fetch(`subject/${record._id}/onshelf`,{method:'post'})
                            }else{
                                yield fetch(`subject/${record._id}/onshelf`,{method:'delete'})

                            }
                        })
                    }}
                />
            ) 
        }
    },
    {
        title: '操作',
        dataIndex: 'options',
        width: 100,        
        render: (options, record, index) => {
            return (<div> 
                <span onClick={()=>openEdit(record._id)} style={{color:'#576ff8',cursor:'pointer'}}>
                    编辑
                </span>
                &nbsp;&nbsp;
                <span onClick={()=>openEdit(record)} style={{color:'#576ff8',cursor:'pointer'}}>
                    删除 
                </span>
            </div>)
        }
    }
]