import invariant from 'invariant'
import React from 'react'
import { Model } from 'dvax'
import InifiniteList from './InifiniteList'
import model from './model'
import mutate from 'dvax/mutate'
export default function(cbs){
    invariant(typeof(cbs.fetchData) === 'function','传入参数需要实现fetchData,一个generator')
    invariant(typeof(cbs.refresh) === 'function','传入参数需要实现refresh,一个generator')
    const getRandomString = () => Math.random().toString(36).substr(2)
    const namespace = getRandomString()
    Model.create(model(namespace,cbs))
    const Component = Model.connect(namespace)(InifiniteList)
    function fetchData(){
        Model.put({ type: `${namespace}/fetchData` })
    }
    function refresh(params={}){
        Model.put({ ...params,type: `${namespace}/refresh`})
    }
    function commentNumberPlus1(paperId){
        Model.reduce(namespace,state=>{
            // 先找到对应的index
            state.data.some((el,ind)=>{
                 if(el.id===paperId){
                    debugger
                 }
            })
            // 然后给number  +1
            //mutate(state).with('data[]')
        })
    }
    return { component: Component, fetchData, refresh }
}
