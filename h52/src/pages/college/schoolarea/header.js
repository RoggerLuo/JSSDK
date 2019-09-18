import React from "react"
import Select from 'components/select'
import styled from 'styled-components'
import {MapSelectProvinces,MapSelectCities} from './filterConfig'
//import {openAddCourse} from './add'
import {redirect} from 'components/history'
import Search from 'components/search/schoolareaSearch'
const SearchRow = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content:space-between;
    alignItems:start;
`
const AddButton = styled.div`
  color: white;
  padding: 8px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 36px;
  background: #1890FF;
  cursor: pointer;
  width: 116px;
  height: 36px;
  margin-left:20px;
`
function Header(props){
    return (
       <SearchRow>          
            <div style={{display:'flex'}}>
               <MapSelectProvinces />
               <div style={{width:20}}></div>
               <MapSelectCities />
            </div>
            <Search />
            <AddButton onClick={()=>{redirect('/home/college/schoolarea/add')}} > + 添加分区</AddButton>
        </SearchRow>
    ) 
}
export default Header

 // {filterConfig.map((select,i) => {
 //                    return <Select {...select} value={props[select.name]} handleChange={()=>{}} key={i} />
 //                })}
 // <SearchRow>          
 //            <div style={{display:'flex'}}>
 //                {filterConfig.map((select,i) => {
 //                    return <Select {...select} value={props[select.name]} handleChange={()=>{}} key={i} />
 //                })}
 //            </div>
 //            <Search />
 //            <AddButton onClick={()=>{redirect('/home/user/platform/add')}} > + 添加人员</AddButton>
 //        </SearchRow>