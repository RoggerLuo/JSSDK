// export default [{
//         name: 'cityId',
//         // title: '省市选择',
//         placeholder:'省市选择',
//         options: [{
//                 key: '',
//                 text: '全部'
//             },
//             {
//                 key: 'ALL',
//                 text: '全部'
//             }
//         ]
//     }
// ]
import React from "react"
import { Model } from 'dvax'
import { Table, Select } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'

const Option = Select.Option;
const MapSelectProvince = ({provinces,...props }) => {
    const provincesList =provinces.slice(0)
    provincesList.unshift({provinceCode:'',province:'全部'})
    return (
     
       <Select
        placeholder='省选择'
        //defaultValue={"全部"}
         style={{ width: 160 }}
         onDropdownVisibleChange={(open)=>Model.dispatch({type:'mapSelect/getProvinces'})}
       >
             {
                provincesList.map((pro,index)=>{
                      
                    return <Option value={pro.province} key={index} onClick={()=>
                        Model.dispatch({type:'mapSelect/getCities',provinceCode:pro.provinceCode})

                        }>{pro.province}
                    </Option>                   
                })
            }              
       </Select>
    ); 
}
const MapSelectCity = ({cities,...props }) => {
    return (
          
        <Select
        placeholder='市选择'
          style={{ width: 150 }}
        >
          {
            cities.map((obj,index) =>{
                    
            return  <Option key={index} onClick={()=> Model.dispatch({type:'collegeStudents/searchArea',SearchValue:obj.cityId})}>{obj.city}</Option>
        })
          }
        </Select>
      
    );
}
const MapSelectSchool = ({list,...props }) => {
  const schools =list.slice(0)
  schools.unshift({schoolInfoId:'',schoolName:'全部'})
    return (
          
        <Select
          placeholder='请选择学校'
          style={{ width: 150 }}
        >
          {
            schools.map((obj,index) =>{
                    
            return  <Option key={index} onClick={()=>
             Model.dispatch({type:'collegeStudents/searchSchool',schoolInfoIds:obj.schoolInfoId})}>{obj.schoolName}</Option>
        })
          }
        </Select>
      
    );
 //} 
}



//export default Model.connect('mapSelect')(MapSelectProvince)

const MapSelectProvinceConnected = Model.connect('mapSelect')(MapSelectProvince) 
const MapSelectCityConnected = Model.connect('mapSelect')(MapSelectCity)
const MapSelectCities = Model.connect('collegeStudents')(MapSelectCityConnected)
const MapSelectProvinces = Model.connect('collegeStudents')(MapSelectProvinceConnected) 
const SelectSchool = Model.connect('collegeStudents')(MapSelectSchool)
export {MapSelectProvinces,MapSelectCities,SelectSchool}