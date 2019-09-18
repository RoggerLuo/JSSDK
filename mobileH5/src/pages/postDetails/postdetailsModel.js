import { Model } from 'dvax';
import moment from 'moment'

const model = {
    namespace: 'PostsDetailsModel',
    state: { 
    	detailsList:{
            authorInfo:{}, 
            images:[],
        },
        administer:'',
        commentList:[],
        subjectInfo:[],   
        tabs:'0',
        query:{
            detailsId:'',
            hostUserid:'',
            replyId:'',
            deleteReplyId:'',
        },
        inputText:'',
        placeholderValue:'写评论...'
   
    },
    effects:{
    	// *getPostsDetails({change,fetch,get}){
     //        const query = {
     //            ...get().query
     //        }
     //        const _Id=query.detailsId
     //        const res = yield fetch(`post/${_Id}`)
     //        if(!res) return
     //        yield change('detailsList',res)
     //    }, 
        *getPostsDetails({change,fetch,get},{fresh,callback}){
          
            const query = {
                ...get().query
            }
            const _Id=query.detailsId
            const res = yield fetch(`post/${_Id}`)
            // const res = yield fetch(`post/${_Id}`,{query:{refresh:fresh}})
            if(!res) return
            yield change('detailsList',res)
            yield change('subjectInfo',res.subjectInfo)
            callback && callback(res)
        }, 

        *getComment({change,fetch,get}){  //获取帖子的所有评论
            const query = {
                ...get().query
            }
            const postId=query.detailsId
            const res =yield fetch(`comment/${postId}`)
            if(!res) return
                yield change('commentList',res)
        },
        *getHostComment({change,fetch,get}){   //只看楼主的评论
            const query = {
                ...get().query
            }
            const postId=query.detailsId
            const userId=query.hostUserid
            const res=yield fetch (`comment/${postId}?userId=${userId}`)
           if(!res) return
            yield change('commentList',res)
        },
        *replyThumb({change,fetch,get,put}){
            const query={
                ...get().query
            }
           const commentId=query.replyId
           //debugger
            const res=yield fetch(`comment-thumb/${commentId}`,{method:'post'})
            if(!res) return
            yield put({type:'getComment'})
        },
        *cancalReplyThumb({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const commentId=query.replyId
            const res= yield fetch (`comment-thumb/${commentId}`,{method:'delete'})
            if(!res) return
                yield put({type:'getComment'})
        },
        *Collect({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const postId=query.detailsId
            const res= yield fetch(`favorite/${postId}`,{method:'post'})
            yield put({type:'getPostsDetails'})
        },
        *cancelCollect({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const postId= query.detailsId
            const res =yield fetch(`favorite/${postId}`,{method:'delete'})
            yield put({type:'getPostsDetails'})
        },
        *deleteComment({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const commentId=query.deleteReplyId
            const res= yield fetch(`comment/${commentId}`,{method:'delete'})
            if(!res) return
            //yield put({type:'getComment'})
           
        },
    } 
};

Model.create(model);