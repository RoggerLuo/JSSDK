
import React from "react"
import { Model } from 'dvax'
import { Select } from 'antd'
import './model'

const Option = Select.Option;
const MapSelectProvince = ({provinces,...props }) => {
    const provincesList =provinces.slice(0)
    provincesList.unshift({provinceCode:'',province:'全部'})
    return (
     
       <Select
            placeholder='省选择'
            style={{ width: 160 }}
            onDropdownVisibleChange={(open)=>Model.dispatch({type:'roomInfo/getProvinces'})}
       >
             {
                provincesList.map((pro,index)=>{
                    return <Option value={pro.province} key={index} onClick={()=>
                        Model.dispatch({type:'roomInfo/getCities',provinceCode:pro.provinceCode})
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
                    return  <Option key={index} onClick={()=> {
                        Model.change('roomInfo','cityId',obj.cityId)
                        Model.dispatch({type:'roomInfo/getRoom'})
                    }}>{obj.city}</Option>
                })
          }
        </Select>
      
    );
}

const MapSelectCities = Model.connect('roomInfo')(MapSelectCity)
const MapSelectProvinces = Model.connect('roomInfo')(MapSelectProvince)
export {MapSelectCities,MapSelectProvinces} 