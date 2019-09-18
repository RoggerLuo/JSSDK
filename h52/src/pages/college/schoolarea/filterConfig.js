
import React from "react"
import { Model } from 'dvax'
import { Table, Select } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'

const Option = Select.Option;

 const MapSelectProvince = ({provinces,...props }) => {
  const provincesList=provinces.slice(0)
  provincesList.unshift({provinceId:'',province:'全部'})
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
                      { 
                       if(pro.province=='全部'){
                        Model.dispatch({type:'collegeSchoolarea/getCollege'})
                      }
                      else{
                      Model.dispatch({type:'mapSelect/getCities',provinceCode:pro.provinceCode})
                      }
                      }
                      }>{pro.province}
                    </Option>                   
                })
            }              
       </Select>
    );
 //} 
}
const MapSelectCity = ({cities,...props }) => {
//render(){
    return (
          
        <Select
        placeholder='市选择'
          style={{ width: 150 }}
        >
          {
            cities.map((obj,index) =>{
                    
            return  <Option key={index} onClick={()=> Model.dispatch({type:'collegeSchoolarea/searchArea',SearchValue:obj.cityId})}>{obj.city}</Option>
        })
          }
        </Select>
      
    );
 //} 
}

//export default Model.connect('mapSelect')(MapSelectProvince)

const MapSelectProvinceConnected = Model.connect('mapSelect')(MapSelectProvince) 
const MapSelectCityConnected = Model.connect('mapSelect')(MapSelectCity)
const MapSelectCities = Model.connect('collegeSchoolarea')(MapSelectCityConnected)
const MapSelectProvinces = Model.connect('collegeSchoolarea')(MapSelectProvinceConnected) 
//const AntdComp =  Form.create()(MapSelect)
export {MapSelectProvinces,MapSelectCities}