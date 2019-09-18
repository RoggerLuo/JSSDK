import { Model } from 'dvax'
import constants from 'utils/constants'
import 'dvax/dateFormat'
import {Switch,notification } from 'antd'
Model.create({
    namespace: 'arrangeClassroom',
    state: {
        dataSource:[{key:1}],
        data: false,
        times:[],
        currentClassInfo:{},
        query:{
            beginTime:'',
            endTime:'',
            schoolAreaId:'',
            cityId:'',
            courseLabelId:'',
            courseName:'',
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
        * getArrange({fetch,get,change}){
            const res = yield fetch(`classroom-assignments`,{query:get().query})
            if(res.hasErrors) return
            yield change('data',res.data)
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
        *getTimeList({fetch,id,change},{TimesValue}){
            const res = yield fetch(`classroom-assignments/${TimesValue}`)
            console.log(res)
            yield change('times',res.data)
 
        },
        *saveTime({fetch,change}){

        },
        *selectSchool({fetch,schoolInfoId,change},{selecthValue}){
            const res=yield fetch(`classroom-assignments/{id}`,{query:{schoolInfoId:selecthValue}})
            console.log(res)
            
            yield change('list',res.data.TUE)
            
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
