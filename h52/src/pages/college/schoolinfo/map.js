import { Select } from 'antd';
import React from "react";
import { connect,Model } from 'dvax'
import constants from 'utils/constants'
import 'dvax/dateFormat'

Model.create({
    namespace:'mapSelect',
    state:{
        provinces:[],
        cities:[]
    },
    effects:{
        *getProvinces({fetch,change}){ 
          
            const res = yield fetch(`geo/provinces`)
            //if(hasErrors) return
                
            console.log(res)           
            yield change('provinces',res.data)         
        },
        *getCities({fetch,change},{provinceCode}){
              
          const res=yield fetch(`geo/${provinceCode}/cities`)
          console.log(res)
          yield change('cities',res.data)
        }
    }
})
