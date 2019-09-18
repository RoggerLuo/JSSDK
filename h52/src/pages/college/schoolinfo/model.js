import { Model } from 'dvax'
import constants from 'utils/constants'
import 'dvax/dateFormat'
import {Switch,notification } from 'antd'
Model.create({
    namespace: 'collegeSchoolinfo',
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
            const res = yield fetch(`school-info`,{query:get().pagination})
            console.log(res)           
            yield change('list',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        *deleteSchoolinfo({fetch,put},{schoolInfoId}){
            const res=yield fetch(`school-info/${schoolInfoId}/delete`,{method:'post'})

            //if(res.hasErrors) return
            if(res.errorCode=="11000"){
                alert("学校信息已被课程信息引用，无法删除!")
            }
            yield put({type:'getCollege'})
          //   notification.open({
          //       message: '已经成功删除',
          // });

        },
        *searchSchoolArea({fetch,schoolAreaId,change},{searchValue}){  
         
        
        const res=yield fetch(`school-info`,{query:{schoolAreaId:searchValue}})
        console.log(res)
        
        yield change('list',res.data.records)
        
        yield change('pagination.total',res.data.totalRecords)
 
        },
        *inputSearch({fetch,schoolName,change},{inputValue}){  
         //
        
        const res=yield fetch(`school-info`,{query:{schoolName:inputValue}})
        console.log(res)
        yield change('list',res.data.records)
        //
        yield change('pagination.total',res.data.totalRecords)
 
        },
        * changePage({fetch,get,change},{pageInfo}){
            const current = pageInfo.current
            yield change('pagination.current',current)
            const query = get().pagination
            query.pageNum = query.current
            const res = yield fetch(`school-info`,{query})
            yield change('list',res.data.records)
        }
    }
})
