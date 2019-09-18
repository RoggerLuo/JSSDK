import { Model } from 'dvax'
import constants from 'utils/constants'
import 'dvax/dateFormat'
import {Switch,notification } from 'antd'
import moment from 'moment'
Model.create({
    namespace: 'attendance',
    state: {
        list: [{key:1}],
        data:[],
        dateRange:[moment().weekday(0),moment().weekday(7)],
        query:{
            cityId:'',
            schoolAreaId:'',
            courseLabelId:'',
            teacherName:'',
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
            const query = {beginTime:get().dateRange[0].unix()+'000',endTime:get().dateRange[1].unix()+'000'}
            const res = yield fetch(`vacations`,{query:{...get().query,...query}})
            yield change('data',res.data)
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
