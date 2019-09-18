import { Model } from 'dvax';

const nowDate = new Date();
const model = {
    namespace: 'sectors',
    state: { 
    	sectorList:[],
   
    },
    effects:{
    	*getSector({change,fetch,get}){
            const res = yield fetch(`subject`)
            if(!res) return
            yield change('sectorList',res)
           // debugger
            const subjectId=res[0]._id
            //console.log(subjectId)
            Model.change('sendpostModel','body.subjectId',subjectId)
         	
        
        },
    } 
};

Model.create(model);