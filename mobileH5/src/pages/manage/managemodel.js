import { Model } from 'dvax';
import toast from 'dvax/toast'
import moment from 'moment'
const model = {
    namespace: 'manageModel',
    state: { 
    	checkingLists:[],
    	CheckingData:[],
	   query:{
	    		subjectId:'',
	    		postId:'',
	    		startTime:'',
	    		endTime:'',
	    	},
    	checked1:'',
    	checked2:'',
    	time1:'',
    	time2:'',
    },
    effects:{
    	*openAudit({change,get,fetch}){ // 开始审帖功能
    		const query={
    			...get().query
    		}
    		const subjectId=query.subjectId
    		const res= yield fetch(`subject-setting/audit/${subjectId}`,{method:'post'})
    		if(!res) return
    		yield change('checked1',true)
    	},
    	*closeAudit({change,fetch,get}){
    		const query={
    			...get().query
    		}
    		const subjectId=query.subjectId
    		const res=yield fetch(`subject-setting/audit/${subjectId}`,{method:'delete'})
    		if(!res) return
    		yield change('checked1',false)
    	},
    	*getCheckingPost({change,get,fetch}){
    		const query={
    			...get().query
    		}
    		const subjectId =query.subjectId
    		const res= yield fetch(`subject-setting/audit/${subjectId}`)

    		yield change('checkingLists',res.data)
    		
    	},
    	*openAccess({fetch,get,change}){
    		const query={
    			...get().query
    		}
    		const subjectId=query.subjectId
    		const res = yield fetch(`subject-setting/access/${subjectId}`,{method:'post'})
    		if(!res) return
    			yield change('checked2',true)
    	},
    	*closeAccess({fetch,get,change}){
    		const query={
    			...get().query
    		}
    		const subjectId=query.subjectId
    		const res = yield fetch(`subject-setting/access/${subjectId}`,{method:'delete'})
    		if(!res) return
    			yield change('checked2',false)
    	},
    	*passAudit({change,get,fetch,put}){
    		const query={
    			...get().query
    		}
    		const postId=query.postId
    		const res=yield fetch(`subject-setting/audit-post/${postId}`,{method:'post'})
    		if(!res) return 
    		toast('已审核通过',1000,'ok')
            //yield put({type:'getCheckingPost'})
    	},
    	*unPassAudit({change,fetch,get,put}){
    		const query={
    			...get().query
    		}
    		const postId=query.postId
    		const res = yield fetch(`subject-setting/audit-post/${postId}`,{method:'delete'})
    		if(!res) return
    			toast('帖子审核不通过',1000,'ok')
    		//yield put({type:'getCheckingPost'})
    	},
    	*sendStartTime({change,fetch,get,start}){
    		const query={
    			...get().query
    		}
    		const startTime=query.startTime
    		const subjectId=query.subjectId
    		
    		const res= yield fetch(`subject-setting/range/${subjectId}`,{query:{start:startTime},method:'post'})
    	},
    	*sendEndTime({change,fetch,get,put}){
    		const query={
    			...get().query
    		}
    		const subjectId= query.subjectId
    		const endTime=query.endTime
    		
    		const res= yield fetch(`subject-setting/range/${subjectId}`,{query:{end:endTime},method:'post'})
    	}
    } 
};

Model.create(model);