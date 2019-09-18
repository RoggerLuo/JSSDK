import { Model } from 'dvax'
import constants from 'utils/constants'
import 'dvax/dateFormat'
Model.create({
    namespace: 'dealApplication',
    state: {
        // list: [{key:1}],
        //data:[],
        checkList:[],
        applicationList: [],
        pagination:{
            current:1,
            defaultCurrent: 1,
            pageSize: constants.PAGESIZE,
            total: 0,
            showQuickJumper: true 
        },
         query:{
            // beginTime:'',
            // endTime:'',
            schoolAreaId:'',
            cityId:'',
            schoolInfoId:'',

        },
    },
    effects:{
        *getDate({fetch,get,change}){
            // const res = yield fetch(`refund-applications`,{query:get().pagination})
            // console.log(res)           
            // yield change('applicationList',res.data.records)
            // yield change('pagination.total',res.data.totalRecords)
             const query = {
                ...get().query,
            }
            const res = yield fetch(`refund-applications`,{query})
                
            yield change('applicationList',res.data.records)
            console.log(res.data.records)
        },
        * getDeal({fetch,get,change}){
            const res = yield fetch(`refund-applications`)
            console.log(res)
                           
            yield change('applicationList',res.data.records)
            //yield change('pagination.total',res.data.totalRecords)
        },
        *refundCheck({fetch,change,get},{refundApplicationId}){
            const res = yield fetch(`refund-applications/${refundApplicationId}/check-record`)
            yield change('checkList',res)

        },
        *searchArea({fetch,cityId,change},{SearchValue}){
            const res=yield fetch(`refund-applications`,{query:{cityId:SearchValue}})
            yield change('applicationList',res.data.records)
            yield change('pagination.total',res.data.totalRecords)  
        },
        *searchSchoolArea({fetch,schoolAreaId,change},{searchValue}){
            const res=yield fetch(`refund-applications`,{query:{schoolAreaId:searchValue}})
            yield change('applicationList',res.data.records)
            yield change('pagination.total',res.data.totalRecords)  
        },
        *searchSchool({fetch,schoolInfoId,change},{schoolInfoIds}){
            const res=yield fetch(`refund-applications`,{query:{schoolInfoId:schoolInfoIds}})
            yield change('applicationList',res.data.records)
            yield change('pagination.total',res.data.totalRecords)  
        },
        *inputSearch({fetch,produceName,change},{inputValue}){
            const res=yield fetch(`refund-applications`,{query:{produceName:inputValue}})
            yield change('applicationList',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        * changePage({fetch,get,change},{pageInfo}){
            const current = pageInfo.current
            yield change('pagination.current',current)
            const query = get().pagination
            query.pageNum = query.current
            const res = yield fetch(`refund-applications`,{query})
            yield change('applicationList',res.data.records)
        }
    }
})
