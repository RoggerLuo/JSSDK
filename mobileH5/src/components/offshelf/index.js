import invariant from 'invariant'
import React from 'react'
import { Model } from 'dvax'
let showing = false
Model.create({
    namespace:'dvaxToast_offshelf',
    state:{ status:false, message:'', show:false },
    reducers:{
        show(state,{ status, message }){
            return { ...state, show: true, message, status}
        },
        hide(state){
            return { ...state, show:false}
        },
        clear(state){
            showing = false
            return { ...state, message:'', status:false}
        }
    }
})

export default function(message,duration,status){
    if(showing) return
    showing = true

    if(Model.get('dvaxToast_offshelf').show) return
    invariant(message,'提示信息不能为空[from dvax/toast]')
    invariant(duration,'持续时间不能为空[from dvax/toast]')
    Model.dispatch({type:'dvaxToast_offshelf/show',status,message})

    setTimeout(function(){
        Model.dispatch({type:'dvaxToast_offshelf/hide'})
    },duration)
    setTimeout(function(){
        Model.dispatch({type:'dvaxToast_offshelf/clear'})
    },duration+300)
}
