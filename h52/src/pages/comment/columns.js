import React from 'react'
import {Model} from 'dvax'
import {Popconfirm} from 'antd'
import 'dvax/dateFormat'
export default props => [
    {
        title: '内容',
        dataIndex: 'content',
        width: 150
    },
    {
        title: '发布者',
        dataIndex: 'authorInfo',
        width: 100,
        render(value){
            return value.name
        }
    },
    {
        title: '板块',
        dataIndex: 'subjectId',
        width: 100,
        render(value){
            const sub = props.subjects.find(el=>el._id===value)
            if(!sub) return ''
            return sub.name
        }
    },
    

    {
        title: '发布时间',
        dataIndex: 'createTime',
        width: 100,
        render(value){
            return new Date(value).format("yyyy-MM-dd hh:mm")   
        }
    },
    {
        title: '操作',
        dataIndex: 'options',
        width: 100,
        render: (options, record, index) => {
            function _delete(){
                Model.run('comment',function*({fetch,put}){
                    yield fetch(`comment/${record._id}`,{method:'delete'})
                    yield put({type:'get'})
                })
            }
                return (<div>
                    <Popconfirm title="是否确定删除?" onConfirm={() => {
                        _delete()
                    }}>
                      <a href="#" style={{color:'#576ff8',cursor:'pointer'}}>删除</a>
                    </Popconfirm>        
                </div>)
        }
    }
]
