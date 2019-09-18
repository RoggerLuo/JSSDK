
import React from "react"
import { Model } from 'dvax'
import { Table, Select } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'

const Option = Select.Option;
const SelectSchoolArea = ({listarea,...props }) => {
    const schoolarea =listarea.slice(0)
    schoolarea.unshift({schoolAreaId:'',schoolArea:'全部'})
        
    return (
          
            <Select
            placeholder='请选择分区'
                style={{ width: 150 }}
                onDropdownVisibleChange={(open)=>Model.dispatch({type:'collegeSchoolarea/getCollege'})}
            >
            {
                schoolarea.map((obj,index)=>{
                    return <Option value={obj.schoolAreaId} onClick={()=>Model.dispatch({type:'collegeSchoolinfo/searchSchoolArea',searchValue:obj.schoolAreaId})} key={index} >{obj.schoolArea}</Option>
                        })
            }              
            </Select> 
      
    ); 
}


//export default Model.connect('mapSelect')(MapSelectProvince)

// const MapSelectProvinceConnected = Model.connect('mapSelect')(MapSelectProvince) 
// const MapSelectCityConnected = Model.connect('mapSelect')(MapSelectCity)
// const MapSelectCities = Model.connect('collegeStudents')(MapSelectCityConnected)
// const MapSelectProvinces = Model.connect('collegeStudents')(MapSelectProvinceConnected) 
const SelectSchoolAreas =  Model.connect('collegeSchoolarea')(SelectSchoolArea)
export default Model.connect('collegeSchoolinfo')(SelectSchoolAreas)