import { Model } from 'dvax'
import constants from 'utils/constants'
import 'dvax/dateFormat'
Model.create({
    namespace: 'collegeClasses',
    state: {
        listclasses: [],
        grade:[],
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
            const res = yield fetch(`school-classes`,{query:get().pagination})
            console.log(res)           
            yield change('listclasses',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        *deleteClasses({fetch,put},{schoolClassesId}){
            const res=yield fetch(`school-classes/${schoolClassesId}/delete`,{method:'post'})

            if(res.hasErrors){
                if(res.errorCode=="11000"){
                alert("学校分区已被学校信息引用，无法删除")
            }
            else
                return
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
        // *inputSearch({fetch,schoolArea,change},{inputValue}){  
        //      
        
        // const res=yield fetch(`school-areas`,{query:{schoolArea:inputValue}})
        // console.log(res)
        // yield change('listarea',res.data.records)
        //     
        // yield change('pagination.total',res.data.totalRecords)
 
        // },
        *getSelectGrade({fetch,schoolGradeId,change},{selectValue}){  
        
        const res=yield fetch(`school-classes`,{query:{schoolGradeId:selectValue}})
        console.log(res)
        yield change('listclasses',res.data.records)
        yield change('pagination.total',res.data.totalRecords)
 
        },
        *getGrade({fetch,get,change}){
            const res = yield fetch(`school-grades/all`)
            console.log(res)           
            yield change('grade',res.data)
           
        },
        * changePage({fetch,get,change},{pageInfo}){
            const current = pageInfo.current
            yield change('pagination.current',current)
            const query = get().pagination
            query.pageNum = query.current
            const res = yield fetch(`school-classes`,{query})
            yield change('listclasses',res.data.records)
        }
    }
})
