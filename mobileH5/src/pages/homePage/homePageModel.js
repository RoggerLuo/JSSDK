import { Model } from 'dvax';

const model = {
    namespace: 'HomePageModel',
    state: { 
    	posts:[],
        rData:[],
        currentIndex: '0',
        selected:'0',
        tab:'0',
        isLike:false,
        isUnlike:false,
        isReply:false,
        query:{
            postId:'',
        },
        pagination:{
            startIndex:0,
            current:1,
            defaultCurrent: 1,
            pageSize:10,
            //pageSize: constants.PAGESIZE,
            total: 0,
            showQuickJumper: true 
        },
        dtoes:'',
   
    },
    effects:{
    	*gethomePage({change,fetch,get}){
            const query={
                ...get().pagination
            }
            const startIndex=query.startIndex
            const pageSize=query.pageSize
           const res = yield fetch(`post`)
            //const res = yield fetch(`post?startIndex=5&pageSize=10`)
            if(!res) return
            yield change('posts',res.data)
            yield change('pagination.total',res.total)
        },
        *getAttentionPost({change,fetch,get}){
           const query={
                ...get().pagination
            }
            const startIndex=query.startIndex
            const pageSize=query.pageSize
           const res = yield fetch(`post?follow=true`) 
           if(!res) return
            yield change('posts',res.data)
            yield change('pagination.total',res.total)
        },
        *makeThumb({change,fetch,get,put}){ //点赞
            const query={
               ...get().query 
            }
            const postId=query.postId
           const res=yield fetch(`thumb/${postId}`,{method:'post'})
           Model.dispatch({type:'PostsDetailsModel/getPostsDetails'})
           Model.dispatch({type:'messageModel/getNotread'})
           //yield change(`posts[${ind}].thumbStatus`,!props.thumbStatus)

        }, 
        *cancelThumb({change,fetch,get,put}){
            const query={
               ...get().query 
            }
            const postId=query.postId
            const res=yield fetch(`thumb/${postId}`,{method:'delete'})
             Model.dispatch({type:'PostsDetailsModel/getPostsDetails'})

        },
        *Collect({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const postId=query.postId
            const res= yield fetch(`favorite/${postId}`,{method:'post'})
           
            //Model.dispatch({type:'postListModel/getpostList'})
            Model.dispatch({type:'PostsDetailsModel/getPostsDetails'})
        },
        *cancelCollect({change,fetch,get,put}){
            const query={
                ...get().query
            }
            const postId= query.postId
            const res =yield fetch(`favorite/${postId}`,{method:'delete'})
            
            //Model.dispatch({type:'postListModel/getpostList'})
            Model.dispatch({type:'PostsDetailsModel/getPostsDetails'})
        },
        *getPagination({fetch,get,change}){

            const query ={
                ...get().pagination,
                ...get().query
            } 
            const res= fetch(`v1/post?subjectId=xxx&startIndex=5&pageSize=10`)
        },
        //  * changePage({fetch,get,change},{pageInfo}){
        //     const current = pageInfo.current
        //     yield change('pagination.current',current)
        //     const query = get().pagination
        //     query.pageNum = query.current
        //     const res = yield fetch(`user-platformteacher`,{query})
        //     yield change('list',res.data.records)
        // },

    } 
};

Model.create(model);