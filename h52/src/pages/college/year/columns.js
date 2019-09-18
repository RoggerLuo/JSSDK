import React from 'react'
import {Model} from 'dvax'
import {openEditCategory} from './detail'
import {Popconfirm, Switch} from 'antd'

export default [
    {
        title: '学年名称',
        dataIndex: 'schoolYear',
        width: 100
    },   
    {
        title: '开始时间',
        dataIndex: 'beginTime',
        width: 100,
        render(value){
            return new Date(value).format("yyyy-MM-dd")   
        }
    },
    {
        title: '结束时间',
        dataIndex: 'endTime',
        width: 100,
        render(value){
            return new Date(value).format("yyyy-MM-dd")   
        }
    },
    {
        title: '所属学校',
        dataIndex: 'schoolName',
        width: 100
    },
    {
        title: '当前报名学年',
        dataIndex: 'enabled',
        width: 100,
        render(value,record,index){
            return (
                <Switch 
                    size="small"
                    checked={record['enabled']||false}
                    onChange={checked=>{
                        Model.run('year',function*({get,fetch,change}){
                            yield change(`list[${index}].enabled`,checked)
                            const body = {}
                            body.enabled =  get().list[index].enabled
                            body.schoolYearId =  get().list[index].schoolYearId
                            const res = yield fetch(`school-years/update`,{method:'post',body})
                            console.log('修改上架状态')
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
                <span onClick={()=>openEditCategory(record)} style={{color:'#576ff8',cursor:'pointer'}}>编辑</span>
                &nbsp;&nbsp;
                <Popconfirm 
                    title="是否确定删除?" 
                    onConfirm={() => {
                        Model.dispatch({type:'year/delete',id:record.schoolYearId})
                    }
                }>
                    <a href="#" style={{color:'#576ff8',cursor:'pointer'}}>删除</a>
                </Popconfirm>         
            </div>)
        }
    }
]
