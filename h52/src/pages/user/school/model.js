import { Model } from 'dvax'
import constants from 'utils/constants'
import 'dvax/dateFormat'
Model.create({
    namespace: 'userSchool',
    state: {
        list: [],
        pagination:{
            current:1,
            defaultCurrent: 1,
            pageSize: constants.PAGESIZE,
            total: 0,
            showQuickJumper: true 
        }
    },
    effects:{
        * getUserschool({fetch,get,change}){
            const res = yield fetch(`user-schoolteacher`,{query:get().pagination})
            //console.log(res)
                
            yield change('list',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        *deleteSchool({fetch,put},{schoolTeacherId}){
            const res=yield fetch(`user-schoolteacher/${schoolTeacherId}/delete`,{method:"post"})
            yield put({type:"getUserschool"})

        },
        * changePage({fetch,get,change},{pageInfo}){
            const current = pageInfo.current
            yield change('pagination.current',current)
            const query = get().pagination
            query.pageNum = query.current
            const res = yield fetch(`user-schoolteacher`,{query})
            yield change('list',res.data.records)
        }
    }
})
