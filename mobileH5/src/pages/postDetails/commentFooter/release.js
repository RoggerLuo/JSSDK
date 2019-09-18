import toast from 'dvax/toast'
import { Model } from 'dvax'
const release = run => {
    run(function*({ reduce, change, get, fetch,put }) {
        const comment = get().inputText
        
        const query = {
                ...get().query
            }
        const postId=query.detailsId
        if (!comment || comment === '') {
            toast('不能提交空内容', 2000, 'bad')
            return
        }
        const res = yield fetch(`comment/${postId}`,{method:'post',body:{content:comment}})

        
        toast('评论成功', 1000, 'good')
        yield change('inputText', '')
         //yield put({type:'getComment'})
         Model.dispatch({type:'messageModel/getNotread'})
       
    })
   
}
export default release