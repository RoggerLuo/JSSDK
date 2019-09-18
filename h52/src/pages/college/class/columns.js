import React from 'react'
import {Model} from 'dvax'
import {openEditCategory} from './detail'
import {Popconfirm} from 'antd'

export default [
    {
        title: '班级名称',
        dataIndex: 'schoolClassesName',
        width: 100
    },
    {
        title: '排序号',
        dataIndex: 'orderNumber',
        width: 100
    },
    {
        title: '所属年级',
        dataIndex: 'schoolGradeName',
        width: 100
    },
    {
        title: '所属学校',
        dataIndex: 'schoolName',
        width: 100
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
                        Model.dispatch({type:'class/delete',id:record.schoolClassesId})
                    }
                }>
                    <a href="#" style={{color:'#576ff8',cursor:'pointer'}}>删除</a>
                </Popconfirm>         
            </div>)
        }
    }
]
