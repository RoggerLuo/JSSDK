import { Model } from 'dvax'
import constants from 'utils/constants'
import {message} from 'antd'
import 'dvax/dateFormat'
Model.create({
    namespace: 'dealOrder',
    state: {
        orderList: [],
        pagination:{
            current:1,
            defaultCurrent: 1,
            pageSize: constants.PAGESIZE,
            total: 0,
            showQuickJumper: true,
            payState:''
        }
    },
    effects:{
        *getDeal({fetch,get,change}){
            const res = yield fetch(`orders`,{query:get().pagination})
            console.log(res)
            yield change('orderList',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        *refund({fetch,get,change,put},{orderNumber}){
             const res = yield fetch(`orders/${orderNumber}/refund`,{method:'post'})
                 
             if(res.hasErrors)   return
             if(res.data.msg=="退款失败"){
                    message.success('退款失败')
                }
            if(res.data.msg=="退款成功"){
                     message.success('退款成功')
                }
            yield put({type:'getDeal'})
           
        },
        *inputSearch({fetch,keyword,change},{inputValue}){
            const res=yield fetch(`orders`,{query:{keyword:inputValue}})
            yield change('orderList',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        * changePage({fetch,get,change},{pageInfo}){
            const current = pageInfo.current
            yield change('pagination.current',current)
            const query = get().pagination
            query.pageNum = query.current
            const res = yield fetch(`orders`,{query})
            yield change('orderList',res.data.records)
        }
    }
})
