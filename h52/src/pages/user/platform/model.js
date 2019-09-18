import { Model } from 'dvax'
import constants from 'utils/constants'
import 'dvax/dateFormat'
Model.create({
    namespace: 'userPlatform',
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
        * getUser({fetch,get,change}){
           
            const res = yield fetch(`user-platformteacher`,{query:get().pagination})
            console.log(res)           
            yield change('list',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        *deletePlatform({fetch,put},{platformTeacherId}){
            const res=yield fetch(`user-platformteacher/${platformTeacherId}/delete`,{method:'post'})

            if(res.hasErrors) return
            yield put({type:'getUser'})

        },
        *lockPlatform({fetch,put},{platformTeacherId}){ 
                
            const res=yield fetch(`user-platformteacher/${platformTeacherId}/lock`,{method:'post'})
            //console.log(res)
            if(res.hasErrors) return
            alert("冻结用户成功")
            yield put({type:'getUser'})
            console.log(res)
        },
        *unlockPlatform({fetch,put},{platformTeacherId}){
            const res=yield fetch(`user-platformteacher/${platformTeacherId}/unlock`,{method:'post'})
            alert("已解锁")
            yield put({type:'getUser'})
        },
        *inputSearch({fetch,put,keyword,change},{inputValue}){          
            const res=yield fetch(`user-platformteacher`,{query:{keyword:inputValue}})
            console.log(res)
            yield change('list',res.data.records)
            //yield put({type:'getUser'})
            yield change('pagination.total',res.data.totalRecords)
    
        },
        * changePage({fetch,get,change},{pageInfo}){
            const current = pageInfo.current
            yield change('pagination.current',current)
            const query = get().pagination
            query.pageNum = query.current
            const res = yield fetch(`user-platformteacher`,{query})
            yield change('list',res.data.records)
        },
        *searchRole({fetch,roleId,change},{roleValue}){  
            
            const res=yield fetch(`user-platformteacher`,{query:{roleId:roleValue}})
            console.log(res)
            yield change('list',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
 
        },
        *searchAreaSchool({fetch,attachId,change},{searchValue}){
            const res=yield fetch(`user-platformteacher`,{query:{attachId:searchValue}})
            console.log(res)
            yield change('list',res.data.records)
                
            yield change('pagination.total',res.data.totalRecords)
        }
    }
})
