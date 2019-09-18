import { Model } from 'dvax'
import { message } from 'antd'
import constants from 'utils/constants'
Model.create({
    namespace: 'comment',
    state: {
        comments: [],
        courseCategory:'',
        provinces:[],
        cities:[],

        query:{        
            text:''
        },
        pagination:{
            startIndex:0,
            current:1,
            defaultCurrent: 1,
            pageSize: constants.PAGESIZE,
            total: 0,
            showQuickJumper: true 
        },
    },
    effects:{
        * get({fetch,get,change}){    
            const query = {...get().query}
            query.startIndex = get().pagination.startIndex
            query.pageSize = get().pagination.pageSize
            let res
            res = yield fetch(`comment`,{query})
            if(res.status!=='ok') return
            yield change('comments',res.results.data)
            yield change('pagination.total',res.results.total)
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
