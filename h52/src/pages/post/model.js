import { Model } from 'dvax'
import { message } from 'antd'
import constants from 'utils/constants'
Model.create({
    namespace: 'post',
    state: {
        list: [],
        courseCategory:'',
        provinces:[],
        cities:[],

        query:{},
        pagination:{
            startIndex:0,
            current:1,
            defaultCurrent: 1,
            pageSize: constants.PAGESIZE,
            total: 0,
            showQuickJumper: true 
        },
        text:''
    },
    effects:{
        * get({fetch,get,change}){    
            const query = {...get().query}
            query.startIndex = get().pagination.startIndex
            query.pageSize = get().pagination.pageSize
            let res
            if(get().text) {
                res = yield fetch(`search`,{method:'post',query,body:{text:get().text}})
            }else{
                res = yield fetch(`post`,{query})

            }


            if(res.status!=='ok') return
            yield change('list',res.results.data)
            yield change('pagination.total',res.results.total)
        },

        
        * delete({fetch,put},{id}){
            const res = yield fetch(`classroom-info/${id}/delete`,{method:'post'})
            if(res.errorCode==='11000') {
                message.warning('课程分类已被课程信息引用，无法删除')
            }
            if(res.hasErrors) return
            yield put({type:'getRoom'})
        },
        * changePage({put,fetch,get,change},{pageInfo}){
            const current = pageInfo.current
            yield change('pagination.current',current)
            
            const query = get().pagination
            query.startIndex = (query.current - 1)*get().pagination.pageSize
            yield put({type:'get'})
        }
    }
})
