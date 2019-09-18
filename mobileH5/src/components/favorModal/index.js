import React from 'react'
import dvax,{ Model } from 'dvax'
import Header from './Header'
import invariant from 'invariant'
import Gap from 'dvax/gap'
function empty(){}
import toast from 'dvax/toast'
import InnerComponent from './InnerComponent.js'
import { getUserInfo } from 'shared'
Model.create({ namespace:'favorModal'})
function loadCollectionsTags(res) {
    const data = []
    const keywords = [...res.paper.paper_keywords,...res.news.news_keywords]
    if(keywords) {
        keywords.forEach((el)=>{
            if(!el.keywords) {
                return
            }
            el.keywords.forEach(el2=>data.push(el2))
        })        
    }
    return data
}
dvax.onStart(()=>{
    Model.run('favorModal',function*({ fetch, get, change }){
        const userId = getUserInfo().user_id
        const res = yield fetch(`personal/collections/${userId}`, { method: 'post' })
        yield change('paperKeywords',loadCollectionsTags(res))
    })
})
function Modal({ show, ...props  }) {
    if(!show) return null
    return (
        <div style={{width:'100%',position:'fixed',top:'15%',display:'flex',zIndex:'9999'}}>
            <div style={{margin:'auto',borderRadius: '4px',height:'400px',width:'280px',zIndex:'10',borderLeft:'1px solid #f6f7f9',backgroundColor:'white'}}>
                <div style={{ borderRadius: '4px',height:'100%',width:'100%',display:'flex',flexDirection:'column',backgroundColor:'white'}}>
                    <Header close={close}/>
                    <InnerComponent {...props} close={close}/>
                </div>
            </div>
            <div style={{position:'fixed',top:0,bottom:0,left:0,right:0,backgroundColor:'#1c252f',opacity:'0.5',zIndex:'-1'}}></div>
        </div>
    )
}
const connectedModal = Model.connect('favorModal')(Modal)
function open(paperId,cb,isNews){
    Model.change('favorModal','cb',cb)
    Model.change('favorModal','isNews',isNews)
    Model.change('favorModal','textarea','')
    Model.change('favorModal','show',true)
    Model.change('favorModal','paperId',paperId)
}
function close(){
    Model.change('favorModal','show',false)
}
export default { modal: connectedModal, open, close }
