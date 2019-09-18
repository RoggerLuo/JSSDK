import { Model } from 'dvax';
import toast from 'dvax/toast'
import moment from 'moment'
const model = {
    namespace: 'PostsManage',
    state: { 
    	posts:[],
        managelists:[],
        postmanage:[],
        subjectInfos:{
            subjectInfo:[],
        },
        query:{
            subjectId:'',
            postId:'',
        },
        stick:""
   
    },
    effects:{
    	*getPosts({change,fetch,get}){
            const query = {
                ...get().query
            }
            const subjectId=query.subjectId
            const res= yield fetch(`post/?subjectId=${subjectId}`)
            if(!res) return
             res.data.map((datas,index)=>{
              return  datas.createTime=moment(datas.createTime).format("YYYY-MM-DD HH:mm:ss")
             })
            yield change('posts',res.data)
            yield change('subjectInfos.subjectInfo',res.subjectInfo)
        },
        *deletePosts({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const _id=query.postId
            const res =yield fetch(`post/${_id}`,{method:'delete'})
            if(!res) return
            toast('删除成功',1000,'ok')
            //yield put({type:'getPosts'})
            Model.dispatch({type:'mineModel/getMysendpost'})
            
        },
        *setTop({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const postId=query.postId
            const res=yield fetch(`post-top/${postId}`,{method:'post'})
            if(!res) return
            toast('已设为置顶',1000,'ok')
            yield put({type:'getPosts'})
        },
        *deleteTop({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const postId=query.postId
            const res=yield fetch(`post-top/${postId}`,{method:'delete'})
            if(!res) return
            toast('已取消置顶',1000,'ok')
            yield put({type:'getPosts'})
        },
        *setExcellent({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const postId=query.postId
            const res =yield fetch(`post-recommend/${postId}`,{method:'post'})
            if(!res) return
                toast('已设为精华',1000,'ok')
            yield put({type:'getPosts'})
        },
        *deleteExcellent({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const postId=query.postId
            const res =yield fetch(`post-recommend/${postId}`,{method:'delete'})
            if(!res) return
                toast('已取消精华',1000,'ok')
            yield put({type:'getPosts'})
        },
    } 
};

Model.create(model);