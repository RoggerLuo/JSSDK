import React from 'react'
import { Model } from 'dvax'
import toast from 'dvax/toast'

import { getUserInfo } from 'shared'

export default (close) => {
    Model.run('favorModal',function*({get,fetch,change}){
        let value = get().textarea
        let arr = []
        if(value) {
            arr = uniq(value.split(' '))

        }else{
            toast('不能提交空值',2000)
            return
        }
        let res
        if(get().isNews) {
            res = yield fetch(`news/collection/${get().paperId}`,{ method:'post', body: arr })
        }else{
            res = yield fetch(`paper/collection/${get('wp').userInfo.user_id}/${get().paperId}`, { method: 'post', body: arr })
        }

        // fetch 移动端 get().paperId ok
        // const res = yield fetch(`paper/collection/${getUserInfo().user_id}/${get().paperId}`,{method:'post',body:arr})
        if(res===false) return
        yield change('textarea','')
        toast('添加成功',1000,'good')
        get().cb && get().cb()

        close()
    })
}

function uniq(arr){
    const arr2 = []
    return arr.filter(el=>{
        if(arr2.indexOf(el) === -1) {
            arr2.push(el)
            return true
        }
        return false
    })
}
