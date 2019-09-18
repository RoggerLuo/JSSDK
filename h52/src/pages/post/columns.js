import React from 'react'
import {Model} from 'dvax'
import {openEditCategory} from './detail'
import {Popconfirm} from 'antd'
import 'dvax/dateFormat'
export default props => [
    {
        title: '标题',
        dataIndex: 'title',
        width: 100
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
            return sub.name
        }
    },
    {
        title: '阅读数',
        dataIndex: 'readNumber',
        width: 100
    },
    {
        title: '留言数',
        dataIndex: 'replyNumber',
        width: 100
    },
    {
        title: '点赞数',
        dataIndex: 'thumbNumber',
        width: 100
    },
    {
        title: '审核通过',
        dataIndex: 'auditStatus',
        width: 100,
        render(value){
            if(value===true) return '通过'
            if(value===false) return '不通过'
            return '未审核'
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
        width: 160,
        render: (options, record, index) => {
            function _delete(){
                Model.run('post',function*({fetch,put}){
                    yield fetch(`post/${record._id}`,{method:'delete'})
                    yield put({type:'get'})
                })
            }
            function audit(httpMethod){
                Model.run('post',function*({fetch,put}){
                    yield fetch(`audit-post/${record._id}`,{method:httpMethod})
                    yield put({type:'get'})
                })
            }
            if(record.auditStatus===false) {
                return (<div>
                    <Popconfirm title="是否确定删除?" onConfirm={() => {
                        _delete()
                    }}>
                      <a href="#" style={{color:'#576ff8',cursor:'pointer'}}>删除</a>
                    </Popconfirm>        
                </div>)
            }
            
            if(record.auditStatus===undefined) {
                return (<div>
                    <span onClick={()=>audit('post')} style={{color:'#576ff8',cursor:'pointer'}}>审核通过</span>
                    &nbsp;&nbsp;
                    <span onClick={()=>audit('delete')} style={{color:'#576ff8',cursor:'pointer'}}>审核不通过</span>
                    &nbsp;&nbsp;

                    <Popconfirm title="是否确定删除?" onConfirm={() => {
                        _delete()
                    }}>
                      <a href="#" style={{color:'#576ff8',cursor:'pointer'}}>删除</a>
                    </Popconfirm>        
                </div>)
            }
            function setStatus(key,httpMethod){
                Model.run('post',function*({fetch,put}){
                    yield fetch(`post-${key}/${record._id}`,{method:httpMethod})
                    yield put({type:'get'})
                })
            }
            let comp1 = <span onClick={()=>setStatus('top','post')} style={{color:'#576ff8',cursor:'pointer'}}>设为置顶</span>
            let comp2 = <span onClick={()=>setStatus('recommend','post')} style={{color:'#576ff8',cursor:'pointer'}}>设为精华</span>

            if(record.topStatus) {
                comp1 = <span onClick={()=>setStatus('top','delete')} style={{color:'red',cursor:'pointer'}}>取消置顶</span>
            }
            if(record.recommendStatus) {
                comp2 = <span onClick={()=>setStatus('recommend','delete')} style={{color:'red',cursor:'pointer'}}>取消精华</span>
            }
            return (<div>
                {comp1}
                &nbsp;&nbsp;
                {comp2}
                &nbsp;&nbsp;
                <Popconfirm title="是否确定删除?" onConfirm={() => {
                    _delete()
                }}>
                  <a href="#" style={{color:'#576ff8',cursor:'pointer'}}>删除</a>
                </Popconfirm>        
            </div>)
        }
    }
]
