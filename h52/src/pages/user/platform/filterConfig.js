
import React from "react"
import { Model } from 'dvax'
import { Table, Select } from 'antd'
import tStyles from 'assets/style/table.less'
import Header from './header'
import columns from './columns'
import './model'
import Search from 'components/search/platformSearch'
const Option = Select.Option;

Model.create({
  namespace: 'selectFilter',
  state: {
    placeholder:'请选择分区/学校'
  }
})

const SelectArea = ({listarea,list,...props }) => {
      
  const listareaList=listarea.slice(0)
  listareaList.unshift({schoolAreaId:'null',schoolArea:'全部'})
  // const place=()=>{
  //   if(Model.dispatch({type:'userPlatform/inputSearch',inputValue:value})){
  //     return  ("学校？分区")
  //   }
  // }
    return (
        <Select
        placeholder={props.placeholder}
        style={{ width: 150 }}
        onDropdownVisibleChange={(open)=>{
          Model.dispatch({type:'collegeSchoolarea/getCollege'})
          Model.dispatch({type:'collegeSchoolinfo/getCollege'})}
        }
          
     
        >
          {
            listareaList.map((obj,index) =>{
            return  <Option key={obj.schoolAreaId} onClick={()=>
              {if(obj.schoolArea=="全部"){
                Model.dispatch({type:'userPlatform/getUser'})
              }
              else{
             Model.dispatch({type:'userPlatform/searchAreaSchool',searchValue:obj.schoolAreaId})
              }
           }
           }>{obj.schoolArea}</Option>
            }) 
          }
          {
          list.map((obj,index) =>{
            return  <Option key={obj.schoolInfoId} onClick={()=> Model.dispatch({type:'userPlatform/searchAreaSchool',searchValue:obj.schoolInfoId})}>{obj.schoolName}</Option>
            })
        }
        </Select>
      
    );
 //} 
}
const SelectedArea=Model.connect('collegeSchoolarea')(SelectArea)
const SelectedAreas=Model.connect('collegeSchoolinfo')(SelectedArea)
const SelectedAreaSchool=Model.connect('userPlatform')(SelectedAreas)
const Selectes=Model.connect('selectFilter')(SelectedAreaSchool)

export default Selectes