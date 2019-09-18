import React from "react"
import { Model } from 'dvax'
import { Table, Select } from 'antd'
import './model'
const Option = Select.Option
const MapSelectProvince = ({provinces,...props }) => {
    const provincesList =provinces.slice(0)
    provincesList.unshift({provinceCode:'',province:'全部'})
    return (
       <Select
            placeholder='省选择'
            style={{ width: 160 }}
            onDropdownVisibleChange={(open)=>Model.dispatch({type:'commonData/getProvinces'})}
       >
             {
                provincesList.map((pro,index)=>{
                    return <Option value={pro.province} key={index} onClick={()=>{
                        if(!pro.provinceCode) {
                            Model.change('commonData','cities',[])
                            Model.run('attendance',function*({change,put}){
                                yield change('query.cityId','')
                                yield put({type:'getData'})
                                yield change('cityName',undefined)
                            })
                            return 
                        }
                            Model.dispatch({type:'commonData/getCities',provinceCode:pro.provinceCode})
                        }
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
            value={props.cityName}
        >
            {
                cities.map((obj,index) =>{
                    return  (
                        <Option key={index} onClick={()=>{
                            Model.run('attendance',function*({change,put}){
                                yield change('query.cityId',obj.cityId)
                                yield change('cityName',obj.city)

                                yield put({type:'getData'})
                            })
                        }}>
                            {obj.city}
                        </Option>
                    )
                })
            }
        </Select>
    )
}

const SelectSchoolArea = ({areas,...props }) => {
    const List = areas.slice(0)
    List.unshift({schoolAreaId:'',schoolArea:'全部'})
    return (
        <Select
            placeholder='请选择分区'
            style={{ width: 240 }}
            onDropdownVisibleChange={(open)=>{
                Model.dispatch({type:'commonData/getAreas',cityId:Model.get('attendance').query.cityId})
            }}
        >
            {
                List.map((obj,index) =>{
                    return  (
                        <Option key={index} onClick={()=>{
                            Model.run('attendance',function*({change,put}){
                                yield change('query.schoolAreaId',obj.schoolAreaId)
                                yield put({type:'getData'})
                            })
                        }}>
                            {obj.schoolArea}
                        </Option>
                    )
                }) 
            }
        </Select>        
    )
}
const MapSelectCities = Model.connect(['commonData','attendance'])(MapSelectCity)
const MapSelectProvinces = Model.connect(['commonData','attendance'])(MapSelectProvince)
const Areas = Model.connect(['commonData','attendance'])(SelectSchoolArea)
export {Areas,MapSelectCities,MapSelectProvinces} 
