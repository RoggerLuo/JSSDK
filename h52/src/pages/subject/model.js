import { Model } from 'dvax'
import constants from 'utils/constants'
Model.create({
    namespace: 'subject',
    state: {
        subjects: [],
        filters:{
            category:{
                options: [],
                selected: undefined
            }
        },
        // labels:[],
        // courseCategoryId:'',
        courseName:'',
        
        antdPagination:{

        },
        pagination:{
            current:1, //antd接口标准
            defaultCurrent: 1,
            pageSize: constants.PAGESIZE,
            total: 0,
            showQuickJumper: true 
        },
        query:{
            courseName:'',
            schoolInfoId:'',
            courseCategoryId:''
        }
    },
    effects:{
        * get({fetch,get,change}){
            const res = yield fetch(`subject`,{query:get().pagination})
            if(res.status!=='ok') return
            yield change('subjects',res.results)
        },

        * selectCategory({change,fetch,get},{value}){
            yield change('current',1)
            yield change('query.courseCategoryId',value)
            const query = {...get().pagination,...get().query}
            query.pageNum = query.current // 后台接口标准
            const res = yield fetch(`course-info`,{query})
            if(res.hasErrors) return
            yield change('list',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        * selectSchool({change,fetch,get},{value}){
            yield change('current',1)
            yield change('query.schoolInfoId',value)
            const query = {...get().pagination,...get().query}
            query.pageNum = query.current // 后台接口标准
            const res = yield fetch(`course-info`,{query})
            if(res.hasErrors) return
            yield change('list',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        * search({change,fetch,get},{value}){
            yield change('current',1)
            yield change('query.courseName',value)
            const query = {...get().pagination,...get().query}
            query.pageNum = query.current // 后台接口标准
            const res = yield fetch(`course-info`,{query})
            if(res.hasErrors) return
            yield change('list',res.data.records)
            yield change('pagination.total',res.data.totalRecords)
        },
        * changePage({fetch,get,change},{pageInfo}){
            yield change('pagination.pageSize',pageInfo.pageSize)
            yield change('pagination.current',pageInfo.current)
            const query = {...get().pagination,...get().query}
            query.pageNum = query.current // 后台接口标准
            const res = yield fetch(`course-info`,{query})
            yield change('list',res.data.records)
        }
    }
})
