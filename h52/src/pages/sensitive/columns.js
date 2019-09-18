import React from 'react'
import {Model} from 'dvax'
import {Popconfirm} from 'antd'
import 'dvax/dateFormat'
export default props => [
    {
        title: '敏感词',
        dataIndex: 'text',
        width: 150
    },
   

    {
        title: '操作',
        dataIndex: 'options',
        width: 100,
        render: (options, record, index) => {
            function _delete(){
                Model.run('sensitive',function*({fetch,put}){
                    yield fetch(`sensitive/${record._id}`,{method:'delete'})
                    yield put({type:'get'})
                })
            }
            return (
                <div>
                    <Popconfirm title="是否确定删除?" onConfirm={() => {
                        _delete()
                    }}>
                        <a href="#" style={{color:'#576ff8',cursor:'pointer'}}>删除</a>
                    </Popconfirm>        
                </div>
            )
        }
    }
]
