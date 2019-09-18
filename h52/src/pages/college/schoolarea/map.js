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

//const Option = Select.Option;
// const MapSelectProvince = ({provinces,...props }) => {
// //render(){
//     return (
     
//        <Select
//          style={{ width: 150 }}
//          onDropdownVisibleChange={(open)=>Model.dispatch({type:'mapSelect/getProvinces'})}
//        >
//              {
//                 provinces.map((pro,index)=>{
//                       
//                     return <Option value={pro.province} key={index} onClick={()=>Model.dispatch({type:'mapSelect/getCities',provinceCode:pro.provinceCode})}>{pro.province}</Option>
//                 })
//             }              
//         </Select>
      
//     );
//  //} 
// }
// const MapSelectCity = ({cities,...props }) => {
// //render(){
//     return (
          
//         <Select
//           style={{ width: 150 }}
//         >
//           {
//             cities.map((obj,index) =>{
//             return  <Option key={index} value={obj.city}>{obj.city}</Option>
//         })
//           }
//         </Select>
      
//     );
//  //} 
// }

// const MapSelectProvinceConnected = Model.connect('mapSelect')(MapSelectProvince) 
// const MapSelectCityConnected = Model.connect('mapSelect')(MapSelectCity)
// //const AntdComp =  Form.create()(MapSelect)
// export  {
//    MapSelectProvince, //MapSelectProvinceConnected as
//   MapSelectCityConnected as MapSelectCity
// }
  //MapSelectCity:Model.connect('mapSelect')(MapSelectCity)

//}