import { Model } from 'dvax'
import constants from 'utils/constants'
import 'dvax/dateFormat'
Model.create({
    namespace: 'collegeStudents',
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
        * getCollege({fetch,get,change}){
            const res = yield fetch(`school-students`,{query:get().pagination})
            console.log(res)           
            yield change('list',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        *deleteStudents({fetch,put},{schoolStudentId}){
            const res=yield fetch(`school-students/${schoolStudentId}/delete`,{method:'post'})

            if(res.hasErrors){
                if(res.errorCode="11000"){
                alert("已经被应用无法删除!")
            }
            else return
            }
            
          
            yield put({type:'getCollege'})

        },
        // *lockPlatform({fetch,put},{platformTeacherId}){ 
        //         
        //     const res=yield fetch(`user-platformteacher/${platformTeacherId}/lock`,{method:'post'})
        //     //console.log(res)
        //     if(res.hasErrors) return
        //     alert("冻结用户成功")
        //     yield put({type:'getUser'})
        //     console.log(res)
        // },
        // *unlockPlatform({fetch,put},{platformTeacherId}){
        //     const res=yield fetch(`user-platformteacher/${platformTeacherId}/unlock`,{method:'post'})
        //     alert("已解锁")
        //     yield put({type:'getUser'})
        // },
        *inputSearch({fetch,keyword,change},{inputValue}){  
             
        
        const res=yield fetch(`school-students`,{query:{keyword:inputValue}})
        console.log(res)
        yield change('list',res.data.records)
            
        yield change('pagination.total',res.data.totalRecords)
 
        },
        *searchArea({fetch,cityId,change},{SearchValue}){  
             
        
        const res=yield fetch(`school-students`,{query:{cityId:SearchValue}})
        console.log(res)
            
        yield change('list',res.data.records)
            
        yield change('pagination.total',res.data.totalRecords)
 
        },
        *searchSchool({fetch,schoolInfoId,change},{schoolInfoIds}){  
             
        
        const res=yield fetch(`school-students`,{query:{schoolInfoId:schoolInfoIds}})
        console.log(res)
            
        yield change('list',res.data.records)
            
        yield change('pagination.total',res.data.totalRecords)
 
        },
        * changePage({fetch,get,change},{pageInfo}){
            const current = pageInfo.current
            yield change('pagination.current',current)
            const query = get().pagination
            query.pageNum = query.current
            const res = yield fetch(`school-students`,{query})
            yield change('list',res.data.records)
        }
    }
})
