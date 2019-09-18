import toast from 'dvax/toast'
import {Model} from 'dvax'
const release = run => {
    run(function*({ reduce, change, get, fetch,put }) {
        const comment = get().inputText
        const query = {
                ...get().query
            }
        const postId=query.postId
        const commentsId=query.commentsId
        const userId=query.userId
        const replyedName = get().replyedName
       
        if (!comment || comment === '') {
            toast('不能提交空内容', 2000, 'bad')
            return
        }
        if(replyedName==''){
           const res = yield fetch(`comment/${postId}/${commentsId}`,{method:'post',body:{content:comment,userId:userId}}) 
        }
         else{
             const res = yield fetch(`comment/${postId}/${commentsId}`,{method:'post',body:{content:comment,userId:userId}}) 
         }

        toast('回复成功', 1000, 'good')
        yield change('inputText', '')
        yield change('placeholderValue','写评论...')
        yield change('query.userId','')
        yield put({type:'getFloorComments'})
        Model.dispatch({type:'messageModel/getNotread'})
    })
    
}
export default release