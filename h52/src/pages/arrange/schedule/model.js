import { Model } from 'dvax'
import constants from 'utils/constants'
import 'dvax/dateFormat'
import {Switch,notification } from 'antd'
import moment from 'moment'
Model.create({
    namespace: 'schedule',
    state: {
        list: [{key:1}],
        data:[],
        week:moment(),
        dateRange:[moment().weekday(0),moment().weekday(7)],
        query:{
            beginTime:'',
            endTime:'',
            schoolAreaId:'',
            cityId:'',
            courseLabelId:'',
            courseName:'',
            teacherName:''
        },
        pagination:{
            current:1,
            defaultCurrent: 1,
            pageSize: constants.PAGESIZE,
            total: 0,
            showQuickJumper: true 
        }
    },
    effects:{
        *getData({change,fetch,get}){
            const query = {
                ...get().query,
                beginTime:get().dateRange[0].unix()+'000',endTime:get().dateRange[1].unix()+'000'
            }
            const res = yield fetch(`course-schedules`,{query})
            if(res.hasErrors) return
            yield change('data',res.data)
        },
        * getArrange({fetch,get,change}){
            const res = yield fetch(`classroom-assignments`)
            yield change('list',res.data.TUE)
        },
        *searchSchoolArea({fetch,schoolAreaId,change},{searchValue}){  
        
            const res=yield fetch(`classroom-assignments`,{query:{schoolAreaId:searchValue}})
            console.log(res)
                
            yield change('list',res.data.TUE)
                
            yield change('pagination.total',res.data.totalRecords)
 
        },
        *searchCity({fetch,cityId,change},{SearchValue}){
            const res=yield fetch(`classroom-assignments`,{query:{cityId:searchValue}})
            console.log(res)
                
            yield change('list',res.data.TUE)
                
            yield change('pagination.total',res.data.totalRecords)  
        },
        
        *selectSchool({fetch,schoolInfoId,change},{selecthValue}){
            const res=yield fetch(`classroom-assignments`,{query:{schoolInfoId:selecthValue}})
            console.log(res)
                
            yield change('list',res.data.TUE)
                
            yield change('pagination.total',res.data.totalRecords) 
        },
        * changePage({fetch,get,change},{pageInfo}){
            const current = pageInfo.current
            yield change('pagination.current',current)
            const query = get().pagination
            query.pageNum = query.current
            const res = yield fetch(`classroom-assignments`,{query})
            yield change('list',res.data.TUE)
        }
    }
})
