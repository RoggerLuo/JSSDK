import { Model } from 'dvax'
import constants from 'utils/constants'
import 'dvax/dateFormat'
import {message} from 'antd'
Model.create({
    namespace: 'dealRefund',
    state: {
        refundList: [],
        pagination:{
            current:1,
            defaultCurrent: 1,
            pageSize: constants.PAGESIZE,
            total: 0,
            showQuickJumper: true 
        }
    },
    effects:{
        *getDeal({fetch,get,change}){
            const res = yield fetch(`refund-orders`,{query:get().pagination})
            console.log(res)           
            // res.data.records.forEach(el=>{
            //     el._children = el.children
            //     delete el.children
            // })
            yield change('refundList',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        // *deleteParents({fetch,put},{householderId}){
        //     const res=yield fetch(`user-householder/${householderId}/delete`,{method:'post'})

        //     if(res.hasErrors) return
        //     yield put({type:'getUser'})

        // },
        // *lockParents({fetch,put},{householderId}){
        //     const res=yield fetch(`user-householder/${householderId}/lock`,{method:'post'})
        //     if(res.hasErrors) return
        //     alert("冻结成功")
        //         yield put({type:'getUser'})
        // },
        // *unlockParents({fetch,put},{householderId}){
        //         
        //     const res=yield fetch(`user-householder/${householderId}/unlock`,{method:'post'})
        //    if(res.hasErrors) return
        //         alert("已解锁")
        //         yield put({type:'getUser'})
        //         console.log(res)
        // },
        *reRefund({fetch,get,change,put},{refundOrderId}){
                
             const res = yield fetch(`refund-orders/${refundOrderId}/refund`,{method:'post'})
             if(res.hasErrors) return
            message.success('手动重试成功！')
            yield put({type:'getDeal'})
           
        },
        *inputSearch({fetch,keyword,change},{inputValue}){
            const res=yield fetch(`refund-orders`,{query:{keyword:inputValue}})
            yield change('refundList',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        * changePage({fetch,get,change},{pageInfo}){
            const current = pageInfo.current
            yield change('pagination.current',current)
            const query = get().pagination
            query.pageNum = query.current
            const res = yield fetch(`refund-orders`,{query})
            yield change('refundList',res.data.records)
        }
    }
})
