import { Model } from 'dvax'
Model.create({
    namespace: 'commonData',
    state: {
        schools: [],
        categories: [],
        tags: [],
        years: [],
        areas:[],
        grades:[],
        provinces:[],
        cities:[],
        users:[],
        query:{
            cityId:'',
            schoolAreaId:''
        }
    },
    effects:{
        *getProvinces({fetch,change}){           
            const res = yield fetch(`geo/provinces`)
            yield change('provinces',res.data)         
        },
        *getCities({fetch,change},{provinceCode}){
            const res = yield fetch(`geo/${provinceCode}/cities`)
            yield change('cities',res.data)
        },
        * getSchools({fetch,get,change}){
            const query = get().query
            query.pageSize = 99999
            const res = yield fetch(`school-info`,{query})
            if(res.hasErrors) return
            yield change('schools',res.data.records)
        },
        * getCategory({fetch,get,change}){
            const res = yield fetch(`course-categories`)
            if(res.hasErrors) return
            yield change('categories',res.data.records)
        },
        * getTag({fetch,get,change}){
            const res = yield fetch(`course-labels`)
            if(res.hasErrors) return
            yield change('tags',res.data.records)
        },
        * getYear({fetch,get,change}){
            const res = yield fetch(`school-years`)
            if(res.hasErrors) return
            yield change('years',res.data.records)
        },
        * getAreas({fetch,change},{cityId}){
            let res
            if(cityId) {
                res = yield fetch(`school-areas`,{query:{cityId}})
            }else{
                res = yield fetch(`school-areas`)
            }
            if(res.hasErrors) return
            yield change('areas',res.data.records)
        },
        * getGrade({fetch,change}){
            const res = yield fetch(`school-grades/all`)
            if(res.hasErrors) return
            yield change('grades',res.data)
        },
        * getUsers({fetch,get,change}){
            const res = yield fetch(`user-platformteacher`)
            yield change('users',res.data.records)
        },
        * initialFetch({fetch,put,change}){
            yield put({type:'getSchools'})
            yield put({type:'getCategory'})
            yield put({type:'getTag'})
            yield put({type:'getYear'})
            yield put({type:'getAreas'})
            yield put({type:'getGrade'})
            yield put({type:'getUsers'})
        }
    }
})
