import { Model } from 'dvax'
import constants from 'utils/constants'
Model.create({
    namespace: 'ban',
    state: {
        users: [],
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
        }
    },
    effects:{
        * get({fetch,get,change}){
            const query = {...get().query}
            query.startIndex = get().pagination.startIndex
            query.pageSize = get().pagination.pageSize
            const res = yield fetch(`user-ban`,{query})
            if(res.status!=='ok') return
            // yield change('users',res.results.data)
            yield change('pagination.total',res.results.total)
            
            const unregisteredUsers = []
            res.results.data.forEach((user,ind)=>{
                if(user.userInfo===null) {
                    unregisteredUsers.push({ind,user})
                }
            })
            let fetchedUsers = yield unregisteredUsers.map(el=>fetch(`subject-setting/search-employee`,{query:{keyword:el.user.username}}) )
            //.then(val=>val.results)
            fetchedUsers = fetchedUsers.map(el=>el.results[0])
            unregisteredUsers.forEach((el,ind)=>{
                res.results.data[el.ind].userInfo = {
                    avatar: fetchedUsers[ind].avatar,
                    name: fetchedUsers[ind].name,
                    nickname: fetchedUsers[ind].nickname,
                    userId: fetchedUsers[ind].user_id
                }
            })
            yield change('users',res.results.data)
            
            
            // console.log(fetchedUsers)
            // debugger
            // Model.run('addStaffModal',function*({fetch}){
            //     const res = yield 
            //     Model.change('addStaffModal','employees',res.results)
            // })


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
