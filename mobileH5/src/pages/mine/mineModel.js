import { Model } from 'dvax';
import toast from 'dvax/toast'

const nowDate = new Date();
const model = {
    namespace: 'mineModel',
    state: { 
        mytabs:'0',
        sendlists:[],
        myLists:[],
        countLists:[],
        mycollect:[],
        myPostDate:[],
        myFavoritePost:[],
        pagination:{
            startIndex:0,
            pageSize:10,
            total: 0,
        },
        query:{
            postId:'',
        }   
    },
    effects:{
        *getMysendpost({change,fetch,get,put}){
            const res=yield fetch(`my/post`)
            if(!res) return
            yield change('sendlists',res)
            yield change('mycollect',[])
            yield change('myLists',[])
            yield put({type:'getMycount'})
        },
        *getMycount({change,fetch,get}){  
            const res =yield fetch(`my/count`)
            if(!res) return
                yield change('countLists',res)
        },
        *getMysubject({change,fetch,get,put}){
            const res=yield fetch(`my/follow`)
            if(!res) return
                yield change('myLists',res)
                yield change('mycollect',[])
                yield change('sendlists',[])
                
                //yield put({type:'getMycount'})
        },
        *getMycollect({change,fetch,get}){  
            const res=yield fetch(`my/favorite`)
            if(!res) return
                yield change('mycollect',res)
                yield change('myLists',[])
                yield change('sendlists',[])
        },
    } 
};

Model.create(model);

