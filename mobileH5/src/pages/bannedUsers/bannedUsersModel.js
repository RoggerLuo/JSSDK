import { Model } from 'dvax';

const model = {
    namespace: 'Users',
    state: { 
    	banndeUsersList:[],
        query:{
            subjectId:'',
            userId:'',
        }
   
    },
    effects:{
    	*getUsers({change,fetch,get}){  //获取用户禁言列表
            const query={
                ...get().query
            }
            const subjectId=query.subjectId
            const res = yield fetch(`user-ban/${subjectId}`)
            if(!res) return
            yield change('banndeUsersList',res)
         	
        
        },
        *deleteBan({change,get,fetch,put}){
            const query={
                ...get().query
            }
            const subjectId=query.subjectId
            const userId=query.userId
            const res =yield fetch(`user-ban/${subjectId}/${userId}`,{method:'delete'})
            yield put({type:'getUsers'})
            if(!res) return
           
        }
    } 
};

Model.create(model);