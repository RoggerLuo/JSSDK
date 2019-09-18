import { Model } from 'dvax';
import moment from 'moment'

const model = {
    namespace: 'CommentsModel',
    state: { 
        replyComment:[],
        replylists:[],
        commentInfos:{
            commentInfo:[],
            authorInfo:[],
        },
        query:{
            commentsId:'',
            postId:'',
            userId:'',
            deleteReplyId:'',
        },
        inputText:'',
        replyedName:'',
        placeholderValue:'写评论...',
   
    },
    effects:{ 
        *getFloorComments({change,fetch,get}){   //获取某一层的评论
            const query = {
                ...get().query
            }
            const commentId=query.commentsId
            const postId=query.postId
            const res= yield fetch(`comment/${postId}/${commentId}`)
            if(!res) return

            yield change('replylists',res.data)
           yield change('commentInfos.commentInfo',res.commentInfo)
           yield change('commentInfos.authorInfo',res.commentInfo.authorInfo)  
        },
        *deleteComment({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const commentId=query.deleteReplyId
            const res= yield fetch(`comment/${commentId}`,{method:'delete'})
            if(!res) return
            yield put({type:'getFloorComments'})
           
        },
    } 
};

Model.create(model);