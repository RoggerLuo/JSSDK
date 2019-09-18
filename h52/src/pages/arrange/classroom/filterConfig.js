import React from "react"
import { Model } from 'dvax'
import { Select } from 'antd'
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
                            Model.run('arrangeClassroom',function*({change,put}){
                                yield change('query.cityId','')
                                yield put({type:'getArrange'})
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
                            Model.run('arrangeClassroom',function*({change,put}){
                                yield change('query.cityId',obj.cityId)
                                yield change('cityName',obj.city)
                                yield put({type:'getArrange'})
                                
                                Model.change('commonData','query.cityId',obj.cityId)
                                Model.dispatch({type:'commonData/getSchools'})
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
                Model.dispatch({type:'commonData/getAreas',cityId:Model.get('arrangeClassroom').query.cityId})
            }}
        >
            {
                List.map((obj,index) =>{
                    return  (
                        <Option key={index} onClick={()=>{
                            Model.run('arrangeClassroom',function*({change,put}){
                                yield change('query.schoolAreaId',obj.schoolAreaId)
                                yield put({type:'getArrange'})
                                
                                Model.change('commonData','query.schoolAreaId',obj.schoolAreaId)
                                Model.dispatch({type:'commonData/getSchools'})
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

const SelectSchool = ({schools,...props }) => {
    const List= schools.slice(0)
    List.unshift({schoolInfoId:'null',schoolName:'全部'})
    return (
        <Select
            placeholder='请选择学校'
            style={{ width: 150 }}
            onDropdownVisibleChange={(open)=>{
                Model.dispatch({type:'collegeSchoolinfo/getCollege'})}
            }
        >
            {
                List.map((obj,index) =>{
                    return  (
                        <Option key={obj.schoolInfoId} onClick={()=>{
                            
                            if(obj.schoolName=="全部"){
                                Model.run('arrangeClassroom',function*({change,put}){
                                    yield put({type:'getArrange'})
                                })    
                            }else{
                                Model.run('arrangeClassroom',function*({change,put}){
                                    yield change('query.schoolInfoId',obj.schoolInfoId)
                                    yield put({type:'getArrange'})
                                })    
                            }
                        }}>
                            {obj.schoolName}
                        </Option>
                    )
                }) 
            }
        </Select>      
    )
}

const SelectedSchool=Model.connect(['commonData','arrangeClassroom'])(SelectSchool)
const MapSelectCities = Model.connect(['commonData','arrangeClassroom'])(MapSelectCity)
const MapSelectProvinces = Model.connect(['commonData','arrangeClassroom'])(MapSelectProvince)
const Areas = Model.connect(['commonData','arrangeClassroom'])(SelectSchoolArea)

export {Areas,MapSelectCities,MapSelectProvinces,SelectedSchool} 