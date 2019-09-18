import { Model } from 'dvax';
import toast from 'dvax/toast'
const model = {
    namespace: 'UsersAdd',
    state: { 
    	banndeUsersAddList:[],
        checked1:'',
        checked2:'',
        time1:'',
        time2:'',
        userInfo:[],
        modal:false,
        color:false,
        query:{
            startTime:'',
            endTime:'',
            searchValue:'',
            subjectId:'',
        }
   
    },
    effects:{
    	*getUsersAdd({change,fetch,get}){
            const res = yield fetch(`subject/bannedusersAdd`)
            if(!res) return
            yield change('banndeUsersAddList',res)
        },
        *getSearchUsers({change,fetch,get}){
            const query ={
                ...get().query
            }
            const name=query.searchValue
            //debugger
            const res = yield fetch(`user/search?name=${name}`)
            yield change('userInfo',res)
        },
        *addBannedUsers({change,fetch,get}){
            const query={
                ...get().query
            }
            const subjectId=query.subjectId
            const userId= query.userId
            const start=query.startTime
            const end =query.endTime
            const res=yield fetch(`user-ban/${subjectId}/${userId}`,{method:'post',body:{start:start,end:end}})
            if(!res) return
            Model.dispatch({type:'Users/getUsers'})
            toast('添加成功',1000,'ok')
            window.mainView.router.load({
            url: 'Bannedusers.html',
            })

        },
    } 
};

Model.create(model);