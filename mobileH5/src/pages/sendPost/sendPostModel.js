import { Model } from 'dvax';
import toast from 'dvax/toast'

const nowDate = new Date();
const model = {
    namespace: 'sendpostModel',
    state: { 
    	postCon:[],
        body:{
            title:'',
            subjectId:'',
            content:'',
            images:[],
        },
        textSelect:'',
        picsAdd:'',
   
    },
    effects:{
    	*submit({fetch,change,post,get,body},{values}){
        if(values.subjectId==''){
                return toast('请选择板块',1000,'ok')
            }
        else{
           const res = yield fetch(`post`,{method:'post',body:values})
            if(!res) return 
            else{
                window.mainView.router.back()
                toast('添加成功',1000,'good')
            }
        }
        },
    } 
};

Model.create(model);

