import React from 'react'
import {Model} from 'dvax'
import {openEditCategory} from './detail'
import {Popconfirm} from 'antd'

export default [
    {
        title: '课室地址',
        dataIndex: 'classroomAddress',
        width: 100
    },
    {
        title: '排序号',
        dataIndex: 'orderNumber',
        width: 100
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 100,
        render(value){
            return new Date(value).format("yyyy-MM-dd")   
        }
    },
    {
        title: '更新时间',
        dataIndex: 'modifyTime',
        width: 100,
        render(value){
            return new Date(value).format("yyyy-MM-dd")   
        }
    },
    {
        title: '操作',
        dataIndex: 'options',
        width: 100,
        render: (options, record, index) => {
            return (<div> 
                <span onClick={()=>openEditCategory(record)} style={{color:'#576ff8',cursor:'pointer'}}>编辑</span>
                &nbsp;&nbsp;
                <Popconfirm 
                    title="是否确定删除?" 
                    onConfirm={() => {
                        Model.dispatch({type:'roomInfo/delete',id:record.classroomInfoId})
                    }
                }>
                    <a href="#" style={{color:'#576ff8',cursor:'pointer'}}>删除</a>
                </Popconfirm>         
            </div>)
        }
    }
]
